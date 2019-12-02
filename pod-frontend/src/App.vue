<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
