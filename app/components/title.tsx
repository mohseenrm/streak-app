"use client"

import { Typography } from "antd"
const { Title } = Typography

type TitleComponentProps = {
  children: React.ReactNode
} & Readonly<{
  level?: 1 | 2 | 3 | 4 | 5 | undefined
}>

export default function TitleComponent(props: TitleComponentProps) {
  return (
    <Title
      level={props.level !== undefined ? props.level : 1}
      className="text-4xl font-bold"
    >
      {props.children}
    </Title>
  )
}
