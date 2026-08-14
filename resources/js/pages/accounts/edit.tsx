import { useForm } from '@inertiajs/react';

type Contact = {
    id: number;
    name: string;
};

type Account = {
    id: number;
    contact_id: number;
    type: 'payable' | 'receivable';
    description: string;
    amount: string;
    due_date: string;
};

type Props = {
    account: Account;
    contacts: Contact[];
};

export default function Edit({ account, contacts }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        contact_id: account.contact_id,
        type: account.type,
        description: account.description,
        amount: account.amount,
        due_date: account.due_date,
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        put(`/accounts/${account.id}`);
    }

    return (
        <div>
            <h1>Editar conta</h1>

            <form onSubmit={submit}>

                {/* Contato */}
                <select
                    value={data.contact_id}
                    onChange={(e) =>
                        setData('contact_id', Number(e.target.value))
                    }
                >
                    <option value="">Selecione um contato</option>

                    {contacts.map((contact) => (
                        <option
                            key={contact.id}
                            value={contact.id}
                        >
                            {contact.name}
                        </option>
                    ))}
                </select>

                {errors.contact_id && (
                    <p>{errors.contact_id}</p>
                )}

                {/* Tipo */}
                <select
                    value={data.type}
                    onChange={(e) =>
                        setData(
                            'type',
                            e.target.value as 'payable' | 'receivable'
                        )
                    }
                >
                    <option value="payable">
                        A pagar
                    </option>

                    <option value="receivable">
                        A receber
                    </option>
                </select>

                {/* Descrição */}
                <input
                    type="text"
                    value={data.description}
                    onChange={(e) =>
                        setData('description', e.target.value)
                    }
                />

                {errors.description && (
                    <p>{errors.description}</p>
                )}

                {/* Valor */}
                <input
                    type="number"
                    step="0.01"
                    value={data.amount}
                    onChange={(e) =>
                        setData('amount', e.target.value)
                    }
                />

                {errors.amount && (
                    <p>{errors.amount}</p>
                )}

                {/* Vencimento */}
                <input
                    type="date"
                    value={data.due_date}
                    onChange={(e) =>
                        setData('due_date', e.target.value)
                    }
                />

                {errors.due_date && (
                    <p>{errors.due_date}</p>
                )}

                <button
                    type="submit"
                    disabled={processing}
                >
                    {processing ? 'Salvando...' : 'Salvar'}
                </button>

            </form>
        </div>
    );
}