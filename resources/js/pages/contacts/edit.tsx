import { Head, Link, useForm } from '@inertiajs/react';

import FormCard from '@/components/FormCard';
import FormInput from '@/components/FormInput';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
}

interface Props {
    contact: Contact;
}

export default function EditContact({
    contact,
}: Props) {

    const {
        data,
        setData,
        put,
        processing,
        errors,
    } = useForm({
        name: contact.name ?? '',
        email: contact.email ?? '',
        phone: contact.phone ?? '',
        type: contact.type ?? 'customer',
    });


    function submit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        put(
            `/contacts/${contact.id}`
        );

    }


    return (
        <>
            <Head title="Editar contato" />

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
                            Editar contato
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Atualize as informações do contato.
                        </p>

                    </div>


                    <Link
                        href="/contacts"
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


                {/* FORMULÁRIO */}

                <form onSubmit={submit}>

                    <FormCard
                        title="Informações do contato"
                        description="Atualize os dados do cliente ou fornecedor."
                    >

                        <div className="space-y-5">

                            <FormInput
                                label="Nome"
                                value={data.name}
                                onChange={(value) =>
                                    setData(
                                        'name',
                                        value
                                    )
                                }
                                error={errors.name}
                            />


                            <div className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                            ">

                                <FormInput
                                    label="E-mail"
                                    type="email"
                                    value={data.email}
                                    onChange={(value) =>
                                        setData(
                                            'email',
                                            value
                                        )
                                    }
                                    error={errors.email}
                                />


                                <FormInput
                                    label="Telefone"
                                    value={data.phone}
                                    onChange={(value) =>
                                        setData(
                                            'phone',
                                            value
                                        )
                                    }
                                    error={errors.phone}
                                />

                            </div>


                            <div>

                                <label
                                    htmlFor="type"
                                    className="
                                        mb-1.5
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                    "
                                >
                                    Tipo
                                </label>

                                <select
                                    id="type"
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
                                        text-gray-900
                                        outline-none
                                        transition
                                        focus:border-blue-500
                                        focus:ring-2
                                        focus:ring-blue-100
                                    "
                                >

                                    <option value="customer">
                                        Cliente
                                    </option>

                                    <option value="supplier">
                                        Fornecedor
                                    </option>

                                </select>

                                {errors.type && (
                                    <p className="
                                        mt-1.5
                                        text-sm
                                        text-red-600
                                    ">
                                        {errors.type}
                                    </p>
                                )}

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
                                    href="/contacts"
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