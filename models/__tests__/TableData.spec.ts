import { TableData } from "@/models/TableData"
import { Operator } from "@/types"
import { describe, it, expect } from "vitest"

describe("TableData", () => {
  it("should filter data based on > operator", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ]
    const tableData = new TableData(data)
    const result = tableData.filter("id", Operator[">"], 2)
    expect(result).toEqual([
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ])
  })

  it("should filter data based on = operator", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ]
    const tableData = new TableData(data)
    const result = tableData.filter("id", Operator["="], 2)
    expect(result).toEqual([{ id: 2, name: "Wick" }])
  })

  it("should filter data based on < operator", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ]
    const tableData = new TableData(data)
    const result = tableData.filter("id", Operator["<"], 2)
    expect(result).toEqual([{ id: 1, name: "John" }])
  })

  it("should filter data based on >= operator", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ]
    const tableData = new TableData(data)
    const result = tableData.filter("id", Operator[">="], 3)
    expect(result).toEqual([
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ])
  })

  it("should filter data based on <= operator", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ]
    const tableData = new TableData(data)
    const result = tableData.filter("id", Operator["<="], 2)
    expect(result).toEqual([
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
    ])
  })

  it("should filter data based on != operator", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ]
    const tableData = new TableData(data)
    const result = tableData.filter("id", Operator["!="], 2)
    expect(result).toEqual([
      { id: 1, name: "John" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
    ])
  })

  it("should group by field", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
      { id: 5, name: "Wick" },
    ]
    const tableData = new TableData(data)
    const result = tableData.groupBy("name")
    expect(result).toEqual({
      John: [{ id: 1, name: "John" }],
      Wick: [
        { id: 2, name: "Wick" },
        { id: 5, name: "Wick" },
      ],
      Simba: [{ id: 3, name: "Simba" }],
      Pumba: [{ id: 4, name: "Pumba" }],
    })
  })

  it("should group by rows", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Wick" },
      { id: 3, name: "Simba" },
      { id: 4, name: "Pumba" },
      { id: 5, name: "Wick" },
    ]
    const tableData = new TableData(data)
    const result = tableData.groupDataByRows(data, "name")
    expect(result).toEqual([
      { field: "name", value: "John", id: 1, name: "John" },
      { id: 1, name: "John" },
      { field: "name", value: "Wick", id: 2, name: "Wick" },
      { id: 2, name: "Wick" },
      { id: 5, name: "Wick" },
      { field: "name", value: "Simba", id: 3, name: "Simba" },
      { id: 3, name: "Simba" },
      { field: "name", value: "Pumba", id: 4, name: "Pumba" },
      { id: 4, name: "Pumba" },
    ])
  })
})
