"use client"
import { Select } from "antd"
import { QuerySteps } from "@/types"

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

export default function QueryBar(props: QueryBarProps) {
  return (
    <Select
      autoFocus
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
    />
  )
}
