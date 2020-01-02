<template>
    <div class="login__form">
      <p>{{ tabs.title }}</p>

        <div class="login__forminput" v-show="!loading">
            <span :style="{ margin: 0 }" class="error-message">{{ error }}</span>
            <img src="../../src/assets/img/bankid.png" alt="BankID logo" v-if="tabs[0].isActive" /> 
            <input type="text" placeholder="Personnummer" @focus="error = ''" v-model="personNr" v-else />
        </div>

        <div class="login__loading" v-show="loading">
            <p class="message">{{ msg }}</p> 
            <loading-spinner />
        </div>

        <div class="login__text">
            <Button msg="Öppna BankID-applikationen" v-show="!loading" @click="signIn" @click.native="signIn" /> 
            <p v-show="loading" :style="{ textDecoration: 'underline', cursor: 'pointer' }" @click="cancelSignIn">Avbryt</p>
        </div>
    </div>
</template>

<script>
import Button from './elements/Button';
import LoadingSpinner from './elements/LoadingSpinner';
import { db } from '../../firebase-config';
 
export default {

    data() {
        return {
            personNr: '196406073731',
            orderRef: '',
            loading: false,
            interval: '',
            msg: '',
            error: '',
            cancel: false
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
                this.$store.dispatch('signInWithBankID', { autostart: true }).then(res => {
                    let url = `bankid://?autostarttoken=${res.data.autoStartToken}&redirect=${encodeURI(document.location)}`;
                    document.location = url;
                    this.orderRef = res.data.orderRef;
                    this.loading = true;
                    this.checkStatus();
                })
                
            } else {
                this.$store.dispatch('signInWithBankID', { ssn: this.personNr }).then(res => {
                    this.loading = true;
                    let url = `https://app.bankid.com/?autostarttoken=${res.data.autoStartToken}&redirect=null`;
                    // If on mobile, open application.
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        document.location = url;
                    }
                    this.orderRef = res.data.orderRef;
                    this.checkStatus();
                })
            }

            },
         
        cancelSignIn() {
            this.$store.dispatch('signInWithBankID', { cancel: this.orderRef }).then(res => {
                res.data ? this.cancel = true : this.cancel;
            });
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
            this.error = '';

            this.$store.dispatch('checkStatus', { status: this.orderRef }).then(response => {
            // Check status every 2 seconds
            this.interval = 2000;
            let status = response.data.status;

            if (status === "pending") {
                this.msg = "Starta BankID-appen...";

                let interval = setInterval(() => {
                    this.$store.dispatch('checkStatus', { status: this.orderRef }).then(resp => {
                        let hintCode = resp.data.hintCode
                        let data = resp.data;
                        let status = data.status;
                    
                        if (hintCode === "userSign") {
                            this.msg = "Skriv in din säkerhetskod i BankID-appen och välj Legitimera eller Skriv under.";
                        }

                        if (hintCode === "outstandingTransaction") {
                            this.msg = "Försöker starta BankID-appen...";
                        }

                        // User cancels the request
                        this.cancel === true ? status = "failed" : status;

                        // User successfully signed the application
                        if (status === "complete") {
                            clearInterval(interval);
                            let fbData = db.collection("pensiondata").doc(data.user.personalNumber);

                            // Räkna ut ålder baserat på personnummer
                            const personalNr = data.user.personalNumber.substr(0,8);
                            let today = new Date();
                            let currentDate = today.getDate(); 
                            let currentMonth = today.getMonth() + 1;
     
                            currentDate < 10 ? currentDate = '0' + currentDate : currentDate;
                            currentMonth < 10 ? currentMonth = '0' + currentMonth : currentMonth;
                            
                            let date = today.getFullYear()+''+currentMonth+''+currentDate;

                            let currentAge = date - personalNr;

                            fbData.get().then(doc => {
                                    
                                if (!doc.exists) {
                                    fbData.set({
                                        user: {
                                            name: data.user.name,
                                            personalNr: data.user.personalNumber,
                                            age: currentAge.toString().substr(0,2)
                                        },
                                        pension: [
                                            {
                                                type: "Allmän pension",
                                                title: "Pension",
                                                value: 0
                                            },
                                            {
                                                type: "Tjänstepension",
                                                title: "Pension",
                                                value: 0
                                            }
                                        ],
                                        income: [
                                            {
                                                type: "Fastigheter",
                                                value: 0,
                                            },
                                            {
                                                type: "Fordon",
                                                value: 0,
                                            },
                                            {
                                                type: "Övrigt",
                                                value: 0,
                                            }
                                        ],
                                        choices: [
                                            {
                                                type: "Villa",
                                                value: 0,
                                                percent: 3.8,
                                                parent: "Fastigheter"
                                            },
                                            {
                                                type: "Lägenhet",
                                                value: 0,
                                                percent: 4.3,
                                                parent: "Fastigheter"
                                            },
                                            {
                                                type: "Stuga",
                                                value: 0,
                                                percent: 3,
                                                parent: "Fastigheter"
                                            },
                                            {
                                                type: "Bil",
                                                value: 0,
                                                percent: -8,
                                                parent: "Fordon"
                                            },
                                            {
                                                type: "Motorcykel",
                                                value: 0,
                                                percent: -8,
                                                parent: "Fordon"
                                            },
                                            {
                                                type: "Båt",
                                                value: 0,
                                                percent: -3,
                                                parent: "Fordon"
                                            },
                                            {
                                                type: "Konst",
                                                value: 0,
                                                percent: 1,
                                                parent: "Övrigt"
                                            },
                                            {
                                                type: "Värdeföremål",
                                                value: 0,
                                                percent: 0.5,
                                                parent: "Övrigt"
                                            }
                                                
                                        ],
                                        salary: {
                                            type: "Lön",
                                            value: 0,
                                            percent: 1
                                        }
                                    }, { merge: true });
                                }
                            })

                            this.$store.commit('setUser', resp.data.user)

                            sessionStorage.setItem('user', resp.data.token); 
                            sessionStorage.setItem('personal', resp.data.user.personalNumber);
                            this.navigateUser();
                        }

                        if (status === "failed") {
                            let error = data.hintCode;

                            switch(error) {
                                case "userCancel":
                                    this.error = "Åtgärd avbruten."
                                    break;
                                case "expiredTransaction": 
                                    this.error = "BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning."
                                    break;
                                case "alreadyInProgress": 
                                    this.error = "En identifiering eller underskrift för det här personnumret är redan påbörjad. Försök igen.";
                                    break;
                                case "requestTimeout": 
                                    this.error = "Internt tekniskt fel. Försök igen.";
                                    break;
                                case "cancelled": 
                                    this.error = "Åtgärd avbruten. Försök igen.";
                                    break;
                                case "certificateError": 
                                    this.error = "Det BankID du försöker använda är för gammalt eller spärrat.";
                                    break;
                                case "startFailed":
                                    this.error = "BankID-appen verkar inte finnas i din dator eller telefon. Installera den och hämta ett BankID hos din internetbank.";
                                    break;
                                default:
                                    this.cancel === true ? this.error = "Åtgärd avbruten." : this.error = "Något gick fel. Var god försök igen.";
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
    },

    watch: {
        tabs: function() {
            this.error = '';
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import '@/scss/';

    .login__form {
        border-top: none;
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
        max-width: 18.75rem;
        min-height: 2rem;
        text-align: center;
    }

</style>