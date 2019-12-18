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

    data() {
        return {
            barData: {
                labels: this.chartData.years,
                datasets: [
                    // TODO - se över hur loopa, och få månadslön att ligga enskilt.
                    // TODO - uppdatera data med flera items för att skapa flöde.
                    {
                        data: [this.$store.state.salary.value],
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
        this.calculateAssets();
    },

    methods: {
        calculateAssets() {
            let totalArray = [];
            let assetsArray = [];
            let reduce;
            let pensionsArray1 = [];
            let pensionsArray2 = []
            let pensionData = this.$store.state.pensionData;
            let settingItems = this.$store.state.settingItems;
            let total = this.$store.state.totalAssets;
  
            const settingsArray = Object.keys(settingItems).map(i => settingItems[i])
            const pensionArray = Object.keys(pensionData).map(i => pensionData[i])

            settingsArray.map(item => {
                item.forEach(data => {
                    let value = Number(data.value);
                    let percent = Number(data.procent);
                    // TODO - se över hur procenten räknas ut.
                    totalArray.push((percent * 100) / value);
                    console.log(totalArray);
                })
            })

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            reduce = totalArray.reduce(reducer);

            // Allmän pension i procent
            let percentage1 = 1.185;

            // Tjänstepension i procent
            let percentage2 = 1.045;

            // Räkna ut pension
            for (let i = 0; i < this.chartData.years.length; i++) {
                let lastItem = this.chartData.years[this.chartData.years.length - 1];
                if (lastItem === 65) {
                    console.log('Tjean');
                    // TODO - se över uträkning
                    pensionsArray1.push(parseInt(pensionArray[0].value *= percentage1).toFixed());
                    pensionsArray2.push(parseInt(pensionArray[1].value *= percentage2).toFixed());
                } else if (this.chartData.years[i] === 65) {
                    // TODO - modifiera pension. Lägg till en break om nuvarande index är 65.
                    pensionsArray1.push(parseInt(pensionArray[0].value *= percentage1).toFixed());
                    pensionsArray2.push(parseInt(pensionArray[1].value *= percentage2).toFixed());
                    break;
                }
            }

            // Räkna ut tillgångar
            for (let i = 0; i < this.chartData.years.length; i++) {
                // TODO - fixa kalkylering.
                assetsArray.push(Number((total *= reduce))).toFixed(); 
                console.log(assetsArray);
            }

            console.log(pensionsArray1);
            console.log(pensionsArray2);
            this.barData.datasets[1].data = assetsArray;
            this.barData.datasets[2].data = pensionsArray1;
            this.barData.datasets[3].data = pensionsArray2;
            
        }
    }
    
}
</script>