import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useRef } from "react";
import { CSVReader } from "react-papaparse";
import ExampleTable from "./ExampleTable";
import { SiGooglesheets } from "react-icons/si";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Collapse } from "@chakra-ui/transition";
/**
 * @param  {object} param
 * @param  {import("react").Dispatch<import("react").SetStateAction<any[]>>} param.setCSVData
 */
export default function UploadCSV({ setCSVData }) {
  const { isOpen, onToggle } = useDisclosure();
  const csvref = useRef(null);
  const toast = useToast()

  const handleOpenDialog = e => {
    if (csvref.current)
      csvref.current.open(e)
  }

  const handleFileLoad = data => {
    console.log(data)
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
    <>
      <Flex w="100%">
        <VStack align="start">
          <Heading>2. Recepient Information</Heading>
          <Button
            variant="link"
            fontSize={{ base: "x-small", sm: "initial" }}
            onClick={onToggle}
          >
            <u>A spreadsheet with user information</u>
        </Button>
        </VStack>
        <Spacer />
        <CSVReader
          accept="text/csv"
          ref={csvref}
          onFileLoad={handleFileLoad}
          onError={handleError}
          config={{ header: true }}
          noClick
          noDrag
          noProgressBar
        >
          {({ file }) =>
            <VStack align="flex-end">
              <IconButton icon={file?.name ? <SiGooglesheets color="#34A853" /> : <AddIcon />} size="lg" onClick={handleOpenDialog} />
              {file?.name && <Text align="right">{file?.name}</Text>}
            </VStack>
          }
        </CSVReader>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <ExampleTable />
      </Collapse>
    </>
  )
}