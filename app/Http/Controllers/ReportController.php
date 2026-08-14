<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Account;
use App\Notifications\FinancialReport;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ReportController extends Controller
{

    public function index()
    {
        return Inertia::render('reports/index');
    }
   
    public function send(Request $request)
        {
            $validated = $request->validate([
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
            ]);

            $accounts = Account::where('user_id', auth()->id())
                ->whereDate('due_date', '>=', $validated['start_date'])
                ->whereDate('due_date', '<=', $validated['end_date'])
                ->with('payments')
                ->orderBy('due_date')
                ->get();

            /*
            |--------------------------------------------------------------------------
            | Cálculos
            |--------------------------------------------------------------------------
            */

            $totalAccounts = $accounts->sum(
                fn ($account) => (float) $account->amount
            );

            $totalPaid = $accounts->sum(
                fn ($account) => $account->payments->sum(
                    fn ($payment) => (float) $payment->amount
                )
            );

            $totalPending = $totalAccounts - $totalPaid;

            $totalPayable = $accounts
                ->where('type', 'payable')
                ->sum(
                    fn ($account) => (float) $account->amount
                );

            $totalReceivable = $accounts
                ->where('type', 'receivable')
                ->sum(
                    fn ($account) => (float) $account->amount
                );

            $totalOverdue = $accounts
                ->where('status', 'overdue')
                ->sum(
                    fn ($account) => (float) $account->amount
                );

            /*
            |--------------------------------------------------------------------------
            | Dados do relatório
            |--------------------------------------------------------------------------
            */

            $report = [
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],

                'total_accounts' => $totalAccounts,
                'total_paid' => $totalPaid,
                'total_pending' => $totalPending,
                'total_payable' => $totalPayable,
                'total_receivable' => $totalReceivable,
                'total_overdue' => $totalOverdue,
            ];

            /*
            |--------------------------------------------------------------------------
            | Gera o PDF
            |--------------------------------------------------------------------------
            */

            $pdf = Pdf::loadView(
                'reports.financial',
                [
                    'report' => $report,
                    'accounts' => $accounts,
                ]
            );

            /*
            |--------------------------------------------------------------------------
            | Envia o e-mail
            |--------------------------------------------------------------------------
            */

            auth()->user()->notify(
                new FinancialReport(
                    $report,
                    $accounts,
                    $pdf->output()
                )
            );

            return back()->with(
                'success',
                'Relatório gerado e enviado para seu e-mail.'
            );
        }


}