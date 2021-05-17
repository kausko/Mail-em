import { Box } from "@chakra-ui/layout";
import { Th } from "@chakra-ui/table";
import { Tbody } from "@chakra-ui/table";
import { Tfoot } from "@chakra-ui/table";
import { Td } from "@chakra-ui/table";
import { Tr } from "@chakra-ui/table";
import { Thead } from "@chakra-ui/table";
import { Table } from "@chakra-ui/table";

export const table = {
  "to/cc/bcc": ["a@b.in", "b@c.in,c@d.in", "devonte@mail-em.com"],
  "name": ["Catalina", "Camron", "Devonte"],
  "score": [81, 39, 80]
}

export default function ExampleTable() {
  return (
    <Box overflowX="auto" maxW="80vw">
      <Table size="sm">
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
          </Tr>
        </Tfoot>
      </Table>
    </Box>
  )
}