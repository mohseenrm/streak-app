"use client"
import { forwardRef } from "react"
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
  onDeselect?: (value: any) => void
  value?: OptionType[] | string[] | string | number | null
  ref?: React.Ref<any>
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

function QueryBar(props: QueryBarProps) {
  const tagRender: TagRender = (props) => {
    const { label, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }

    // Using fixed indexes to keep colors consistent
    let colorIdx = 0
    if (typeof label === "string" && label.includes(">=")) {
      colorIdx = 1
    } else if (typeof label === "string" && label.includes(">")) {
      colorIdx = 2
    } else if (typeof label === "string" && label.includes("<=")) {
      colorIdx = 3
    } else if (typeof label === "string" && label.includes("<")) {
      colorIdx = 4
    } else if (typeof label === "string" && label.includes("!")) {
      colorIdx = 5
    } else if (typeof label === "string" && label.includes("=")) {
      colorIdx = 6
    }

    return (
      <Tag
        color={COLORS[colorIdx]}
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
      style={{ flexGrow: "10" }}
      placeholder="Type to search..."
      options={props.options}
      onChange={props.onChange}
      onDeselect={props.onDeselect}
      // @ts-ignore
      filterOption={props.onFilter}
      onSelect={props.onSelect}
      value={props.value}
      size={"large"}
      mode={"multiple"}
      tagRender={tagRender}
      ref={props.ref}
    />
  )
}

const QueryBarComponent = forwardRef((props: QueryBarProps, ref) => {
  return <QueryBar {...props} ref={ref} />
})
QueryBarComponent.displayName = "QueryBar"
export default QueryBarComponent
