<template>
  <header class="header">

      <div class="header__mobile">
          <MobileMenu />
      </div>

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

      <img src="http://erikdkennedy.com/r-r-r-random/divider-triangle.png" class="header__bg" />
  </header>
</template>

<script>
import Profile from './Profile.vue';
import MobileMenu from './elements/MobileMenu';

export default {
    components: {
        Profile, MobileMenu
    },
}

</script>

<style lang="scss">
@import '@/scss/';

.header {
    background: $headerGradient;
    @extend %center-content;
    flex-direction: column;
    height: 12.5rem;
    position: relative;

    &__bg {
        border: none;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 15%;
    }

    &__logo {
        display: flex;
        cursor: pointer;
        align-items: center;
        position: relative;
        flex: 3;

        > p {
            position: absolute;
            top: 6.75rem;
            right: 0;
        }
    }

    &__nav {
        flex: 8;
        @extend %center-content;

        > a {
            color: $light;
            text-decoration: none;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: $letterSpacing * 8;
            font-family: $mainText;
            font-size: 1.375em;
            font-weight: 500;
            margin: 0 1.5rem;
        }
    }

    &__profile {
        display: none;
    }

    &__nav {
        display: none;
    }
    
    &__mobile {
        display: flex;
    }

    @include breakpoints(medium) {
        &__bg {
            width: 100%;
        }
    }

    @include breakpoints(large) {
        height: 15rem;
        flex-direction: row;
        justify-content: space-between;

        &__logo {
            justify-content: flex-end;
        }

        &__bg {
            width: 100%;
        }

        &__profile {
            display: flex;
            flex: 4;
        }

        &__mobile {
            display: none;
        }

        &__nav {
            display: flex;
            > a {
                height: 3rem;

            }
        }

        &__logo {
            > p {
                top: 3.75rem;
            }
        }

    }
}

</style>