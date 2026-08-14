<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FinancialReport extends Notification
{
    use Queueable;

    public function __construct(
        public array $report,
        public $accounts,
        public string $pdf
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Seu relatório financeiro')

            ->greeting('Olá!')

            ->line(
                'Seu relatório financeiro foi gerado com sucesso.'
            )

            ->line(
                'Período: ' .
                \Carbon\Carbon::parse(
                    $this->report['start_date']
                )->format('d/m/Y')
                .
                ' até '
                .
                \Carbon\Carbon::parse(
                    $this->report['end_date']
                )->format('d/m/Y')
            )

            ->line(
                'O relatório completo está anexado neste e-mail.'
            )

            ->attachData(
                $this->pdf,
                'relatorio-financeiro.pdf',
                [
                    'mime' => 'application/pdf',
                ]
            );
    }
}

