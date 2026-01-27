<script setup>

</script>

<template>
    <div class="flex justify-center items-center">
        <div class="relative w-12 h-12">
            <!-- Статичное серое кольцо (фон) -->
            <div
                class="absolute inset-0 rounded-full border-4 border-gray-200"
            ></div>

            <!-- Вращающееся кольцо -->
            <div
                class="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"
            ></div>
        </div>
    </div>
</template>

<style scoped>

</style>
