import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
interface PageProps {
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function Reports() {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!startDate || !endDate) {
            alert('Selecione a data inicial e a data final.');
            return;
        }

        if (startDate > endDate) {
            alert('A data inicial não pode ser maior que a data final.');
            return;
        }

        setLoading(true);

        router.post(
            '/reports/send',
            {
                start_date: startDate,
                end_date: endDate,
            },
            {
                preserveScroll: true,

                onFinish: () => {
                    setLoading(false);
                },
            }
        );
    }

    return (
        <>
            <Head title="Relatórios" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-3xl">

                    {/* Título */}

                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Relatórios
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Selecione o período para receber o relatório
                            financeiro por e-mail.
                        </p>
                    </div>

                    {/* Mensagem de sucesso */}

                    {flash?.success && (
                        <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-800">
                            {flash.success}
                        </div>
                    )}

                    {/* Mensagem de erro */}

                    {flash?.error && (
                        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-800">
                            {flash.error}
                        </div>
                    )}

                    {/* Card */}

                    <div className="rounded-xl bg-white p-6 shadow">

                        <h2 className="mb-6 text-lg font-semibold text-gray-800">
                            Solicitar relatório
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {/* Data inicial */}

                                <div>
                                    <label
                                        htmlFor="start_date"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Data inicial
                                    </label>

                                    <input
                                        id="start_date"
                                        type="date"
                                        value={startDate}
                                        onChange={(event) =>
                                            setStartDate(event.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
                                    />
                                </div>

                                {/* Data final */}

                                <div>
                                    <label
                                        htmlFor="end_date"
                                        className="mb-2 block text-sm font-medium text-gray-700"
                                    >
                                        Data final
                                    </label>

                                    <input
                                        id="end_date"
                                        type="date"
                                        value={endDate}
                                        onChange={(event) =>
                                            setEndDate(event.target.value)
                                        }
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 text-gray-700"
                                    />
                                </div>

                            </div>

                            {/* Informações */}

                            <div className="mt-6 rounded-lg bg-gray-50 p-4">

                                <p className="text-sm text-gray-600">
                                    O relatório será enviado para o e-mail
                                    cadastrado na sua conta.
                                </p>

                                <p className="mt-1 text-sm text-gray-600">
                                    O período selecionado será utilizado
                                    para calcular as contas e pagamentos.
                                </p>

                            </div>

                            {/* Botão */}

                            <div className="mt-6 flex justify-end">

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading
                                        ? 'Enviando...'
                                        : 'Solicitar relatório'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </>
    );
}

