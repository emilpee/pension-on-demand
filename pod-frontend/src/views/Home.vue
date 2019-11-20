<template>
  <main class="home">

    <div class="home__intro">
      <h1>Välkommen NAMN</h1> 
      <h2>Alla kan få en bra pension, hur mycket vill du ha i pension?</h2> 
    </div>

    <div class="home__slider">
    </div>

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

    <div v-for="(info, index) in chartsData" class="home__chartsinfo" :key="index">
      <p>{{ info.labels }}</p>  
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

    &__intro {
      // TODO - dynamisk
      max-width: 1000px;
      margin: 0 auto;
      padding-top: 2rem;
    }

    &__charts {
      display: flex;
      flex-direction: column;
      max-width: 1000px;
      margin: 0 auto;

      .doughnut {
        width: 100%; 
        display: flex;
        flex-direction: column; 

        &:nth-child(1) {
          margin-right: 1rem;
        }

        &__header {
          background: $white; 
        }

        &__chart {
          background: $light;
          padding: 2rem;
        }

      }

      @include breakpoints(large) {
        flex-direction: row;
      }

    }

    &__chartsinfo {

      > p {
        flex-direction: column;
      }

    }

  }

</style>