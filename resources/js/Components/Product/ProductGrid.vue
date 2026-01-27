<script setup>
    import ProductCard from './ProductCard.vue'

    defineProps({
        products: {
            type: Array,
            required: true,
        },
    })
</script>

<template>
    <TransitionGroup
        name="card"
        tag="div"
        appear
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
        <div
            v-for="product in products"
            :key="product.id"
        >
            <ProductCard :product="product" />
        </div>
    </TransitionGroup>
</template>

<style scoped>

</style>
