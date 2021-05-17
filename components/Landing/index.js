import {
	Button,
	Heading,
	VStack,
	SimpleGrid,
	useDisclosure,
} from "@chakra-ui/react"
import { FcGoogle } from "react-icons/fc"
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/client"
import { useRouter } from "next/router"
import { EmailIcon } from "@chakra-ui/icons"
import Warning from "./Warning"

export default function Landing({ session }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleSignIn = () => {
		onClose()
		setLoading(true)
		return signIn("google")
	}

	const getStarted = () => router.push("/mail")

	return (
		<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} padding={4}>
			<Image
				src="/landing.svg"
				alt="Landing vector"
				width="1000"
				height="841.56"
				layout="intrinsic"
			/>
			<VStack spacing={8} justify="center">
				<Heading fontSize={{ base: "2xl", md: "4xl" }}>
					Make. Modify. Mail.
				</Heading>
				<Heading size="md" fontWeight="hairline" align="center">
					In 3 steps, mail-merge with personalized images faster than
					ever before.
				</Heading>
				{session ? (
					<Button leftIcon={<EmailIcon />} onClick={getStarted}>
						Get Started
					</Button>
				) : (
					<Button
						leftIcon={<FcGoogle />}
						isLoading={loading}
						loadingText="Signing in"
						onClick={onOpen}
					>
						Sign in with Google
					</Button>
				)}
				<Warning {...{ isOpen, onClose, handleSignIn }} />
			</VStack>
		</SimpleGrid>
	)
}
