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
                labels: this.choices,
                colors: ['#000', '#000','#000', '#000'], 
                data: [10000, 2323, 15, 2],
            },
        }
    },
    props: {
        label: Object
    },
    methods: {
        showDetails(i) {
            this.i !== i ? this.i = i : this.i = -1;
        },
    },
    computed: {
        choices() {
            return this.$store.state.choices.filter(choice => {
                return choice.parent === this.label.type
            })
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