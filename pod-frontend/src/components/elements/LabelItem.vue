<template>
<div>
    <div @click="showDetails($attrs.index)">
        <span class="debt__item">{{ label.type }}</span>
        <p class="debt__data"> {{ label.value }}</p> 
        <div class="debt__lights">
            <traffic-lights :data="label.data" />
        </div>
    </div>
    <div> 
        <div class="label__details" v-if="i === $attrs.index">
            <LabelItemChart :chartsData="barData" />
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
                labels: ['Månadslön', 'Tillgångar', 'Tjänstepension', 'Allmän pension'],
                colors: ['#000', '#000', '#000', '#000'],
                data: [10000, 2323, 15, 2],
                years: ['', 55, 60, 65, 70, 75, 80]
            }
        }
    },
    props: {
        label: Object
    },
    methods: {
        showDetails(i) {
            this.i !== i ? this.i = i : this.i = -1;
        }
    },
    components: {
        TrafficLights, LabelItemChart
    }
}
</script>

<style lang="scss">

.label__details {

    canvas {
        width: 90% !important;
    }
}

</style>