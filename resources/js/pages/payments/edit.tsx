import { Head, Link, useForm } from '@inertiajs/react';

import FormCard from '@/components/FormCard';
import FormInput from '@/components/FormInput';

interface Payment {
    id: number;
    amount: string;
    paid_at: string;
}

interface Account {
    id: number;
    description: string;
    amount: string;
    status: string;
}

interface Props {
    account: Account;
    payment: Payment;
}

export default function EditPayment({
    account,
    payment,
}: Props) {

    /*
    |--------------------------------------------------------------------------
    | Formulário
    |--------------------------------------------------------------------------
    */

    const { data, setData, put, processing, errors } = useForm({
        amount: payment.amount,
        paid_at: payment.paid_at
            ? payment.paid_at.substring(0, 10)
            : '',
    });


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    function submit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        put(
            `/accounts/${account.id}/payments/${payment.id}`
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Página
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Head title="Editar pagamento" />

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
                            Editar pagamento
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Altere os dados do pagamento.
                        </p>

                    </div>

                    <Link
                        href={`/accounts/${account.id}/payments`}
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
                        ← Voltar
                    </Link>

                </div>


                {/* INFORMAÇÕES DA CONTA */}

                <div className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                ">

                    <div className="
                        grid
                        grid-cols-1
                        gap-5
                        md:grid-cols-2
                    ">

                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Conta
                            </p>

                            <p className="
                                mt-1
                                font-semibold
                                text-gray-900
                            ">
                                {account.description}
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Valor da conta
                            </p>

                            <p className="
                                mt-1
                                font-semibold
                                text-gray-900
                            ">
                                R$ {Number(account.amount)
                                    .toFixed(2)
                                    .replace('.', ',')}
                            </p>

                        </div>

                    </div>

                </div>


                {/* FORMULÁRIO */}

                <form onSubmit={submit}>

                    <FormCard
                        title="Informações do pagamento"
                        description="Atualize os dados do pagamento realizado."
                    >

                        <div className="space-y-5">

                            <div className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                            ">

                                {/* VALOR */}

                                <FormInput
                                    label="Valor pago"
                                    type="number"
                                    value={data.amount}
                                    onChange={(value) =>
                                        setData(
                                            'amount',
                                            value
                                        )
                                    }
                                    placeholder="0.00"
                                    error={errors.amount}
                                />


                                {/* DATA */}

                                <FormInput
                                    label="Data do pagamento"
                                    type="date"
                                    value={data.paid_at}
                                    onChange={(value) =>
                                        setData(
                                            'paid_at',
                                            value
                                        )
                                    }
                                    error={errors.paid_at}
                                />

                            </div>


                            {/* BOTÕES */}

                            <div className="
                                flex
                                justify-end
                                gap-3
                                border-t
                                border-gray-100
                                pt-5
                            ">

                                <Link
                                    href={`/accounts/${account.id}/payments`}
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
                                    Cancelar
                                </Link>


                                <button
                                    type="submit"
                                    disabled={processing}
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
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    {processing
                                        ? 'Salvando...'
                                        : 'Salvar alterações'}
                                </button>

                            </div>

                        </div>

                    </FormCard>

                </form>

            </div>
        </>
    );
}