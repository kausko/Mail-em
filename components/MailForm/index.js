import { Heading } from "@chakra-ui/layout";
import { SimpleGrid } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import sanitize from "sanitize-html";
import { SvgLoader } from 'react-svgmt';
import { ext, repl } from "../../utils";
import Attachments from "./Attachments";
import Subject from "./Subject";
import UploadContent from "./UploadContent";
import UploadCSV from './UploadCSV';
import { Textarea } from "@chakra-ui/textarea";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import Paginator from "./Paginator";

export default function MailForm() {

  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [CSVData, setCSVData] = useState([]);
  const [content, setContent] = useState(null);
  const [contentData, setContentData] = useState(null)
  const [attachments, setAttachments] = useState([]);
  const [previewContent, setPreviewContent] = useState('');
  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  const toast = useToast();

  useEffect(() => {
    if (!!CSVData.length && !!content) {
      let fr = new FileReader();
      fr.onload = e => {
        setContentData(e.target.result);
        setPreviewContent(repl(e.target.result, CSVData[previewIndex].data))
      }
      fr.readAsText(content)
    }
  }, [CSVData, content, previewIndex])

  useEffect(() => {
    if (!!CSVData.length && !!attachments.length) {
      setPreviewImages([])
      let newImages = [];
      const readFile = i => {
        if (i >= attachments.length)
          return setPreviewImages(newImages);
        if (attachments[i]?.type === "svg" || ext(attachments[i].name) === "svg") {
          let fr = new FileReader();
          fr.onload = e => {
            newImages.push(repl(e.target.result, CSVData[previewIndex].data))
            readFile(i+1)
          }
          fr.readAsText(attachments[i])
        }
      }
      readFile(0)
    }
  }, [CSVData, attachments, previewIndex])

  const handleUpload = () => {
    setLoading(true);
    let emailData = {
      CSVData,
      subject,
      [ext(content?.name)]: contentData
    }
    let formData = new FormData();
    formData.append("data", JSON.stringify(emailData));
    for (let i = 0; i < attachments.length; i++)
      formData.append("attachments", attachments[i]);

    axios.post("/api/email", formData)
      .then(() => toast({
        title: "Request processed",
        description: "Your emails are being sent. Track the progress using your email provider.",
        status: "info",
        isClosable: true
      }))
      .catch(err => toast({
        title: "Request failed",
        description: err.message,
        status: "error",
        isClosable: true
      }))
      .finally(() => setLoading(false))
  }

  return (
    <VStack padding="8" spacing="3" alignItems="start" w="100%">
      <Subject {...{ subject, setSubject }} />
      <UploadCSV {...{ setCSVData }} />
      <UploadContent {...{ content, setContent }} />
      <Attachments {...{ attachments, setAttachments }} />
      {
        !!CSVData.length && !!content && !!subject &&
        <Button
          alignSelf="start"
          isLoading={loading}
          onClick={handleUpload}
          colorScheme="teal"
        >
          Send Mail
        </Button>
      }
      {!!content && !!CSVData.length &&
        <>
          <Heading>Preview</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 1, md: 8 }} w="100%">
            <VStack spacing="8" minH="90vh">
            {
              ext(content?.name) === "html" ?
                <iframe
                  allowTransparency={false}
                  srcDoc={sanitize(previewContent)}
                  style={{ maxWidth: "100%", height: "auto" }}
                >
                </iframe> :
                <Textarea isReadOnly defaultValue={previewContent}/>
            }
            <Paginator max={CSVData.length} index={previewIndex} setIndex={setPreviewIndex}/>
            </VStack>
            {
              !!previewImages.length &&
              <VStack spacing="8">
                <SvgLoader svgXML={previewImages[previewImageIndex]} style={{ maxWidth: "100%", height: "auto" }}>
                </SvgLoader>
                <Paginator max={previewImages.length} index={previewImageIndex} setIndex={setPreviewImageIndex} />
              </VStack>
            }
          </SimpleGrid>
        </>
      }
    </VStack>
  )
}