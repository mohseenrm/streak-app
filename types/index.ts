export type Field = string
export const Operator = {
  ">": "GREATER_THAN",
  "<": "LESS_THAN",
  "=": "EQUALS",
  ">=": "GREATER_THAN_OR_EQUAL",
  "<=": "LESS_THAN_OR_EQUAL",
  "!=": "NOT_EQUALS",
} as const
export const QueryStep = {
  Field: "field",
  Operator: "operator",
  Value: "value",
} as const
export type QuerySteps = (typeof QueryStep)[keyof typeof QueryStep]
export type Operations = (typeof Operator)[keyof typeof Operator]
export const OperationLookup = Object.keys(Operator).reduce<{
  [k in Operations]: string
}>(
  (acc, key) => {
    // @ts-ignore
    acc[Operator[key]] = key
    return acc
  },
  {} as { [k in Operations]: string }
)
export type Value = string | number | boolean | Date
export type QueryField = {
  field: Field
  operator: Operations
  value: Value
  friendlyValue: string
}
export type GroupByField = string
export type Query = {
  queryFields: QueryField[]
  groupBy?: GroupByField
}
export type TableDataEntity = {
  firstName: string
  lastName: string
  email: string
  plan: "free" | "pro" | "premium"
  projects: number
  dateCreated: string
  dateUpdated: string
}
export type TableDataGroup = {
  field: string
  value: string | number | boolean | Date
} & TableDataEntity
