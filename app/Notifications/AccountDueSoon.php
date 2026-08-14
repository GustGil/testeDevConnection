<?php

namespace App\Notifications;

use App\Models\Account;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountDueSoon extends Notification
{
    use Queueable;

    public function __construct(
        public Account $account
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Conta próxima do vencimento')
            ->greeting('Olá!')
            ->line(
                "A conta {$this->account->description} está próxima do vencimento."
            )
            ->line(
                "Valor: R$ {$this->account->amount}"
            )
            ->line(
                "Vencimento: {$this->account->due_date->format('d/m/Y')}"
            )
            ->line(
                'Essa conta vence em 5 dias.'
            )
            ->action(
                'Ver contas',
                url('/login')
            )
            ->line('Acesse o sistema para mais detalhes.');
    }
}