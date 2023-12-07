<script setup>
    import { onMounted, reactive } from 'vue';

    var audios = reactive([{nome: 'Default', path: 'src/assets/alarm-clock.wav'}])

    onMounted(() => {
        selecionaAudio("0")
    })

    const mostrarOpcoes = () => {
        let opcoes = document.getElementById('opcoes')
        opcoes.classList.remove('tw-hidden')
        opcoes.classList.add('tw-block')
    }

    const esconderOpcoes = () => {
        let opcoes = document.getElementById('opcoes')
        opcoes.classList.remove('tw-block')
        opcoes.classList.add('tw-hidden')
        
    }

    const selecionaAudio = (id) => {
        let inputAudio = document.getElementById('input-audio')
        let inputAudioLabel = document.getElementById('input-audio-label')

        inputAudioLabel.value = audios[Number.parseInt(id)].nome
        inputAudio.value = audios[Number.parseInt(id)].path

    }

    const tocaAudio = () => {
        let btn = document.getElementById('button-toca-audio')
        let inputAudio = document.getElementById('input-audio')
        let audioSrc = inputAudio.value

        let audio = new Audio(audioSrc)
        let durationMax = 3;

        btn.disabled = true

        audio.addEventListener('durationchange', function() {
            if (audio.duration !== Infinity) {
                if (audio.duration > durationMax) {
                setTimeout(function() {
                        audio.pause();
                        btn.disabled = false
                    }, durationMax * 1000);
                }
            }
            });
        audio.play()
    }

    const importarAudio = () => {
        document.getElementById('audioPath').click()
    }

    const pegarAudio = () => {
        let audioInput = document.getElementById('audioPath')

        const regexTypeAudio = /^audio\/(wav|mp3|mpeg)$/
        if (regexTypeAudio.test(audioInput.files[0].type)){
            let audioPath = URL.createObjectURL(audioInput.files[0])

            const objetoAudio = {nome: audioInput.files[0].name, path: audioPath}

            if (audios.indexOf(objetoAudio) === -1){
                audios.push(objetoAudio)
            }

            document.getElementById('input-audio-label').value = objetoAudio.nome
            document.getElementById('input-audio').value = objetoAudio.path
        }
        else {
            alert("Somente é possível utilizar arquivos .wav ou .mp3 ou .mpeg")
            audioInput.value = ""
        }
 
    }
    
</script>

<template>
    <div class="tw-mt-5 tw-flex tw-flex-col tw-items-center">
        <div class="select-audio">
            <input type="text" id="input-audio-label" class="input-audio" readonly placeholder="Escolha um aúdio" @focus="mostrarOpcoes()" @blur="esconderOpcoes()">
            <input type="hidden" id="input-audio">

            <div class="tw-absolute tw-hidden tw-mt-2 tw-h-40 tw-overflow-y-scroll" id="opcoes">
                <div v-for="audio in audios" class="opcoes-audio">
                    <div class="opcao" :id="audios.indexOf(audio)" :key="audios.indexOf(audio)" @mousedown="selecionaAudio(audios.indexOf(audio))"><p class="tw-break-all tw-cursor-default">{{ audio.nome }}</p></div>
                </div>
            </div>
        </div>
        <div class="tw-flex tw-flex-row tw-w-52 tw-h-24 sm:tw-flex-row sm:tw-w-72 tw-justify-around tw-mt-3">
            <button @click="tocaAudio()" id="button-toca-audio" class="button tw-bg-indigo-500 hover:tw-bg-indigo-700">Play</button>
            <div id="importaAudio">
                <input type="file" id="audioPath" @change="pegarAudio()" accept="audio/*" class="tw-hidden">
                <button @click="importarAudio()" class="button tw-bg-emerald-500 hover:tw-bg-emerald-700">Import Audio</button>
            </div>
        </div>
        
    </div>
</template>

<style>
    .button {
        @apply tw-text-neutral-100 tw-font-semibold tw-font-mono tw-text-sm sm:tw-text-lg tw-px-4 tw-py-1 tw-rounded-xl tw-h-10 hover:tw-shadow-lg;
    }
    .input-audio {
        @apply tw-text-center tw-bg-neutral-50 tw-w-52 tw-font-mono tw-text-base tw-font-semibold tw-py-2 tw-px-1 tw-rounded-sm tw-shadow-md sm:tw-w-80 sm:tw-text-xl hover:tw-cursor-pointer focus:tw-outline-none focus:tw-bg-neutral-200
    }
    .opcoes-audio{
        @apply tw-text-center tw-bg-neutral-50 tw-w-52 tw-font-mono tw-text-base tw-font-semibold tw-py-2 tw-px-1 hover:tw-bg-neutral-200 sm:tw-w-80 sm:tw-text-lg
    }

    /* Scrollbar */
    #opcoes::-webkit-scrollbar{
        @apply tw-w-3
    }
    #opcoes::-webkit-scrollbar-thumb{
        @apply tw-bg-neutral-500 tw-rounded-xl
    }
</style>