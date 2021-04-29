import { Code, Text } from "@chakra-ui/layout";

export default function ExampleContent() {
  return(
    <Text align="center">
      Hello <Code>{"{{name}}"}</Code>! Your score is <Code>{"{{score}}"}</Code>
    </Text>
  )
}