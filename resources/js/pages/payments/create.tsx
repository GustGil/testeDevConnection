import { Head, Link, useForm } from '@inertiajs/react';

import FormCard from '@/components/FormCard';
import FormInput from '@/components/FormInput';

interface Account {
    id: number;
    description: string;
    amount: string;
    status: string;
}

interface Props {
    account: Account;
}

export default function CreatePayment({ account }: Props) {
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        amount: '',
        paid_at: '',
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(`/accounts/${account.id}/payments`);
    }

    return (
        <>
            <Head title="Novo pagamento" />

            <div className="space-y-6 p-4">

                {/* TÍTULO */}

                <div>
                    <h1 className="
                        text-2xl
                        font-bold
                        text-white
                    ">
                        Novo pagamento
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Registre um pagamento referente a esta conta.
                    </p>
                </div>


                {/* CONTA */}

                <div className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-sm
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
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

                        <div className="text-right">

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
                        description="Informe os dados do pagamento realizado."
                    >

                        <div className="space-y-5">

                            <div className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                            ">

                                <FormInput
                                    label="Valor pago"
                                    type="number"
                                    value={data.amount}
                                    onChange={(value) =>
                                        setData('amount', value)
                                    }
                                    placeholder="0.00"
                                    error={errors.amount}
                                />

                                <FormInput
                                    label="Data do pagamento"
                                    type="date"
                                    value={data.paid_at}
                                    onChange={(value) =>
                                        setData('paid_at', value)
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
                                        ? 'Registrando...'
                                        : 'Registrar pagamento'}
                                </button>

                            </div>

                        </div>

                    </FormCard>

                </form>

            </div>
        </>
    );
}