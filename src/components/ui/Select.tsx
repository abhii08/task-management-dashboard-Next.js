"use client";

import React from "react";

interface SelectProps<T> {
    options: {
        key: T;
        value: string;
    }[];
    onSelect: (value: T) => void;
    required?: boolean;
}

export const Select = <T extends string>({
    options,
    onSelect,
    required = false
}: SelectProps<T>) => {
    return (
        <select
            onChange={(e) => onSelect(e.target.value as T)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required={required}
        >
            {options.map((option) => (
                <option key={option.key} value={option.key}>
                    {option.value}
                </option>
            ))}
        </select>
    );
};
