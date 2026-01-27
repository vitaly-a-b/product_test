<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue'
import ProductGrid from '@/Components/Product/ProductGrid.vue'
import CategoryFilter from '@/Components/Filters/CategoryFilter.vue'
import Pagination from '@/Components/Pagination.vue'
import Spinner from '@/Components/Spinner.vue'
import { useProductList } from '@/Composables/useProductList'


const {
    products,
    categories,
    selectedCategory,
    pagination,
    loading,
    loadProducts,
    error
} = useProductList()

</script>

<template>

    <PublicLayout>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold">
                Товары
            </h1>

            <CategoryFilter
                :categories="categories"
                v-model="selectedCategory"
            />
        </div>

        <div v-if="loading" class="py-20">
            <Spinner />
        </div>

        <div v-else-if="error" class="text-center py-10 text-red-600">
            {{ error }}
        </div>

        <template v-else>
            <ProductGrid :products="products" />

            <Pagination
                :meta="pagination"
                @change="loadProducts"
            />
        </template>
    </PublicLayout>

</template>

<style scoped>

</style>
