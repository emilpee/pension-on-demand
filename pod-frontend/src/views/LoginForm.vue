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
import axios from 'axios';
 
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
        async signIn() {
            if (this.tabs[0].isActive) {
                let link = "bankid://redirect=" + document.location;
                document.location = link;
            } else {
                // this.$router.push('/');
                await axios.post('https://hfzn51rqf2.execute-api.eu-west-1.amazonaws.com/Prod/bankid', { ssn: this.personNr }).then(res => {
                    console.log(res);
                    res.Authenticate({subjectIdentifier: this.personNr, rpDisplayName: 'test'});
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