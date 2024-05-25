"use client"
import Title from "@/app/components/title"
import { Table } from "antd"
import type { TableColumnsType, TableProps } from "antd"
import TableData from "@/fixtures/data.json"
import { format } from "date-fns"

export default function Home() {
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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex flex-col">
        <Title level={1}>Streak App</Title>
        <Table dataSource={TableData} columns={columns} sticky />
      </div>
    </main>
  )
}
