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
        },
        pension: {
            type: Array
        }
    },

    data() {
        return {
            barData: {
                labels: this.chartsData.years,
                datasets: [
                    // TODO - se över hur loopa, och få månadslön att ligga enskilt.
                    // TODO - uppdatera data med flera items för att skapa flöde.
                    {
                        data: [this.$store.state.salary],
                        label: "Månadslön",
                        backgroundColor: this.chartsData.colors[0],
                        stack: ''
                    },
                    {
                        data: [this.$store.state.totalAssets],
                        label: "Tillgångar",
                        backgroundColor: this.chartsData.colors[1]
                    },
                    {
                        data: [this.pension[0].value],
                        label: [this.pension[0].type],
                        backgroundColor: this.chartsData.colors[2]
                    },
                    {
                        data: [this.pension[1].value],
                        label: this.pension[1].type,
                        backgroundColor: this.chartsData.colors[3]
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        { 
                            stacked: true
                        },
                    ],
                    yAxes: [
                        { 
                            stacked: true
                        }
                    ]
                },
            }
        }
    },

    mounted() {
        this.renderChart(this.barData, this.options)
    },
    
}
</script>