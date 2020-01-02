<script>
import { Bar } from 'vue-chartjs';
import Chart from 'chart.js';

Chart.defaults.scale.gridLines.drawOnChartArea = false;
Chart.defaults.global.animation.duration = 400;
Chart.defaults.global.animation.easing = 'easeOutCirc';

export default {
    extends: Bar,
    props: {
        chartData: {
            type: Object,
            default: null
        }
    },

    data() {
        return {
            barData: {
                labels: this.chartData.labels,
                datasets: [
                    {
                        data: this.chartData.data,
                        backgroundColor: this.chartData.colors
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        gridLines: {
                            drawBorder: false,
                            lineWidth: 0
                        },
                        ticks: {
                            display: false,
                            min: 1
                        },
                        angleLines: {
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            display: false,
                            lineWidth: 0
                        },
                    }],
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.yLabel.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        },
                    }
                },
            }

        }
    },

    mounted() {
        this.renderChart(this.barData, this.options);
    },

    
}
</script>