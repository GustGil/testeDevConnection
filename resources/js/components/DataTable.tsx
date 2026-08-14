import React from 'react';

interface Column<T> {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
}

export interface Action<T> {
    label: string;
    onClick: (item: T) => void;
    variant?: 'default' | 'danger';
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];

    actions?: Action<T>[] | ((item: T) => Action<T>[]);

    emptyMessage?: string;
}

export default function DataTable<T>({
    data,
    columns,
    actions,
    emptyMessage = 'Nenhum registro encontrado.',
}: DataTableProps<T>) {

    return (
        <div className="
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-sm
        ">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-50">

                        <tr>

                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="
                                        px-5
                                        py-3
                                        text-left
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-gray-500
                                    "
                                >
                                    {column.label}
                                </th>
                            ))}

                            {actions && (
                                <th
                                    className="
                                        px-5
                                        py-3
                                        text-right
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wider
                                        text-gray-500
                                    "
                                >
                                    Ações
                                </th>
                            )}

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {data.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={
                                        columns.length +
                                        (actions ? 1 : 0)
                                    }
                                    className="
                                        px-5
                                        py-10
                                        text-center
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    {emptyMessage}
                                </td>

                            </tr>

                        ) : (

                            data.map((item, index) => {

                                const rowActions: Action<T>[] =
                                    typeof actions === 'function'
                                        ? actions(item)
                                        : (actions ?? []);

                                return (

                                    <tr
                                        key={index}
                                        className="
                                            transition
                                            hover:bg-gray-50
                                        "
                                    >

                                        {columns.map((column) => (

                                            <td
                                                key={column.key}
                                                className="
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    text-gray-700
                                                "
                                            >
                                                {column.render
                                                    ? column.render(item)
                                                    : String(
                                                        (item as any)[
                                                            column.key
                                                        ] ?? ''
                                                    )
                                                }
                                            </td>

                                        ))}

                                        {actions && (

                                            <td className="px-5 py-4">

                                                <div className="
                                                    flex
                                                    justify-end
                                                    gap-2
                                                ">

                                                    {rowActions.map(
                                                        (action) => (

                                                            <button
                                                                key={
                                                                    action.label
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    action.onClick(
                                                                        item
                                                                    )
                                                                }
                                                                className={`
                                                                    rounded-lg
                                                                    px-3
                                                                    py-2
                                                                    text-sm
                                                                    font-medium
                                                                    transition

                                                                    ${
                                                                        action.variant ===
                                                                        'danger'
                                                                            ? `
                                                                                bg-red-50
                                                                                text-red-600
                                                                                hover:bg-red-100
                                                                            `
                                                                            : `
                                                                                bg-gray-100
                                                                                text-gray-700
                                                                                hover:bg-gray-200
                                                                            `
                                                                    }
                                                                `}
                                                            >
                                                                {
                                                                    action.label
                                                                }
                                                            </button>

                                                        )
                                                    )}

                                                </div>

                                            </td>

                                        )}

                                    </tr>

                                );
                            })

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}