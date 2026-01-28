<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import Button from '@/Components/Button.vue'
import Input from '@/Components/Input.vue'
import PageTransition from '@/Components/PageTransition.vue'
import { useProductsApi } from '@/Composables/useProductsApi'


const props = defineProps({
    product: {
        type: Object,
        default: null,
    },
})

const isEdit = computed(() => !!props.product)

const { createProduct, updateProduct, getCategories} = useProductsApi()

const categories = ref([])
const loading = ref(false)
const errors = ref({})

const form = ref({
    name: '',
    category_id: '',
    description: '',
    price: '',
})

const validate = () => {
    errors.value = {}

    if (!form.value.name) {
        errors.value.name = 'Имя обязательно заполнить'
    }

    if (!form.value.category_id) {
        errors.value.category_id = 'Не выбрана категория'
    }

    if (!form.value.price || form.value.price <= 0) {
        errors.value.price = 'Цена не должна быть равна нулю'
    }

    return Object.keys(errors.value).length === 0
}

const submit = async () => {

    if (!validate())
        return

    loading.value = true

    try {
        if (isEdit.value) {
            await updateProduct(props.product.id, form.value)

        } else {
            await createProduct(form.value)
        }

        router.visit('/admin/products')
    }
    catch(e){
        alert(isEdit.value ? 'Товар не отредактирован' : 'Товар не создан')
        console.error('Ошибка при редактировании или создания товара', e)

    } finally {
        loading.value = false
    }
}


watch(
    () => props.product,
    (product) => {
        if (!product) return

        form.value = {
            name: product.name,
            category_id: product.category?.id ?? '',
            description: product.description,
            price: product.price,
        }
    },
    { immediate: true }
)




onMounted(async () => {
    const response = await getCategories()
    categories.value = response.data.data ?? response.data
})
</script>

<template>
    <AdminLayout>
        <PageTransition>
            <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 class="text-2xl font-bold mb-6">
                    {{ isEdit ? 'Редактирование товара' : 'Создание товара' }}
                </h1>

                <form @submit.prevent="submit" class="space-y-5">
                    <!-- Name -->
                    <div>
                        <label class="block text-sm font-medium mb-1">
                            Name
                        </label>
                        <Input v-model="form.name" />
                        <p v-if="errors.name" class="text-sm text-red-600 mt-1">
                            {{ errors.name }}
                        </p>
                    </div>

                    <!-- Category -->
                    <div>
                        <label class="block text-sm font-medium mb-1">
                            Category
                        </label>
                        <select
                            v-model="form.category_id"
                            class="w-full border rounded px-3 py-2"
                        >
                            <option
                                v-if="!isEdit"
                                disabled
                                value=""
                            >
                                Выбери категорию
                            </option>

                            <option
                                v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                            >
                                {{ category.name }}
                            </option>
                        </select>
                        <p v-if="errors.category_id" class="text-sm text-red-600 mt-1">
                            {{ errors.category_id }}
                        </p>
                    </div>

                    <!-- Description -->
                    <div>
                        <label class="block text-sm font-medium mb-1">
                            Description
                        </label>
                        <textarea
                            v-model="form.description"
                            rows="4"
                            class="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <!-- Price -->
                    <div>
                        <label class="block text-sm font-medium mb-1">
                            Price
                        </label>
                        <Input
                            v-model="form.price"
                            type="number"
                            min="0"
                            step="0.01"
                        />
                        <p v-if="errors.price" class="text-sm text-red-600 mt-1">
                            {{ errors.price }}
                        </p>
                    </div>

                    <!-- Actions -->
                    <div class="flex justify-end gap-3">
                        <Button
                            variant="secondary"
                            type="button"
                            @click="$inertia.visit('/admin/products')"
                        >
                            Отменить
                        </Button>

                        <Button :disabled="loading"  type="submit">
                            {{ loading ? 'Сохранение...' : 'Сохранить' }}
                        </Button>
                    </div>
                </form>
            </div>
        </PageTransition>
    </AdminLayout>
</template>

