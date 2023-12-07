<script setup>

    const tiposHorarios = ['horas', 'minutos', 'segundos']

    const formataTempo = (id) => {
        let input = document.getElementById(id)

        input.value = input.value.replace(/[^0-9]/g, '').slice(0, 2)

        if ((id == 'minutos' || id == 'segundos') && input.value > 60){
            input.value = 60
        }
    }

</script>

<template>
    <div class="tw-flex tw-w-48 tw-justify-between tw-text-center tw-my-2 sm:tw-w-64">
        <div v-for="tipo in tiposHorarios">
            <input type="number" :id="tipo" min="0" max="99" @input="formataTempo(tipo)" class="input-tempo">
            <p class="paragrafo-input-tempo tw-pt-2 tw-text-xs sm:tw-text-base"><label :for="tipo" class="label-input-tempo tw-p-1 tw-rounded-sm">{{ tipo.charAt(0).toUpperCase() + tipo.slice(1) }}</label></p>
        </div>
        
    </div>
</template>

<style>
    .input-tempo {
        @apply tw-text-center tw-bg-neutral-50 tw-text-sm tw-font-semibold tw-py-2 tw-px-1 tw-rounded-sm hover:tw-cursor-pointer focus:tw-outline-none sm:tw-w-20;
    }
    .input-tempo:focus ~ .paragrafo-input-tempo .label-input-tempo {
        @apply tw-bg-indigo-500 tw-text-neutral-100;
    }
</style>