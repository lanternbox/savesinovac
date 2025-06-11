import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cx } from "@/devlink/utils";

const CategorySelector = ({
  categories,
  selectedCategory,
  onChange,
  className,
}) => {
  const handleChange = (value) => {
    onChange(value === "all" ? null : value);
  };

  return (
    <Select
      onValueChange={handleChange}
      value={selectedCategory ?? "all"}
      className={className}
    >
      <SelectTrigger className={cx("w-full")}>
        <SelectValue placeholder="类别" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">查看全部</SelectItem>
        {categories.docs.map((category) => (
          <SelectItem key={category.id} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
