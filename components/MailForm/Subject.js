import { FormLabel } from "@chakra-ui/form-control";
import { FormHelperText } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
/**
 * @param  {object} param
 * @param  {string} param.subject
 * @param  {import("react").Dispatch<import("react").SetStateAction<string>>} param.setSubject
 */
export default function Subject({ subject, setSubject }) {

  const handleChange = e => setSubject(e.target.value);
  
  return(
    <FormControl id="subject">
      <FormLabel>1. Subject</FormLabel>
      <Input 
        value={subject} 
        placeholder="Enter subject here"
        onChange={handleChange}
        autoFocus
      />
      <FormHelperText>The subject can also contain variables</FormHelperText>
    </FormControl>
  )
}