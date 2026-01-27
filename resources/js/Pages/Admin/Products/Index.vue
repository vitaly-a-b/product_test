<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue'
import Table from '@/Components/Table/Table.vue'
import TableHead from '@/Components/Table/TableHead.vue'
import TableRow from '@/Components/Table/TableRow.vue'
import Button from '@/Components/Button.vue'
import Pagination from '@/Components/Pagination.vue'
import CategoryFilter from '@/Components/Filters/CategoryFilter.vue'
import ConfirmModal from '@/Components/Modals/ConfirmModal.vue'
import Spinner from '@/Components/Spinner.vue'
import PageTransition from '@/Components/PageTransition.vue'
import { useProductList } from '@/Composables/useProductList'
import { Link } from '@inertiajs/vue3'

const {
    products,
    categories,
    selectedCategory,
    pagination,
    page,
    loading,
    error,
    loadProducts,
    requestDelete,
    showModal,
    productToDelete,
    confirmDelete,
    cancelDelete
} = useProductList()

</script>

<template>
    <AdminLayout>
        <div class="mb-6 space-y-4 md:space-y-0">
            <!-- Верхняя строка -->
            <div class="flex flex-col items-center md:flex-row md:items-center md:justify-between md:mb-6">
                <h1 class="text-2xl font-bold text-center md:text-left">
                    Товары
                </h1>

                <!-- Кнопка (на desktop остаётся справа от заголовка) -->
                <div class="hidden md:block">
                    <Link href="/admin/products/create">
                        <Button>
                            Добавить товар
                        </Button>
                    </Link>
                </div>
            </div>

            <!-- Нижняя строка -->
            <div class="flex items-center justify-between gap-4">
                <!-- Фильтр -->
                <CategoryFilter
                    :categories="categories"
                    v-model="selectedCategory"
                />

                <!-- Кнопка для mobile -->
                <div class="md:hidden">
                    <Link href="/admin/products/create">
                        <Button>
                            Добавить товар
                        </Button>
                    </Link>
                </div>
            </div>
        </div>

        <div v-if="loading" class="py-20">
            <Spinner />
        </div>

        <div v-else-if="error" class="text-center py-10 text-red-600">
            {{ error }}
        </div>

        <PageTransition v-else>
            <Table>
                <TableHead>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Название
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Категория
                    </th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">
                        Цена
                    </th>
                    <th class="px-4 py-3 text-right text-sm font-medium text-gray-600">
                        Действие
                    </th>
                </TableHead>

                <tbody class="divide-y divide-gray-200">
                    <TableRow
                        v-for="product in products"
                        :key="product.id"
                    >
                        <td class="px-4 py-3">
                            {{ product.name }}
                        </td>

                        <td class="px-4 py-3 text-gray-600">
                            {{ product.category.name }}
                        </td>

                        <td class="px-4 py-3 font-medium">
                            {{ product.price }}
                        </td>

                        <td class="px-4 py-3">
                            <div
                                class="flex flex-col gap-2
                                    md:flex-row md:justify-end md:gap-2"
                            >
                                <Link :href="`/admin/products/${product.id}/edit`" class="w-full md:w-auto">
                                    <Button variant="secondary" class="w-full">
                                        Редактировать
                                    </Button>
                                </Link>

                                <Button
                                    variant="danger"
                                    class="w-full md:w-auto"
                                    @click="requestDelete(product)"
                                >
                                    Удалить
                                </Button>
                            </div>
                        </td>
                    </TableRow>
                </tbody>
            </Table>
        </PageTransition>

        <Pagination :meta="pagination" @change="loadProducts" />

        <!-- Модалка подтверждения удаления -->
        <ConfirmModal
            :show="showModal"
            title="Подтвердить удаление"
            :message="`Вы уверены, что хотите удалить '${productToDelete?.name}'?`"
            @confirm="confirmDelete"
            @cancel="cancelDelete"
        />

    </AdminLayout>
</template>
