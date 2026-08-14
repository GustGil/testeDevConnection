<?php

    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\ContactController;
    use App\Http\Controllers\AccountController;
    use App\Http\Controllers\PaymentController;
    use App\Http\Controllers\ReportController;


    Route::inertia('/', 'welcome')->name('home');


    Route::middleware(['auth'])->group(function () {
            Route::get('/contacts/create', [ContactController::class, 'create'])
            ->name('contacts.create');

            Route::post('/contacts', [ContactController::class, 'store'])
            ->name('contacts.store');

            Route::get('/contacts', [ContactController::class, 'index'])
            ->name('contacts.index');

            Route::get('/contacts/{contact}/edit', [ContactController::class, 'edit'])
            ->name('contacts.edit');

            Route::put('/contacts/{contact}', [ContactController::class, 'update'])
            ->name('contacts.update');

            Route::delete('/contacts/{contact}', [ContactController::class, 'destroy'])
            ->name('contacts.delete');


            Route::get('/accounts/create', [AccountController::class,'create'])
            ->name('accounts.create');

            Route::post('/accounts', [AccountController::class,'store'])
            ->name('accounts.store');

            Route::get('/accounts', [AccountController::class,'index'])
            ->name('accounts.index');

            Route::get('/accounts/{account}/edit', [AccountController::class,'edit'])
            ->name('accounts.edit');

            Route::put('/accounts/{account}', [AccountController::class,'update'])
            ->name('accounts.update');

            Route::delete('/accounts/{account}', [AccountController::class,'destroy'])
            ->name('accounts.destroy');


            Route::get('/accounts/{account}/payments/create',[PaymentController::class, 'create'])
            ->name('accounts.payments.create');

            Route::post('/accounts/{account}/payments',[PaymentController::class, 'store'])
            ->name('accounts.payments.store');

            Route::get('/accounts/{account}/payments', [PaymentController::class, 'index'])
            ->name('payments.index');

            Route::get('/accounts/{account}/payments/{payment}/edit',[PaymentController::class, 'edit']) 
            ->name('payments.edit');

            Route::put('/accounts/{account}/payments/{payment}', [PaymentController::class, 'update'])
            ->name('payments.update');

            Route::delete('/accounts/{account}/payments/{payment}', [PaymentController::class, 'destroy'])
            ->name('payments.destroy');

            Route::get('/reports',[ReportController::class, 'index'])
            ->name('reports.index');

            Route::post('/reports/send', [ReportController::class, 'send'])
            ->name('reports.send');
    });

    require __DIR__.'/settings.php';
