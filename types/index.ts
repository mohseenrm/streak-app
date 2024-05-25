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
export type Value = string | number | boolean | Date
export type QueryField = {
  field: Field
  operator: Operations
  value: Value
}
export type GroupByField = string
export type Query = {
  queryFields: QueryField[]
  groupBy?: GroupByField
}
