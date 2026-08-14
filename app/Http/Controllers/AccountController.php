<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Atualiza os status das contas
        $allAccounts = Account::where('user_id', auth()->id())
            ->get();

        foreach ($allAccounts as $account) {
            $account->updateStatus();
        }

        // Query das contas
        $query = Account::where('user_id', auth()->id())
            ->with('contact')
            ->withSum('payments', 'amount');

        // Filtro por contato
        if ($request->filled('contact_id')) {
            $query->where(
                'contact_id',
                $request->contact_id
            );
        }

        // Filtro por tipo
        if ($request->filled('type')) {
            $query->where(
                'type',
                $request->type
            );
        }

        // Filtro por status
        if ($request->filled('status')) {
            $query->where(
                'status',
                $request->status
            );
        }

        // Filtro por vencimento
        if ($request->filled('start_date')) {
            $query->whereDate(
                'due_date',
                '>=',
                $request->start_date
            );
        }

        if ($request->filled('end_date')) {
            $query->whereDate(
                'due_date',
                '<=',
                $request->end_date
            );
        }

        $accounts = $query
            ->latest()
            ->get()
            ->map(function ($account) {

                $totalPaid = (float) (
                    $account->payments_sum_amount ?? 0
                );

                $account->remaining = max(
                    0,
                    (float) $account->amount - $totalPaid
                );

                return $account;
            });

        // Contatos disponíveis para o filtro
        $contacts = Contact::where(
            'user_id',
            auth()->id()
        )->get();

        return Inertia::render('accounts/index', [
            'accounts' => $accounts,
            'contacts' => $contacts,
            'filters' => $request->only([
                'contact_id',
                'type',
                'status',
                'due_date',
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $contacts = Contact::where('user_id', auth()->id())
            ->get();

        return Inertia::render('accounts/create', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'type' => 'required|in:payable,receivable',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'due_date' => 'required|date',
        ]);

        $contact = Contact::where('id', $validated['contact_id'])
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $account = Account::create([
            'user_id' => auth()->id(),
            'contact_id' => $contact->id,
            'type' => $validated['type'],
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'due_date' => $validated['due_date'],
        ]);

        $account->updateStatus();

        return redirect()->route('accounts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        abort_if($account->user_id !== auth()->id(), 403);

        return Inertia::render('accounts/show', [
            'account' => $account,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        abort_if($account->user_id !== auth()->id(), 403);

        $contacts = Contact::where('user_id', auth()->id())
            ->get();

        return Inertia::render('accounts/edit', [
            'account' => $account,
            'contacts' => $contacts,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account)
    {
        abort_if($account->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'contact_id' => 'required|exists:contacts,id',
            'type' => 'required|in:payable,receivable',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'due_date' => 'required|date',
        ]);

        $contact = Contact::where('id', $validated['contact_id'])
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $account->update([
            'contact_id' => $contact->id,
            'type' => $validated['type'],
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'due_date' => $validated['due_date'],
        ]);

        return redirect()->route('accounts.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        abort_if($account->user_id !== auth()->id(), 403);

        $account->delete();

        return redirect()->route('accounts.index');
    }
}