import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function AppLayout({ children }: Props) {
    const { url } = usePage();

    const menu = [
        {
            name: 'Contas',
            href: '/accounts',
            icon: '💰',
        },
        {
            name: 'Contatos',
            href: '/contacts',
            icon: '👥',
        },
        {
            name: 'Relatórios',
            href: '/reports',
            icon: '📊',
        },
    ];

    function isActive(href: string) {
        return url.startsWith(href);
    }

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}

            <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r">

                <div className="flex h-16 items-center border-b px-6">

                    <h1 className="text-xl font-bold text-gray-800">
                        Financeiro
                    </h1>

                </div>

                <nav className="p-4">

                    {menu.map((item) => (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                mb-1 flex items-center gap-3
                                rounded-lg px-4 py-3
                                transition
                                ${
                                    isActive(item.href)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }
                            `}
                        >

                            <span>
                                {item.icon}
                            </span>

                            <span>
                                {item.name}
                            </span>

                        </Link>

                    ))}

                </nav>

                <div className="absolute bottom-0 w-full border-t p-4">

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100"
                    >
                        🚪
                        Sair
                    </Link>

                </div>

            </aside>

            {/* CONTEÚDO */}

            <main className="ml-64 min-h-screen flex-1">

                <header className="h-16 border-b bg-white px-8 flex items-center justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Sistema Financeiro
                        </h2>
                    </div>

                    <div className="text-sm text-gray-600">
                        Usuário
                    </div>

                </header>

                <section className="p-8">

                    {children}

                </section>

            </main>

        </div>
    );
}

