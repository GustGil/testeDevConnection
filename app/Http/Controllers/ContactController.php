<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Inertia\Inertia;
class ContactController extends Controller
{

    public function index()
    {
       $contacts = Contact::where("user_id", auth()->id())
            ->latest()
            ->get();
        return Inertia::render("contacts/index", [
            "contacts"=> $contacts
        ]);
    }

    public function create(){
        return Inertia::render("contacts/create");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:customer,supplier',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        Contact::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'type' => $validated['type'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ]);

        return redirect()
            ->route('contacts.index')
            ->with('success', 'Contato criado com sucesso.');
    }

    public function edit(Contact $contact)
    {
        abort_if($contact->user_id !== auth()->id(), 403);

        return Inertia::render('contacts/edit', [
            'contact' => $contact,
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        abort_if($contact->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:customer,supplier',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        $contact->update($validated);

        return redirect()->route('contacts.index');
    }


    public function destroy(Contact $contact)
    {
        abort_if($contact->user_id !== auth()->id(), 403);
        
        $contact->delete();

        return redirect()->route("contacts.index");
        
    }
}
