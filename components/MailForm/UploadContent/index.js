import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { nullifyEventValue } from "../../../utils";
import { FcDocument, FcGlobe } from "react-icons/fc";
import ExampleContent from "./ExampleContent";
import { AddIcon } from "@chakra-ui/icons";
import { Tag } from "@chakra-ui/tag";
import { TagLeftIcon } from "@chakra-ui/tag";
import { TagLabel } from "@chakra-ui/tag";
import { Modal } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { ModalHeader } from "@chakra-ui/modal";
import { ModalCloseButton } from "@chakra-ui/modal";
import { ModalBody } from "@chakra-ui/modal";
import { ModalFooter } from "@chakra-ui/modal";
import { ButtonGroup } from "@chakra-ui/button";
import { Wrap } from "@chakra-ui/layout";
import { WrapItem } from "@chakra-ui/layout";

/**
 * @param  {object} param
 * @param  {File} param.content
 * @param  {import("react").Dispatch<import("react").SetStateAction<File>>} param.setContent
 */
export default function UploadContent({ content, setContent }) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFileSelect = event => {
    const f = event.target.files[0];
    if (f) {
      setContent(f);
    }
  }

  return (
    <Wrap>
      <WrapItem>
        <ButtonGroup isAttached>
          <Button
            variant="solid"
            onClick={onOpen}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
          >
            3. Email content
        </Button>
          <input
            accept="text/plain, text/html"
            name="content-input"
            id="content-input"
            style={{ display: 'none' }}
            type="file"
            onChange={handleFileSelect}
            onClick={nullifyEventValue}
          />
          <label htmlFor="content-input">
            <IconButton
              as="span"
              cursor="pointer"
              icon={<AddIcon />}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </label>
        </ButtonGroup>
      </WrapItem>
      <WrapItem>
        {
          !!content?.name &&
          <Tag>
            {content.name.split('.').pop() === "html"
              ?
              <TagLeftIcon as={FcGlobe}/>
              :
              <TagLeftIcon as={FcDocument}/>
            }
            <TagLabel>{content.name}</TagLabel>
          </Tag>
        }
      </WrapItem>
      <Modal {...{ isOpen, onClose, isCentered: true }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sample content</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ExampleContent />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Wrap>
  )
}