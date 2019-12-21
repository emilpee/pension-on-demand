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
          title: 'På den här enheten',
          isActive: true
        },
        {
          title: 'På annan enhet',
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
  margin: 0 auto;
  padding: 0 1rem;

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
    display: flex;
    flex: 1;
    align-items: center;
  }


  &__loading {
      @extend %column;
      align-items: center; 
      justify-content: space-between;
      flex: 2;
  }

  &__form {
    border: 1px solid $borderColor;
    @extend %center-content;
    flex-direction: column;
    padding: .5rem 2.5rem 0 2.5rem;
    margin-bottom: 1rem;
    min-height: 16rem;
    
    &input {
      flex-direction: column;
      flex: 1;
      margin: 0;
      @extend %center-content;

      > input {
        background: #efefef url('../assets/img/bankid.png') no-repeat top 4px right 1rem;
        background-size: 2.5rem;
        border-radius: $borderRadius;
        border: 1px solid $borderColor;
        padding: 1rem; 
        min-width: 20rem;
        margin: 1rem 0;
  
        &::placeholder {
          font-family: $btnText;
          font-size: 15px;
          color: #43425D;
        }
  
      }
    }

  }

  @include breakpoints(large) {
    border-radius: $borderRadius;
    height: auto;
    padding: 0 2rem;

    &__text {
      min-height: 6rem;
    }

    &__tabs {
      flex-direction: row;
    }

  }

}

</style>