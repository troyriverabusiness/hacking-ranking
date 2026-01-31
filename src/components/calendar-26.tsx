"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Calendar26Props {
  dateFrom?: Date | undefined;
  dateTo?: Date | undefined;
  timeFrom?: string;
  timeTo?: string;
  onDateFromChange?: (date: Date | undefined) => void;
  onDateToChange?: (date: Date | undefined) => void;
  onTimeFromChange?: (time: string) => void;
  onTimeToChange?: (time: string) => void;
}

export default function Calendar26({
  dateFrom: controlledDateFrom,
  dateTo: controlledDateTo,
  timeFrom: controlledTimeFrom = "10:30:00",
  timeTo: controlledTimeTo = "12:30:00",
  onDateFromChange,
  onDateToChange,
  onTimeFromChange,
  onTimeToChange,
}: Calendar26Props = {}) {
  const [openFrom, setOpenFrom] = React.useState(false)
  const [openTo, setOpenTo] = React.useState(false)

  // Use controlled values if provided, otherwise use internal state
  const [internalDateFrom, setInternalDateFrom] = React.useState<Date | undefined>(
    new Date("2025-06-01")
  )
  const [internalDateTo, setInternalDateTo] = React.useState<Date | undefined>(
    new Date("2025-06-03")
  )

  const dateFrom = controlledDateFrom !== undefined ? controlledDateFrom : internalDateFrom;
  const dateTo = controlledDateTo !== undefined ? controlledDateTo : internalDateTo;
  const timeFrom = controlledTimeFrom;
  const timeTo = controlledTimeTo;

  const setDateFrom = onDateFromChange || setInternalDateFrom;
  const setDateTo = onDateToChange || setInternalDateTo;

  return (
    <div className="flex w-full min-w-0 justify-between gap-6">
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <Label htmlFor="date-from" className="px-1">
            Start
          </Label>
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-from"
                className="w-full justify-between font-normal bg-white border-blue-300 hover:bg-blue-50 focus:border-blue-400 focus:ring-blue-400"
              >
                {dateFrom
                  ? dateFrom.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateFrom}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateFrom(date)
                  setOpenFrom(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-from" className="invisible px-1">
            From
          </Label>
          <Input
            type="time"
            id="time-from"
            step="1"
            value={timeFrom}
            onChange={(e) => onTimeFromChange?.(e.target.value)}
            className="bg-white border-blue-300 focus:border-blue-400 focus:ring-blue-400 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <Label htmlFor="date-to" className="px-1">
            End
          </Label>
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-to"
                className="w-full justify-between font-normal bg-white border-blue-300 hover:bg-blue-50 focus:border-blue-400 focus:ring-blue-400"
              >
                {dateTo
                  ? dateTo.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateTo}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDateTo(date)
                  setOpenTo(false)
                }}
                disabled={dateFrom && { before: dateFrom }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-to" className="invisible px-1">
            To
          </Label>
          <Input
            type="time"
            id="time-to"
            step="1"
            value={timeTo}
            onChange={(e) => onTimeToChange?.(e.target.value)}
            className="bg-white border-blue-300 focus:border-blue-400 focus:ring-blue-400 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  )
}
