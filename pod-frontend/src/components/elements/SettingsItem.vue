<template>
  <section class="settings__item">
    <h3>{{ setting.title }}</h3>
    <div v-if="!setting.hasOwnProperty('id')" class="form">
          <div class="form__item">
            <label> {{ setting.labelOne }} </label>
            <div class="form__iteminput">
                <input type="text" pattern="\d*" maxlength="10" v-model="setting.value" @focus="$parent.message = ''" placeholder="SEK">
                <span>kr</span>
            </div>
        </div>
        <div class="form__item">
            <label> {{ setting.labelTwo }} </label>
            <div class="form__iteminput">
                <input type="text" pattern="\d*" maxlength="4" v-model="setting.procent" @focus="$parent.message = ''" placeholder="procent"> 
                <span>procent</span>
            </div>
        </div>
    </div>

    <div class="form" v-for="choice in filterChoices(setting)" :key="choice.id">
        <div v-if="choice" class="form__item">
            <span v-text="choice.type"></span>
        </div>
        <div class="form__item">
            <label> {{ setting.labelOne }} </label>
            <div class="form__iteminput">
                <input type="text" pattern="\d*" maxlength="10" v-model="choice.value" @focus="$parent.message = ''" placeholder="SEK">
                <span>kr</span>
            </div>
        </div>
        <div class="form__item">
            <label> {{ setting.labelTwo }} </label>
            <div class="form__iteminput">
                <input type="text" pattern="\d*" maxlength="4" v-model="choice.procent" @focus="$parent.message = ''" placeholder="procent">
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
    },
    methods: {
        filterChoices(setting) {
            // TODO - lägg in i getters
            if (setting) {
                return this.choices.filter(choice => choice.parent === setting.title)
            }
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
        display:inherit;
        flex-direction: column;
        background: $light;
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
                    min-width: 15rem;
                    padding: 1rem;
                    border: 1px solid $black;
                }

                > span {
                    position: absolute;
                    top: 25%;
                    right: 1rem;
                }

            }

            > span {
                text-align: center;
                font-weight: 500;
            }
        }
    }

    @include breakpoints(medium) {

        .settings__item {
            display: flex;
            flex-direction: column;
            margin: 2rem 0;
        }

    }

    @include breakpoints(large) {

        .form {
            flex-direction: row;

            &__item {
                margin: 0 1rem;
                text-align: left;

            &input {
                position: relative;
                min-width: 20rem;

                > input {
                    font-size: 1.25em;
                }

                > span {
                    top: 30%;
                    right: 3.5rem;
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