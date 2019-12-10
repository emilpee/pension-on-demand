<template>
  <main class="container">
    <div class="settings">
    <section class="text">
      <h1>Mina tillgångar</h1>
      <h2>För att göra en bättre analys...</h2>
      <span>Nu kan du hantera din framtid själv, inga fler besök hos pensionsrådgivare.</span>
    </section>

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
            settingsData: data[0].settingsData
        }
    },

    computed: {
        personalNr() {
            return this.$store.state.personalNr;
        }
    },

    mounted() {
        this.$store.commit('setPersonalNr', this.$store.state.user.personalNumber);
        this.getUserInfo();
    },

    components: {
        SettingsItem, Button
    },
    methods: {
        getUserInfo() {
            this.$store.dispatch('getUserData', this.personalNr).then(res => {
                res.get().then(doc => {
                    if (doc.exists) {  
                        console.log(doc.data());
                        // If exist, show data stored in db
                        for (let i = 0; i < this.settingsData.length; i++) {
                            for (let j = 0; j < doc.data().income.length; j++) {
                                this.settingsData[i].value = doc.data().income[j].value;
                                this.settingsData[i].procent = doc.data().income[j].procent;
                            }
                        }

                    } else if (!doc.exists) {
                        res.set({
                            income: [
                                {
                                    type: "lön",
                                    value: 0,
                                    procent: 0
                                },
                                {
                                    type: "fastighet",
                                    value: 0,
                                    procent: 0
                                },
                                {
                                    type: "båt",
                                    value: 0,
                                    procent: 0
                                },
                                {
                                    type: "fordon",
                                    value: 0,
                                    procent: 0
                                },
                                {
                                    type: "övrigt",
                                    value: 0,
                                    procent: 0
                                }
                            ]
                        }, { merge: true })
                    }

                    this.userData = doc.data();
                    this.$store.commit('setUserData', this.userData);
                    
                })
            })
        },

        updateSettingsData() {
            this.$store.dispatch('getUserData', this.personalNr).then(res => {
                // TODO - make dynamic
                let data = [];

                for (let i = 0; i < this.settingsData.length; i++) {
                    data.push(this.settingsData[i].value);
               
                    res.set({
                            income: [
                            {
                                type: "lön",
                                value: data[0],
                                procent: 0
                            },
                            {
                                type: "fastighet",
                                value: this.settingsData[1].value,
                                procent: 0
                            },
                            {
                                type: "båt",
                                value: this.settingsData[2].value,
                                procent: 0
                            },
                            {
                                type: "fordon",
                                value: this.settingsData[3].value,
                                procent: 0
                            },
                            {
                                type: "övrigt",
                                value: this.settingsData[4].value,
                                procent: 0
                            }
                        ]
                    }, { merge: true }).then(() => {
                        this.message = "Dina inställningar sparades!"
                    })

                }
                this.$store.commit('setUserData', data);
            })       
        }

    },

    watch: {
        values: function() {
            this.message = '';
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