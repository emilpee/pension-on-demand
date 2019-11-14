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
      <img src="../assets/img/bankid.png" alt="bankid logo" />
    </div>
  </div>
</template>

<script>
export default {

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
  padding: 2rem;

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
  }
}

</style>