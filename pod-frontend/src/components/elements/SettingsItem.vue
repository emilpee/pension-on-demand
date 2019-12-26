<template>
  <section v-if="$parent.userData.choices" class="settings__item">
    <h3>{{ setting.title }}</h3>
    <div v-if="!setting.hasOwnProperty('id')" class="form">
        <div class="form__item">
            <label> {{ setting.labelOne }} </label>
            <div class="form__iteminput salary">
                <input type="text" @input="formatValue(setting)" @blur="formatNumber(setting)" maxlength="10" v-model="setting.value" @focus="$parent.message = ''" placeholder="SEK">
                <span class="salary__item">kr/mån</span>
            </div>
        </div>
        <div class="form__item">
            <label> {{ setting.labelTwo }} </label>
            <div class="form__iteminput salary">
                <input type="text" @input="formatPercent(setting)" maxlength="4" v-model.number="setting.percent" @focus="$parent.message = ''" placeholder="0"> 
                <span class="salary__item">procent</span>
            </div>
        </div>
    </div>

    <div class="form" v-for="choice in filterChoices(setting)" :key="choice.id">
        <div v-if="choice" class="form__item">
            <span v-text="choice.type"></span>
        </div>
        <div class="form__item">
            <label> {{ setting.labelOne }} </label>
            <form class="form__iteminput">
                <input type="text" @input="formatValue(choice)" @blur="formatNumber(choice)" maxlength="10" v-model="choice.value" @focus="$parent.message = ''" placeholder="SEK">
                <span>kr</span>
            </form>
        </div>
        <div class="form__item">
            <label> {{ setting.labelTwo }} </label>
            <div class="form__iteminput">
                <input type="text" @input="formatPercent(choice)" maxlength="4" v-model.number="choice.percent" @focus="$parent.message = ''" placeholder="0">
                <span>procent</span> 
            </div>
        </div>
    </div>
    
  </section>
</template>

<script>


export default {
    props: {
        setting: Object
    },
    computed: {
        choices() {
            return this.$store.state.choices;
        },
    },
    mounted() {
        this.filterChoices();
        if (this.setting.title === "Inkomster") {
            this.setting.value = this.setting.value.toString();
            this.formatNumber(this.setting);
        }
    },
    methods: {
        filterChoices(setting) {
            if (setting) {
                return this.choices.filter(choice => {
                    this.formatNumber(choice);
                    return choice.parent === setting.title;
                })
                    
            }
        },
        formatValue(item) {
            item.value = item.value.replace(/[^0-9]/g,"");
        },
        formatPercent(item) {
            item.percent = item.percent.replace(/[^0-9.-]/g,"");
        },
        formatNumber(item) {
            item.value = item.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/';

.settings__item {
    @extend %column;
    margin: 2rem 0;

    .form {
        display: inherit;
        flex-direction: column;
        background: $light;
        justify-content: center;
        padding: 2rem;

        &__item {
            @extend %column;
            flex: 1;
            justify-content: center;
            margin: 1rem;

            &input { 
                position: relative;

                > input {
                    font-size: 1.25em;
                    width: 95%;
                    padding: 1rem;
                    border: 1px solid $black;
                }

                > span {
                    position: absolute;
                    top: 30%;
                    right: .2rem;
                }

            }

            > span {
                text-align: center;
                font-weight: 500;
            }
        }
    }

    @include breakpoints(medium) {

        .form {
            display: flex;
            flex-direction: column;

            &__item {
                @extend %column;
                justify-content: center;
                margin: 1rem 0 !important;
            }

            &__iteminput {
                > input {
                    width: 95%;
                }
                > span {
                    top: 28%;
                    right: 1rem;
                }
            }

        }

    }

    @include breakpoints(largeFix) {
        .form {
            flex-direction: column !important;

            &__iteminput {
                > input {
                    min-width: 100%;
                }
            }
        }
    }

    @include breakpoints(large) {

        .form {
            flex-direction: row;

            &__item {
                margin: 1rem;
                text-align: left;

            .salary {
                position: relative;

                &__item {
                    right: 1.5rem;
                }
            }


            &input {
                position: relative;
                min-width: 20rem;

                > input {
                    font-size: 1.25em;
                    width: 90%;
                }

                > span {
                    right: .75rem;
                }
            }

                > span {
                    text-align: left;
                }
            }
        }
    }

}

</style>