<template>
  <div class="details">
    <bar-chart :chartsData="$attrs.label" />
  </div>
</template>

<script>
import BarChart from './BarChart';

export default {
  components: {
    BarChart
  },

}
</script>

<style>

</style>