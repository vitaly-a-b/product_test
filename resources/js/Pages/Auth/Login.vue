<script setup>
import {ref} from 'vue'
import { useAuth } from '@/Composables/useAuth'
import PublicLayout from '@/Layouts/PublicLayout.vue'
import Button from '@/Components/Button.vue'
import Input from '@/Components/Input.vue'
import PageTransition from '@/Components/PageTransition.vue'

const { login } = useAuth()

const form = ref({
    email: '',
    password: '',
})

const loading = ref(false)
const error = ref(null)

const submit = async () => {
    error.value = null
    loading.value = true

    try {
        await login(form.value)

    } catch (e) {
        error.value = 'Неверный e-mail или пароль'

    } finally {
        loading.value = false
    }
}

</script>

<template>

    <PublicLayout>
        <PageTransition>
            <div class="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow">
                <h1 class="text-2xl font-bold mb-6 text-center">
                    Авторизация
                </h1>

                <form @submit.prevent="submit" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">
                            E-mail
                        </label>
                        <Input
                            v-model="form.email"
                            type="email"
                            placeholder="admin@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label class="block text-sm font-medium mb-1">
                            Пароль
                        </label>
                        <Input
                            v-model="form.password"
                            type="password"
                            required
                        />
                    </div>

                    <div v-if="error" class="text-red-600 text-sm text-center">
                        {{ error }}
                    </div>

                    <Button
                        type="submit"
                        class="w-full"
                        :disabled="loading"
                    >
                        {{ loading ? 'Проверяем...' : 'Авторизация' }}
                    </Button>
                </form>
            </div>
        </PageTransition>
    </PublicLayout>

</template>

<style scoped>

</style>
