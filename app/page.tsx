"use client"
import { useEffect, useCallback, useState, useMemo, useRef } from "react"
import Title from "@/app/components/title"
import { Select, Card, Table, Tag } from "antd"
import type { TableColumnsType } from "antd"
import TableData from "@/fixtures/data.json"
import QueryBar from "@/app/components/QueryBar"
import type { OptionType } from "@/app/components/QueryBar"
import { format } from "date-fns"
import {
  OperationLookup,
  TableDataEntity,
  Operator,
  QueryField,
  QueryStep,
  Query,
} from "@/types"
import { TableData as TableDataModel } from "@/models/TableData"

export default function Home() {
  const model = useRef<TableDataModel<TableDataEntity, keyof TableDataEntity>>(
    new TableDataModel<TableDataEntity, keyof TableDataEntity>(
      TableData as TableDataEntity[]
    )
  )
  const [filteredData, setFilteredData] = useState<Readonly<TableDataEntity[]>>(
    model.current.data
  )
  const fields = useMemo(() => Object.keys(model.current.data[0]), [])
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
    Object.keys(model.current.data[0]).map((field) => {
      _indexes[field] = new Set()
    })
    model.current.data.map((row) => {
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
  const queryBarRef = useRef<HTMLDivElement>(null)

  // focus on query bar on load
  useEffect(() => {
    queryBarRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && event.metaKey) {
        queryBarRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // add to query when queryField is completed
  useEffect(() => {
    const isQueryFieldComplete =
      queryField.hasOwnProperty(QueryStep.Field) &&
      queryField.hasOwnProperty(QueryStep.Operator) &&
      queryField.hasOwnProperty(QueryStep.Value)
    if (isQueryFieldComplete) {
      setQuery((prev) => ({
        ...prev,
        queryFields: [...prev.queryFields, queryField as QueryField],
      }))
      setQueryField({})
      setCurrentOptions(fieldOptions)
    }
  }, [queryField])

  useEffect(() => {
    if (query.queryFields.length > 0) {
      let data = model.current.data
      for (const queryField of query.queryFields) {
        data = model.current.filterData(
          data,
          queryField.field as keyof TableDataEntity,
          queryField.operator,
          queryField.value
        )
      }

      if (query.groupBy) {
        data = model.current.groupDataByRows(
          data,
          query.groupBy as keyof TableDataEntity
        )
      }
      setFilteredData(data)
    } else {
      setFilteredData(model.current.data)
    }
  }, [query])

  useEffect(() => {
    if (query.groupBy) {
      const groupedData = model.current.groupDataByRows(
        filteredData,
        query.groupBy as keyof TableDataEntity
      )
      setFilteredData(groupedData)
    } else {
      setFilteredData(model.current.data)
    }
  }, [query.groupBy])

  const columns: TableColumnsType<TableDataEntity> = useMemo(() => {
    return [
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
        showSorterTooltip: { target: "full-header" },
        sorter: (a: TableDataEntity, b: TableDataEntity) => {
          if (a.firstName < b.firstName) {
            return -1
          }
          if (a.firstName > b.firstName) {
            return 1
          }
          return 0
        },
        sortDirections: ["descend", "ascend"],
        render: (text: string, record: TableDataEntity) => {
          if (record.hasOwnProperty("field")) {
            // @ts-ignore
            return <Tag color={"cyan"}>{record.value}</Tag>
          }
          return text
        },
        onCell: (record: TableDataEntity) => ({
          colSpan: record.hasOwnProperty("field") ? 7 : 1,
        }),
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
        showSorterTooltip: { target: "full-header" },
        sorter: (a: TableDataEntity, b: TableDataEntity) => {
          if (a.lastName < b.lastName) {
            return -1
          }
          if (a.lastName > b.lastName) {
            return 1
          }
          return 0
        },
        sortDirections: ["descend", "ascend"],
        onCell: (record: TableDataEntity) => ({
          colSpan: record.hasOwnProperty("field") ? 0 : 1,
          rowSpan: record.hasOwnProperty("field") ? 0 : 1,
        }),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        showSorterTooltip: { target: "full-header" },
        sorter: (a: TableDataEntity, b: TableDataEntity) => {
          if (a.email < b.email) {
            return -1
          }
          if (a.email > b.email) {
            return 1
          }
          return 0
        },
        sortDirections: ["descend", "ascend"],
        onCell: (record: TableDataEntity) => ({
          colSpan: record.hasOwnProperty("field") ? 0 : 1,
          rowSpan: record.hasOwnProperty("field") ? 0 : 1,
        }),
      },
      {
        title: "Plan",
        dataIndex: "plan",
        key: "plan",
        showSorterTooltip: { target: "full-header" },
        sorter: (a: TableDataEntity, b: TableDataEntity) => {
          if (a.plan < b.plan) {
            return -1
          }
          if (a.plan > b.plan) {
            return 1
          }
          return 0
        },
        sortDirections: ["descend", "ascend"],
        onCell: (record: TableDataEntity) => ({
          colSpan: record.hasOwnProperty("field") ? 0 : 1,
          rowSpan: record.hasOwnProperty("field") ? 0 : 1,
        }),
      },
      {
        title: "Projects",
        dataIndex: "projects",
        key: "projects",
        showSorterTooltip: { target: "full-header" },
        sorter: (a: TableDataEntity, b: TableDataEntity) => {
          if (a.projects < b.projects) {
            return -1
          }
          if (a.projects > b.projects) {
            return 1
          }
          return 0
        },
        sortDirections: ["descend", "ascend"],
        onCell: (record: TableDataEntity) => ({
          colSpan: record.hasOwnProperty("field") ? 0 : 1,
          rowSpan: record.hasOwnProperty("field") ? 0 : 1,
        }),
      },
      {
        title: "Date Created",
        dataIndex: "dateCreated",
        key: "dateCreated",
        render: (text: string) =>
          format(new Date(text), "LLL dd yyyy, hh:mm:ss"),
        showSorterTooltip: { target: "full-header" },
        sorter: (a: TableDataEntity, b: TableDataEntity) => {
          if (a.dateCreated < b.dateCreated) {
            return -1
          }
          if (a.dateCreated > b.dateCreated) {
            return 1
          }
          return 0
        },
        sortDirections: ["descend", "ascend"],
        onCell: (record: TableDataEntity) => ({
          colSpan: record.hasOwnProperty("field") ? 0 : 1,
          rowSpan: record.hasOwnProperty("field") ? 0 : 1,
        }),
      },
      {
        title: "Date Updated",
        dataIndex: "dateUpdated",
        key: "dateUpdated",
        render: (text: string) =>
          format(new Date(text), "LLL dd yyyy, hh:mm:ss"),
        showSorterTooltip: { target: "full-header" },
        sorter: (a: TableDataEntity, b: TableDataEntity) => {
          if (a.dateUpdated < b.dateUpdated) {
            return -1
          }
          if (a.dateUpdated > b.dateUpdated) {
            return 1
          }
          return 0
        },
        sortDirections: ["descend", "ascend"],
        onCell: (record: TableDataEntity) => ({
          colSpan: record.hasOwnProperty("field") ? 0 : 1,
          rowSpan: record.hasOwnProperty("field") ? 0 : 1,
        }),
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
          // Store friendly value for display and removing from query when user deselects
          friendlyValue:
            option.step === QueryStep.Value
              ? `${prev.field} ${OperationLookup[prev.operator!]} ${value}`
              : undefined,
        }))

        // Update options based on selected step
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
    if (tokens.length > 0) {
      const lastToken = tokens.pop()

      if (typeof option.label === "string") {
        return option.label!.toLowerCase().includes(lastToken.toLowerCase())
      } else if (typeof option.label === "number") {
        const numStr = option.label.toString()
        return numStr.toLowerCase().includes(lastToken.toLowerCase())
      }
    }
    return true
  }, [])

  // remove from query when tag is removed
  const onDeselect = useCallback((value: any) => {
    setInputValue((prev) => prev.filter((v) => v !== value))
    setQuery((prev) => ({
      ...prev,
      queryFields: prev.queryFields.filter(
        (queryField) => queryField.friendlyValue !== value
      ),
    }))
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex flex-col">
        <Title level={1}>Streak Demo App</Title>
        <div className="mb-10 mt-10 w-full">
          <Card>Press ⌘ +k to start filtering</Card>
        </div>
        <div className="mb-10 w-full flex">
          <QueryBar
            options={currentOptions}
            onSelect={onSelect}
            value={inputValue}
            onFilter={onFilter}
            onDeselect={onDeselect}
            ref={queryBarRef}
          />
          <Select
            mode="multiple"
            maxTagCount={1}
            placeholder="Group By"
            style={{ flexGrow: "1", marginLeft: "10px" }}
            options={fieldOptions}
            value={query.groupBy}
            onSelect={(value) =>
              setQuery((prev) => ({ ...prev, groupBy: value }))
            }
            onDeselect={() =>
              setQuery((prev) => ({ ...prev, groupBy: undefined }))
            }
          />
        </div>
        <Table dataSource={filteredData} columns={columns} sticky />
      </div>
    </main>
  )
}
