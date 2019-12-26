<template>
<main class="login-container">
  <div class="login">
    <div class="login__logo">
        <h1>Pension</h1>
        <p>on demand</p>
    </div>
    <div class="login__text">
      <p>Välkommen tillbaka! Vänligen logga in med dina uppgifter.</p>
    </div>

    <div class="login__tabs">
      <Tabs 
        v-for="tab in tabs" 
        :key="tab.id" 
        :tab="tab"
      />
    </div>

    <LoginForm :tabs="tabs" />

  </div>
</main>
</template>

<script>
import { Tabs, LoginForm } from '@/components/'; 

export default {
  name: 'Login',

  data() {
    return {
      tabs: [
        {
          title: 'BankID på den här datorn',
          isActive: true
        },
        {
          title: 'Mobilt BankID',
          isActive: false
        }
      ], 
    }
  },
  
  components: {
    Tabs, LoginForm
  },


}
</script>

<style lang="scss"> 
@import '../scss/';

.login-container {
  @extend %center-content;
  height: 100vh;
}

.login {
  background: $white;
  @extend %column;
  height: 100%;
  margin: 0 auto;
  padding: 0 .5rem;
  overflow: auto;

  &__logo {
    margin: 0 auto;
    position: relative;
    text-align: right;

    > p {
      text-align: right;
      position: absolute;
      top: 3.75rem;
      right: 0;
    }

  }

  &__tabs {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }

  &__text {
    align-items: center;
    display: flex;
    > a {
      margin-bottom: .5rem;
      padding: 1rem;
    }
  }


  &__loading {
      @extend %column;
      align-items: center; 
      justify-content: space-between;
      // TODO - fixa hoppen.
      flex: 1;
  }

  &__form {
    border: 1px solid $borderColor;
    @extend %center-content;
    flex-direction: column;
    flex: 1;
    min-height: 16rem;
  }

  &__forminput {
    flex-direction: column;
    flex: 1;
    margin: 0;
    @extend %center-content;

    > input {
      background: #efefef url('../assets/img/bankid.png') no-repeat top 12px right 1rem;
      background-size: 2.75rem;
      border-radius: $borderRadius;
      border: 1px solid $borderColor;
      padding: 1rem; 
      font-size: 1em;
      letter-spacing: $letterSpacing * 2;
      height: 2rem;
      margin: 1rem 0;
      min-width: 16rem;

      &::placeholder {
        font-family: $btnText;
        font-size: 1.5em;
        color: #43425D;
      }

    }
  }

  @include breakpoints(large) {
    border-radius: $borderRadius;
    height: auto;
    padding: 0 2rem;

    &__text {
      min-height: 6rem;
      padding-bottom: 0;
    }

    &__tabs {
      flex-direction: row;
    }

    &__form {
      padding: .5rem 2.5rem 0 2.5rem;
    }

    &_forminput {
      padding: 1rem .5rem;
      margin-bottom: 1rem;
      min-height: 8.2rem;

      > input {
        min-width: 20rem;
      }
    }

  }

}

</style>