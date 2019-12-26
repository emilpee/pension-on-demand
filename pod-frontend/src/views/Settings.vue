<template>
  <main class="container">
    <div class="settings">
    <section class="text">
      <h1>Mina tillgångar</h1>
      <h2>För att göra en bättre analys...</h2>
      <span>Nu kan du hantera din framtid själv, inga fler besök hos pensionsrådgivare.</span>
    </section>

    <SettingsItem v-if="userData.salary" :setting="salary" />
    <SettingsItem v-for="data in settingsData" :key="data.id" :setting="data" /> 

    <section class="settings__message">
        <transition name="fade">
            <p :key="message" v-text="message"></p>
        </transition>
            <loading-spinner v-show="loading" />
    </section>

    <section class="settings__button">
            <Button msg="Spara" @click.native="updateSettingsData" />
    </section>

    </div>
  </main>
</template>

<script>
import { SettingsItem, Button, LoadingSpinner } from '../components/';
import data from '../data/data.json';

export default {

    data() {
        return {
            userData: [],
            message: '',
            settingsData: data[0].settingsData,
            salary: data[0].salary,
            choices: data[0].choices,
            loading: false
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
        SettingsItem, Button, LoadingSpinner
    },
    methods: {
        getUserInfo() {
            this.loading = true;
            this.$store.dispatch('getUserData', this.personalNr).then(doc => {
                // Set DB data
                this.userData = doc.data();
                this.$store.commit('setUserData', this.userData);  

                for (let i = 0; i < this.choices.length; i++) {
                    this.choices[i].value = this.userData.choices[i].value;
                    this.choices[i].percent = this.userData.choices[i].percent;
                }

                this.salary.value = Number(this.userData.salary.value);  
                this.salary.percent = Number(this.userData.salary.percent);  
                this.$store.commit('setSalary', this.salary);      
                this.loading = false;
            })
         
        },

        updateSettingsData() {
            this.loading = true;
            this.$store.dispatch('updateUserData', { salary: this.salary, choices: this.choices }).then(() => {
                this.message = 'Dina inställningar sparades!';
                this.loading = false;
            })
            
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
        padding: 1rem 0;
        > p {
            margin: 0;
        }
    }

    &__button {
        @extend %center-content;
        padding: 2rem 0;

        > a {
            width: 15rem;
            text-align: center;
        }
    }

    @include breakpoints(large) {

        &__button {
            > a {
                width: 10rem;
            }
        }
    }
}

</style>