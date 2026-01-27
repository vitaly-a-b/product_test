<script setup>
    import { Link } from '@inertiajs/vue3'

    defineProps({
            product: {
                type: Object,
                required: true,
            },
        })
</script>

<template>
    <div class="bg-white rounded-lg shadow p-4 flex flex-col">
        <h3 class="text-lg font-semibold">
            {{ product.name }}
        </h3>

        <p class="text-sm text-gray-500">
            {{ product.category.name }}
        </p>

        <p class="mt-2 text-gray-700 line-clamp-3">
            {{ product.description }}
        </p>

        <div class="mt-auto flex items-center justify-between pt-4">
      <span class="text-lg font-bold">
        {{ product.price }}
      </span>

            <Link
                :href="`/product/${product.id}`"
                class="text-blue-600 hover:underline text-sm"
            >
                Карточка товара
            </Link>
        </div>
    </div>
</template>

<style scoped>

</style>
