<script setup>
import { onMounted } from 'vue'
import { useAuth } from '@/Composables/useAuth'
import { router, Link } from '@inertiajs/vue3'
const { logout } = useAuth()

onMounted(async () => {
    const token = localStorage.getItem('token')

    if (!token) {
        router.visit('/login')
    }

})

</script>

<template>
    <div class="min-h-screen flex flex-col md:flex-row bg-gray-100">
        <aside class="
                sticky top-0 z-50
                bg-white shadow
                md:static md:z-auto
                md:w-64
        ">
            <div class="p-4 font-bold">Админ панель</div>

            <nav class="flex md:flex-col gap-4 p-4">
                <Link href="/admin/products" class="text-gray-700 mt-4 hover:text-blue-600 text-left cursor-pointer">
                    Управление товарами
                </Link>
                <button @click="logout" class="text-gray-700 mt-4 hover:text-blue-600 text-left cursor-pointer ml-auto md:ml-0">
                    Выйти
                </button>
            </nav>
        </aside>

        <main class="flex-1 p-6">
            <slot />
        </main>
    </div>
</template>

<style scoped>

</style>
