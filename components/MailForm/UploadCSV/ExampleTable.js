import { Box } from "@chakra-ui/layout";
import { Th } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";
import { TableCaption } from "@chakra-ui/table";
import { Tfoot } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Thead } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";

export const table = {
  "email": [
    "catalina@mail-em.com",
    "camron@mail-em.com",
    "devonte@mail-em.com"
  ],
  "type": ["to", "cc", "bcc"],
  "name": ["Catalina", "Camron", "Devonte"],
  "score": [81, 39, 80]
}

export default function ExampleTable() {
  return (
    <Box overflowX="auto" maxW="80vw">
      <Table size="sm">
        {/* <TableCaption placement="top">Sample spreadsheet</TableCaption> */}
        <Thead>
          <Tr>
            {Object.keys(table).map(v => <Th key={v}>{v}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {[0, 1, 2].map(i =>
            <Tr key={i}>
              {Object.values(table).map((v, j) => <Td key={j}>{v[i]}</Td>)}
            </Tr>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Required</Th>
            <Th>Optional</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}