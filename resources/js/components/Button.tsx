interface ButtonProps {
    children: React.ReactNode;
    type?: 'button' | 'submit';
    variant?: 'primary' | 'secondary' | 'danger';
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({
    children,
    type = 'button',
    variant = 'primary',
    onClick,
    disabled = false,
}: ButtonProps) {

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                rounded-lg px-4 py-2
                text-sm font-medium
                transition
                disabled:opacity-50
                ${variants[variant]}
            `}
        >
            {children}
        </button>
    );
}