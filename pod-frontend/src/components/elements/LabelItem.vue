<template>
<div>
    <div @click="showDetails($attrs.index)">
        <span class="debt__item">{{ label.type }}</span>
        <p class="debt__data"> {{ label.value }}</p> 
        <div class="debt__lights">
            <traffic-lights :data="label.value" />
        </div>
    </div>
    <div> 
        <div class="label__details" v-if="i === $attrs.index && choices">
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
                colors: ['#0F7354', '#F0CD08','#C04D4D'], 
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

.label__details {

    canvas {
        width: 90% !important;
    }
}

</style>