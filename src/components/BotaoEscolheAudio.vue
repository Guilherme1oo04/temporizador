<script setup>
    import { onMounted, reactive } from 'vue';

    var audios = reactive([{nome: 'Default', path: 'src/assets/alarm-clock.wav'}])

    onMounted(() => {
        selecionaAudio("0")
    })

    const mostrarOpcoes = () => {
        let opcoes = document.getElementById('opcoes')
        opcoes.classList.add('tw-block')
        opcoes.classList.remove('tw-hidden')
    }

    const esconderOpcoes = () => {
        let opcoes = document.getElementById('opcoes')
        opcoes.classList.add('tw-hidden')
        opcoes.classList.remove('tw-block')
        
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
            console.log(audioPath)

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
    <div>
        <div class="select-audio">
            <input type="text" id="input-audio-label"  readonly placeholder="Escolha um aúdio" @focus="mostrarOpcoes()" @blur="esconderOpcoes()">
            <input type="hidden" id="input-audio">

            <div v-for="audio in audios" id="opcoes" class="tw-absolute tw-hidden tw-w-20 tw-h-10 tw-bg-slate-500">
                <div class="opcao" :id="audios.indexOf(audio)" :key="audios.indexOf(audio)" @mousedown="selecionaAudio(audios.indexOf(audio))">{{ audio.nome }}</div>
            </div>
        </div>
        <button @click="tocaAudio()">Play</button>
        <div id="importaAudio">
            <input type="file" id="audioPath" @change="pegarAudio()" accept="audio/*" class="tw-hidden">
            <button @click="importarAudio()">Importar Aúdio</button>
        </div>
        
    </div>
</template>
