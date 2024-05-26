import { Operator, Operations, TableDataGroup } from "@/types"

export class TableData<
  TData extends Record<string, unknown>,
  TColumns extends keyof TData,
> {
  private _data: TData[] = []

  constructor(data: TData[]) {
    this._data = data
  }

  get data(): Readonly<TData[]> {
    return this._data
  }

  public filter(
    field: TColumns,
    operator: Operations,
    value: string | number | boolean | Date
  ): TData[] {
    return this.filterData(this._data, field, operator, value)
  }

  public filterData(
    data: Readonly<TData[]>,
    field: TColumns,
    operator: Operations,
    value: string | number | boolean | Date
  ): TData[] {
    return data.filter((row) => {
      switch (operator) {
        case Operator[">"]:
          return row[field] > value
        case Operator["<"]:
          return row[field] < value
        case Operator["="]:
          return row[field] === value
        case Operator[">="]:
          return row[field] >= value
        case Operator["<="]:
          return row[field] <= value
        case Operator["!="]:
          return row[field] !== value
        default:
          return false
      }
    })
  }

  public groupBy(field: TColumns): Record<string, TData[]> {
    return this._data.reduce<Record<string, TData[]>>((acc, row) => {
      const key = row[field] as string
      if (acc[key]) {
        acc[key].push(row)
      } else {
        acc[key] = [row]
      }
      return acc
    }, {})
  }

  public groupDataByRows(
    data: Readonly<TData[]>,
    field: TColumns
  ): Array<TableDataGroup | TData> {
    const results: Array<TableDataGroup | TData> = []
    const groups = data.reduce<Record<string, TData[]>>((acc, row) => {
      const key = row[field] as string
      if (acc[key]) {
        acc[key].push(row)
      } else {
        acc[key] = [row]
      }
      return acc
    }, {})

    Object.entries(groups).map(([key, value]: [string, TData[]]) => {
      const row = { field, value: key, ...value[0] }
      results.push(row)
      value.forEach((row) => {
        results.push(row)
      })
    })
    return results
  }
}
