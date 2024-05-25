"use client"
import { useState, useMemo } from "react"
import Title from "@/app/components/title"
import { Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import TableData from "@/fixtures/data.json"
import QueryBar from "@/app/components/QueryBar"
import type { OptionType } from "@/app/components/QueryBar"
import { format } from "date-fns"
import { Operator, QueryField, QueryStep } from "@/types"

export default function Home() {
  const fields = useMemo(() => Object.keys(TableData[0]), [])
  const fieldOptions = useMemo(
    () =>
      fields.map((field) => ({
        label: field,
        value: field,
        step: QueryStep.Field,
      })),
    []
  )
  const operatorOptions = useMemo(
    () =>
      Object.entries(Operator).map(([key, value]) => ({
        label: key,
        value: value,
        step: QueryStep.Operator,
      })),
    []
  )
  const [currentOptions, setCurrentOptions] =
    useState<OptionType[]>(fieldOptions)
  const [queryField, setQueryField] = useState<Partial<QueryField>>({})
  const [searchValue, setSearchValue] = useState<string>("")

  const columns: TableColumnsType<any> = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Plan", dataIndex: "plan", key: "plan" },
    { title: "Projects", dataIndex: "projects", key: "projects" },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      render: (text: string) => format(new Date(text), "LLL dd yyyy, hh:mm:ss"),
    },
    {
      title: "Date Updated",
      dataIndex: "dateUpdated",
      key: "dateUpdated",
      render: (text: string) => format(new Date(text), "LLL dd yyyy, hh:mm:ss"),
    },
  ]

  const onSelect = (value: any, option: OptionType) => {
    console.log("DEBUG value", value)
    console.log("DEBUG option", option)
    if (option.step) {
      setQueryField((prev) => ({
        ...prev,
        // @ts-ignore
        [option.step]: value,
      }))
      if (option.step === QueryStep.Operator) {
        setSearchValue((prev) => `${prev} ${option.label}`)
      } else {
        setSearchValue((prev) => `${prev} ${value}`)
      }
      setCurrentOptions(operatorOptions)
    }
  }
  const onChange = (value: any, option: OptionType | Array<OptionType>) => {
    console.log("DEBUG onChange value", value)
    console.log("DEBUG onChange option", option)
  }
  const onFilter = (value: any, option: OptionType) => {
    console.log("DEBUG onFilter value", value)
    console.log("DEBUG onFilter option", option)
    const tokens = searchValue.split(" ").filter(Boolean)
    console.log("DEBUG onFilter tokens", tokens)
    if (tokens.length > 1) {
      const lastToken = tokens.pop()
      return option.label!.toLowerCase().includes(lastToken.toLowerCase())
    }
    return true
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex flex-col">
        <Title level={1}>Streak App</Title>
        <div className="mb-10 w-full">
          <QueryBar
            options={currentOptions}
            searchValue={searchValue}
            onSelect={onSelect}
            value={[
              { label: "somethings", value: "somethings" },
              { label: "else", value: "else" },
            ]}
            onChange={onChange}
            onFilter={onFilter}
          />
        </div>
        <Table dataSource={TableData} columns={columns} sticky />
      </div>
    </main>
  )
}
