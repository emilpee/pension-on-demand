<template>
  <main class="container">
    <div class="settings">
    <section class="text">
      <h1>Mina tillgångar</h1>
      <h2>För att göra en bättre analys...</h2>
      <span>Nu kan du hantera din framtid själv, inga fler besök hos pensionsrådgivare.</span>
    </section>

    <section class="settings__item">
        <SettingsItem v-for="data in settingsData" :key="data.id" :setting="data" />
    </section>
    </div>
  </main>
</template>

<script>
import { SettingsItem } from '../components/';
import { settingsData } from '../data/';

export default {

    data() {
        return {
            settingsData: settingsData
        }
    },

    components: {
        SettingsItem
    }

}

</script>

<style lang="scss">
@import '@/scss/';

.settings {
    background: $white;
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 1rem;

    .text {
        > h1 {
            padding: 5rem 0 0 0;
        }

        > h2 {
            padding-top: 1rem;
            margin: .25rem 0;
        }
    }
}

</style>