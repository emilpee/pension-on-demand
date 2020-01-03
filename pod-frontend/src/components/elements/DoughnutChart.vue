<script>
import { Doughnut, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
    extends: Doughnut,
    mixins: [reactiveProp],
    computed: {
        settingItems() {
            return this.$store.state.settingItems;
        },
    },
    props: {
        chartData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            doughnutData: {
                labels: this.chartData.labels,
                datasets: [
                    {
                        data: this.chartData.data,
                        backgroundColor: this.chartData.colors
                    }
                ],
            },
            options: {
                cutoutPercentage: 80,   
                rotation: 0.5 * Math.PI,
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {         
                            return  data.labels[tooltipItem.index] +': '+data.datasets[0].data[tooltipItem.index].toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '';
                        }
                    }
                },
            }
        }
    },

    mounted() {
        this.renderChart(this.doughnutData, this.options)
    },

    watch: {
        chartData: {
            handler() {
                console.log('hoho');
                this.renderChart(this.doughnutData, this.options)
            },
            deep: true
        }
    }

}

</script>

<style>

</style>