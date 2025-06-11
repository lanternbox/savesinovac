"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SortSelector({
  onChange,
}: {
  onChange?: (value: string) => void;
}) {
  const [sortValue, setSortValue] = useState("date");

  const handleValueChange = (value: string) => {
    setSortValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Select value={sortValue} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="排序方式">
          {sortValue === "date" ? "按日期排序" : "按标题排序"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="date">按日期排序</SelectItem>
        <SelectItem value="title">按标题排序</SelectItem>
      </SelectContent>
    </Select>
  );
}
