<template>
    <div class="login__form">
      <p>{{ tabs.title }}</p>

        <div class="login__forminput" v-show="!loading">
            <span class="error-message">{{ error }}</span>
            <img src="../../src/assets/img/bankid.png" alt="BankID logo" v-if="tabs[0].isActive" /> 
            <input type="text" placeholder="Personnummer" v-model="personNr" v-else />
        </div>
        <div class="login__loading" v-show="loading" v-if="!tabs[0].isActive">
            <p class="message">{{ msg }}</p> 
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
            interval: '',
            msg: '',
            error: ''
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
                this.$store.dispatch('signInOnMobile', { ssn: this.personNr }).then(res => {
                    this.loading = true;
                    console.log(res);

                    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                        // Sign in iOS
                        let url = `https://app.bankid.com/?autostarttoken=${res.data.autoStartToken}&redirect=null`;
                        console.log(url);
                        this.orderRef = res.data.orderRef;
                    } else if (navigator.userAgent.match(/Android/i)) {
                        // Sign in Android
                        console.log('Android');
                    }

                    this.$store.dispatch('checkStatus', { status: res.data.orderRef }).then(response => {
                        this.interval = 2000;
                        let status = response.data.status;

                        if (status === "pending") {
                            this.msg = "Väntar på svar från BankID...";

                            let interval = setInterval(() => {
                                this.$store.dispatch('checkStatus', { status: res.data.orderRef }).then(resp => {
                                    let status = resp.data.status;
                                    console.log(resp);

                                    if (status === "complete") {
                                        clearInterval(interval);
                                        this.$store.commit('updateUser', resp.data.user);
                                        sessionStorage.setItem('user', resp.data.token); 
                                        this.navigateUser();
                                    }

                                    if (status === "failed") {
                                        console.log(resp);

                                        if (resp.data.hintCode === "userCancel") {
                                            this.error = "Du har avbrutit signeringen.";
                                        }

                                        else if (resp.data.hintCode === "expiredTransaction") {
                                            this.error = "Inget svar från BankID-appen. Var god försök igen.";
                                        }

                                        else {
                                            this.error = "Något gick fel. Var god försök igen.";
                                        }
                                        
                                        clearInterval(interval);
                                        this.cancelSignIn();
                                    }

                                })
                            }, this.interval)

                        }
                        
                    });

                });
            }
        },

        cancelSignIn() {
            this.loading = false;
            this.interval = '';
        }, 

        navigateUser() {
            if (sessionStorage.getItem('user') !== null) {
                this.$store.commit('hasSignedIn', true) 
                this.$router.push('/');
            }
        }

    },
    
    computed: {
        signedIn() {
            return this.$store.state.signedIn;
        },
        user() {
            return this.$store.state.user;
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '@/scss/';

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

    .error-message {
        color: $red;
        font-weight: 500;
        font-size: 1em;
        text-align: center;
    }

    .message {
        font-size: 1em;
        font-weight: normal;
    }

</style>