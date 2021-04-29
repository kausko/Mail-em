import { IconButton } from "@chakra-ui/button";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { HStack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { nullifyEventValue } from "../../../utils";
import { GrDocumentTxt, GrHtml5 } from "react-icons/gr";
import ExampleContent from "./ExampleContent";
import { AddIcon } from "@chakra-ui/icons";
import { Collapse } from "@chakra-ui/transition";
import { Text } from "@chakra-ui/layout";

/**
 * @param  {object} param
 * @param  {File} param.content
 * @param  {import("react").Dispatch<import("react").SetStateAction<File>>} param.setContent
 */
export default function UploadContent({ content, setContent }) {

  const { isOpen, onToggle } = useDisclosure();

  const handleFileSelect = event => {
    const f = event.target.files[0];
    if (f) {
      setContent(f);
    }
  }

  return (
    <>
    <Flex w="100%">
      <VStack align="start">
        <Heading>3. Email content</Heading>
        <Button 
          variant="link" 
          size="sm" 
          onClick={onToggle}
          fontSize={{ base: "x-small", sm: "initial" }}
        >
          <u>A text/html file with email content</u>
        </Button>
      </VStack>
      <Spacer/>
      <VStack align="flex-end">
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
            icon={!!content?.name ? content.name.split('.').pop() === "html" ? <GrHtml5 color="#E34F26"/> : <GrDocumentTxt color="#808080"/> : <AddIcon/>}
            size="lg"
          />
        </label>
        {!!content?.name && <Text align="right">{content?.name}</Text>}
      </VStack>
    </Flex>
    <Collapse in={isOpen} animateOpacity>
      <ExampleContent/>
    </Collapse>
    </>
  )
}