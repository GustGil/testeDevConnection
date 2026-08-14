interface Props {
    status: string;
}

export default function StatusBadge({ status }: Props) {

    const styles: Record<string, string> = {
        open: 'bg-blue-50 text-blue-700 ring-blue-600/20',
        partial: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
        paid: 'bg-green-50 text-green-700 ring-green-600/20',
        overdue: 'bg-red-50 text-red-700 ring-red-600/20',
    };

    const labels: Record<string, string> = {
        open: 'Aberta',
        partial: 'Parcial',
        paid: 'Paga',
        overdue: 'Vencida',
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-2.5
                py-1
                text-xs
                font-medium
                ring-1
                ring-inset
                ${styles[status] ?? 'bg-gray-50 text-gray-700 ring-gray-600/20'}
            `}
        >
            {labels[status] ?? status}
        </span>
    );
}
