<template>
  <div class="login">
    <div class="login__logo">
        <h1>Pension</h1>
        <p>on demand</p>
    </div>
    <div class="login__text">
      <p>Välkommen tillbaka! Vänligen logga in med dina uppgifter.</p>
    </div>
    <div class="login__form">
      <input type="text" placeholder="Personnummer" />
      <Button msg="Logga in" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';


export default {
  name: 'Login',
  
  components: {
    Button
  },

  methods: {

  }

}
</script>

<style lang="scss"> 
@import '../scss/';

.login {
  background: $white;
  border-radius: $borderRadius;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 570px;
  padding: 1rem 2rem;

  &__logo {
    margin: 0 auto;
    position: relative;
    text-align: right;

    > p {
      text-align: right;
      position: absolute;
      top: 5.3rem;
      right: 0;
    }
  }


  &__form {
    border: 1px solid rgba(112, 112, 112, .08);
    @extend %center-content;
    flex-direction: column;
    padding: 4rem 2.5rem;

    > input {
      background: #efefef url('../assets/img/bankid.png') no-repeat right;
      background-size: 2.75rem;
      border-radius: $borderRadius;
      border: 1px solid rgba(112, 112, 112, .08);
      padding: 1rem;
      max-width: 400px;
      width: 100%;
    }

  }
}

</style>