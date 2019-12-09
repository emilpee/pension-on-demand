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
import { db } from '../../firebase-config';
 
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
                // TODO - ta bort hårdkodat personnummer.
                this.$store.dispatch('signInWithBankID', { ssn: '199309246214' }).then(res => {
                    let url = `bankid://?autostarttoken=${res.data.autoStartToken}&redirect=null`;
                    document.location = url;
                    this.orderRef = res.data.orderRef;
                    this.checkStatus();
                })
                
            } else {
                this.$store.dispatch('signInWithBankID', { ssn: this.personNr }).then(res => {
                    this.loading = true;

                    let url = `https://app.bankid.com/?autostarttoken=${res.data.autoStartToken}&redirect=null`;
                    console.log(url);
                    this.orderRef = res.data.orderRef;
                    this.checkStatus();
                })
            }

            },
         
        cancelSignIn() {
            // TODO - avbryt request.
            this.loading = false;
            this.interval = '';
        }, 

        navigateUser() {
            if (sessionStorage.getItem('user') !== null) {
                this.$store.commit('hasSignedIn', true) 
                this.$router.push('/');
            }
        },

        checkStatus() {
            this.$store.dispatch('checkStatus', { status: this.orderRef }).then(response => {

            // Check status every 2 seconds
            this.interval = 2000;
            let status = response.data.status;

            if (status === "pending") {
                this.msg = "Väntar på svar från BankID...";

                let interval = setInterval(() => {
                    this.$store.dispatch('checkStatus', { status: this.orderRef }).then(resp => {
                        let data = resp.data;
                        let status = data.status;

                        // User successfully signed the application
                        if (status === "complete") {
                            clearInterval(interval);
                            let fbData = db.collection("pensiondata").doc(data.user.personalNumber);

                            const personalNr = data.user.personalNumber.substr(0,8);
                            let today = new Date();
                            let currentDate = today.getDate(); 
                            currentDate < 10 ? currentDate = '0' + currentDate : currentDate;
                            
                            let date = today.getFullYear()+''+(today.getMonth()+1)+''+currentDate;

                            let currentAge = date - personalNr;

                            fbData.set({
                                user: {
                                    name: data.user.name,
                                    personalNr: data.user.personalNumber,
                                    age: currentAge.toString().substr(0,2)
                                }
                            });

                            sessionStorage.setItem('user', resp.data.token); 
                            this.navigateUser();
                        }

                        if (status === "failed") {

                            if (data.hintCode === "userCancel") {
                                this.error = "Du har avbrutit signeringen.";
                            }

                            else if (data.hintCode === "expiredTransaction") {
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