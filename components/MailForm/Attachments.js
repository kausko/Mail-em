import { ButtonGroup } from "@chakra-ui/button";
import { Button } from "@chakra-ui/button";
import { IconButton } from "@chakra-ui/button";
import { AddIcon, AttachmentIcon } from "@chakra-ui/icons";
import { WrapItem } from "@chakra-ui/layout";
import { Wrap } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { Tooltip } from "@chakra-ui/tooltip";
import { nullifyEventValue } from "../../utils";

/**
 * @param  {object} param
 * @param  {FileList} param.attachments
 * @param  {import("react").Dispatch<import("react").SetStateAction<FileList>>} param.setAttachments 
 */
export default function Attachments({ attachments, setAttachments }) {

  const handleChange = e => {
    setAttachments(e.target.files)
  }

  return (
    <Wrap>
      <WrapItem>
        <ButtonGroup isAttached>
          <Tooltip
            label="All svg files will be treated as customizable assets, and they will be scanned for variables"
            aria-label="Attachment tooltip"
          >
            <Button 
              variant="solid" 
              cursor="default"
              borderTopRightRadius={0} 
              borderBottomRightRadius={0}
            >
              4. Upload Attachments
            </Button>
          </Tooltip>
          <input
            type="file"
            accept="*"
            name="attachments-input"
            id="attachments-input"
            style={{ display: 'none' }}
            onChange={handleChange}
            onClick={nullifyEventValue}
            multiple
          />
          <label htmlFor="attachments-input">
            <IconButton
              as="span"
              cursor="pointer"
              icon={<AddIcon />}
              borderTopLeftRadius={0}
              borderBottomLeftRadius={0}
            />
          </label>
        </ButtonGroup>
      </WrapItem>
      {
        Array.from(attachments).map((v, i) =>
          <WrapItem key={i}>
            <Tag key={i}>{v.name}</Tag>
          </WrapItem>
        )
      }
    </Wrap>
  )
}