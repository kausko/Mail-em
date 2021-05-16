import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { ModalHeader } from "@chakra-ui/modal";
import { ModalBody } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { ModalFooter } from "@chakra-ui/modal";
import { ModalCloseButton } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/modal";
import Image from "next/image";
import Link from "next/link";

export default function Warning({ isOpen, onClose, handleSignIn }) {
  return (
    <Modal {...{ isOpen, onClose, isCentered: true }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Unverified app warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Mail-em uses restricted scopes to send out mails using Gmail SMTP. If you wish to proceed, follow the instructions below.</Text>
          <Image
            src="/warning.gif"
            alt="warning gif"
            width="765"
            height="520"
            layout="intrinsic"
          />
          <Text>
            This access can be revoked from{" "}
            <Link color="teal" href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">
              your account's permission settings.
                </Link>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" variant="solid" mr={3} onClick={handleSignIn}>
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