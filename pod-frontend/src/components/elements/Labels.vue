<template>
    <main class="doughnut__labels">

        <div class="label">
            <h2 class="label__header">Tillgångar</h2>
            <LabelItem class="label__asset" v-for="(label, index) in userData.pension" :label="label" :index="index" :key="index+'pension'" />
            <LabelItem class="label__asset" v-for="(label, index) in userData.income" :label="label" :index="index" :choices="userData.choices" :key="index+'income'" />
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
        },
        choices() {
            return this.$store.state.choices;
        }
    },
    methods: {
        getTotal() {
            // TODO - hitta snyggare lösning.
            let incomes = this.userData.income;
            let choices = this.choices;

            var estates = choices.filter(choice => choice.parent === "Fastigheter");
            var vehicles = choices.filter(choice => choice.parent === "Fordon");
            var other = choices.filter(choice => choice.parent === "Övrigt");

            this.$store.commit('setSettingItems', { estates, vehicles, other } );

            incomes.filter(income => {
                if (income.type === "Fastigheter") {
                    return income.value = estates.reduce((acc, obj) => acc + Number(obj.value), 0);
                } else if (income.type === "Fordon") {
                    return income.value = vehicles.reduce((acc, obj) => acc + Number(obj.value), 0);
                } else {
                    return income.value = other.reduce((acc, obj) => acc + Number(obj.value), 0);
                }
            })

        },
    },
    watch: {
        userData: function() {
            this.getTotal();
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


#doughnut-chart {
    margin: 0 auto;
    width: 90% !important;
    height: 90% !important;

    @include breakpoints(large) {
        width: 100%;
        height: 100%;
    }

}

</style>