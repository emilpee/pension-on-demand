<template>
    <main class="lights">
        <div class="light" :class="{ lights__red: label.interest > 5 }"></div>
        <div class="light" :class="{ lights__yellow: label.interest >= 3 && label.interest < 5 }"></div>
        <div class="light" :class="{ lights__green: label.value > 0 && (label.interest <= 2.5 || !label.interest) }"></div>
    </main>
</template>

<script>
export default {
    props: ['label'],
    // mounted() {
    //     console.log(this.label);
    // }
}
</script>

<style lang="scss">

@import '../../scss/';

.lights {
    display: flex;
    flex-direction: column;
    background: inherit;
    
    .light {
        width: 1rem;
        height: 1rem;
        border-radius: 9999px;
        margin: .1rem 0;
        background: $gray;
    }

    &__green {
        background: $lightGreen !important;
    }

    &__yellow {
        background: $yellow !important;
    }

    &__red {
        background: $red !important;
    }
}

</style>