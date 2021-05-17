import { FormControl, FormLabel, FormHelperText, Input } from "@chakra-ui/react"
/**
 * @param  {object} param
 * @param  {string} param.subject
 * @param  {import("react").Dispatch<import("react").SetStateAction<string>>} param.setSubject
 */
export default function Subject({ subject, setSubject }) {
	const handleChange = (e) => setSubject(e.target.value)

	return (
		<FormControl id="subject">
			<FormLabel>1. Subject</FormLabel>
			<Input
				value={subject}
				placeholder="Enter subject here"
				onChange={handleChange}
				autoFocus
			/>
			<FormHelperText>
				The subject can also contain variables
			</FormHelperText>
		</FormControl>
	)
}
