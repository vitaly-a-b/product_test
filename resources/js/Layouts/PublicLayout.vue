<script setup>
    import { Link } from '@inertiajs/vue3'
    import { computed } from 'vue'
    import { useAuth } from '@/Composables/useAuth'

    const { token } = useAuth()

    const adminHref = computed(() =>
        token.value ? '/admin/products' : '/login'
    )

    const adminText = computed(() =>
        token.value ? 'Админпанель' : 'Авторизация'
    )


</script>

<template>
    <div class="min-h-screen bg-gray-100">
        <header class="bg-white shadow">
            <div class="max-w-6xl mx-auto px-4 py-4 flex justify-between">
                <Link href="/" class="font-bold text-lg">
                    Каталог с товарами
                </Link>

                <Link :href="adminHref" class="text-blue-600">
                    {{ adminText }}
                </Link>
            </div>
        </header>

        <main class="max-w-6xl mx-auto px-4 py-6">
            <slot />
        </main>
    </div>
</template>

<style scoped>

</style>
