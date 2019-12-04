<template>
    <main class="lights">
    <div class="light lights__red"></div>
    <div class="light lights__yellow"></div>
    <div class="light lights__green"></div>
    </main>
</template>

<script>
export default {

    props: {
        data: Number
    }
}
</script>

<style lang="scss">

@import '../scss/';

.lights {
    display: flex;
    flex-direction: column;
    background: inherit;
    
    .light {
        width: 1rem;
        height: 1rem;
        border-radius: 9999px;
        margin: .1rem 0;
    }

    &__green {
        background: $lightGreen;
    }

    &__yellow {
        background: $yellow;
    }

    &__red {
        background: $red;
    }
}

</style>