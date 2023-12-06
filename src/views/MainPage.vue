<script setup>
    import MarcadorTempo from "../components/MarcadorTempo.vue"
    import BotaoEscolheAudio from "../components/BotaoEscolheAudio.vue";
    import EscolheTempo from "../components/EscolheTempo.vue";
</script>

<template>
    <main class="tw-flex tw-flex-col tw-items-center tw-mt-28">
        <h1 class="tw-text-xl tw-font-semibold tw-mx-2 tw-text-center sm:tw-text-3xl">Temporizador online 2025</h1>
        <MarcadorTempo></MarcadorTempo>
        <EscolheTempo></EscolheTempo>
        <BotaoEscolheAudio></BotaoEscolheAudio>
    </main>
</template>

<style>
    
</style>