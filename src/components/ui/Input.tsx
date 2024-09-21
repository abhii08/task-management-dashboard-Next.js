"use client"

export const Input = ({
    placeholder,
    onChange,
    type = "text",
    value,
    required = false,
    className =""
}: {
    placeholder: string;
    onChange: (value: string) => void;
    type?: string;
    value?: string;
    required?: boolean;
    className?: string;
}) => {
    return (
        <div className="pt-2">
            
            <input
                onChange={(e) => onChange(e.target.value)}
                type={type}
                value={value}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};
