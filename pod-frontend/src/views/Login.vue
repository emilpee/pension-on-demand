<template>
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
        v-show="!choosedDevice"
      />
    </div>

    <LoginForm :tabs="tabs" v-show="!choosedDevice" />

    <div class="login__form" v-show="choosedDevice">
      <input type="text" placeholder="Personnummer" v-model="personNr" />
      <Button msg="Logga in" @click.native="signIn" />
    </div>

  </div>
</template>

<script>
import { Tabs, Button } from '@/components/'; 
import LoginForm from './LoginForm.vue';

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
      personNr: ''
    }
  },

  computed: {
    choosedDevice() {
      return this.$store.state.choosedDevice;
    }
  },

  methods: {

    signIn() {
      this.$router.push('/');
    },
    
  },
  
  components: {
    Tabs, Button, LoginForm
  },


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
      top: 5rem;
      right: 0;
    }
  }

  &__tabs {
    display: flex;
    margin-top: 1rem;
  }


  &__form {
    border: 1px solid $borderColor;
    @extend %center-content;
    flex-direction: column;
    padding: 4rem 2.5rem;

    > input {
      background: #efefef url('../assets/img/bankid.png') no-repeat top 4px right 1rem;
      background-size: 2.5rem;
      border-radius: $borderRadius;
      border: 1px solid $borderColor;
      padding: 1rem; 
      max-width: 400px;
      width: 100%;

      &::placeholder {
        font-family: $btnText;
        font-size: 15px;
        color: #43425D;
      }

    }

  }

}

</style>