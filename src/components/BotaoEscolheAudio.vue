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
        let inputAudio = document.getElementById('input-audio')
        let audioSrc = inputAudio.value

        let audio = new Audio(audioSrc)
        let durationMax = 3;

        audio.addEventListener('durationchange', function() {
            if (audio.duration !== Infinity) {
                if (audio.duration > durationMax) {
                setTimeout(function() {
                        audio.pause();
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
    <div class="tw-mt-8 tw-flex tw-flex-col tw-items-center">
        <div class="select-audio">
            <input type="text" id="input-audio-label"  readonly placeholder="Escolha um aúdio" @focus="mostrarOpcoes()" @blur="esconderOpcoes()">
            <input type="hidden" id="input-audio">

            <div class="tw-absolute tw-hidden" id="opcoes">
                <div v-for="audio in audios" class="tw-bg-slate-400">
                    <div class="opcao" :id="audios.indexOf(audio)" :key="audios.indexOf(audio)" @mousedown="selecionaAudio(audios.indexOf(audio))"><p>{{ audio.nome }}</p></div>
                </div>
            </div>
        </div>
        <div class="tw-flex tw-flex-col tw-w-32 tw-h-24 sm:tw-flex-row sm:tw-w-72 tw-justify-around tw-mt-3">
            <button @click="tocaAudio()" class="button">Play</button>
            <div id="importaAudio">
                <input type="file" id="audioPath" @change="pegarAudio()" accept="audio/*" class="tw-hidden">
                <button @click="importarAudio()" class="button">Import Audio</button>
            </div>
        </div>
        
    </div>
</template>

<style>
    .button {
        @apply tw-bg-indigo-500 tw-text-neutral-100 tw-font-semibold tw-font-mono tw-text-sm sm:tw-text-lg tw-px-4 tw-py-1 tw-rounded-xl tw-h-10 hover:tw-bg-indigo-700 hover:tw-shadow-lg;
    }
</style>