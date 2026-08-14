import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Welcome() {
    return (
        <AppLayout>
            <Head title="Início" />

            <div className="
                flex
                min-h-[calc(100vh-2rem)]
                items-center
                justify-center
            ">
                <div className="text-center">

                    <h1 className="
                        text-4xl
                        font-bold
                        tracking-tight
                        text-white
                    ">
                        Bem-vindo!
                    </h1>

                    <p className="
                        mt-3
                        text-gray-400
                    ">
                        Tenha uma ótima gestão financeira.
                    </p>

                </div>
            </div>
        </AppLayout>
    );
}