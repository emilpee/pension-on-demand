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
            salary: data[0].salary,
            choices: data[0].choices
        }
    },

    computed: {
        personalNr() {
            return this.$store.state.personalNr;
        }
    },

    mounted() {
        this.$store.commit('setChoices', this.choices);
        this.$store.commit('setPersonalNr', sessionStorage.getItem('personal'));
        this.getUserInfo();
    },

    components: {
        SettingsItem, Button
    },
    methods: {
        getUserInfo() {
            this.$store.dispatch('getUserData', this.personalNr).then(doc => {

                // Set DB data
                this.userData = doc.data();
                this.$store.commit('setUserData', this.userData);  


                for (let i = 0; i < this.choices.length; i++) {
                    this.choices[i].value = this.userData.choices[i].value;
                    this.choices[i].procent = this.userData.choices[i].procent;
                }

                this.salary.value = this.userData.salary.value;         
            })
        },

        updateSettingsData() {
            this.$store.dispatch('getUserData', this.personalNr).then(() => {      

                // TODO - gör dynamisk
                var data = {
                    choices: [
                        {
                            type: "Villa",
                            value: this.choices[0].value,
                            procent: this.choices[0].procent
                        },
                        {
                            type: "Lägenhet",
                            value: this.choices[1].value,
                            procent: this.choices[1].procent
                        },
                        {
                            type: "Stuga",
                            value: this.choices[2].value,
                            procent: this.choices[2].procent
                        },
                        {
                            type: "Bil",
                            value: this.choices[3].value,
                            procent: this.choices[3].procent
                        },
                        {
                            type: "Motorcykel",
                            value: this.choices[4].value,
                            procent: this.choices[4].procent
                        },
                        {
                            type: "Båt",
                            value: this.choices[5].value,
                            procent: this.choices[5].procent
                        },
                        {
                            type: "Konst",
                            value: this.choices[6].value,
                            procent: this.choices[6].procent
                        },
                        {
                            type: "Värdeföremål",
                            value: this.choices[7].value,
                            procent: this.choices[7].procent
                        }
                            
                    ],
                    salary: {
                        value: Number(this.salary.value),
                        procent: Number(this.salary.procent)
                    }
                }

                this.$store.dispatch('updateUserData', data).then(() => {
                    this.message = "Dina inställningar sparades!"
                });

                })


            } 
                
        },
        watch: {
            salary: function() {
                console.log(this.salary);
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