<template>
  <section class="settings__item">
    <h3 v-if="setting !== undefined">{{ setting.title }}</h3>
    <div v-if="!setting.hasOwnProperty('id')" class="form">
          <div class="form__item">
            <label> {{ setting.labelOne }} </label>
            <input type="number" v-model="setting.value" @focus="$parent.message = ''" placeholder="SEK">
        </div>
        <div class="form__item">
            <label> {{ setting.labelTwo }} </label>
            <input type="number" v-model="setting.procent" @focus="$parent.message = ''" placeholder="procent"> 
        </div>
    </div>

    <div class="form" v-for="choice in filterChoices(setting)" :key="choice.id">
        <div v-if="choice" class="form__item">
            <span v-text="choice.type"></span>
        </div>
        <div class="form__item">
            <label> {{ choice.labelOne }} </label>
            <input type="number" v-model="choice.value" @focus="$parent.message = ''" placeholder="SEK">
        </div>
        <div class="form__item">
            <label> {{ choice.labelTwo }} </label>
            <input type="number" v-model="choice.procent" @focus="$parent.message = ''" placeholder="procent"> 
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
        }
    },
    mounted() {
        this.filterChoices();
    },
    methods: {
        filterChoices(setting) {
            return this.choices.filter(choice => choice.parent === setting.title)
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
        flex-direction: row;
        background: $light;
        padding: 2rem;


        &__item {
            @extend %column;
            flex: 1;
            justify-content: center;
            margin: 0 1rem;

        }
    }

}

</style>