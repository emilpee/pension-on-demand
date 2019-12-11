<template>
  <main class="container">
    <div class="settings">
    <section class="text">
      <h1>Mina tillgångar</h1>
      <h2>För att göra en bättre analys...</h2>
      <span>Nu kan du hantera din framtid själv, inga fler besök hos pensionsrådgivare.</span>
    </section>

    <SettingsItem :setting="salary" />
    <SettingsItem v-for="data in settingsData" :key="data.id" :setting="data" />

    <section class="settings__message">
        <p v-text="message"></p>
    </section>

    <section class="settings__button">
        <Button msg="Spara" @click.native="updateSettingsData" />
    </section>

    </div>
  </main>
</template>

<script>
import { SettingsItem, Button } from '../components/';
import data from '../data/data.json';

export default {

    data() {
        return {
            userData: [],
            message: '',
            settingsData: data[0].settingsData,
            salary: data[0].salary
        }
    },

    computed: {
        personalNr() {
            return this.$store.state.personalNr;
        },
    },

    mounted() {
        this.$store.commit('setPersonalNr', sessionStorage.getItem('personal'));
        this.getUserInfo();
    },

    components: {
        SettingsItem, Button
    },
    methods: {
        getUserInfo() {
            this.$store.dispatch('getUserData', this.personalNr).then(doc => {
                if (doc.exists) {  
                    // If exist, show data stored in db
                    for (let i = 0; i < this.settingsData.length; i++) {
                        this.settingsData[i].value = doc.data().income[i].value;
                        this.settingsData[i].procent = doc.data().income[i].procent;    
                    }
                    this.salary.value = doc.data().salary.value;

                } 

                this.userData = doc.data();
                this.$store.commit('setUserData', this.userData);     
            })
        },

        updateSettingsData() {
            this.$store.dispatch('getUserData', this.personalNr).then(() => {
                
                let data = {
                    income: [
                        {
                            type: "Fastigheter",
                            value: Number(this.settingsData[0].value),
                            procent: Number(this.settingsData[0].procent),
                        },
                        {
                            type: "Båt",
                            value: Number(this.settingsData[1].value),
                            procent: Number(this.settingsData[1].procent)
                        },
                        {
                            type: "Fordon",
                            value: Number(this.settingsData[2].value),
                            procent: Number(this.settingsData[2].procent)
                        },
                        {
                            type: "Övrigt",
                            value: Number(this.settingsData[3].value),
                            procent: Number(this.settingsData[3].procent)
                        },
                    ],
                    salary: {
                        type: "Lön",
                        value: Number(this.salary.value),
                        procent: Number(this.salary.procent)
                        }
                }


                this.$store.dispatch('updateUserData', data).then(() => {
                    this.message = "Dina inställningar sparades!"
                });
            })

            this.$store.commit('setUserData', data);
        } 
            
    }
}

</script>

<style lang="scss">
@import '@/scss/';

.settings {
    background: $white;
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 1rem;

    .text {
        > h1 {
            padding: 5rem 0 0 0;
        }

        > h2 {
            padding-top: 1rem;
            margin: .25rem 0;
        }
    }

    &__message {
        min-height: 2rem;
        @extend %center-content;
        > p {
            margin: 0;
        }
    }

    &__button {
        @extend %center-content;
        margin: 2rem 0;
    }
}

</style>