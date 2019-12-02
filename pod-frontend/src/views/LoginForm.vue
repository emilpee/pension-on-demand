<template>
    <div class="login__form">
      <p>{{ tabs.title }}</p>

        <div class="login__forminput" v-show="!loading">
            <img src="../../src/assets/img/bankid.png" alt="BankID logo" v-if="tabs[0].isActive" /> 
            <input type="text" placeholder="Personnummer" v-model="personNr" v-else />
        </div>
        <div class="login__loading" v-show="loading" v-if="!tabs[0].isActive">
            <loading-spinner />
        </div>

      <Button msg="Öppna BankID-applikationen" v-show="!loading" @click.native="signIn" /> 
      <div class="login__text">
        <p :style="{ textDecoration: 'underline', cursor: 'pointer' }" @click="cancelSignIn">Avbryt</p>
      </div>
    </div>
</template>

<script>
import { Button, LoadingSpinner } from '../components/';
 
export default {

    data() {
        return {
            personNr: '197512165668',
            orderRef: '',
            loading: false,
            interval: ''
        }
    },
    
    props: {
        tabs: Array
    },

    components: {
        Button, LoadingSpinner
    },

    methods: {
        signIn() {
            if (this.tabs[0].isActive) {
                let link = "bankid://redirect=" + document.location;
                document.location = link;
            } else {
                this.interval = setInterval(() => {
                this.$store.dispatch('signInOnMobile', { ssn: this.personNr }).then(res => {
                    this.loading = true;
                    console.log(res);

                    // Sign in iOS
                    let url = `https://app.bankid.com/?autostarttoken=${res.data.autoStartToken}&redirect=null`;
                    console.log(url);

                    sessionStorage.setItem('user', null);

                    if (sessionStorage.getItem('user') !== null) {
                        this.$store.commit('hasSignedIn', true) 
                        clearInterval(this.interval);
                    }

                })
               }, 2000); 
            }
        },

        cancelSignIn() {
            this.loading = false;
            clearInterval(this.interval);
        }
    },
    
    computed: {
        signedIn() {
            return this.$store.state.signedIn;
        },
    }
    
}
</script>

<style lang="scss" scoped>

    .login__form {
        border-top: none;
    }

    .login__loading {
        display: flex;
        align-items: center; 
        justify-content: space-between;
        flex-direction: column;
        margin: 1rem 0;
    }

</style>