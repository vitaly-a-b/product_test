import { ref } from 'vue'
import axios from 'axios'
import { router } from '@inertiajs/vue3'

const token = ref(localStorage.getItem('token'))

// восстанавливаем заголовок при перезагрузке страницы
if (token.value) {
    axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
}

export function useAuth() {
    const login = async (credentials) => {

        const { data } = await axios.post('/api/login', credentials)

        token.value = data.token
        localStorage.setItem('token', token.value)
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`

        router.visit('/admin/products')
    }

    const logout = () => {
        token.value = null
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization

        router.visit('/')
    }

    return { token, login, logout }
}
