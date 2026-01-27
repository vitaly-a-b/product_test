<script setup>
    defineProps({
        categories: Array,
        modelValue: [Number, String],
    })

    defineEmits(['update:modelValue'])
</script>

<template>
    <select
        class="border rounded-md px-3 py-2 bg-white"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value === 'null' ? null : +$event.target.value)"
    >
        <option value="">Все категории</option>

        <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
        >
            {{ category.name }}
        </option>
    </select>
</template>
