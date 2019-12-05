<script>
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    props: {
        chartsData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            chartData: {
                labels: this.chartsData.labels,
                datasets: [
                    {
                        data: this.chartsData.data,
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
                }
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