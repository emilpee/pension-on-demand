<template>
    <div class="login__form">
      <p>{{ tabs.title }}</p>

      <div class="login__forminput">
        <img src="../../src/assets/img/bankid.png" alt="BankID logo" v-if="tabs[0].isActive" /> 
        <input type="text" placeholder="Personnummer" v-model="personNr" v-else />
      </div>

      <Button msg="Öppna BankID-applikationen" @click.native="signIn" />
      <div class="login__text">
        <p :style="{ textDecoration: 'underline' }">Avbryt</p>
      </div>
    </div>
</template>

<script>
import { Button } from '../components/';
 
export default {

    data() {
        return {
            personNr: '197512165668',
            orderRef: ''
        }
    },
    
    props: {
        tabs: Array
    },

    components: {
        Button
    },

    methods: {
        signIn() {
            if (this.tabs[0].isActive) {
                let link = "bankid://redirect=" + document.location;
                document.location = link;
            } else {
               this.$store.dispatch('signInOnMobile', { ssn: this.personNr }).then(res => {
                   let url = `https://app.bankid.com/?autostarttoken=${res.autoStartToken}&redirect=null`;
                   console.log(url);
               })
            }
        },
    }
    
}
</script>

<style lang="scss" scoped>

    .login__form {
        border-top: none;
    }

</style>