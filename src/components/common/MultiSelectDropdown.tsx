import React, { useState } from "react";// shadcn Popover components
import { Button } from "@/components/ui/button"; // shadcn Button
import { ChevronDown } from "lucide-react"; // Icon for the dropdown arrow
import { cn } from "@/lib/utils"; // Utility function for conditional class names
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Checkbox } from "@radix-ui/react-checkbox";

type Option = {
  id: number | string; // Option ID (number or string for flexibility)
  label: string; // Label to display
};

type MultiSelectDropdownProps = {
  options: Option[]; // List of dropdown options
  selected: (ids: (number | string)[]) => void; // Callback to send selected IDs to parent
  placeholder?: string; // Placeholder text when no options are selected
  width?: string; // Optional width (e.g., "w-[300px]")
  variant?:string;
};

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selected,
  placeholder = "Select options", // Default placeholder
  width = "w-[200px]",
  variant
}) => {
  const [selectedOptions, setSelectedOptions] = useState<(number | string)[]>([]); // State for selected option IDs

  // Toggle selection
  const toggleSelection = (id: number | string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((optionId) => optionId !== id) : [...prev, id]
    );
  };

  // Update parent when selection changes
  const handleSelectionChange = () => {
    selected(selectedOptions);
  };

  // Effect to propagate the selected options to the parent component
  React.useEffect(() => {
    handleSelectionChange();
  }, [selectedOptions]);

  // Get labels for selected options
  const selectedLabels = options
    .filter((option) => selectedOptions.includes(option.id))
    .map((option) => option.label)
    .join(", ");

  return (
    <Popover>
      <PopoverTrigger className="flex items-center justify-between w-full p-2 border rounded-md bg-white">
        <span>{selectedOptions.length > 0 ? selectedLabels : placeholder}</span>
        <ChevronDown
          className={"h-4 w-4 opacity-50"}
        />
      </PopoverTrigger>
      <PopoverContent className="w-full p-2 bg-white border border-gray-300 rounded-md z-40">
        <div className="flex flex-col gap-2">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <Checkbox
                id={`checkbox-${option.id}`}
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={() => toggleSelection(option.id)}
              />
              <label
                htmlFor={`checkbox-${option.id}`}
                className="text-sm font-medium leading-none w-full ml-2"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
