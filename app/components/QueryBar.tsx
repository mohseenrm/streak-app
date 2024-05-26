"use client"
import { useRef } from "react"
import { Select, Tag } from "antd"
import type { SelectProps } from "antd"
import { QuerySteps } from "@/types"

type TagRender = SelectProps<any>["tagRender"]

export type OptionType = {
  label?: React.ReactNode
  value?: string | number | null
  children?: React.ReactNode
  step?: QuerySteps
}

type QueryBarProps = {
  options: OptionType[]
  searchValue?: string
  onSelect?: (value: any, option: OptionType) => void
  onChange?: (value: any, option: OptionType | Array<OptionType>) => void
  onFilter?: (value: any, option: any) => void
  value?: OptionType[] | string[] | string | number | null
}

const COLORS = [
  undefined,
  "green",
  "cyan",
  "blue",
  "lime",
  "geekblue",
  "purple",
  "success",
  "gold",
  "volcano",
  "processing",
  "magenta",
  "warning",
  "red",
  "orange",
]

export default function QueryBar(props: QueryBarProps) {
  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    let colorRef = 0
    if (typeof label === "string" && label.includes(">=")) {
      colorRef = 1
    } else if (typeof label === "string" && label.includes(">")) {
      colorRef = 2
    } else if (typeof label === "string" && label.includes("<=")) {
      colorRef = 3
    } else if (typeof label === "string" && label.includes("<")) {
      colorRef = 4
    } else if (typeof label === "string" && label.includes("!")) {
      colorRef = 5
    } else if (typeof label === "string" && label.includes("=")) {
      colorRef = 6
    }

    return (
      <Tag
        color={COLORS[colorRef]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    )
  }
  return (
    <Select
      autoFocus
      showSearch={false}
      style={{ width: "100%" }}
      placeholder="Type to search..."
      options={props.options}
      searchValue={props.searchValue}
      onChange={props.onChange}
      // @ts-ignore
      filterOption={props.onFilter}
      size={"large"}
      mode={"multiple"}
      onSelect={props.onSelect}
      value={props.value}
      tagRender={tagRender}
    />
  )
}
