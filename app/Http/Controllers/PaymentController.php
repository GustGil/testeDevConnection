<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;
use App\Models\Account;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Account $account)
    {
        abort_if($account->user_id !== auth()->id(), 403);

        $payments = $account->payments()
            ->latest('paid_at')
            ->get();

        return Inertia::render('payments/index', [
            'account' => $account,
            'payments' => $payments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Account $account)
    {
        abort_if(
            $account->user_id !== auth()->id(),
            403
        );

        $totalPaid = $account->payments()->sum('amount');

        if ($totalPaid >= $account->amount) {
            return redirect()
                ->route('payments.index', $account)
                ->with('error', 'Esta conta já está completamente quitada.');
        }

        return Inertia::render('payments/create', [
            'account' => $account,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    
     public function store(Request $request, Account $account)
        {
            abort_if(
            $account->user_id !== auth()->id(),
            403
        );

        // Soma tudo que já foi pago
        $totalPaid = $account->payments()->sum('amount');

        // Verifica se a conta já está completamente quitada
        if ($totalPaid >= $account->amount) {
            return back()->withErrors([
                'amount' => 'Esta conta já está completamente quitada.',
            ]);
        }

        $validated = $request->validate([
            'amount' => [
                'required',
                'numeric',
                'min:0.01',
            ],
            'paid_at' => [
                'required',
                'date',
            ],
        ]);

        // Quanto ainda falta pagar
        $remaining = $account->amount - $totalPaid;

        // Não permite pagar mais que o restante
        if ($validated['amount'] > $remaining) {
            return back()->withErrors([
                'amount' => 'O valor do pagamento não pode ser maior que o valor restante da conta.',
            ]);
        }

        $account->payments()->create([
            'amount' => $validated['amount'],
            'paid_at' => $validated['paid_at'],
        ]);

        return redirect()
            ->route('payments.index', $account)
            ->with('success', 'Pagamento registrado com sucesso.');
        }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account, Payment $payment)
    {
        abort_if($account->user_id !== auth()->id(), 403);
        abort_if($payment->account_id !== $account->id, 404);

        return Inertia::render('payments/edit', [
            'account' => $account,
            'payment' => $payment,
        ]);
    }

    public function update(
        Request $request,
        Account $account,
        Payment $payment
    ) {
        abort_unless(
            $account->user_id === auth()->id(),
            403
        );

        abort_unless(
            $payment->account_id === $account->id,
            404
        );

        $validated = $request->validate([
            'amount' => [
                'required',
                'numeric',
                'min:0.01',
            ],

            'paid_at' => [
                'required',
                'date',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Valor já pago pelos OUTROS pagamentos
        |--------------------------------------------------------------------------
        */

        $otherPayments = $account->payments()
            ->where('id', '!=', $payment->id)
            ->sum('amount');


        /*
        |--------------------------------------------------------------------------
        | Verifica se o novo valor ultrapassa o valor da conta
        |--------------------------------------------------------------------------
        */

        $newTotal = $otherPayments + $validated['amount'];

        if ($newTotal > $account->amount) {

            return back()
                ->withErrors([
                    'amount' => sprintf(
                        'O valor máximo permitido para este pagamento é R$ %.2f.',
                        max(
                            0,
                            $account->amount - $otherPayments
                        )
                    ),
                ])
                ->withInput();
        }


        /*
        |--------------------------------------------------------------------------
        | Atualiza
        |--------------------------------------------------------------------------
        */

        $payment->update([
            'amount' => $validated['amount'],
            'paid_at' => $validated['paid_at'],
        ]);


        /*
        |--------------------------------------------------------------------------
        | Atualiza status da conta
        |--------------------------------------------------------------------------
        */

        $account->updateStatus();


        return redirect()
            ->route('payments.index', $account)
            ->with(
                'success',
                'Pagamento atualizado com sucesso.'
            );
    }

    public function destroy(Account $account, Payment $payment)
    {
        abort_if($account->user_id !== auth()->id(), 403);
        abort_if($payment->account_id !== $account->id, 404);

        $payment->delete();

        $account->updateStatus();

        return redirect()->route('payments.index', $account);
    }
}
