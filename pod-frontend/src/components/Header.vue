<template>
  <header class="header">
      <div class="header__logo" @click="$router.push('/')">
        <h1>Pension</h1>
        <p>on demand</p>
      </div>
      <div class="header__nav">
          <router-link to="/">Om tjänsten</router-link>
          <router-link to="/login">Kom igång</router-link>
      </div>
      <div class="header__profile">
          <Profile /> 
      </div>
      
  </header>
</template>

<script>
import Profile from './Profile.vue';

export default {

    components: {
        Profile
    },
}
</script>

<style lang="scss">
@import '@/scss/';

.header {
    align-items: center;
    background: $headerGradient;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    min-height: 200px;
    position: relative;
    overflow: hidden;

    &__logo {
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        flex: 1;

        > p {
            position: absolute;
            top: 3.75rem;
            right: 0;
        }
    }

    &__nav {
        flex: 2;
        @extend %center-content;

        > a {
            color: $light;
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: $letterSpacing * 8;
            font-family: $mainText;
            font-size: 1.375em;
            font-weight: 500;
            margin: 0 1.5rem;
        }
    }

    &__profile {
        flex: 1;
        margin-right: 1rem;
    }

    @include breakpoints(large) {
        flex-direction: row;
    }
}

</style>