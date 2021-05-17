import { Code, Text } from "@chakra-ui/react"

export default function ExampleContent({ name, score }) {
	return (
		<Text align="center">
			Hello <Code>{name || "{{name}}"}</Code>! Your score is{" "}
			<Code>{score || "{{score}}"}</Code>.
		</Text>
	)
}
