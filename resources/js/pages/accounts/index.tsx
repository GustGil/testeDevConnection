import { Head, Link, router } from '@inertiajs/react';
import DataTable, { Action } from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import { useState } from 'react';

interface Contact {
    id: number;
    name: string;
}

interface Account {
    id: number;
    description: string;
    amount: string;
    due_date: string;
    status: string;
    type: string;
    remaining: number;
    contact?: Contact;

}

interface Props {
    accounts: Account[];

    filters?: {
        start_date?: string;
        end_date?: string;
    };
}

export default function Accounts({
    accounts,
    filters,
}: Props) {

    /*
    |--------------------------------------------------------------------------
    | Filtros
    |--------------------------------------------------------------------------
    */

    const [startDate, setStartDate] = useState(
        filters?.start_date ?? ''
    );

    const [endDate, setEndDate] = useState(
        filters?.end_date ?? ''
    );


    /*
    |--------------------------------------------------------------------------
    | Filtrar
    |--------------------------------------------------------------------------
    */

    function handleFilter() {

        router.get(
            '/accounts',
            {
                start_date: startDate || undefined,
                end_date: endDate || undefined,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Limpar filtros
    |--------------------------------------------------------------------------
    */

    function clearFilters() {

        setStartDate('');
        setEndDate('');

        router.get(
            '/accounts',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Excluir conta
    |--------------------------------------------------------------------------
    */

    function deleteAccount(account: Account) {

        if (
            !confirm(
                `Deseja realmente excluir "${account.description}"?`
            )
        ) {
            return;
        }

        router.delete(
            `/accounts/${account.id}`
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Colunas
    |--------------------------------------------------------------------------
    */

    const columns = [

        {
            key: 'description',
            label: 'Descrição',

            render: (account: Account) => (
                <div>
                    <p className="font-medium text-gray-900">
                        {account.description}
                    </p>

                    <p className="text-xs text-gray-500">
                        {account.type === 'payable'
                            ? 'A pagar'
                            : 'A receber'}
                    </p>
                </div>
            ),
        },

        {
            key: 'contact',
            label: 'Contato',

            render: (account: Account) => (
                <span>
                    {account.contact?.name ?? '-'}
                </span>
            ),
        },

        {
            key: 'amount',
            label: 'Valor',

            render: (account: Account) => (
                <span className="font-medium text-gray-900">
                    R$ {account.amount}
                </span>
            ),
        },

        {
            key: 'due_date',
            label: 'Vencimento',

            render: (account: Account) => (
                <span>
                    {new Date(
                        account.due_date
                    ).toLocaleDateString('pt-BR')}
                </span>
            ),
        },

        {
            key: 'status',
            label: 'Status',

            render: (account: Account) => (
                <StatusBadge
                    status={account.status}
                />
            ),
        },
    ];


    /*
    |--------------------------------------------------------------------------
    | Ações
    |--------------------------------------------------------------------------
    */

    const actions = (account: Account): Action<Account>[] => {

    const result: Action<Account>[] = [

            {
                label: 'Editar',

                onClick: (account) => {
                    router.get(
                        `/accounts/${account.id}/edit`
                    );
                },
            },

            {
                label: 'Pagamentos',

                onClick: (account) => {
                    router.get(
                        `/accounts/${account.id}/payments`
                    );
                },
            },

            {
                label: 'Excluir',

                variant: 'danger',

                onClick: (account) => {
                    deleteAccount(account);
                },
            },

        ];

        if (Number(account.remaining) > 0) {

            result.splice(1, 0, {

                label: 'Pagamento',

                onClick: (account) => {
                    router.get(
                        `/accounts/${account.id}/payments/create`
                    );
                },

            });

        }

        return result;
    };
    
    console.log('ACCOUNTS:', accounts);

    /*
    |--------------------------------------------------------------------------
    | Página
    |--------------------------------------------------------------------------
    */

    return (

        <>

            <Head title="Contas" />

            <div className="space-y-6 p-4">


                {/* TÍTULO */}

                <div className="w-full flex-column flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-white">
                            Contas
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Gerencie suas contas e pagamentos.
                        </p>

                    </div>


                    <Link
                        href="/accounts/create"
                        className="
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            shadow-sm
                            transition
                            hover:bg-blue-700
                        "
                    >
                        + Nova conta
                    </Link>

                </div>


                {/* FILTROS */}

                <div
                    className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    "
                >

                    <div className="mb-4">

                        <h2 className="font-semibold text-gray-900">
                            Filtros
                        </h2>

                        <p className="text-sm text-gray-500">
                            Filtre as contas pelo período de vencimento.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


                        {/* DATA INICIAL */}

                        <div>

                            <label
                                className="
                                    mb-1.5
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Data inicial
                            </label>

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-300
                                    px-3
                                    py-2.5
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-100
                                    text-gray-700
                                "
                            />

                        </div>


                        {/* DATA FINAL */}

                        <div>

                            <label
                                className="
                                    mb-1.5
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                "
                            >
                                Data final
                            </label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    setEndDate(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-gray-300
                                    px-3
                                    py-2.5
                                    text-sm
                                    outline-none
                                    transition
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-100
                                    text-gray-700
                                "
                            />

                        </div>


                        {/* BOTÕES */}

                        <div className="flex items-end gap-2">

                            <button
                                type="button"
                                onClick={handleFilter}
                                className="
                                    rounded-lg
                                    bg-blue-600
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-white
                                    transition
                                    hover:bg-blue-700
                                "
                            >
                                Filtrar
                            </button>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="
                                    rounded-lg
                                    bg-gray-100
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    transition
                                    hover:bg-gray-200
                                "
                            >
                                Limpar
                            </button>

                        </div>

                    </div>

                </div>


                {/* TABELA */}

                <DataTable
                    data={accounts}
                    columns={columns}
                    actions={actions}
                    emptyMessage="Nenhuma conta encontrada."
                />

            </div>

        </>

    );
}
