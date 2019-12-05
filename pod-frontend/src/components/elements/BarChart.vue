<script>
import { Bar } from 'vue-chartjs';
import Chart from 'chart.js';

Chart.defaults.scale.gridLines.drawOnChartArea = false;
Chart.defaults.scale.gridLines.color = '#000';

export default {
    extends: Bar,
    props: {
        chartsData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            barData: {
                labels: this.chartsData.labels,
                datasets: [
                    {
                        data: this.chartsData.data,
                        backgroundColor: this.chartsData.colors,
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
            }
        }
    },

    mounted() {
        this.renderChart(this.barData, this.options)
    },

    
}
</script>