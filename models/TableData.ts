import { Operator, Operations } from "@/types"

export class TableData<
  TData extends Record<string, unknown>,
  TColumns extends keyof TData,
> {
  private data: TData[] = []

  constructor(data: TData[]) {
    this.data = data
  }

  public getData(): Readonly<TData[]> {
    return this.data
  }

  public filter(
    field: TColumns,
    operator: Operations,
    value: string | number | boolean | Date
  ): TData[] {
    return this.data.filter((row) => {
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
    return this.data.reduce<Record<string, TData[]>>((acc, row) => {
      const key = row[field] as string
      if (acc[key]) {
        acc[key].push(row)
      } else {
        acc[key] = [row]
      }
      return acc
    }, {})
  }

  public groupByRows(
    field: TColumns
  ): Array<{ field: TColumns; value: string } | TData> {
    const results: Array<{ field: TColumns; value: string } | TData> = []
    Object.entries(this.groupBy(field)).map(
      ([key, value]: [string, TData[]]) => {
        const row = { field, value: key }
        results.push(row)
        value.forEach((row) => {
          results.push(row)
        })
      }
    )
    return results
  }
}
