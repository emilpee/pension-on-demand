<script>
import { Bar } from 'vue-chartjs';
import Chart from 'chart.js';

Chart.defaults.scale.gridLines.drawOnChartArea = false;
Chart.defaults.scale.gridLines.color = '#000';


// TODO - hur uppdatera utan reload?


export default {
    extends: Bar,
    props: {
        chartData: {
            type: Object,
            default: null
        }
    },

    computed: {
        barData() {
            return this.chartData;
        },
        choices() {
            return this.$store.state.choices;
        }
    },

    methods: {
        renderBarChart() {
            this.renderChart({      
                labels: this.barData.labels,
                datasets: [
                    {
                        data: this.barData.data,
                        backgroundColor: this.barData.colors
                    }
                ]
            },
            {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                }
            })
        }
    },

    mounted() {
        this.renderBarChart();
    },

    watch: {
        choices: function() {
            this.renderBarChart();
        }
    }

    
}
</script>