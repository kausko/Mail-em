import {
	HamburgerIcon,
	LockIcon,
	MoonIcon,
	QuestionIcon,
	SunIcon,
} from "@chakra-ui/icons"
import { signOut, useSession } from "next-auth/client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import {
	Avatar,
	Button,
	IconButton,
	useColorMode,
	Box,
	VStack,
	Text,
	Flex,
	Heading,
	HStack,
	Spacer,
	MenuList,
	MenuButton,
	Menu,
} from "@chakra-ui/react"

export default function Navbar({ Component, pageProps }) {
	const [session, authenticating] = useSession()
	const { colorMode, toggleColorMode } = useColorMode()
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleGuide = () => router.push("/help")

	const handleSignOut = () => {
		setLoading(true)
		signOut({ redirect: false })
			.then(() => setLoading(false))
			.catch(console.log)
	}

	if (authenticating) {
		return (
			<Box h="100vh" w="100vw">
				<Image
					src="/preloader.svg"
					alt="Preloader"
					layout="fill"
					objectFit="contain"
				/>
			</Box>
		)
	}

	return (
		<>
			<Flex p={3} align="center">
				<Link href="/">
					<Heading size="lg" fontWeight="medium" cursor="pointer">
						Mail-em
					</Heading>
				</Link>
				<Spacer />
				<HStack spacing={2}>
					<IconButton
						icon={<QuestionIcon />}
						onClick={handleGuide}
						title="Help"
					/>
					<IconButton
						icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
						onClick={toggleColorMode}
						title="Toggle Theme"
					/>
					{!!session && (
						<Menu>
							<MenuButton
								as={IconButton}
								icon={<HamburgerIcon />}
							/>
							<MenuList>
								<VStack>
									<Avatar
										name={session.user?.name}
										src={session.user?.image}
									/>
									<Text>{session.user?.name}</Text>
									<Text fontSize="xs">
										{session.user?.email}
									</Text>
									<Button
										size="sm"
										isLoading={loading}
										loadingText="Signing out"
										leftIcon={<LockIcon />}
										onClick={handleSignOut}
										variant="ghost"
									>
										Sign out
									</Button>
								</VStack>
							</MenuList>
						</Menu>
					)}
				</HStack>
			</Flex>
			<Component {...{ session, authenticating, ...pageProps }} />
		</>
	)
}
