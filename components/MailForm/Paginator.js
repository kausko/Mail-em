import { Button } from "@chakra-ui/button";
import { IconButton } from "@chakra-ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/layout";

/**
 * @param  {object} param
 * @param  {number} param.max
 * @param  {number} param.index
 * @param  {import("react").Dispatch<import("react").SetStateAction<number>>} param.setIndex
 */
export default function Paginator({ max, index, setIndex }) {

  const handleChange = unit => _e => setIndex(index+unit)

  return(
    <HStack>
      <IconButton 
        disabled={!index} 
        icon={<ChevronLeftIcon/>}
        onClick={handleChange(-1)}
      />
      <Button>{index+1}</Button>
      <IconButton 
        disabled={index+1 >= max} 
        icon={<ChevronRightIcon/>}
        onClick={handleChange(1)}
      />
    </HStack>
  )
}