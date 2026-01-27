<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


/*
|--------------------------------------------------------------------------
| Публичные страницы
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Public/ProductList');
})->name('home');

Route::get('/product/{id}', function (int $id) {
    return Inertia::render('Public/ProductShow', [
        'id' => $id,
    ]);
})->name('product.show');

/*
|--------------------------------------------------------------------------
| Аутентификация
|--------------------------------------------------------------------------
*/
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

/*
|--------------------------------------------------------------------------
| Административная часть
|--------------------------------------------------------------------------
| Фактическая защита админки делается на фронтенде через Sanctum-токен.
*/

Route::prefix('admin')->group(function () {

    Route::get('/products', function () {
        return Inertia::render('Admin/Products/Index');
    })->name('admin.products.index');

    Route::get('/products/create', function () {
        return Inertia::render('Admin/Products/Create');
    })->name('admin.products.create');

    Route::get('/products/{id}/edit', function (int $id) {
        return Inertia::render('Admin/Products/Edit', [
            'id' => $id,
        ]);
    })->name('admin.products.edit');
});

/*
|--------------------------------------------------------------------------
| Fallback
|--------------------------------------------------------------------------
*/
Route::fallback(function () {
    return redirect()->route('home');
});
