<script>
import { Bar } from 'vue-chartjs';

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
                        backgroundColor: this.chartsData.colors
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    labels: {
                        fontSize: 0,
                        boxWidth: 0,
                    }
                }
            }
        }
    },

    mounted() {
        this.renderChart(this.barData, this.options)
    },

    
}
</script>