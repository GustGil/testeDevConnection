<?php

namespace App\Models;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model{
    protected $fillable = [
        "user_id",
        "contact_id",
        "type",
        "status",
        "desc",
        "description",
        "amount",
        "create_date",
        "due_date",
        'due_soon_notified_at',
        'overdue_notified_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date', 
        'create_date' => 'date',
        'due_soon_notified_at' => 'datetime',
        'overdue_notified_at' => 'datetime',
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }

    public function contact(): BelongsTo{
    return $this->belongsTo(Contact::class);
    }

    public function payments(): HasMany{
        return $this->hasMany(Payment::class);
    }

    public function updateStatus(): void
    {
        $paid = $this->payments()->sum('amount');

        if ($paid >= $this->amount) {
            $status = 'paid';
        } elseif ($paid > 0) {
            $status = 'partial';
        } elseif ($this->due_date->isPast()) {
            $status = 'overdue';
        } else {
            $status = 'open';
        }

        $this->update([
            'status' => $status,
        ]);
    }

}


