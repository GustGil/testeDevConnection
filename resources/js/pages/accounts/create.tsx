
import { Head, Link, useForm } from '@inertiajs/react';

import FormCard from '@/components/FormCard';
import FormInput from '@/components/FormInput';

interface Contact {
    id: number;
    name: string;
}

interface Props {
    contacts: Contact[];
}

export default function CreateAccount({
    contacts,
}: Props) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        description: '',
        contact_id: '',
        type: 'payable',
        amount: '',
        due_date: '',
    });


    function submit(e: React.FormEvent) {

        e.preventDefault();

        post('/accounts');
    }


    return (
        <>

            <Head title="Nova conta" />

            <div className="space-y-6 p-4">


                {/* TÍTULO */}

                <div>

                    <h1 className="
                        text-2xl
                        font-bold
                        text-white
                    ">
                        Nova conta
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Cadastre uma nova conta no sistema.
                    </p>

                </div>


                {/* FORM */}

                <form onSubmit={submit}>

                    <FormCard
                        title="Informações da conta"
                        description="
                            Preencha os dados abaixo para cadastrar a conta.
                        "
                    >

                        <div className="space-y-5">


                            {/* DESCRIÇÃO */}

                            <FormInput
                                label="Descrição"
                                value={data.description}
                                onChange={(value) =>
                                    setData(
                                        'description',
                                        value
                                    )
                                }
                                placeholder="Ex: Conta de energia"
                                error={errors.description}
                            />


                            {/* CONTATO / TIPO */}

                            <div className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                            ">

                                {/* Seu Select de contato */}

                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    ">
                                        Contato
                                    </label>

                                    <select
                                        value={data.contact_id}
                                        onChange={(e) =>
                                            setData(
                                                'contact_id',
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-100
                                            text-gray-600
                                        "
                                    >

                                        <option value="">
                                            Selecione um contato
                                        </option>

                                        {contacts.map(
                                            (contact) => (
                                                <option
                                                    key={contact.id}
                                                    value={contact.id}
                                                >
                                                    {contact.name}
                                                </option>
                                            )
                                        )}

                                    </select>

                                    {errors.contact_id && (
                                        <p className="
                                            mt-1.5
                                            text-sm
                                            text-red-600
                                        ">
                                            {errors.contact_id}
                                        </p>
                                    )}

                                </div>


                                {/* TIPO */}

                                <div>

                                    <label className="
                                        mb-1.5
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    ">
                                        Tipo
                                    </label>

                                    <select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData(
                                                'type',
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray-300
                                            bg-white
                                            px-3
                                            py-2.5
                                            text-sm
                                            outline-none
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-100
                                            text-gray-600
                                        "
                                    >

                                        <option value="payable">
                                            A pagar
                                        </option>

                                        <option value="receivable">
                                            A receber
                                        </option>

                                    </select>

                                </div>

                            </div>


                            {/* VALOR / DATA */}

                            <div className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                            ">

                                <FormInput
                                    label="Valor"
                                    type="number"
                                    value={data.amount}
                                    onChange={(value) =>
                                        setData(
                                            'amount',
                                            value
                                        )
                                    }
                                    placeholder="0,00"
                                    error={errors.amount}
                                />

                                <FormInput
                                    label="Data de vencimento"
                                    type="date"
                                    value={data.due_date}
                                    onChange={(value) =>
                                        setData(
                                            'due_date',
                                            value
                                        )
                                    }
                                    error={errors.due_date}
                                />

                            </div>


                            {/* AÇÕES */}

                            <div className="
                                flex
                                justify-end
                                gap-3
                                border-t
                                border-gray-100
                                pt-5
                            ">

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
                                        hover:bg-blue-700
                                        disabled:opacity-50
                                    "
                                >
                                    {processing
                                        ? 'Cadastrando...'
                                        : 'Cadastrar conta'}
                                </button>

                            </div>

                        </div>

                    </FormCard>

                </form>

            </div>

        </>
    );
}

