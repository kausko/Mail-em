import { Code } from "@chakra-ui/layout";
import { SimpleGrid, VStack, Heading, Text } from "@chakra-ui/layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import ExampleContent from "../components/MailForm/UploadContent/ExampleContent";
import ExampleTable, { table } from "../components/MailForm/UploadCSV/ExampleTable";

const { name, score } = table;

export default function Help() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % (name.length + 1))
    }, 1000)
    return () => clearInterval(timeout)
  }, [])
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 10, md: 20 }} w="100%" padding={8}>
      <VStack align="flex-start">
        <Heading>1. Upload Recepient Information</Heading>
        <Text>
          Upload a spreadsheet containing the recepient information that you intend to use in the email content. All the column headers in the spreadsheet can be used as variables in the email's `Subject`, `Content` and `SVG attachments`.
        </Text>
      </VStack>
      <ExampleTable />
      <VStack align="flex-start">
        <Heading>2. Upload Email Content</Heading>
        <Text>
          Upload a text or html file containing the message that you intend to send in the email body
        </Text>
      </VStack>
      <ExampleContent name={name[index]} score={score[index]} />
      <VStack align="flex-start">
        <Heading>3. Upload Attachments</Heading>
        <Text>
          All attachments accepted by Gmail can be uploaded. SVG files can be used as templates by adding variables in the code.
        </Text>
        <Text>
          PRO TIP: Presentation programs like PowerPoint, Slides, Keynote, etc. support exporting slides as SVG files.
        </Text>
      </VStack>
      <Image
        src="/code.svg"
        alt="SVG code"
        width="1460"
        height="418"
        layout="intrinsic"
      />
    </SimpleGrid>
  )
}