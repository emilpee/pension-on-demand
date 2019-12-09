<template>
    <main class="doughnut__labels">
        <div class="label" @click="showDetails">
            <div class="label__asset" v-for="label in labelData.pension" :key="label.id" >
                 <div>
                    <span class="debt__item">{{ label.type }}</span>
                    <p class="debt__data"> {{ label.value }}</p> 
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
            
            <div class="label__asset" v-for="label in labelData.holdings" :key="label.id" >
                 <div>
                    <span class="debt__item">{{ label.assets.type }}</span>
                    <p class="debt__data"> {{ label.assets.value }}</p> 
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
            <div class="label__debt"  v-for="label in labelData.holdings" :key="label.id">
                 <div v-if="label.debts.value > 0">
                    <span class="debt__item">{{ label.debts.loan }}</span>
                    <p class="debt__data"> {{ label.debts.value }}</p> 
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
import { barData } from '../../data/';
import pensionData from '../../data/data.json';

export default {
    data() {
        return {
            barData: barData,
            display: false,
            labelData: pensionData[0]
        }
    },
    components: {
        TrafficLights, BarChart
    },
    methods: {
        showDetails() {
            this.display = !this.display;
        }
    },

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