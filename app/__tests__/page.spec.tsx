import { describe, it, vi, expect } from "vitest"
import { render, fireEvent } from "@testing-library/react"
import Page from "@/app/page"

vi.mock("@/fixtures/data.json", () => ({
  default: [
    {
      firstName: "Arturo",
      lastName: "Lind",
      email: "Arturo.Lind@yahoo.com",
      plan: "premium",
      projects: 9,
      dateCreated: "2018-10-25T19:58:05.737Z",
      dateUpdated: "2024-05-20T09:00:28.498Z",
    },
    {
      firstName: "Charlotte",
      lastName: "Lynch-Haag",
      email: "Charlotte.Lynch-Haag8@gmail.com",
      plan: "premium",
      projects: 5,
      dateCreated: "2021-01-21T21:20:01.200Z",
      dateUpdated: "2024-05-19T04:53:55.995Z",
    },
    {
      firstName: "Lori",
      lastName: "Streich",
      email: "Lori.Streich@hotmail.com",
      plan: "free",
      projects: 0,
      dateCreated: "2018-03-14T14:03:13.952Z",
      dateUpdated: "2024-05-19T23:29:23.646Z",
    },
    {
      firstName: "Kristen",
      lastName: "Hintz",
      email: "Kristen_Hintz87@hotmail.com",
      plan: "premium",
      projects: 0,
      dateCreated: "2020-08-18T02:44:10.982Z",
      dateUpdated: "2024-05-20T21:13:19.163Z",
    },
    {
      firstName: "Annie",
      lastName: "Spinka",
      email: "Annie_Spinka@yahoo.com",
      plan: "premium",
      projects: 3,
      dateCreated: "2014-10-25T02:09:26.079Z",
      dateUpdated: "2024-05-23T07:00:41.692Z",
    },
    {
      firstName: "Stephanie",
      lastName: "Hoeger",
      email: "Stephanie.Hoeger61@hotmail.com",
      plan: "free",
      projects: 10,
      dateCreated: "2020-07-06T00:40:15.626Z",
      dateUpdated: "2024-05-17T01:14:36.936Z",
    },
    {
      firstName: "Inez",
      lastName: "Erdman",
      email: "Inez_Erdman@yahoo.com",
      plan: "free",
      projects: 1,
      dateCreated: "2019-09-23T13:31:27.250Z",
      dateUpdated: "2024-05-19T19:20:35.304Z",
    },
    {
      firstName: "Francis",
      lastName: "Hettinger-Hermiston",
      email: "Francis.Hettinger-Hermiston@yahoo.com",
      plan: "free",
      projects: 10,
      dateCreated: "2018-01-02T06:29:36.779Z",
      dateUpdated: "2024-05-16T20:21:28.073Z",
    },
    {
      firstName: "Gina",
      lastName: "Kiehn",
      email: "Gina_Kiehn@yahoo.com",
      plan: "pro",
      projects: 4,
      dateCreated: "2024-05-01T03:45:40.568Z",
      dateUpdated: "2024-05-17T23:55:53.941Z",
    },
    {
      firstName: "Mario",
      lastName: "Johns",
      email: "Mario.Johns17@hotmail.com",
      plan: "pro",
      projects: 6,
      dateCreated: "2023-08-17T16:54:45.907Z",
      dateUpdated: "2024-05-23T03:00:08.031Z",
    },
    {
      firstName: "Holly",
      lastName: "Russel",
      email: "Holly_Russel@hotmail.com",
      plan: "free",
      projects: 0,
      dateCreated: "2019-08-14T20:11:55.656Z",
      dateUpdated: "2024-05-21T23:57:24.429Z",
    },
    {
      firstName: "Rosa",
      lastName: "Gusikowski",
      email: "Rosa.Gusikowski@yahoo.com",
      plan: "free",
      projects: 5,
      dateCreated: "2020-03-08T01:19:57.895Z",
      dateUpdated: "2024-05-18T09:37:39.047Z",
    },
    {
      firstName: "Douglas",
      lastName: "Renner",
      email: "Douglas_Renner82@hotmail.com",
      plan: "pro",
      projects: 8,
      dateCreated: "2016-06-15T09:51:39.679Z",
      dateUpdated: "2024-05-20T03:42:04.921Z",
    },
    {
      firstName: "Kristen",
      lastName: "Corkery",
      email: "Kristen.Corkery@yahoo.com",
      plan: "premium",
      projects: 1,
      dateCreated: "2020-01-11T13:44:50.601Z",
      dateUpdated: "2024-05-25T18:01:30.438Z",
    },
    {
      firstName: "Whitney",
      lastName: "Gleason",
      email: "Whitney.Gleason@gmail.com",
      plan: "pro",
      projects: 9,
      dateCreated: "2023-01-28T05:23:58.467Z",
      dateUpdated: "2024-05-15T19:15:38.915Z",
    },
  ],
}))

describe("Page", () => {
  it("should render", () => {
    const { getByText } = render(<Page />)
    expect(getByText("Streak Demo App")).toBeDefined()
  })

  it("should render correctly", () => {
    const { getAllByText, getAllByTestId } = render(<Page />)
    expect(getAllByText("Streak Demo App")).toBeDefined()
    expect(getAllByTestId("query-bar")).toBeDefined()
    expect(getAllByTestId("group-by")).toBeDefined()
    expect(getAllByTestId("table-data")).toBeDefined()
  })

  it("should be able to create query fields", async () => {
    const { getAllByText, getAllByDisplayValue, getByText } = render(<Page />)
    const queryBar = getAllByDisplayValue("")[0]

    fireEvent.change(queryBar, { target: { value: "firstName" } })
    fireEvent.keyDown(queryBar, { key: "Enter", code: 13 })
    fireEvent.click(getAllByText("firstName")[0])

    fireEvent.change(queryBar, { target: { value: "=" } })
    fireEvent.keyDown(queryBar, { key: "Enter", code: 13 })
    fireEvent.click(getByText("="))

    fireEvent.change(queryBar, { target: { value: "Arturo" } })
    fireEvent.keyDown(queryBar, { key: "Enter", code: 13 })
    fireEvent.click(getAllByText("Arturo")[0])
  })
})
