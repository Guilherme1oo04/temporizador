<script setup>
    import { reactive } from 'vue';

    const contagemStatus = reactive({state: false, textLabel: 'Iniciar'})

    let tempoTotal = 0
    let timerInterval;

    const statusTemp = (botao, status) => {

        if (contagemStatus.state == false && contagemStatus.textLabel == 'Iniciar'){
            let horas = document.getElementById('horas').value
            let minutos = document.getElementById('minutos').value
            let segundos = document.getElementById('segundos').value

            tempoTotal = (horas * 3600) + (minutos * 60) + (segundos * 1)

            contagemStatus.state = true
            contagemStatus.textLabel = 'Parar'

            iniciarTemp(tempoTotal)
            
        } else {
            if (status){
                contagemStatus.textLabel = 'Retornar'
            } else {
                contagemStatus.textLabel = 'Parar'
            }
            contagemStatus.state = !contagemStatus.state
        }

    }

    const iniciarTemp = (tempo) => {
        let duration = tempo
        let horas, minutos, segundos
        let marcadorTempo = document.getElementById('marcador-tempo')

        timerInterval = setInterval(() => {
            horas = Math.floor(duration / 3600)
            minutos = Math.floor(duration / 60 - (horas * 60))
            segundos = Math.floor(duration % 60)

            horas = horas < 10 ? '0' + horas : horas
            minutos = minutos < 10 ? '0' + minutos : minutos
            segundos = segundos < 10 ? '0' + segundos : segundos

            marcadorTempo.innerHTML = `${horas}:${minutos}:${segundos}`

            duration -= 1

            if (duration < 0){
                clearInterval(timerInterval)
                marcadorTempo.innerHTML = "00:00:00"
                contagemStatus.state = false
                contagemStatus.textLabel = 'Iniciar'
            }
        }, 1000)
    }
</script>

<template>
    <div>
        <button id="botao-iniciar" class="tw-bg-blue-500 hover:tw-bg-blue-700" @click="statusTemp(this, contagemStatus.state)">{{ contagemStatus.textLabel }}</button>
    </div>
</template>

<style>
    #botao-iniciar {
        @apply tw-text-neutral-100 tw-font-semibold tw-font-mono tw-text-sm sm:tw-text-lg tw-px-4 tw-py-1 tw-rounded-xl tw-h-10 hover:tw-shadow-lg;
    }
</style>