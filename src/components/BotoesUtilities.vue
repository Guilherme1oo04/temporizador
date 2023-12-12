<script setup>
    import { reactive } from 'vue';

    const contagemStatus = reactive({state: false, textLabel: 'Start'})

    let tempoTotal = 0
    let timerInterval;

    const audioTemporizador = new Audio()
    audioTemporizador.loop = true

    const iniciarAudio = () => {
        document.getElementById('modal-parar').classList.remove('tw-hidden')
        document.getElementById('modal-parar').classList.add('tw-flex')

        audioTemporizador.src = document.getElementById('input-audio').value
        audioTemporizador.play()
    }
    const pararAudio = () => {
        document.getElementById('modal-parar').classList.remove('tw-flex')
        document.getElementById('modal-parar').classList.add('tw-hidden')

        audioTemporizador.pause()
    }

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

                iniciarAudio()
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

        contagemStatus.state = false
        stateBotaoIniciar('Start')
        stateInputs(false)
    }

    const stateInputs = (boolean) => {
        let horasInput = document.getElementById('horas')
        let minutosInput = document.getElementById('minutos')
        let segundosInput = document.getElementById('segundos')

        let inputAudioLabel = document.getElementById('input-audio-label')

        inputAudioLabel.disabled = boolean
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
    <div id="modal-parar" class="tw-absolute tw-bg-slate-500 tw-w-screen tw-h-screen tw-top-0 tw-hidden tw-flex-col tw-justify-center tw-items-center">
        <div class="tw-bg-neutral-200 tw-flex tw-flex-col tw-justify-around tw-items-center tw-w-48 tw-h-48 tw-rounded-lg tw-shadow-lg sm:tw-w-64 sm:tw-h-64 tw-py-4">
            <p class="tw-text-center tw-font-semibold tw-text-xl sm:tw-text-3xl">The time is over</p>
            <p class="tw-text-center tw-text-sm sm:tw-text-base">Click below to end the timer</p>
            <button class="tw-text-neutral-100 tw-font-semibold tw-font-mono tw-text-sm sm:tw-text-lg tw-px-4 tw-py-1 tw-rounded-xl tw-h-10 hover:tw-shadow-lg tw-bg-blue-500 hover:tw-bg-blue-700" @click="pararAudio()">Close</button>
        </div>
    </div>
    <div class="tw-flex tw-flex-row tw-w-48 sm:tw-w-64 tw-justify-around">
        <button id="botao-iniciar" class="botao-iniciar" @click="statusTemp(contagemStatus.state)">{{ contagemStatus.textLabel }}</button>
        <button id="botao-restart" class="botao-reiniciar" @click="reiniciarTemp()">Reset</button>
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