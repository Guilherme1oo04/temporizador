<script setup>
    import { onMounted } from 'vue';

    var audios = [{nome: 'Default', path: 'default.mp3'}]

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
        inputAudio.value = audios[Number.parseInt(id)].path
    }
    
</script>

<template>
    <div>
        <div class="select-audio">
            <input type="text" id="input-audio" readonly placeholder="Escolha um aúdio" @focus="mostrarOpcoes()" @blur="esconderOpcoes()">

            <div v-for="audio in audios" id="opcoes" class="tw-absolute tw-hidden tw-w-20 tw-h-10 tw-bg-slate-500">
                <div class="opcao" :id="audios.indexOf(audio)" @mousedown="selecionaAudio(audios.indexOf(audio))">{{ audio.nome }}</div>
            </div>
        </div>
        <button @click="tocaAudio()">Play</button>
        <button @click="importarAudio()">Importar Aúdio</button>
    </div>
</template>
