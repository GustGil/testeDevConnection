import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';

import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';




export function AppSidebar() {

    return (
        <Sidebar collapsible="icon" variant="inset">

            {/* HEADER */}

            <SidebarHeader>

                <SidebarMenu>

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            size="lg"
                            asChild
                        >

                            <Link
                                href='/'
                                prefetch
                            >
                                <AppLogo />
                            </Link>

                        </SidebarMenuButton>

                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarHeader>


            {/* MENU */}

            <SidebarContent>

                <SidebarMenu>

                    {/* CONTATOS */}

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            asChild
                            tooltip="Contatos"
                        >

                            <Link href="/contacts">

                                <span>
                                    👤
                                </span>

                                <span>
                                    Contatos
                                </span>

                            </Link>

                        </SidebarMenuButton>

                    </SidebarMenuItem>


                    {/* CONTAS */}

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            asChild
                            tooltip="Contas"
                        >

                            <Link href="/accounts">

                                <span>
                                    💰
                                </span>

                                <span>
                                    Contas
                                </span>

                            </Link>

                        </SidebarMenuButton>

                    </SidebarMenuItem>


                    {/* RELATÓRIOS */}

                    <SidebarMenuItem>

                        <SidebarMenuButton
                            asChild
                            tooltip="Relatórios"
                        >

                            <Link href="/reports">

                                <span>
                                    📊
                                </span>

                                <span>
                                    Relatórios
                                </span>

                            </Link>

                        </SidebarMenuButton>

                    </SidebarMenuItem>

                </SidebarMenu>

            </SidebarContent>


            {/* FOOTER */}

            <SidebarFooter>

                <NavUser />

            </SidebarFooter>

        </Sidebar>
    );
}