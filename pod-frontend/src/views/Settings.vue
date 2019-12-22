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
                this.salary.procent = this.userData.salary.procent;  
                this.$store.commit('setSalary', this.salary);      
            })
        },

        updateSettingsData() {
            this.$store.dispatch('updateUserData', { salary: this.salary, choices: this.choices }).then(() => {
                this.message = 'Dina inställningar sparades!'
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

        > a {
            width: 80%;
            text-align: center;
        }
    }

    @include breakpoints(large) {
        padding: 0 1.25rem;

        &__button {
            > a {
                width: 10rem;
            }
        }
    }
}

</style>