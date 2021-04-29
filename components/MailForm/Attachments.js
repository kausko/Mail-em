import { IconButton } from "@chakra-ui/button";
import { AddIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
import { Spacer } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { nullifyEventValue } from "../../utils";

/**
 * @param  {object} param
 * @param  {[]} param.attachments
 * @param  {import("react").Dispatch<import("react").SetStateAction<any[]>>} param.setAttachments 
 */
export default function Attachments({ attachments, setAttachments }) {

  const handleChange = e => {
    setAttachments(e.target.files)
  }

  return(
    <Flex w="100%">
      <VStack align="start">
        <Heading>4. Upload Attachments</Heading>
        <Text fontSize={{ base: "x-small", sm: "initial" }}>All svg files will be treated as customizable assets, and they will be scanned for variables</Text>
      </VStack>
      <Spacer/>
      <VStack align="flex-end">
        <input
          type="file"
          accept="*"
          name="attachments-input"
          id="attachments-input"
          style={{ display: 'none' }}
          onChange={handleChange}
          onClick={nullifyEventValue}
          multiple
        />
        <label htmlFor="attachments-input">
          <IconButton
            as="span"
            icon={attachments.length ? <AttachmentIcon color="green.500"/> : <AddIcon/>}
            size="lg"
          />
        </label>
        <Text align="right">{ attachments.length } files attached</Text>
      </VStack>
    </Flex>
  )
}