<template>
  <main class="container">
    <div class="home">

    <section class="home__intro">
      <div class="text">
        <h1>Välkommen {{ user.givenName }}</h1> 
        <h2>Alla kan få en bra pension, hur mycket vill du ha i pension?</h2> 
      </div>

      <div class="symbols">
        <div class="symbols__header">
          <i :style="{ fontSize: '3em' }" class="fas fa-info-circle"></i>
          <h3>Symbolförteckning</h3> 
        </div>
        <symbols />
      </div>
    </section>

    <section class="home__sliders">
      <div class="title">
        <i class="far icons fa-laugh-beam"></i>
        <h3>Målbild</h3>
      </div>
      <div class="sliders">
        <slider v-for="(data, index) in jsonData.goals.label" :data="data" :key="index" /> 
      </div>
    </section>


    <section class="home__optimize">
      <div class="optimize title">
        <h2>Önskad pensionsmål på {{ wantedPension }} kr/mån uppnåelig.</h2>
        <span>Fortsätt till nästa steg för att optimera din framtida pensionsplan.</span>
      </div>
      <Button msg="Optimera med PD" />
    </section>

    <section class="home__doughnut" v-if="pensionData !== undefined">

      <div class="doughnut">
        <div class="doughnut__header title">
          <i class="far icons fa-laugh-beam"></i>
          <h3>Översikt</h3>
        </div>
        <div class="doughnut__chart">
          <div class="doughnut__charttext">
            <p>Tillgångar</p>
            <p v-text="pensionData.totalAssets"></p>
          </div>
          <doughnut-chart :chartsData="doughnutData" :pensionData="[pensionData.totalDebts, pensionData.totalAssets]" /> 
          <div class="doughnut__charttext">
            <p>Skulder</p>
            <p v-text="pensionData.totalDebts"></p>
          </div>
        </div>

        <div class="doughnut__labels">
          <Labels  />
        </div>
      </div>      

    </section>

    <section class="home__bar">
      <div class="bar">
        <div class="bar__header title">
          <h3>Nuvarande pensionslösning</h3>
          <span>Prognosen ser ut som följande ifall du behåller din nuvarande strategi.</span>
        </div>
        <div class="bar__chart">
          <bar-chart :chartsData="barData" />
        </div>
      </div>

      <div class="bar">
        <div class="bar__header title">
          <h3>Pension on demand</h3>
          <span>Baserat på analysen finns följande potential att uppnå.</span>
        </div>
        <div class="bar__chart">
          <bar-chart :chartsData="barData" />
        </div>
      </div>

    </section>

    </div>
  </main>
</template>

<script>
import { 
  DoughnutChart, 
  BarChart,
  Slider, 
  Button, 
  Symbols,
  Labels
} from '../components/';

import { doughnutData } from '../data/';
import { barData } from '../data/';
import { db } from '../../firebase-config';
import jsonData from '../data/data.json';

export default {
  name: 'home',
  data() {
    return {
      doughnutData: {
        labels: doughnutData.labels,
        data: doughnutData.data,
        colors: doughnutData.colors
      },
       barData: {
        labels: barData.labels,
        data: barData.data,
        colors: barData.colors
      },
      jsonData: jsonData[0],
      firebaseData: []
    }
  },

  components: {
    DoughnutChart, BarChart, Slider, Symbols, Button, Labels
  },

  computed: {
    user() {
      return this.$store.state.user;
    }, 
    wantedPension() {
      return this.$store.state.wantedPension;
    },
    slideData() {
      return this.$store.state.slideData;
    },
    pensionData() {
      return this.$store.state.pensionData[0];
    }
  },

  mounted() {
    this.$store.commit('setPensionData', this.firebaseData);
  },

  firestore: {
    firebaseData: db.collection('pensiondata')
  },

}
</script>

<style lang="scss">
@import '../scss/';

  .container {
    background: $white;
    overflow: hidden;
    padding: 0 1rem;

    @include breakpoints(large) {
      padding: 0 8rem;
    }

  }

  .icons {
    font-size: 1.5em;
    margin-right: .25rem;
  }

  .home {
    background: $white;
    max-width: 1200px;
    margin: 0 auto;

    > section:not(:first-child) {
      padding-top: 2rem;
    }

    .title {
      align-items: center; 
      display: flex;
      padding-bottom: 1rem;

      > h2 {
        margin: .5rem 0;
      }
      
      > h3 {
        margin: .5rem 0;
      }
    }

    &__intro {
      padding-top: 5rem;
      @extend %column;

      @include breakpoints(large) {
        flex-direction: row;
      }

      > div {
        flex: 1;
        padding: .25rem;
      }

      .symbols {
        background: $light;
        @extend %column;
        align-items: center;

        &__header {
          @extend %column;
          align-items: center;
          padding-top: 1rem;
        }

        &__body {
          @extend %column;
          padding-bottom: 1rem;

          &--item {
            @extend %row;
            align-items: center;

            .light {
              width: 1rem;
              height: 1rem; 
              border-radius: $rounded;
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

    &__optimize {
      @extend %column;
      padding: 1rem;
      text-align: center;

      .optimize {
        @extend %column;
      }

      > a {
        font-weight: 700;
        font-family: $mainText;
        letter-spacing: $letterSpacing * 4;
        margin: 2rem auto;
        text-transform: uppercase; 
      }

    }

    &__doughnut {
      @extend %column;

      .doughnut {
        width: 100%; 

        &__labels {
          display: flex; 
          width: inherit;
          margin-top: .5rem;
        }

        &__chart {
          background: $light;
          @extend %row;
          justify-content: space-around;
          align-items: center;
          padding: 1rem 0; 

          &text {
            @extend %column;
          }

        }

      }


      @include breakpoints(large) {
        flex-direction: row;
      }

    }

    .bar {
        @extend %column;
        margin-top: 2rem;

        &__chart {
          background: $light;
          padding: 1rem 0;
        }

        &__header {
          @extend %column;
          align-items: flex-start;
        }

    }

  }

</style>