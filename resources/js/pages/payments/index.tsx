import { Head, Link, router } from '@inertiajs/react';

import DataTable from '@/components/DataTable';

interface Account {
    id: number;
    description: string;
    amount: string;
    status: string;
}

interface Payment {
    id: number;
    amount: string;
    payment_date: string;
    method: string;
}

interface Props {
    account: Account;
    payments: Payment[];
}

export default function Payments({
    account,
    payments,
}: Props) {


    /*
    |--------------------------------------------------------------------------
    | Excluir pagamento
    |--------------------------------------------------------------------------
    */

    function deletePayment(payment: Payment) {

        if (
            !confirm(
                'Deseja realmente excluir este pagamento?'
            )
        ) {
            return;
        }

        router.delete(
            `/payments/${payment.id}`
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Colunas
    |--------------------------------------------------------------------------
    */

    const columns = [

        {
            key: 'payment_date',
            label: 'Data',

            render: (payment: Payment) => (
                <span className="text-gray-700">
                    {new Date(
                        payment.payment_date
                    ).toLocaleDateString('pt-BR')}
                </span>
            ),
        },


        {
            key: 'amount',
            label: 'Valor',

            render: (payment: Payment) => (
                <span className="
                    font-medium
                    text-gray-900
                ">
                    R$ {Number(payment.amount)
                        .toFixed(2)
                        .replace('.', ',')}
                </span>
            ),
        },


        {
            key: 'method',
            label: 'Método',

            render: (payment: Payment) => {

                const methods: Record<string, string> = {
                    cash: 'Dinheiro',
                    pix: 'PIX',
                    credit_card: 'Cartão de crédito',
                    debit_card: 'Cartão de débito',
                    bank_transfer: 'Transferência',
                    boleto: 'Boleto',
                };

                return (
                    <span className="text-gray-700">
                        {methods[payment.method] ??
                            payment.method}
                    </span>
                );
            },
        },

    ];


    /*
    |--------------------------------------------------------------------------
    | Ações
    |--------------------------------------------------------------------------
    */

    const actions = [

        {
            label: 'Editar',

            onClick: (payment: Payment) => {

                router.get(
                    `/payments/${payment.id}/edit`
                );

            },
        },

        {
            label: 'Excluir',

            variant: 'danger' as const,

            onClick: (payment: Payment) => {

                deletePayment(payment);

            },
        },

    ];


    return (
        <>

            <Head title="Pagamentos" />


            <div className="space-y-6 p-4">


                {/* CABEÇALHO */}

                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <h1 className="
                            text-2xl
                            font-bold
                            text-white
                        ">
                            Pagamentos
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Pagamentos referentes à conta:
                        </p>

                        <p className="
                            mt-1
                            text-base
                            font-semibold
                            text-white
                        ">
                            {account.description}
                        </p>

                    </div>

                        <Link
                            href="/accounts"
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
                            ← Voltar para contas
                        </Link>

                    {/* NOVO PAGAMENTO */}

                    {account.status !== 'paid' && (
                        <Link
                            href={`/accounts/${account.id}/payments/create`}
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
                            Adicionar pagamento
                        </Link>
                    )}

                </div>


                {/* RESUMO DA CONTA */}

                <div className="
                    grid
                    grid-cols-1
                    gap-4
                    md:grid-cols-3
                ">


                    {/* VALOR DA CONTA */}

                    <div className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    ">

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Valor da conta
                        </p>

                        <p className="
                            mt-1
                            text-xl
                            font-semibold
                            text-gray-900
                        ">
                            R$ {Number(account.amount)
                                .toFixed(2)
                                .replace('.', ',')}
                        </p>

                    </div>


                    {/* TOTAL PAGO */}

                    <div className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    ">

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Total pago
                        </p>

                        <p className="
                            mt-1
                            text-xl
                            font-semibold
                            text-green-600
                        ">
                            R$ {payments
                                .reduce(
                                    (total, payment) =>
                                        total +
                                        Number(payment.amount),
                                    0
                                )
                                .toFixed(2)
                                .replace('.', ',')}
                        </p>

                    </div>


                    {/* RESTANTE */}

                    <div className="
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        p-5
                        shadow-sm
                    ">

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Restante
                        </p>

                        <p className="
                            mt-1
                            text-xl
                            font-semibold
                            text-blue-600
                        ">
                            R$ {Math.max(
                                0,
                                Number(account.amount) -
                                payments.reduce(
                                    (total, payment) =>
                                        total +
                                        Number(payment.amount),
                                    0
                                )
                            )
                                .toFixed(2)
                                .replace('.', ',')}
                        </p>

                    </div>

                </div>


                {/* LISTA */}

                <DataTable
                    data={payments}
                    columns={columns}
                    actions={[
                        {
                            label: 'Editar',

                            onClick: (payment: Payment) => {
                                router.get(
                                    `/accounts/${account.id}/payments/${payment.id}/edit`
                                );
                            },
                        },

                        {
                            label: 'Excluir',

                            variant: 'danger' as const,

                            onClick: (payment: Payment) => {

                                if (
                                    !confirm(
                                        'Deseja realmente excluir este pagamento?'
                                    )
                                ) {
                                    return;
                                }

                                router.delete(
                                    `/accounts/${account.id}/payments/${payment.id}`
                                );
                            },
                        },
                    ]}
                    emptyMessage="
                        Nenhum pagamento foi registrado para esta conta.
                    "
                />


            </div>

        </>
    );
}


