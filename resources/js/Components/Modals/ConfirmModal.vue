<script setup>
    // Универсальная модалка подтверждения действий
    import { defineProps, defineEmits } from 'vue'
    import Button from '@/Components/Button.vue'

    // Props:
    // - `show`: показывать или скрывать модалку
    // - `title`: заголовок модалки
    // - `message`: текст сообщения
    const props = defineProps({
        show: { type: Boolean, required: true },
        title: { type: String, default: 'Confirm' },
        message: { type: String, default: 'Are you sure?' },
    })

    // Emits:
    // - `confirm` — пользователь подтвердил действие
    // - `cancel` — пользователь отменил действие
    const emit = defineEmits(['confirm', 'cancel'])

</script>

<template>

    <!-- Анимация появления / исчезновения фона -->
    <transition name="modal-fade">
        <div
            v-if="show"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
            @click="$emit('cancel')"
        >
            <!-- Анимация самой модалки -->
            <transition name="modal-scale">
                <!--
                    stop предотвращает всплытие клика,
                    чтобы клик внутри окна не закрывал модалку
                -->
                <div
                    class="bg-white rounded-lg shadow-lg w-96 p-6"
                    @click.stop
                >
                    <h2 class="text-lg font-semibold mb-4">
                        {{ title }}
                    </h2>

                    <p class="mb-6 text-gray-700">
                        {{ message }}
                    </p>

                    <!-- Кнопки действий -->
                    <div class="flex justify-end gap-3">
                        <!-- Кнопка отмены -->
                        <slot name="cancel">

                            <Button
                                variant="secondary"
                                @click="$emit('cancel')"
                            >
                                Отменить
                            </Button>

                        </slot>

                        <!-- Кнопка подтверждения -->
                        <slot name="confirm">

                            <Button
                                variant="danger"
                                @click="$emit('confirm')"
                            >
                                Подтвердить
                            </Button>

                        </slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>

</template>

<style scoped>
/* =========================
   Анимация фона (fade)
   ========================= */
.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
    opacity: 1;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.25s ease;
}

/* =========================
   Анимация модалки (scale)
   ========================= */
.modal-scale-enter-from,
.modal-scale-leave-to {
    transform: scale(0.95);
    opacity: 0;
}

.modal-scale-enter-to,
.modal-scale-leave-from {
    transform: scale(1);
    opacity: 1;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
    transition: all 0.25s ease;
}
</style>
