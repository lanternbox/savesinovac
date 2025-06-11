"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Remove the old definition completely
// type DateRange = {
//   from: Date;
//   to: Date;
// };

type DateRangeOption = {
  label: string;
  value: string;
  getDateRange: () => DateRange;
};

interface DateRangeSelectorProps {
  onRangeChange?: (range: DateRange) => void;
  className?: string;
  initialDateRange?: DateRange;
}

export default function DateRangeSelector({
  onRangeChange,
  className,
  initialDateRange,
}: DateRangeSelectorProps) {
  const today = new Date();

  const defaultAllDatesRange: DateRange = {
    from: new Date(0),
    to: today,
  };

  const allDatesRange = initialDateRange || defaultAllDatesRange;

  const dateRangeOptions: DateRangeOption[] = [
    {
      label: "All dates",
      value: "allDates",
      getDateRange: (): DateRange => allDatesRange,
    },
    {
      label: "Custom range",
      value: "custom",
      getDateRange: (): DateRange => ({
        from: initialDateRange?.from ?? today,
        to: initialDateRange?.to ?? today,
      }),
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("allDates");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    allDatesRange,
  );
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (dateRange) {
      onRangeChange?.(dateRange);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleCalendarSelect = (selectedDate: Date | undefined | null) => {
    if (!selectedDate) return;

    if (tempStartDate === null) {
      setTempStartDate(selectedDate);
      setCalendarOpen(true);
    } else {
      const startDate = tempStartDate;
      const endDate = selectedDate;

      const newRange: DateRange = {
        from: startDate < endDate ? startDate : endDate,
        to: startDate < endDate ? endDate : startDate,
      };

      setDateRange(newRange);
      onRangeChange?.(newRange);
      setTempStartDate(null);
      setCalendarOpen(false);
    }
  };

  const formatDateDisplay = () => {
    if (selectedOption === "allDates") return "All dates";
    if (
      !dateRange ||
      !dateRange.from ||
      !dateRange.to ||
      (dateRange.from === allDatesRange.from &&
        dateRange.to === allDatesRange.to)
    ) {
      return "Select custom range";
    }

    const fromStr = format(dateRange.from, "PP");
    const toStr = format(dateRange.to, "PP");

    if (fromStr === toStr) {
      return fromStr;
    }
    return `${fromStr} - ${toStr}`;
  };

  const getCalendarSelectedProp = (): Date | undefined => {
    return tempStartDate ?? undefined;
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Select
        value={selectedOption}
        onValueChange={(value) => {
          setSelectedOption(value);

          // TEMPORARILY COMMENTED OUT FOR DIAGNOSTICS
          // if (value === "allDates") {
          //   const option = dateRangeOptions.find((opt) => opt.value === "allDates");
          //   if (option) {
          //     const newRange = option.getDateRange();
          //     if (dateRange?.from !== newRange.from || dateRange?.to !== newRange.to) {
          //       setDateRange(newRange);
          //       onRangeChange?.(newRange);
          //     }
          //   }
          //   setTempStartDate(null); // Reset temp date when switching to All Dates
          // } else if (value === "custom") {
          //   const customOption = dateRangeOptions.find(opt => opt.value === 'custom');
          //   // Only set initial custom range if current range is the 'all dates' one
          //   if (customOption && (!dateRange || (dateRange.from === allDatesRange.from && dateRange.to === allDatesRange.to))) {
          //     const initialCustomRange = customOption.getDateRange();
          //     setDateRange(initialCustomRange);
          //     // onRangeChange?.(initialCustomRange); // Decide if this should report change
          //   }
          //   setTempStartDate(null); // Reset temp date for new custom selection
          // }
        }}
      >
        <SelectTrigger
          className="w-[150px]"
          style={{
            border: "1px solid var(--border-color--border-secondary)",
            borderRadius: "100px",
          }}
        >
          <SelectValue placeholder="Select range type" />
        </SelectTrigger>
        <SelectContent>
          {dateRangeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={selectedOption !== "custom"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              selectedOption === "custom" &&
                (!dateRange ||
                  (dateRange.from === allDatesRange.from &&
                    dateRange.to === allDatesRange.to)) &&
                "text-muted-foreground",
              "rounded-full border-[var(--border-color--border-secondary)]",
            )}
            onClick={() => {
              if (selectedOption === "custom") {
                setTempStartDate(null);
              }
            }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateDisplay()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            selected={getCalendarSelectedProp()}
            defaultMonth={dateRange?.from}
            onSelect={handleCalendarSelect}
            numberOfMonths={2}
            modifiers={{
              range_start:
                dateRange?.from && !tempStartDate ? [dateRange.from] : [],
              range_end: dateRange?.to && !tempStartDate ? [dateRange.to] : [],
              in_range:
                dateRange?.from && dateRange.to && !tempStartDate
                  ? (date: Date) =>
                      date >= dateRange.from! && date <= dateRange.to!
                  : () => false,
              temp_start: tempStartDate ? [tempStartDate] : [],
            }}
            modifiersClassNames={{
              range_start: "day-range-start",
              range_end: "day-range-end",
              in_range: "day-range-middle",
              temp_start:
                "bg-accent text-accent-foreground rounded-full !opacity-100",
            }}
            classNames={{
              day_selected:
                "bg-[var(--base-color-brand--green)] rounded-md text-white focus:bg-[var(--base-color-brand--green)] focus:text-white",
              day_range_start:
                "!bg-[var(--base-color-brand--green)] !text-white rounded-l-full",
              day_range_end:
                "!bg-[var(--base-color-brand--green)] !text-white rounded-r-full",
              day_range_middle:
                "!bg-[var(--background-color--background-tertiary)] !text-[var(--text-color--text-secondary)] !rounded-none",
              day_today: "bg-accent text-accent-foreground rounded-md",
              day_outside:
                "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_hidden: "invisible",
              nav_button:
                "hover:bg-[var(--background-color--background-tertiary)] rounded-md",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell:
                "text-[var(--text-color--text-secondary)] rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
