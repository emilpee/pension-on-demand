<template>
  <div class="details">
    <DetailedBarChart :chartsData="barData" />
  </div>
</template>

<script>
import DetailedBarChart from './BarChart';

export default {
  data() {
    return {
      barData: {
        labels: ['Månadslön', 'Tillgångar', 'Tjänstepension', 'Allmän pension'],
        colors: ['#000', '#000', '#000', '#000'],
        data: [10000, 2323, 15, 2],
        years: ['', 55, 60, 65, 70, 75, 80]
      }
    }
  },
  components: {
    DetailedBarChart
  },

}
</script>

<style lang="scss">

.details {
  
    #bar-chart {
      width: 95% !important;
    }

}


</style>