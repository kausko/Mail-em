import { AddIcon } from "@chakra-ui/icons"
import { useRef } from "react"
import { CSVReader } from "react-papaparse"
import ExampleTable from "./ExampleTable"
import { SiGooglesheets } from "react-icons/si"
import {
	useToast,
	Button,
	IconButton,
	useDisclosure,
	Tag,
	TagLabel,
	TagLeftIcon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Wrap,
	ButtonGroup,
	WrapItem,
} from "@chakra-ui/react"
/**
 * @param  {object} param
 * @param  {import("react").Dispatch<import("react").SetStateAction<any[]>>} param.setCSVData
 */
export default function UploadCSV({ setCSVData }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const csvref = useRef(null)
	const toast = useToast()

	const handleOpenDialog = (e) => {
		if (csvref.current) csvref.current.open(e)
	}

	const handleFileLoad = (data) => {
		setCSVData(data)
	}

	const handleError = (err) => {
		toast({
			title: "Parsing Error",
			description: err.message || "Your spreadsheet couldn't be parsed.",
			status: "error",
			isClosable: true,
		})
	}

	return (
		<Wrap>
			<WrapItem>
				<ButtonGroup isAttached>
					<Button variant="solid" onClick={onOpen}>
						2. Recipient information
					</Button>
					<IconButton icon={<AddIcon />} onClick={handleOpenDialog} />
				</ButtonGroup>
			</WrapItem>
			<WrapItem>
				<CSVReader
					ref={csvref}
					onFileLoad={handleFileLoad}
					onError={handleError}
					config={{ header: true }}
					noClick
					noDrag
					noProgressBar
				>
					{({ file }) =>
						file?.name ? (
							<Tag>
								<TagLeftIcon
									as={SiGooglesheets}
									color="#34A853"
								/>
								<TagLabel>{file?.name}</TagLabel>
							</Tag>
						) : (
							<></>
						)
					}
				</CSVReader>
			</WrapItem>
			<Modal {...{ isOpen, onClose, isCentered: true }}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Sample spreadsheet</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<ExampleTable />
					</ModalBody>
					<ModalFooter />
				</ModalContent>
			</Modal>
		</Wrap>
	)
}
