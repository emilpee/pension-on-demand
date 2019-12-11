<template>
    <main class="doughnut__labels">

        <div class="label">
            <h2 class="label__header">Tillgångar</h2>
            <LabelItem class="label__asset" v-for="(label, index) in data.pension" :label="label" :index="index" :key="index+'pension'" />
            <LabelItem class="label__asset" v-for="(label, index) in userData.income" :label="label" :index="index" :key="index+'income'" />
        </div>
        <div class="label">
            <h2 class="label__header">Skulder</h2>
            <LabelItem class="label__debt" v-for="(label, index) in data.debts" :label="label" :index="index" :key="index+'debts'" />
        </div>

    </main>
</template>

<script>
import LabelItem from './LabelItem';
import jsonData from '../../data/data.json';


export default {
    data() {
        return {
            data: jsonData[0]
        }
    },
    components: {
        LabelItem
    },
    computed: {
        userData() {
            return this.$store.state.userData;
        }
    }
}
</script>

<style lang="scss">
@import '../../scss/';

.label {
    @extend %column;
    cursor: pointer;
    flex: 1;

    &:first-child {
        margin-right: 1rem;
    }

    &__details {
        width: 100%;
    }

    &__asset, &__debt {
        background: $light;
        border: 4px solid rgba($gray, .04);
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: .5rem 0;
        width: 100%;

        & div {
            @extend %center-content;
            width: inherit;
        }
        
    }

    .debt__item, .asset__item {
        flex: 6;
        margin: 0 .75rem;

        ~ p {
            flex: 3;
            text-align: center;
        }

        ~ div {
            flex: 1;
            @extend %center-content;
        }
    
    }

    @include breakpoints(large) {

        &__header {
            display: none;
        }

        &:nth-child(2) {
            margin-left: 1rem;
        }
    }
    
}

</style>