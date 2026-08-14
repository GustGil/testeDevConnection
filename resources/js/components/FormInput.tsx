
interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    placeholder?: string;
    error?: string;
}

export default function FormInput({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    error,
}: FormInputProps) {

    return (
        <div>

            <label className="
                mb-1.5
                block
                text-sm
                font-medium
                text-gray-700
            ">
                {label}
            </label>

            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className={`
                    w-full
                    rounded-lg
                    border
                    px-3
                    py-2.5
                    text-sm
                    text-gray-900
                    outline-none
                    transition
                    placeholder:text-gray-400

                    ${
                        error
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-300 focus:border-blue-500'
                    }

                    focus:ring-2
                    focus:ring-blue-100
                `}
            />

            {error && (
                <p className="
                    mt-1.5
                    text-sm
                    text-red-600
                ">
                    {error}
                </p>
            )}

        </div>
    );
}

