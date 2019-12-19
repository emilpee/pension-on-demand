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

            settingsArray.map(item => { 
                item.forEach(data => {
                    let value = Number(data.value);
                    let percent = Number(data.procent);
                    // TODO - se över hur procenten räknas ut.
                    if ((value || percent === 0) || (!isNaN((value || percent)))) {
                        totalArray.push(Number((percent * 100) / value));
                    }
                })
            })

            const reducer = (accumulator, currentValue) => accumulator + currentValue;
             
            let reduce = totalArray.reduce(reducer); 
            reduce /= 1000;
            console.log(reduce);
            let general = this.$store.state.generalPension;
            let occupational = this.$store.state.occupationalPension;

            // Räkna ut pension
            for (let i = 0; i < this.chartData.years.length; i++) {
   
                pensionsArray1.push(Number(pensionArray[0].value += (pensionArray[0].value * general)).toFixed());
                pensionsArray2.push(Number(pensionArray[1].value += (pensionArray[1].value * occupational)).toFixed());
                if (this.chartData.years[i] === 65) {
                    // TODO - modifiera pension. Lägg till en break om nuvarande index är 65.
                    pensionsArray1.push(Number(pensionArray[0].value *= general).toFixed());
                    pensionsArray2.push(Number(pensionArray[1].value *= occupational).toFixed());
                    break;
                }
            }

            // Räkna ut tillgångar
            for (let i = 0; i < this.chartData.years.length; i++) {
                // TODO - fixa kalkylering.
                assetsArray.push(Number((total += (total * reduce))).toFixed()); 
            }

            console.log(assetsArray);
            console.log(pensionsArray1);
            console.log(pensionsArray2);

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
        }
    }
    
}
</script>