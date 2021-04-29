import { Input } from "@chakra-ui/input";
import { Spacer } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/layout";
/**
 * @param  {object} param
 * @param  {string} param.subject
 * @param  {import("react").Dispatch<import("react").SetStateAction<string>>} param.setSubject
 */
export default function Subject({ subject, setSubject }) {

  const handleChange = e => setSubject(e.target.value);
  
  return(
    <HStack w="100%" spacing={4}>
      <Heading>1. Subject</Heading>
      <Input 
        value={subject} 
        placeholder="Enter subject here"
        onChange={handleChange}
        size="lg"
        variant="unstyled"
        autoFocus
        w="70%" 
      />
    </HStack>
  )
}