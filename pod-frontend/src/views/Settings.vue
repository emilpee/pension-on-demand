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
            storeData: []
        }
    },

    computed: {
        personalNr() {
            return this.$store.state.personalNr;
        },
        settingsItems() {
            return this.$store.state.settingItems;
        }
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

                // Set DB data
                this.userData = doc.data();
                this.$store.commit('setUserData', this.userData);  
 
      
                this.userData.income.forEach(asset => {

                    this.settingsData.forEach(data => {

                        asset.choices.forEach(assetA => {
                            console.log(assetA);
                        })

                        data.choices.forEach(dataA => {
                            console.log(dataA);
                        })

                    })

                })

                
                // this.userData.income.forEach(asset => {
                //     for (let i = 0; i < asset.choices.length; i++) {
                //         console.log(asset.choices[i].value);
                //     }
                // })
            
                // this.settingsData.forEach(asset => {
                //     for (let j = 0; j < asset.choices.length; j++) {
                       
                //         console.log(asset.choices[j].value)
                    
                //     }
                // })

                
                // this.settingsData.forEach(data => {
                    
                //     data.choices.forEach(item => {
                //         doc.data().income.forEach(asset => {
                //             asset.choices.forEach(assetItem => {
                //                 console.log(assetItem.value);
                //                 assetItem.value = item.value;
                //             })
                //         })
                //     })


                    // asset.choices.forEach(item => {
                    //     console.log(item);
                    //     console.log(doc.data().income);
                //     // })
                // })

                // doc.data().income.forEach(asset => {

                //     asset.choices.forEach( item => {

                //         this.userData = item;

                //         console.log(item.value);
                //         console.log(item.procent);
                    
                //     })


                // })

                this.salary.value = doc.data().salary.value;         
            })
        },

        updateSettingsData() {
            this.$store.dispatch('getUserData', this.personalNr).then(() => {

                this.storeData = {
                    income: [
                        {
                            type: this.settingsData[0].title,
                            value: Number(this.settingsItems[0][0].value + this.settingsItems[0][1].value + this.settingsItems[0][2].value),
                            choices: [
                                {
                                    type: "Villa",
                                    value: 0,
                                    procent: Number(this.settingsItems[0][0].procent),
                                },
                                {
                                    type: "Lägenhet",
                                    value: 0,
                                    procent: Number(this.settingsItems[0][1].procent),
                                },
                                {
                                    type: "Stuga",
                                    value: 0,
                                    procent: Number(this.settingsItems[0][2].procent),
                                }
                            ]
                        },
                        {
                            type: this.settingsData[1].title,
                            value: Number(this.settingsData[1].value),
                            choices: [
                                {
                                    type: "Bil",
                                    value: Number(this.settingsItems[0][0].value),
                                    procent: Number(this.settingsItems[0][0].procent),
                                },
                                {
                                    type: "Motorcykel",
                                    value: Number(this.settingsItems[0][0].value),
                                    procent: Number(this.settingsItems[0][0].procent),
                                },
                                {
                                    type: "Båt",
                                    value: Number(this.settingsItems[0][0].value),
                                    procent: Number(this.settingsItems[0][0].procent),
                                }
                            ]
                        },
                        {
                            type: this.settingsData[2].title,
                            value: Number(this.settingsData[2].value),
                            choices: [
                                {
                                    type: "Konst",
                                    value: Number(this.settingsItems[2][0].value),
                                    procent: Number(this.settingsItems[1][0].procent),
                                },
                                {
                                    type: "Värdeföremål",
                                    value: Number(this.settingsItems[2][1].value),
                                    procent: Number(this.settingsItems[2][1].procent),
                                }
                            ]
                        }
                    ],
                    salary: {
                        type: "Lön",
                        value: Number(this.salary.value),
                        procent: Number(this.salary.procent)
                    }
                }


                })
     
            this.$store.dispatch('updateUserData', this.storeData).then(() => {
                this.message = "Dina inställningar sparades!"
            });

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