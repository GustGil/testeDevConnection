import { Head, Link, router } from '@inertiajs/react';

import DataTable from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    type: string;
}

interface Props {
    contacts: Contact[];
}

export default function Contacts({
    contacts,
}: Props) {

    function deleteContact(contact: Contact) {

        if (
            !confirm(
                `Deseja realmente excluir "${contact.name}"?`
            )
        ) {
            return;
        }

        router.delete(
            `/contacts/${contact.id}`
        );
    }


    const columns = [

        {
            key: 'name',
            label: 'Nome',

            render: (contact: Contact) => (
                <div>
                    <p className="
                        font-medium
                        text-gray-900
                    ">
                        {contact.name}
                    </p>

                    <p className="
                        text-xs
                        text-gray-500
                    ">
                        {contact.type === 'customer'
                            ? 'Cliente'
                            : 'Fornecedor'}
                    </p>
                </div>
            ),
        },

        {
            key: 'email',
            label: 'E-mail',

            render: (contact: Contact) => (
                <span>
                    {contact.email || '-'}
                </span>
            ),
        },

        {
            key: 'phone',
            label: 'Telefone',

            render: (contact: Contact) => (
                <span>
                    {contact.phone || '-'}
                </span>
            ),
        },

        {
            key: 'type',
            label: 'Tipo',

            render: (contact: Contact) => (
                <StatusBadge
                    status={contact.type}
                />
            ),
        },

    ];


    const actions = [

        {
            label: 'Editar',

            onClick: (contact: Contact) => {

                router.get(
                    `/contacts/${contact.id}/edit`
                );

            },
        },

        {
            label: 'Excluir',

            variant: 'danger' as const,

            onClick: (contact: Contact) => {

                deleteContact(contact);

            },
        },

    ];


    return (
        <>
            <Head title="Contatos" />

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
                            Contatos
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Gerencie seus clientes e fornecedores.
                        </p>

                    </div>


                    <Link
                        href="/contacts/create"
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
                        + Novo contato
                    </Link>

                </div>


                {/* TABELA */}

                <DataTable
                    data={contacts}
                    columns={columns}
                    actions={actions}
                    emptyMessage="Nenhum contato encontrado."
                />

            </div>
        </>
    );
}