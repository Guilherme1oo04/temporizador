<script setup>
    import { reactive } from 'vue';

    const contagemStatus = reactive({state: false, textLabel: 'Start'})

    let tempoTotal = 0
    let timerInterval;

    const statusTemp = (status) => {

        if (contagemStatus.state == false && contagemStatus.textLabel == 'Start'){
            let horas = document.getElementById('horas')
            let minutos = document.getElementById('minutos')
            let segundos = document.getElementById('segundos')

            tempoTotal = (horas.value * 3600) + (minutos.value * 60) + (segundos.value * 1)

            contagemStatus.state = true
            stateBotaoIniciar('Stop')

            iniciarTemp()
            stateInputs(true)
            
        } else {
            if (status){
                pararTemp()
                stateBotaoIniciar('Return')
            } else {
                iniciarTemp()
                stateBotaoIniciar('Stop')
            }
            contagemStatus.state = !contagemStatus.state
        }

    }

    const iniciarTemp = () => {
        let horas, minutos, segundos
        let marcadorTempo = document.getElementById('marcador-tempo')

        timerInterval = setInterval(() => {
            horas = Math.floor(tempoTotal / 3600)
            minutos = Math.floor(tempoTotal / 60 - (horas * 60))
            segundos = Math.floor(tempoTotal % 60)

            horas = horas < 10 ? '0' + horas : horas
            minutos = minutos < 10 ? '0' + minutos : minutos
            segundos = segundos < 10 ? '0' + segundos : segundos

            marcadorTempo.innerHTML = `${horas}:${minutos}:${segundos}`

            tempoTotal -= 1

            if (tempoTotal < 0){
                clearInterval(timerInterval)
                marcadorTempo.innerHTML = "00:00:00"
                tempoTotal = 0

                contagemStatus.state = false
                stateBotaoIniciar('Start')

                stateInputs(false)
            }
        }, 1000)
    }

    const pararTemp = () => {
        clearInterval(timerInterval)
    }

    const reiniciarTemp = () => {
        let marcadorTempo = document.getElementById('marcador-tempo')

        clearInterval(timerInterval)
        marcadorTempo.innerHTML = "00:00:00"
        tempoTotal = 0

        stateBotaoIniciar('Start')
        stateInputs(false)
    }

    const stateInputs = (boolean) => {
        let horasInput = document.getElementById('horas')
        let minutosInput = document.getElementById('minutos')
        let segundosInput = document.getElementById('segundos')

        horasInput.disabled = boolean
        minutosInput.disabled = boolean
        segundosInput.disabled = boolean
    }

    const stateBotaoIniciar = (textLabel) => {
        let botao = document.getElementById('botao-iniciar')

        contagemStatus.textLabel = textLabel

        if (textLabel == 'Start' || textLabel == 'Return'){
            botao.classList.add('botao-iniciar')
            botao.classList.remove('botao-parar')
        } else {
            botao.classList.add('botao-parar')
            botao.classList.remove('botao-iniciar')
        }

    }
</script>

<template>
    <div class="tw-flex tw-flex-row tw-w-48 sm:tw-w-64 tw-justify-around">
        <button id="botao-iniciar" class="botao-iniciar" @click="statusTemp(contagemStatus.state)">{{ contagemStatus.textLabel }}</button>
        <button id="botao-restart" class="botao-reiniciar" @click="reiniciarTemp()">Restart</button>
    </div>
</template>

<style>
    #botao-iniciar {
        @apply tw-text-neutral-100 tw-font-semibold tw-font-mono tw-text-sm sm:tw-text-lg tw-px-4 tw-py-1 tw-rounded-xl tw-h-10 hover:tw-shadow-lg;
    }
    .botao-iniciar {
        @apply tw-bg-blue-500 hover:tw-bg-blue-700
    }
    .botao-parar {
        @apply tw-bg-red-500 hover:tw-bg-red-700
    }
    .botao-reiniciar {
        @apply tw-text-neutral-100 tw-font-semibold tw-font-mono tw-text-sm sm:tw-text-lg tw-px-4 tw-py-1 tw-rounded-xl tw-h-10 hover:tw-shadow-lg tw-bg-yellow-500 hover:tw-bg-yellow-700;
    }
</style>