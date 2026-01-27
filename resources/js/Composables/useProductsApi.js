import axios from 'axios'

export function useProductsApi() {
    const getProducts = (params = {}) =>
        axios.get('/api/products', { params })

    const getProduct = (id) =>
        axios.get(`/api/products/${id}`)

    const createProduct = (data) =>
        axios.post('/api/products', data)

    const updateProduct = (id, data) =>
        axios.put(`/api/products/${id}`, data)

    const deleteProduct = (id) =>
        axios.delete(`/api/products/${id}`)

    const getCategories = () =>
        axios.get('/api/categories')

    return {
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        getCategories,
    }
}
