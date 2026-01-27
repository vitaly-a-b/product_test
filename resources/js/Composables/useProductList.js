import { ref, watch, onMounted } from 'vue'
import { useProductsApi } from './useProductsApi'

export function useProductList({ initialPage = 1 } = {}) {

    const { getProducts, getCategories, deleteProduct } = useProductsApi()

    // данные
    const products = ref([])
    const categories = ref([])
    const selectedCategory = ref('')
    const pagination = ref(null)
    const page = ref(initialPage)
    const loading = ref(false)
    const error = ref(null)

    // Модалка подтверждения удаления
    const showModal = ref(false)
    const productToDelete = ref(null)


    // Загрузка категорий
    const loadCategories = async () => {
        try {
            const response = await getCategories()
            categories.value = response.data.data ?? response.data

        } catch (e) {
            console.error('Ошибка загрузки категорий', e)
        }
    }

    // Загрузка товаров
    const loadProducts = async (newPage = page.value) => {

        loading.value = true
        error.value = null

        try {
            const params = { page: newPage }

            if (selectedCategory.value) {
                params.category_id = selectedCategory.value
            }

            const response = await getProducts(params)

            products.value = response.data.data
            pagination.value = response.data.meta
            page.value = newPage

        } catch (e) {
            error.value = 'Ошибка загрузки товаров'

        } finally {
            loading.value = false
        }
    }

    // Запрос на удаление с подтверждением
    const requestDelete = (product) => {
        productToDelete.value = product
        showModal.value = true
    }

    const cancelDelete = () => {
        productToDelete.value = null
        showModal.value = false
    }


    // Удаление товара (для админки)
    const confirmDelete  = async () => {

        if (productToDelete.value) {

            try {
                await deleteProduct(productToDelete.value.id)

                productToDelete.value = null
                showModal.value = false

                await loadProducts()

            } catch (e) {
                console.error('Ошибка удаления товара', e)
            }

        }

    }


    // Сбрасываем страницу на 1 при смене категории
    watch(selectedCategory, () => {
        loadProducts(1)
    })

    onMounted(() => {
        loadCategories()
        loadProducts()
    })

    return {
        products,
        categories,
        selectedCategory,
        pagination,
        page,
        loading,
        error,
        loadProducts,
        loadCategories,

        // Удаление с модалкой
        showModal,
        productToDelete,
        requestDelete,
        confirmDelete,
        cancelDelete,
    }
}














