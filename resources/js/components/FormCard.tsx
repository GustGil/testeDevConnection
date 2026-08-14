import { ReactNode } from 'react';

interface FormCardProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export default function FormCard({
    title,
    description,
    children,
}: FormCardProps) {

    return (
        <div className="
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-sm
        ">

            {/* Cabeçalho */}

            <div className="
                border-b
                border-gray-100
                px-6
                py-5
            ">

                <h2 className="
                    text-lg
                    font-semibold
                    text-gray-900
                ">
                    {title}
                </h2>

                {description && (
                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        {description}
                    </p>
                )}

            </div>


            {/* Conteúdo */}

            <div className="p-6">

                {children}

            </div>

        </div>
    );
}

