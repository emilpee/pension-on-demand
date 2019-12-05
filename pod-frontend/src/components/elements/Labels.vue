<template>
    <main class="doughnut__labels">
        <div class="label" @click="showDetails">
            <div v-for="label in assetsLabels" :key="label.id" class="label__asset">
                 <div>
                    <span class="debt__item">{{ label.name }}</span>
                    <p class="debt__data"> {{ label.data }}</p> 
                    <div class="debt__lights">
                        <traffic-lights :data="label.data" />
                    </div>
                </div>
                <div> 
                    <!-- // TODO - fråga om v-show -->
                    <div class="label__details" v-if="display">
                        <bar-chart :chartsData="barData" />
                    </div>
                </div>
            </div>

        </div>

        <div class="label" @click="showDetails">
            <div v-for="label in debtsLabels" :key="label.id" class="label__debt">
                <div>
                    <span class="debt__item">{{ label.name }}</span>
                    <p class="debt__data"> {{ label.data }}</p> 
                    <div class="debt__lights">
                        <traffic-lights :data="label.data" />
                    </div>
                </div>
                <div> 
                    <div class="label__details" v-if="display">
                        <bar-chart :chartsData="barData" />
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<script>
import TrafficLights from './TrafficLights.vue';
import BarChart from './BarChart.vue';
import { assetsLabels, debtsLabels, barData } from '../../data/';

export default {
    data() {
        return {
            assetsLabels: assetsLabels,
            debtsLabels: debtsLabels,
            barData: barData,
            display: false
        }
    },
    components: {
        TrafficLights, BarChart
    },
    methods: {
        showDetails() {
            console.log(this.display);
            this.display = !this.display;
        }
    },
    mounted() {
        console.log(this.barData.colors);
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

    &:nth-child(2) {
        margin-left: 1rem;
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
    
}

</style>