"use client"
import { useEffect, useCallback, useState, useMemo } from "react"
import Title from "@/app/components/title"
import { Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import TableData from "@/fixtures/data.json"
import QueryBar from "@/app/components/QueryBar"
import type { OptionType } from "@/app/components/QueryBar"
import { format } from "date-fns"
import { Operator, QueryField, QueryStep, Query } from "@/types"

export default function Home() {
  const fields = useMemo(() => Object.keys(TableData[0]), [])
  const fieldOptions = useMemo(
    () =>
      fields.map((field) => ({
        key: field,
        label: field,
        value: field,
        step: QueryStep.Field,
      })),
    []
  )
  const operatorOptions = useMemo(
    () =>
      Object.entries(Operator).map(([key, value]) => ({
        key,
        label: key,
        value: value,
        step: QueryStep.Operator,
      })),
    []
  )
  const indexes = useMemo(() => {
    const _indexes: Record<string, Set<any>> = {}
    Object.keys(TableData[0]).map((field) => {
      _indexes[field] = new Set()
    })
    TableData.map((row) => {
      Object.entries(row).map(([key, value]) => {
        _indexes[key].add(value)
      })
    })
    const _friendlyIndexes: Record<string, any[]> = {}
    Object.entries(_indexes).map(([key, value]) => {
      const _value = Array.from(value)
      if (typeof _value[0] === "number") {
        _value.sort((a, b) => a - b)
      } else {
        _value.sort()
      }
      _friendlyIndexes[key] = _value
    })
    return _friendlyIndexes
  }, [])
  const [currentOptions, setCurrentOptions] =
    useState<OptionType[]>(fieldOptions)
  const [queryField, setQueryField] = useState<Partial<QueryField>>({})
  const [inputValue, setInputValue] = useState<string[]>([])
  const [query, setQuery] = useState<Query>({
    queryFields: [],
    groupBy: undefined,
  })

  useEffect(() => {
    const isQueryFieldComplete =
      queryField.hasOwnProperty(QueryStep.Field) &&
      queryField.hasOwnProperty(QueryStep.Operator) &&
      queryField.hasOwnProperty(QueryStep.Value)
    if (isQueryFieldComplete) {
      // setInputValue((prev) => [...prev, value])
      setQuery((prev) => ({
        ...prev,
        queryFields: [...prev.queryFields, queryField as QueryField],
      }))
      setQueryField({})
      setCurrentOptions(fieldOptions)
    }
  }, [queryField])

  const columns: TableColumnsType<any> = useMemo(() => {
    return [
      { title: "First Name", dataIndex: "firstName", key: "firstName" },
      { title: "Last Name", dataIndex: "lastName", key: "lastName" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Plan", dataIndex: "plan", key: "plan" },
      { title: "Projects", dataIndex: "projects", key: "projects" },
      {
        title: "Date Created",
        dataIndex: "dateCreated",
        key: "dateCreated",
        render: (text: string) =>
          format(new Date(text), "LLL dd yyyy, hh:mm:ss"),
      },
      {
        title: "Date Updated",
        dataIndex: "dateUpdated",
        key: "dateUpdated",
        render: (text: string) =>
          format(new Date(text), "LLL dd yyyy, hh:mm:ss"),
      },
    ]
  }, [])
  const onSelect = useCallback(
    (value: any, option: OptionType) => {
      if (option.step) {
        setQueryField((prev) => ({
          ...prev,
          // @ts-ignore
          [option.step]: value,
        }))
        if (option.step === QueryStep.Field) {
          if (query.queryFields.length > 0) {
            setInputValue((prev) => [...prev, value])
          } else if (inputValue.length > 0) {
            const updatedInput = [...inputValue]
            updatedInput[updatedInput.length - 1] =
              `${updatedInput[updatedInput.length - 1]} ${value}`
            setInputValue(updatedInput)
          } else {
            setInputValue([value])
          }
          setCurrentOptions(operatorOptions)
        } else if (option.step === QueryStep.Operator) {
          if (inputValue.length > 0) {
            const updatedInput = [...inputValue]
            updatedInput[updatedInput.length - 1] =
              `${updatedInput[updatedInput.length - 1]} ${option.label}`
            setInputValue(updatedInput)
          } else {
            setInputValue([value])
          }
          const valueOptions = indexes[queryField.field as string].map(
            (value: any) => ({
              label: value,
              value: value,
              step: QueryStep.Value,
            })
          )
          setCurrentOptions(valueOptions)
        } else {
          if (inputValue.length > 0) {
            const updatedInput = [...inputValue]
            updatedInput[updatedInput.length - 1] =
              `${updatedInput[updatedInput.length - 1]} ${value}`
            setInputValue(updatedInput)
          } else {
            setInputValue([value])
          }
          setCurrentOptions(fieldOptions)
        }
      }
    },
    [inputValue, query, queryField]
  )

  const onFilter = useCallback((value: any, option: OptionType) => {
    const tokens = value.split(" ").filter(Boolean)
    if (tokens.length > 1) {
      const lastToken = tokens.pop()
      // @ts-ignore
      return option.label!.toLowerCase().includes(lastToken.toLowerCase())
    }
    return true
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex flex-col">
        <Title level={1}>Streak App</Title>
        <div className="mb-10 w-full">
          <QueryBar
            options={currentOptions}
            onSelect={onSelect}
            value={inputValue}
            onFilter={onFilter}
          />
        </div>
        <Table dataSource={TableData} columns={columns} sticky />
      </div>
    </main>
  )
}
