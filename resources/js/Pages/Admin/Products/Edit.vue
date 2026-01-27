<script setup>
import { ref, onMounted } from 'vue'
import ProductForm from './ProductForm.vue'
import { useProductsApi } from '@/Composables/useProductsApi'

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
})

const { getProduct } = useProductsApi()

const product = ref(null)

onMounted(async () => {
    const response = await getProduct(props.id)
    product.value = response.data.data
})
</script>

<template>

    <ProductForm
        :product="product"
    />
</template>

