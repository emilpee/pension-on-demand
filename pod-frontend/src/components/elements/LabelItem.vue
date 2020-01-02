<template>
<div>
    <div :key="$attrs.index" @click="showDetails($attrs.index)">
        <span class="debt__item">{{ label.type }}</span>
        <p class="debt__data"> {{ formatNumbers(label.value) }}</p>
        <span v-if="$attrs.hasLabel" :class="{ showChart: $attrs.index === i, hideChart: $attrs.index !== i }">
            <i class="fas fa-chevron-right"></i>
        </span>
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
        choices: Array,
    },
    mounted() {
        this.mapChoices();
    },
    methods: {
        showDetails(i) {
            this.i !== i ? this.i = i : this.i = -1;
        },
        formatNumbers(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },
        mapChoices() {
            if (this.choices !== undefined) {
                this.barData.labels = this.filteredChoices.map(choice => choice.type);
                this.barData.data = this.filteredChoices.map(choice => choice.value);
            }
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
    watch: {
        choices: function() {
            this.mapChoices();
        },
        clickedLabel: function() {
            this.clickedLabel = !this.clickedLabel;
        }
    }

}
</script>

<style lang="scss">
@import '../../scss/';



#bar-chart {
    width: 98% !important;

    @include breakpoints(large) {
        max-height: 40rem !important;
    }
    
}


.showChart {
    transition: transform .2s linear;
    transform: rotate(90deg);
}

.hideChart {
    transition: transform .15s ease-in;
    transform: rotate(0deg);
}

</style>