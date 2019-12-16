<template>
  <div id="app">
    <Header v-if="$route.path !== '/login'" />
    <router-view/>
    <Footer v-if="$route.path !== '/login'" />
  </div>
</template>

<script>
import { Header, Footer } from './components/';

export default {
  components: {
    Header, Footer
  },

  mounted() {
    if (sessionStorage.getItem('user') !== null) {
        const token = sessionStorage.getItem('user');
        let user = atob(token.split('.')[1]);
        this.$store.commit('setPersonalNr', sessionStorage.getItem('personal'));
        this.$store.commit('setUser', JSON.parse(user));
        this.$store.commit('hasSignedIn', true) 
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/';


body {
  background: $bodyGradient;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $green;
  background: transparent;
  margin: 0;
  overflow: hidden;
}

</style>
