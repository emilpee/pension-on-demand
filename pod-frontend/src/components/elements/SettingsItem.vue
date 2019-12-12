<template>
  <section class="settings__item">
    <h3>{{ setting.title }}</h3>
    <div class="form">
        <div v-if="setting.choices" class="form__item">
            <select>
                <option v-for="choice in setting.choices" :key="choice.id">{{ choice.type }}</option>
            </select>
        </div>
        <div class="form__item">
            <label> {{ setting.labelOne }} </label>
            <input type="number" v-model="setting.value" @focus="$parent.message = ''" placeholder="SEK">
        </div>
        <div class="form__item">
            <label> {{ setting.labelTwo }} </label>
            <input type="number" v-model="setting.procent" @focus="$parent.message = ''" placeholder="procent"> 
        </div>
    </div>
  </section>
</template>

<script>

export default {

    props: {
        setting: Object
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
            margin: 0 1rem;

        }
    }

}

</style>