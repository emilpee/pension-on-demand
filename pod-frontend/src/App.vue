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

/* always present */
.expand-transition {
  transition: all .3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}


body {
  background: $bodyGradient;
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-stroke: 0.45px rgba(0, 0, 0, 0.1);
  color: $green;
  background: transparent;
  margin: 0;
  overflow: hidden;
}

</style>
