<template>
  <main class="home">
    <h1>Välkommen NAMN</h1> 
    <h2>Alla kan få en bra pension, hur mycket vill du ha i pension?</h2> 
    <p>Nu kan du hantera din framtid själv, inga fler besök hos pensionsrådgivare.</p>

    <div class="home__charts">

      <div class="doughnut" v-for="data in chartsData" :key="data.id">
        <div class="doughnut__header">
          <h3>{{ data.title }}</h3>
        </div>
          <div class="doughnut__chart">
          <doughnut-chart :chartsData="data" />
        </div>
      </div>
      
    </div>

  </main>
</template>

<script>
import { DoughnutChart } from '../components/';
import chartsdata from '../data/doughnutdata.json';

export default {
  name: 'home',
  data() {
    return {
      chartsData: chartsdata,
    }
  },
  components: {
    DoughnutChart
  },
}
</script>

<style lang="scss">
@import '../scss/';

  .home {
    background: $white;

    &__charts {
      @extend %center-content;
      flex-direction: column;

      .doughnut {
        max-width: 400px;
        margin: 1rem;

        &__header {
          background: $white;
        }

        &__chart {
          background: $light;
        }

      }

      @include breakpoints(large) {

        flex-direction: row;
      }

      }

  }

</style>