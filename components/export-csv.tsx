import { useState } from "react"
import { Download } from "lucide-react"
import Papa from "papaparse"

import { useTeachers } from "@/lib/queries"

import { Button } from "./ui/button"

const ExportDataButton = ({ data }: { data?: any[] }) => {
  const teachers = useTeachers()

  const exportData = async () => {
    const parsedData = Papa.unparse(data, {
      delimiter: ",",
      header: true,
    })

    const blob = new Blob([parsedData], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.setAttribute("download", "Exported-data.csv")
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <Button variant="secondary" size="icon" onClick={exportData}>
      <Download className="h-4 w-4" />
    </Button>
  )
}

export default ExportDataButton
