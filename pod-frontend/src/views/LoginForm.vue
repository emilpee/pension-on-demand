<template>
    <div class="login__form">
      <p>{{ tabs.title }}</p>

      <div class="login__forminput">
        <img src="../../src/assets/img/bankid.png" alt="BankID logo" v-if="tabs[0].isActive" /> 
        <input type="text" placeholder="Personnummer" v-model="personNr" v-else />
      </div>

      <Button msg="Öppna BankID-applikationen" @click.native="signIn" />
      <div class="login__text">
        <p @click="$store.commit('setChoosedDevice', false)" :style="{ textDecoration: 'underline' }">Avbryt</p>
      </div>
    </div>
</template>

<script>
import { Button } from '../components/';

export default {

    data() {
        return {
            personNr: ''
        }
    },
    
    props: {
        tabs: Array
    },

    components: {
        Button
    },

    methods: {
        // chooseDevice() {
        //     this.$store.commit('setChoosedDevice', true);
        // },
        signIn() {
            this.$router.push('/');
        },
    }
    
}
</script>

<style lang="scss" scoped>

    .login__form {
        border-top: none;
    }

</style>