<template>
    <main class="lights">
        <div class="light" :class="{ lights__red: label.interest > 5 || (label.hasOwnProperty('title') && (salary.value < 8000)) }"></div>
        <div class="light" :class="{ lights__yellow: (label.interest >= 3 && label.interest < 5) || (label.hasOwnProperty('title') && (salary.value > 8000 && salary.value < 15000)) } "></div>
        <div class="light" :class="{ lights__green: (label.interest <= 2.5) || (!label.interest && !label.hasOwnProperty('title')) || (label.hasOwnProperty('title') && salary.value >= 15000) }"></div>
    </main>
</template>

<script>
export default {
    props: ['label'],
    computed: {
        salary() {
            return this.$store.state.salary;
        }
    }
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