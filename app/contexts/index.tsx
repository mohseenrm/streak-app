"use client"
import { ConfigProvider, theme } from "antd"

const { darkAlgorithm } = theme

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
        token: {
          fontSize: 15,
        },
        components: {
          Select: {
            multipleItemHeightLG: 40,
            singleItemHeightLG: 40,
            optionFontSize: 15,
            optionLineHeight: 2,
            multipleItemHeight: 30,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
