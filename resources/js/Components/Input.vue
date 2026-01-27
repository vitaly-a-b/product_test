<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
    <input
        class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<style scoped>

</style>
