"use client";

import * as React from "react";
import {
  format,
  isAfter,
  isBefore,
  getYear,
  setYear,
  isSameDay,
} from "date-fns";
import { zhCN } from "date-fns/locale";
import { CalendarIcon, Loader2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DualCalendarDateRange({
  className,
  onChange,
  minYear,
  maxYear,
}: {
  className?: string;
  onChange?: (range: { from?: Date; to?: Date } | undefined) => void;
  minYear?: number;
  maxYear?: number;
}) {
  // Applied dates (shown in the input)
  const [appliedStartDate, setAppliedStartDate] = React.useState<
    Date | undefined
  >(undefined);
  const [appliedEndDate, setAppliedEndDate] = React.useState<Date | undefined>(
    undefined,
  );

  // Pending dates (selected in the calendar but not yet applied)
  const [pendingStartDate, setPendingStartDate] = React.useState<
    Date | undefined
  >(undefined);
  const [pendingEndDate, setPendingEndDate] = React.useState<Date | undefined>(
    undefined,
  );

  // Calendar view states
  const [startDateMonth, setStartDateMonth] = React.useState<Date>(new Date());
  const [endDateMonth, setEndDateMonth] = React.useState<Date>(new Date());

  const [open, setOpen] = React.useState(false);
  const [calendarLoaded, setCalendarLoaded] = React.useState(false);

  // Generate year options based on props or default range
  const currentYear = new Date().getFullYear();
  const from = minYear ?? currentYear - 10;
  const to = maxYear ?? currentYear + 10;

  const yearOptions = React.useMemo(() => {
    const years: number[] = [];
    for (let year = from; year <= to; year++) {
      years.push(year);
    }
    return years;
  }, [from, to]);

  // Preload calendar when component mounts
  React.useEffect(() => {
    // Preload the calendar component
    const preloadCalendar = async () => {
      // Wait a bit to ensure everything is loaded
      await new Promise((resolve) => setTimeout(resolve, 100));
      setCalendarLoaded(true);
    };

    preloadCalendar();
  }, []);

  // Update the parent component when applied dates change
  React.useEffect(() => {
    if (onChange) {
      onChange({ from: appliedStartDate, to: appliedEndDate });
    }
  }, [appliedStartDate, appliedEndDate, onChange]);

  // Initialize pending dates when popover opens
  React.useEffect(() => {
    if (open) {
      // Initialize pending dates with applied dates when opening
      setPendingStartDate(appliedStartDate);
      setPendingEndDate(appliedEndDate);

      // Set calendar months based on selected dates
      if (appliedStartDate) {
        setStartDateMonth(appliedStartDate);
      }
      if (appliedEndDate) {
        setEndDateMonth(appliedEndDate);
      } else if (appliedStartDate) {
        setEndDateMonth(appliedStartDate);
      }

      // Ensure calendar is loaded
      if (!calendarLoaded) {
        setTimeout(() => {
          setCalendarLoaded(true);
        }, 100);
      }
    }
  }, [open, appliedStartDate, appliedEndDate, calendarLoaded]);

  // Handle start date selection
  const handleStartDateSelect = (date: Date | undefined) => {
    setPendingStartDate(date);

    // If the new start date is after the current end date, reset end date
    if (date && pendingEndDate && isAfter(date, pendingEndDate)) {
      setPendingEndDate(undefined);
    }
  };

  // Handle end date selection
  const handleEndDateSelect = (date: Date | undefined) => {
    // Only allow end dates that are after the start date
    if (!pendingStartDate || (date && isAfter(date, pendingStartDate))) {
      setPendingEndDate(date);
    }
  };

  // Handle year change for start date calendar
  const handleStartYearChange = (year: string) => {
    const newDate = new Date(startDateMonth);
    setStartDateMonth(setYear(newDate, Number.parseInt(year)));
  };

  // Handle year change for end date calendar
  const handleEndYearChange = (year: string) => {
    const newDate = new Date(endDateMonth);
    setEndDateMonth(setYear(newDate, Number.parseInt(year)));
  };

  // Apply the pending dates
  const handleApply = () => {
    setAppliedStartDate(pendingStartDate);
    setAppliedEndDate(pendingEndDate);
    setOpen(false);
  };

  // Close without applying changes
  const handleClose = () => {
    setOpen(false);
  };

  // Clear both dates
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the popover from opening/toggling
    setAppliedStartDate(undefined);
    setAppliedEndDate(undefined);
    setPendingStartDate(undefined);
    setPendingEndDate(undefined);
    setOpen(false); // Close the popover if open
  };

  // Format the selected range for display
  const formattedRange = React.useMemo(() => {
    if (!appliedStartDate) {
      return "所有日期"; // Default state: All dates
    } else {
      return "已选日期"; // State when any date(s) are selected
    }
  }, [appliedStartDate]); // Dependency is now only appliedStartDate

  // Handle opening the popover
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    // If opening and not loaded, set loading state
    if (newOpen && !calendarLoaded) {
      // Set a timeout to simulate loading
      setTimeout(() => {
        setCalendarLoaded(true);
      }, 100);
    }
  };

  // Re-add handleReset
  const handleReset = () => {
    setPendingStartDate(undefined);
    setPendingEndDate(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {/* Wrap PopoverTrigger in Select to provide context */}
      <Select>
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            {/* Use SelectTrigger */}
            <SelectTrigger className="relative" aria-label="选择日期范围">
              {/* Display formatted range */}
              {formattedRange}
              {/* Re-add Clear button - position adjusted */}
              {appliedStartDate && (
                <span
                  className="absolute right-8 top-1/2 -translate-y-1/2 hover:bg-muted p-1 rounded-full cursor-pointer"
                  onClick={handleClear}
                  aria-label="清除日期范围"
                  role="button"
                  tabIndex={0} // Make it focusable
                >
                  <X className="h-3 w-3" /> {/* Slightly smaller X */}
                </span>
              )}
            </SelectTrigger>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="end"
            side="bottom"
            sideOffset={5}
          >
            {!calendarLoaded ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Card className="border-0 shadow-none py-0 gap-0">
                <CardContent className="grid grid-cols-1 md:grid-cols-2 p-0 border-b border-border">
                  <div className="space-y-2 border-b md:border-b-0 md:border-r border-border md:pr-4">
                    <Calendar
                      id="start-date"
                      mode="single"
                      selected={pendingStartDate}
                      onSelect={handleStartDateSelect}
                      disabled={(date) =>
                        pendingEndDate ? isAfter(date, pendingEndDate) : false
                      }
                      month={startDateMonth}
                      onMonthChange={setStartDateMonth}
                      initialFocus
                      locale={zhCN}
                      captionLayout="dropdown-buttons"
                      fromYear={from}
                      toYear={to}
                      formatters={{
                        formatMonthCaption: (month: Date) =>
                          `${month.getMonth() + 1}月`,
                        formatYearCaption: (year: Date) =>
                          `${year.getFullYear()}年`,
                      }}
                      classNames={{
                        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-full",
                        day_selected:
                          "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 rounded-full",
                        day_range_start:
                          "day-range-start !bg-primary !text-primary-foreground rounded-full",
                        day_range_end:
                          "day-range-end !bg-primary !text-primary-foreground rounded-full",
                        day_range_middle:
                          "day-range-middle !rounded-none bg-primary/20 text-primary",
                        day_today:
                          "bg-accent text-accent-foreground rounded-full",
                      }}
                    />
                  </div>
                  <div className="space-y-2 md:pl-4">
                    <Calendar
                      id="end-date"
                      mode="single"
                      selected={pendingEndDate}
                      onSelect={handleEndDateSelect}
                      disabled={(date) =>
                        !pendingStartDate ||
                        isBefore(date, pendingStartDate) ||
                        isSameDay(date, pendingStartDate)
                      }
                      month={endDateMonth}
                      onMonthChange={setEndDateMonth}
                      initialFocus
                      locale={zhCN}
                      captionLayout="dropdown-buttons"
                      fromYear={from}
                      toYear={to}
                      formatters={{
                        formatMonthCaption: (month: Date) =>
                          `${month.getMonth() + 1}月`,
                        formatYearCaption: (year: Date) =>
                          `${year.getFullYear()}年`,
                      }}
                      classNames={{
                        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent rounded-full",
                        day_selected:
                          "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 rounded-full",
                        day_range_start:
                          "day-range-start !bg-primary !text-primary-foreground rounded-full",
                        day_range_end:
                          "day-range-end !bg-primary !text-primary-foreground rounded-full",
                        day_range_middle:
                          "day-range-middle !rounded-none bg-primary/20 text-primary",
                        day_today:
                          "bg-accent text-accent-foreground rounded-full",
                      }}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end px-4 py-3 gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    // Disable if no pending dates are set
                    disabled={!pendingStartDate && !pendingEndDate}
                  >
                    重置
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleApply}
                    disabled={!pendingStartDate}
                  >
                    应用
                  </Button>
                </CardFooter>
              </Card>
            )}
          </PopoverContent>
        </Popover>
      </Select>
    </div>
  );
}
