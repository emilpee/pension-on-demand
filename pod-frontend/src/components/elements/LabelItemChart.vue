<script>
import { Bar } from 'vue-chartjs';
import Chart from 'chart.js';

Chart.defaults.scale.gridLines.drawOnChartArea = false;
Chart.defaults.global.animation.duration = 400;
Chart.defaults.global.animation.easing = 'easeOutCirc';

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
        choices() {
            return this.$store.state.choices;
        },
        userData() {
            return this.$store.state.userData;
        },
        settingItems() {
            return this.$store.state.settingItems;
        },
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

    watch: {
        choices: function() {
            console.log('öhöhöö');
            this._chart.destroy();
            //this.renderChart(this.data, this.options);
            this.renderChart(this.barData, this.options);
        },
        barData: function() {
            console.log('uppdaterat!');
            //this.renderChart(this.data, this.options);
            this.renderChart(this.barData, this.options);
        },
        chartData: function() {
            console.log('uppdaterat!');
            //this.renderChart(this.data, this.options);
            this.renderChart(this.chartData, this.options);
        },
        settingItems() {
            console.log('fläsk');
            this.renderChart(this.barData, this.options)
        }
    }

    
}
</script>