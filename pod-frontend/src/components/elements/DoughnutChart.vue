<script>
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    props: {
        chartsData: {
            type: Object,
            default: null
        },
        pensionData: {
            type: Array,
            default: null
        }
    },
    data() {
        return {
            chartData: {
                labels: this.chartsData.labels,
                datasets: [
                    {
                        data: this.pensionData,
                        backgroundColor: this.chartsData.colors
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
                        label: function(tooltipItem) {
                            return tooltipItem.yLabel.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        }
                    }
                },
            }
        }
    },

    mounted() {
        this.renderChart(this.chartData, this.options)
    },

}

</script>

<style>

</style>