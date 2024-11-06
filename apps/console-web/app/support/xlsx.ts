import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { get } from '@ss/shared'

const calculateColumnWidths = <T extends {}>(data: T[]) => {
  const columnHeaders = Object.keys(data[0] || {})
  const widths: number[] = []

  columnHeaders.forEach((header, index) => {
    widths[index] = header.length
  })

  data.forEach((row) => {
    Object.keys(row).forEach((key, index) => {
      const cellValue = get(row, key).toString()
      widths[index] = Math.max(widths[index] || 0, cellValue.length)
    })
  })

  return widths.map((width) => width + 10)
}

export const generateXLSX = <T extends {}>(data: T[], fileName: string) => {
  const wb = XLSX.utils.book_new()

  const ws = XLSX.utils.json_to_sheet<T>(data)

  XLSX.utils.book_append_sheet(wb, ws, 'Inventário')

  const columnWidths = calculateColumnWidths(data)

  ws['!cols'] = columnWidths.map((width) => ({ width }))

  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })

  const blob = new Blob([buffer], { type: 'application/octet-stream' })

  FileSaver.saveAs(blob, `${fileName}.xlsx`)
}
