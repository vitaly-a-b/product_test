<script setup>
import { computed } from 'vue'

const props = defineProps({
    meta: {
        type: Object,
        required: null,
    },
})

const emit = defineEmits(['change'])

const current = computed(() => props.meta.current_page)
const last = computed(() => props.meta.last_page)

const pages = computed(() => {
    const result = []

    if (current.value > 1) {
        result.push(current.value - 1)
    }

    result.push(current.value)

    if (current.value < last.value) {
        result.push(current.value + 1)
    }

    return result
})

const goTo = (page) => {
    if (page < 1 || page > last.value || page === current.value) {
        return
    }

    emit('change', page)
}

</script>

<template>
    <div
        v-if="meta && meta.last_page > 1"
        class="flex justify-center items-center mt-8 gap-2"
    >
        <!-- Первая страница -->
        <button
            v-if="current > 1"
            @click="goTo(1)"
            class="px-3 py-1 rounded border bg-white hover:bg-gray-100 cursor-pointer"
            title="First page"
        >
            «
        </button>

        <!-- Страница рядом с текущей -->
        <button
            v-for="page in pages"
            :key="page"
            @click="goTo(page)"
            class="px-3 py-1 rounded border cursor-pointer"
            :class="{
            'bg-blue-600 text-white': page === current,
            'bg-white hover:bg-gray-100': page !== current,
        }"
        >
            {{ page }}
        </button>

        <!-- Последняя страница -->
        <button
            v-if="current < last"
            @click="goTo(last)"
            class="px-3 py-1 rounded border bg-white hover:bg-gray-100 cursor-pointer"
            title="Last page"
        >
            »
        </button>
    </div>
</template>

<style scoped>

</style>
