<script setup>
    import MarcadorTempo from "../components/MarcadorTempo.vue";
    import EscolheTempo from "../components/EscolheTempo.vue";
    import BotaoEscolheAudio from "../components/BotaoEscolheAudio.vue";
    import BotoesUtilities from "../components/BotoesUtilities.vue";
</script>

<template>
    <h1 class="tw-text-xl tw-font-semibold tw-mx-2 tw-mt-10 tw-text-center sm:tw-text-3xl">Temporizador online 2025</h1>
    <main class="tw-flex tw-flex-col tw-items-center tw-mt-12">
        <MarcadorTempo></MarcadorTempo>
        <EscolheTempo></EscolheTempo>
        <BotoesUtilities></BotoesUtilities>
        <BotaoEscolheAudio></BotaoEscolheAudio>
    </main>
</template>

<style>
    
</style>