<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Product Catalog') }}</title>

    @vite('resources/js/app.js')
    @inertiaHead
</head>
    <body class="antialiased">
        @inertia
    </body>
</html>
