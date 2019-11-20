<template>
  <main class="container">

    <div class="home">

    <div class="home__intro">
      <div class="text">
        <h1>Välkommen NAMN</h1> 
        <h2>Alla kan få en bra pension, hur mycket vill du ha i pension?</h2> 
      </div>

      <div class="symbols">
        <div class="symbols__header">
          <i :style="{ fontSize: '2rem' }" class="fas fa-info-circle"></i>
          <h3>Symbolförteckning</h3> 
        </div>
        <div class="symbols__body">

            <div class="symbols__body--item"> 
              <div class="light lights__red"></div> 
              <span>Något behöver åtgärdas snarast</span>
            </div>
            <div class="symbols__body--item"> 
              <div class="light lights__yellow"></div> 
              <span>Något kan behöva ses över</span>
            </div>
            <div class="symbols__body--item"> 
              <div class="light lights__green"></div> 
              <span>Allt ser bra ut</span>
            </div>
       
        </div>
      </div>
    </div>

    <div class="home__slider">
      <div class="title">
        <i class="fas fa-laugh-beam"></i> 
        <h3>Översikt</h3>
      </div>
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
    DoughnutChart, 
  },
}
</script>

<style lang="scss">
@import '../scss/';

.container {
  background: $white;
}

  .home {
    background: $white;
    max-width: 64rem;
    margin: 0 auto;

    &__intro {
      padding-top: 2rem;
      flex-direction: row;
      display: flex;

      > div {
        flex: 1;
      }

      .symbols {
        flex-direction: column;
        background: $light;
        display: flex;
        align-items: center;

        &__header {
          flex-direction: column;
          align-items: center;
          display: flex;
          padding-top: 1rem;
        }

        &__body {
          display: flex;
          flex-direction: column;
          padding-bottom: 1rem;

          &--item {
            display: flex;
            align-items: center;
            flex-direction: row;

            .light {
              width: 1rem;
              height: 1rem; 
              border-radius: 9999px;
              margin-right: .75rem;
            }

          }
          
          
        }

        &__colors {
          margin: .5rem;
        }

        &__desc p {
          margin: 0;
        }

      }

    }

    &__charts {
      display: flex;
      flex-direction: column;

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