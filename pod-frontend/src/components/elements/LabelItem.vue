<template>
<div>
    <div :key="$attrs.index" @click="showDetails($attrs.index)">
        <span class="debt__item">{{ label.type }}</span>
        <p class="debt__data"> {{ formatNumbers(label.value) }}</p> 
        <div class="debt__lights">
            <traffic-lights :label="label" />
        </div>
    </div>

    <div> 

        <div :key="i" class="label__details" v-if="i === $attrs.index && choices">
            <LabelItemChart :chartData="barData" />
        </div>

    </div>

</div>
</template>

<script>
import LabelItemChart from './LabelItemChart.vue';
import TrafficLights from './TrafficLights';

export default {
    data() {
        return {
            i: -1,
            barData: {
                labels: [],
                colors: ['#76C04D', '#F0CD08', '#C04D4D'], 
                data: []
            },
        }
    },
    props: {
        label: Object,
        choices: Array
    },
    mounted() {
        if (this.choices !== undefined) {
            this.barData.labels = this.filteredChoices.map(choice => choice.type);
            this.barData.data = this.filteredChoices.map(choice => choice.value);
        }
    
    },
    methods: {
        showDetails(i) {
            this.i !== i ? this.i = i : this.i = -1;
        },
        formatNumbers(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    },
    computed: {
        filteredChoices() {
             return this.choices.filter(choice => {
                return choice.parent === this.label.type 
            })
        }
    },
    components: {
        TrafficLights, LabelItemChart
    },

}
</script>

<style lang="scss">
@import '../../scss/';


/* always present */
.expand {
  transition: all .3s ease;
  height: 30px;
  padding: 10px;
  background-color: #eee;
  overflow: hidden;
}
/* .expand-enter defines the starting state for entering */
/* .expand-leave defines the ending state for leaving */
.expand-enter, .expand-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}


    #bar-chart {
        width: 98% !important;
    }


</style>