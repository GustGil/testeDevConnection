<?php

namespace App\Notifications;

use App\Models\Account;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AccountOverdue extends Notification
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
            ->subject('Conta vencida')
            ->greeting('Atenção!')
            ->line(
                "A conta {$this->account->description} está vencida."
            )
            ->line(
                "Valor: R$ {$this->account->amount}"
            )
            ->line(
                "Vencimento: {$this->account->due_date->format('d/m/Y')}"
            )
            ->action(
                'Ver contas',
                url('/login')
            )
            ->line(
                'Acesse o sistema para verificar os detalhes.'
            );
    }
}