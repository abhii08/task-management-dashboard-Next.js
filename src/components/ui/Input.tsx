"use client"

export const Input = ({
    placeholder,
    onChange,
    label,
    type = "text", // Default type is "text"
    value,
    required = false,
    className =""
}: {
    placeholder: string;
    onChange: (value: string) => void;
    label: string;
    type?: string; // Make type optional with a default value
    value?: string; // Make value optional
    required?: boolean;
    className?: string; // Make required optional
}) => {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                onChange={(e) => onChange(e.target.value)}
                type={type} // Use the type prop
                value={value} // Bind the value prop
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
                placeholder={placeholder}
                required={required} // Bind the required prop
            />
        </div>
    );
};
