<script setup>
import { ref, onMounted } from 'vue'
import { usePage } from '@inertiajs/vue3'
import PublicLayout from '@/Layouts/PublicLayout.vue'
import ProductDetails from '@/Components/Product/ProductDetails.vue'
import Spinner from '@/Components/Spinner.vue'
import { useProductsApi } from '@/Composables/useProductsApi'

const { getProduct } = useProductsApi()
const { props } = usePage()

const product = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
    try {
        const response = await getProduct(props.id)
        product.value = response.data.data

    } catch (e) {
        error.value = 'Товар не найден'

    } finally {
        loading.value = false
    }
})

</script>

<template>

    <PublicLayout>
        <div v-if="loading" class="py-20">
            <Spinner />
        </div>

        <div v-else-if="error" class="text-center py-10 text-red-600">
            {{ error }}
        </div>

        <div v-else class="max-w-3xl mx-auto">
            <ProductDetails :product="product" />
        </div>
    </PublicLayout>

</template>

<style scoped>

</style>
