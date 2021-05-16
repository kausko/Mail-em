import { AddIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { CSVReader } from "react-papaparse";
import ExampleTable from "./ExampleTable";
import { SiGooglesheets } from "react-icons/si";
import { useToast } from "@chakra-ui/toast";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Tag } from "@chakra-ui/tag";
import { TagLeftIcon } from "@chakra-ui/tag";
import { TagLabel } from "@chakra-ui/tag";
import { Modal } from "@chakra-ui/modal";
import { ModalOverlay } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { ModalCloseButton } from "@chakra-ui/modal";
import { ModalBody } from "@chakra-ui/modal";
import { ModalHeader } from "@chakra-ui/modal";
import { ModalFooter } from "@chakra-ui/modal";
import { Wrap } from "@chakra-ui/layout";
import { ButtonGroup } from "@chakra-ui/button";
import { WrapItem } from "@chakra-ui/layout";
/**
 * @param  {object} param
 * @param  {import("react").Dispatch<import("react").SetStateAction<any[]>>} param.setCSVData
 */
export default function UploadCSV({ setCSVData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const csvref = useRef(null);
  const toast = useToast()

  const handleOpenDialog = e => {
    if (csvref.current)
      csvref.current.open(e)
  }

  const handleFileLoad = data => {
    setCSVData(data)
  }

  const handleError = err => {
    toast({
      title: "Parsing Error",
      description: err.message || "Your spreadsheet couldn't be parsed.",
      status: "error",
      isClosable: true
    })
  }

  return (
    <Wrap>
      <WrapItem>
        <ButtonGroup isAttached>
          <Button variant="solid" onClick={onOpen}>2. Recepient information</Button>
          <IconButton icon={<AddIcon />} onClick={handleOpenDialog}/>
        </ButtonGroup>
      </WrapItem>
      <WrapItem>
        <CSVReader
          ref={csvref}
          onFileLoad={handleFileLoad}
          onError={handleError}
          config={{ header: true }}
          noClick
          noDrag
          noProgressBar
        >
          {({ file }) =>
            file?.name ?
            <Tag>
              <TagLeftIcon as={SiGooglesheets} color="#34A853"/>
              <TagLabel>{file?.name}</TagLabel>
            </Tag> :
            <></>
          }
        </CSVReader>
      </WrapItem>
      <Modal {...{ isOpen, onClose, isCentered: true }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sample spreadsheet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ExampleTable />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </Wrap>
  )
}