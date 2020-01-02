<script>
import { Bar, mixins } from 'vue-chartjs';
import Chart from 'chart.js';

Chart.defaults.scale.gridLines.drawOnChartArea = false;

const { reactiveProp } = mixins;

export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: {
        chartData: {
            type: Object,
            default: null
        },
    },

    computed: {
        settingItems() {
            return this.$store.state.settingItems;
        },
        salary() {
            return this.$store.state.salary;
        },
    },

    data() {
        return {
            barData: {
                labels: this.chartData.years,
                datasets: [
                    {
                        data: [],
                        label: "Månadslön",
                        backgroundColor: this.chartData.colors[0]
                    },
                    {
                        data: [],
                        label: "Allmän pension",
                        backgroundColor: this.chartData.colors[1]
                    },
                    {
                        data: [],
                        label: "Tjänstepension",
                        backgroundColor: this.chartData.colors[2]
                    },
                    {
                        data: [],
                        label: "Tillgångar",
                        backgroundColor: this.chartData.colors[3]
                    }
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return data.datasets[tooltipItem.datasetIndex].label + ': ' + tooltipItem.yLabel.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                        },
                    }
                },
                scales: {
                    xAxes: [
                        { 
                            stacked: true
                        },

                    ],
                    yAxes: [
                        {
                            stacked: true,
                            ticks: {
                                userCallback: (value) => {
                                    value = value.toString();
                                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                                    return value;
                                }
                            }
                        
                        },
                        
                    ]
                },
            }
        }
    },

    mounted() {
        this.renderChart(this.barData, this.options)
    },

    methods: {
        calculateAssets() {
            let totalArray = [];
            let assetsArray = [];
            let pensionsArray1 = [];
            let pensionsArray2 = [];
            let pensionData = this.$store.state.pensionData;
            let settingItems = this.settingItems;
            let total = this.$store.state.totalAssets;
            let salary = this.$store.state.salary.value;
            let debts = this.$store.state.totalDebts;
  
            const settingsArray = Object.keys(settingItems).map(i => settingItems[i])
            const pensionArray = Object.keys(pensionData).map(i => pensionData[i])
            let percentArray = [];

            settingsArray.map(item => { 
                item.forEach(data => {
                    let value = Number(data.value);
                    let percent = Math.abs(data.percent);
                    percent /= 100;
                    totalArray.push(Number((percent * 100) / value));
                    percentArray.push(percent);  
                })
            })

            // Räkna ut medelvärde för procent
            let totalPercent = 0;
            for (var percent in percentArray) {
                totalPercent += percentArray[percent];
            }

            let avgPercent = totalPercent / percentArray.length;
            let general = this.$store.state.generalPension;
            let occupational = this.$store.state.occupationalPension;

            // Räkna ut antal år
            const userAge = this.$store.state.userAge;
            let totalYears = 65 - userAge;

            // Räkna ut lön
            salary = ((salary * 12) + (salary * (percent / 100)));

            // Räkna ut pension
            for (let i = 0; i < this.chartData.years.length; i++) {
                if (pensionArray[0]) {
                pensionsArray1.push(Number((pensionArray[0].value += ((salary * general))) / (totalYears * 12)).toFixed());
                pensionsArray2.push(Number((pensionArray[1].value += ((salary * occupational))) / (totalYears * 12)).toFixed());
                    if (this.chartData.years[i] === 65) {
                        let lastItem1 = pensionsArray1[pensionsArray1.length - 1];
                        let lastItem2 = pensionsArray2[pensionsArray2.length - 1];
                        pensionsArray1.push(...[lastItem1, lastItem1, lastItem1]);
                        pensionsArray2.push(...[lastItem2, lastItem2, lastItem2]);
                    }
                }
            }

            // Räkna ut tillgångar
            total -= debts;
            for (let i = 0; i < this.chartData.years.length; i++) {
                assetsArray.push(Number((total += (total * avgPercent)) / (totalYears * 12)).toFixed()); 
                console.log(assetsArray[i]);
            }

            var totalPension = pensionsArray1.map((num, index) => {
                return Number(num) + Number(pensionsArray2[index]);
            })

            let inflation = 0.02;

            var totalSum = assetsArray.map((num, index) => {
                return ((Number(num) + (Number(num) * inflation)) + totalPension[index]);
            });

            pensionsArray1[0] = '';
            pensionsArray2[0] = '';
            totalSum[0] = '';

            this.barData.datasets[0].data = [this.salary.value];
            this.barData.datasets[1].data = pensionsArray1;
            this.barData.datasets[2].data = pensionsArray2;
            this.barData.datasets[3].data = totalSum;
        },

    },
                            
    watch: {
        settingItems() {
            this.calculateAssets();
            this.renderChart(this.barData, this.options)
        }
    }
    
}
</script>