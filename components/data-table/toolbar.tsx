"use client"

import React from "react"
import { RowModel, Table } from "@tanstack/react-table"
import { LucideIcon, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./faceted-filter"
import { DataTableViewOptions } from "./view-options"

export type FilterType = {
  access: string
  title?: string
  options: {
    label: string
    value: string
    icon?: LucideIcon
  }[]
}

export type SelectActions<TData> = {
  icon?: LucideIcon
  title: string
  action: (table: RowModel<TData>) => void
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters?: FilterType[]
  selectActions?: SelectActions<TData>[]
}

export function DataTableToolbar<TData>({
  table,
  filters,
  selectActions,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length

  const isSelected = table.getSelectedRowModel().rows.length > 0

  const searchInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 flex-1 items-center space-x-2">
          <Input
            placeholder="Search"
            value={table.getState().globalFilter}
            onChange={(e) => table.setGlobalFilter(e.currentTarget.value)}
            className="w-full"
            ref={searchInputRef}
          />

          {isFiltered && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                table.resetGlobalFilter()
                table.resetColumnFilters()
              }}
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        <DataTableViewOptions table={table} />
      </div>

      <div className="flex flex-wrap gap-2">
        {filters &&
          filters.map(
            (f) =>
              table.getColumn(f.access) && (
                <DataTableFacetedFilter
                  key={f.access}
                  column={table.getColumn(f.access)}
                  title={f.title}
                  options={f.options}
                />
              )
          )}
      </div>

      <div className="flex items-center justify-between gap-2 px-2">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex gap-2">
          {selectActions &&
            selectActions.map((e) => (
              <Button
                type="button"
                size="sm"
                key={e.title}
                variant={!isSelected ? "outline" : "default"}
                onClick={() => {
                  e.action(table.getSelectedRowModel())
                  table.resetRowSelection()
                }}
                disabled={!isSelected}
              >
                {e.icon && <e.icon className="mr-2 h-4 w-4" />}
                {e.title}
              </Button>
            ))}
        </div>
      </div>
    </div>
  )
}
