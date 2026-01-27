<script setup>
    import PageTransition from '@/Components/PageTransition.vue'
    import { Link } from '@inertiajs/vue3'

    defineProps({
        product: {
            type: Object,
            required: true,
        },
    })
</script>

<template>
    <PageTransition>
        <div class="bg-white rounded-lg shadow p-6">
            <div class="mb-4">
                <h1 class="text-2xl font-bold mb-1">
                    {{ product.name }}
                </h1>

                <p class="text-sm text-gray-500">
                    Категория: {{ product.category.name }}
                </p>
            </div>

            <div class="mb-6 text-gray-700 leading-relaxed">
                {{ product.description }}
            </div>

            <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-blue-600">
            {{ product.price }}
          </span>

                <Link
                    href="/"
                    class="text-sm text-blue-600 hover:underline"
                >
                    ← Назад к товарам
                </Link>
            </div>
        </div>
    </PageTransition>
</template>

<style scoped>

</style>
