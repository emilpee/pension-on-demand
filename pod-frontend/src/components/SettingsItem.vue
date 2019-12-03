<template>
  <section class="settings__item">
    <h3>{{ setting.title }}</h3>
    <div class="form">
        <div class="form__item">
            <label> {{ setting.labelOne }} </label>
            <input type="number" placeholder="kr/mån">
        </div>
        <div class="form__item">
            <label> {{ setting.labelTwo }} </label>
            <input type="number" placeholder="procent"> 
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
@import '../scss/';

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


            &:first-child {
                margin-right: 2.5rem;
            }

            &:nth-child(2) {
                margin-left: 2.5rem;
            }

        }
    }

}

</style>