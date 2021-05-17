import { Button, IconButton, HStack } from "@chakra-ui/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"

/**
 * @param  {object} param
 * @param  {number} param.max
 * @param  {number} param.index
 * @param  {import("react").Dispatch<import("react").SetStateAction<number>>} param.setIndex
 */
export default function Paginator({ max, index, setIndex }) {
	const handleChange = (unit) => (_e) => setIndex(index + unit)

	return (
		<HStack>
			<IconButton
				disabled={!index}
				icon={<ChevronLeftIcon />}
				onClick={handleChange(-1)}
			/>
			<Button>{index + 1}</Button>
			<IconButton
				disabled={index + 1 >= max}
				icon={<ChevronRightIcon />}
				onClick={handleChange(1)}
			/>
		</HStack>
	)
}
