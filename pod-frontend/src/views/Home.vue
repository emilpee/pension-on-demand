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
        <i :style="{ fontSize: '1.5em', marginRight: '.25rem' }" class="far fa-laugh-beam"></i>
        <h3>Målbild</h3>
      </div>
      <div class="slider">
        <slider v-for="(title, index) in slideTitles" :title="title" :key="index" /> 
        <Button class="slider__button" msg="Bygg min portfölj" />
      </div>
    </section>

    <section class="home__doughnut">

      <div class="doughnut">
        <div class="doughnut__header title">
          <i :style="{ fontSize: '1.5em', marginRight: '.25rem' }" class="far fa-laugh-beam"></i>
          <h3>Översikt</h3>
        </div>
        <div class="doughnut__chart">
          <div class="doughnut__charttext">
            <p v-text="doughnutData.labels[0]"></p>
            <p v-text="doughnutData.data[0]"></p>
          </div>
          <doughnut-chart :chartsData="doughnutData" /> 
          <div class="doughnut__charttext">
            <p v-text="doughnutData.labels[1]"></p>
            <p v-text="doughnutData.data[1]"></p>
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

    <section class="home__optimize">
      <div class="optimize title">
        <h2>Önskad pensionsmål på 32 330 kr/mån uppnåelig.</h2>
        <span>Fortsätt till nästa steg för att optimera din framtida pensionsplan.</span>
      </div>
      <Button msg="Optimera med POD" />
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
      slideTitles: ['Önskad pension', 'Jag vill gå i pension vid', 'Utrymme för privat sparande', 'Riskprofil']
    }
  },

  components: {
    DoughnutChart, BarChart, Slider, Symbols, Button, Labels
  },

  computed: {
    user() {
      return this.$store.state.user;
    },
  }
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

        &:nth-child(1) {
          margin-right: 1rem;
        }

        &__chart {
          background: $light;
          @extend %row;
          justify-content: space-around;
          align-items: center;
          width: inherit;
          padding-bottom: 1rem;

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

        &__header {
          @extend %column;
          align-items: flex-start;
        }

    }

  }

</style>