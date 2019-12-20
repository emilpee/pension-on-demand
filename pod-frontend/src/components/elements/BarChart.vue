<script>
import { Bar, mixins } from 'vue-chartjs';
import Chart from 'chart.js';

Chart.defaults.scale.gridLines.drawOnChartArea = false;
Chart.defaults.scale.gridLines.color = '#000';

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
        }
    },

    data() {
        return {
            barData: {
                labels: this.chartData.years,
                datasets: [
                    // TODO - se över hur loopa, och få månadslön att ligga enskilt.
                    // TODO - uppdatera data med flera items för att skapa flöde.
                    {
                        data: [],
                        label: "Månadslön",
                        backgroundColor: this.chartData.colors[0]
                    },
                    {
                        data: [],
                        label: "Tillgångar",
                        backgroundColor: this.chartData.colors[1]
                    },
                    {
                        data: [],
                        label: "Allmän pension",
                        backgroundColor: this.chartData.colors[2]
                    },
                    {
                        data: [],
                        label: "Tjänstepension",
                        backgroundColor: this.chartData.colors[3]
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

    methods: {
        calculateAssets() {
            let totalArray = [];
            let assetsArray = [];
            let pensionsArray1 = [];
            let pensionsArray2 = [];
            let pensionData = this.$store.state.pensionData;
            let settingItems = this.settingItems;
            let total = this.$store.state.totalAssets;
  
            const settingsArray = Object.keys(settingItems).map(i => settingItems[i])
            const pensionArray = Object.keys(pensionData).map(i => pensionData[i])
            let percentArray = [];

            settingsArray.map(item => { 
                item.forEach(data => {
                    let value = Number(data.value);
                    let percent = Number(data.procent);
                    if ((value || percent === 0) || (!isNaN((value || percent)))) {
                        totalArray.push(Number((percent * 100) / value));
                        percentArray.push(percent);
                        console.log(totalArray);
                        console.log(percentArray);
                    }
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

            const maxAge = this.chartData.years[this.chartData.years.length - 1];
            const userAge = this.$store.state.userAge;
            let totalYears = maxAge - userAge;

            // Räkna ut pension
            for (let i = 0; i < this.chartData.years.length; i++) {
                pensionsArray1.push(Number((pensionArray[0].value += (pensionArray[0].value * general)) /  totalYears).toFixed());
                pensionsArray2.push(Number((pensionArray[1].value += (pensionArray[1].value * occupational)) / totalYears).toFixed());
                if (this.chartData.years[i] === 65) {
                    break;
                }
            }

            // Räkna ut tillgångar
            for (let i = 0; i < this.chartData.years.length; i++) {
                // TODO - fixa kalkylering.
                assetsArray.push(Number((total += (total * avgPercent)) / (totalYears * 12) ).toFixed()); 
                console.log(total);
            }

            pensionsArray1[0] = '';
            pensionsArray2[0] = '';
            assetsArray[0] = '';

            this.barData.datasets[0].data = [this.salary.value];
            this.barData.datasets[1].data = assetsArray;
            this.barData.datasets[2].data = pensionsArray1;
            this.barData.datasets[3].data = pensionsArray2;
            
        }
    },

    watch: {
        settingItems() {
            this.calculateAssets();
            this.renderChart(this.barData, this.options)
        }
    }
    
}
</script>