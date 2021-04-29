import { Heading } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import { StackDivider } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import sanitize from "sanitize-html";
import { SvgLoader } from 'react-svgmt';
import { ext, repl } from "../../utils";
import Attachments from "./Attachments";
import Subject from "./Subject";
import UploadContent from "./UploadContent";
import UploadCSV from './UploadCSV';

export default function MailForm() {

  const [subject, setSubject] = useState('');
  const [CSVData, setCSVData] = useState([]);
  const [content, setContent] = useState(new File());
  const [attachments, setAttachments] = useState([new File()]);
  const [previewContent, setPreviewContent] = useState('');
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (!!CSVData.length && !!content) {
      let fr = new FileReader();
      fr.onload = e => setPreviewContent(repl(e.target.result, CSVData[0].data))
      fr.readAsText(content)
    }
  }, [CSVData, content])

  useEffect(() => {
    let result = [];
    if (!!CSVData.length && !!attachments.length) {
      let fr = new FileReader();
      fr.onload = e => result.push(repl(e.target.result, CSVData[0].data))
      attachments.forEach(file => {
        if (ext(file.name) === "svg") {
          fr.readAsText(file)
        }
      })
    }
    setPreviewImages(result)
  },[CSVData, attachments])

  return(
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} padding={10}>
      <VStack spacing={8} divider={<StackDivider/>}>
        <Subject {...{ subject, setSubject }}/>
        <UploadCSV {...{ setCSVData }}/>
        <UploadContent {...{ content, setContent }}/>
        <Attachments {...{ attachments, setAttachments }} />
      </VStack>
      <VStack>
        <Heading align="center">
          Preview
        </Heading>
        {
          ext(content.name) === "html" ?
          <iframe srcDoc={sanitize(previewContent)}>
          </iframe> :
          <Text>{previewContent}</Text>
        }
        {
          previewImages.map((v,i) =>
            <SvgLoader svgXML={v} key={i}>
            </SvgLoader>
          )
        }
      </VStack>
    </SimpleGrid>
  )
}