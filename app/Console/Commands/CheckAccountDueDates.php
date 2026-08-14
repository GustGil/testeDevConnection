<?php

namespace App\Console\Commands;

use App\Models\Account;
use Carbon\Carbon;
use Illuminate\Console\Command;
use App\Notifications\AccountDueSoon;
use App\Notifications\AccountOverdue;

class CheckAccountDueDates extends Command
{
    protected $signature = 'app:check-account-due-dates';

    protected $description = 'Verifica contas próximas do vencimento e vencidas';

    public function handle()
    {
        $accounts = Account::with('user')
            ->whereIn('status', ['open', 'partial', "overdue"])
            ->get();

        $this->info(
            "Contas encontradas: " . $accounts->count()
        );

        foreach ($accounts as $account) {

            $dueDate = Carbon::parse($account->due_date);
            $today = Carbon::today();

            $daysUntilDue = $today->diffInDays(
                $dueDate,
                false
            );

            $this->info("Conta: {$account->id}");
            $this->info("Vencimento: {$account->due_date}");
            $this->info("Hoje: {$today}");
            $this->info("Dias até vencimento: {$daysUntilDue}");

            /*
            |--------------------------------------------------------------------------
            | 5 DIAS ANTES DO VENCIMENTO
            |--------------------------------------------------------------------------
            */

            if (
                $daysUntilDue == 5 &&
                is_null($account->due_soon_notified_at)
            ) {

                $this->info(
                    "⚠️ Conta {$account->id} vence em 5 dias!"
                );

                // Envia o e-mail
                $account->user->notify(
                    new AccountDueSoon($account)
                );

                // Só marca como notificado depois do envio
                $account->update([
                    'due_soon_notified_at' => now(),
                ]);

                $this->info(
                    "📧 Notificação de 5 dias enviada!"
                );
            }


            /*
            |--------------------------------------------------------------------------
            | CONTA VENCIDA
            |--------------------------------------------------------------------------
            */

            if (
                $daysUntilDue < 0 &&
                is_null($account->overdue_notified_at)
            ) {

                $this->info(
                    "🚨 Conta {$account->id} está vencida!"
                );

                // Envia o e-mail
                $account->user->notify(
                    new AccountOverdue($account)
                );

                // Marca como notificado
                $account->update([
                    'overdue_notified_at' => now(),
                ]);

                $this->info(
                    "📧 Notificação de vencimento enviada!"
                );
            }
        }

        return Command::SUCCESS;
    }
}