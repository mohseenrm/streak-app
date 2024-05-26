import {
  describe,
  it,
  vi,
  beforeEach,
  afterEach,
  expect,
  beforeAll,
} from "vitest"
import { render, fireEvent } from "@testing-library/react"
import Page from "@/app/page"

describe("Page", () => {
  beforeEach(() => {
    // vi.resetAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should render", () => {
    const { getByText } = render(<Page />)
    expect(getByText("Streak Demo App")).toBeDefined()
  })
})
