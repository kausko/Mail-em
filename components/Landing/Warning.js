import Image from "next/image"
import {
	Link,
	Button,
	Box,
	Text,
	Modal,
	ModalHeader,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalCloseButton,
	ModalOverlay,
} from "@chakra-ui/react"

export default function Warning({ isOpen, onClose, handleSignIn }) {
	return (
		<Modal {...{ isOpen, onClose, isCentered: true }}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Unverified app warning</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text mb={2}>
						Mail-em uses restricted scopes to send out mails using
						Gmail SMTP. If you wish to proceed, follow the
						instructions below.
					</Text>
					<Box w="100%" bg="white" p={1}>
						<Image
							src="/warning.gif"
							alt="warning gif"
							width="765"
							height="520"
							layout="intrinsic"
						/>
					</Box>
					<Text>
						This access can be revoked from{" "}
						<Link
							color="teal.500"
							href="https://myaccount.google.com/permissions"
							isExternal
						>
							your account's permission settings.
						</Link>
					</Text>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme="teal"
						variant="solid"
						mr={3}
						onClick={handleSignIn}
					>
						Next
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
