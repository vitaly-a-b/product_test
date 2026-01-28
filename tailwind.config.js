/** @type {import('tailwindcss').Config} */
export default {
    content: [
        // Laravel Blade
        "./resources/views/**/*.blade.dev",

        // Vue components
        "./resources/js/**/*.vue",
        "./resources/js/**/*.js",

        // Inertia pages
        "./resources/js/Pages/**/*.vue",

        // Storage views (если есть)
        "./storage/framework/views/*.dev",

        // Включаем все возможные расширения
        "./resources/**/*.{dev,html,js,vue,blade.dev}",

        // Игнорируем node_modules
        "!./node_modules/**/*",
    ],
    theme: {
        extend: {
            // Можно добавить кастомные цвета, если нужно
            colors: {
                'primary': '#1d4ed8',
                'secondary': '#64748b',
            }
        },
    },
    plugins: [],
    // Убедитесь, что сканирование работает
    safelist: [
        // Добавьте сюда классы, которые точно должны быть
        'bg-blue-500',
        'bg-red-500',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'mt-4',
        'mb-4',
        'p-4',
        'text-center',
    ]
}
