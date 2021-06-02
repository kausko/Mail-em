import multer from "multer"
import { getSession } from "next-auth/client"
import nodemailer from "nodemailer"
import { ext, repl } from "../../../utils"
import prisma from "../../../lib/prisma"

function initMiddleware(middleware) {
	return (req, res) =>
		new Promise((resolve, reject) => {
			middleware(req, res, (result) => {
				if (result instanceof Error) {
					return reject(result)
				}
				return resolve(result)
			})
		})
}

export const config = {
	api: {
		bodyParser: false,
	},
}

/**
 * @param  {import("next").NextApiRequest & { files: Express.Multer.File[]}} req
 * @param  {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
	const session = await getSession({ req })

	const tokens = await prisma.account.findFirst({
		where: {
			user: {
				email: session.user.email,
			},
		},
		select: {
			accessToken: true,
			refreshToken: true,
		},
	})

	if (!tokens) {
		throw new Error("Tokens not found")
	}

	await initMiddleware(multer({ limits: { fileSize: 25000000 } }).any())(
		req,
		res
	)

	const { CSVData, html, txt, subject } = JSON.parse(req.body.data)
	let attachments = []
	let svgs = []

	req.files.forEach((file) => {
		if (ext(file.originalname) === "svg") {
			svgs.push({
				filename: file.originalname,
				content: file.buffer.toString(),
			})
		} else {
			attachments.push({
				filename: file.originalname,
				content: file.buffer,
			})
		}
	})

	const transporter = nodemailer.createTransport({
		pool: true,
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: session.user.email,
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			refreshToken: tokens.refreshToken,
			accessToken: tokens.accessToken,
		},
	})

	let messages = []

	CSVData.forEach(({ data }) => {
		if (!data.to && !data.bcc && !data.cc) throw "Missing Recipient Address"
		messages.push({
			from: session.user.email,
			subject: repl(subject, data),
			...(data.to && { to: data.to }),
			...(data.bcc && { bcc: data.bcc }),
			...(data.cc && { cc: data.cc }),
			...(txt && { text: repl(txt, data) }),
			...(html && { html: repl(html, data) }),
			attachments: [
				...attachments,
				...svgs.map((svg) => ({
					...svg,
					content: repl(svg.content, data),
				})),
			],
		})
	})

	let toSend = messages.length + 0

	transporter.on("idle", () => {
		while (transporter.isIdle() && messages.length) {
			transporter
				.sendMail(messages.shift())
				.then(() => {
					console.debug(toSend--)
				})
				.catch(console.log)
		}
		if (!toSend) return transporter.removeAllListeners().close()
	})

	res.status(200).send("OK")
}
