"use client";

import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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

interface DatePickerWithPresetsProps {
  dateInString?: string;
  onReviewDateChange: (value: string) => void;
}

const DatePickerWithPresets: React.FC<DatePickerWithPresetsProps> = ({
  dateInString = "",
  onReviewDateChange,
}) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (dateInString) {
      setDate(new Date(dateInString));
    }
  }, [dateInString]);

  const handleReviewDateChange = (value: string) => {
    const newDate = addDays(new Date(), parseInt(value));
    setDate(newDate);

    const newDateString = newDate.toISOString();
    console.log("New Date String to Parent:", newDateString);
    if (onReviewDateChange) {
      onReviewDateChange(newDateString);
    }
  };

  const handleCalendarChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const newDateString = selectedDate.toISOString();
      console.log("Selected Date String to Parent:", newDateString);
      {
        if (onReviewDateChange) {
          onReviewDateChange(newDateString);
        }
      }
    }
  };
  //console.log("date up", date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select onValueChange={handleReviewDateChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
            <SelectItem value="30">In a month</SelectItem>
            <SelectItem value="60">In two months</SelectItem>
            <SelectItem value="180">In six months</SelectItem>
            <SelectItem value="365">In a year</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleCalendarChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerWithPresets;
