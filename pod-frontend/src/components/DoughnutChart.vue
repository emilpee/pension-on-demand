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
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        boxWidth: 0,
                        fontSize: 0,
                        padding: 0
                    }
                }
            }
        }
    },

    mounted() {
        this.renderChart(this.chartData, this.options)
    }

}

</script>

<style>

</style>