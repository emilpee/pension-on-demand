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
        <i class="far fa-laugh-beam"></i>
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
          <i class="far fa-laugh-beam"></i>
          <h3>Översikt</h3>
        </div>
        <div class="doughnut__chart">
          <div class="doughnut__chart--text">
            <p v-text="chartsData.labels[0]"></p>
            <p v-text="chartsData.data[0]"></p>
          </div>
          <doughnut-chart :chartsData="chartsData" /> 
          <div class="doughnut__chart--text">
            <p v-text="chartsData.labels[1]"></p>
            <p v-text="chartsData.data[1]"></p>
          </div>
        </div>

        <div class="doughnut__labels">
          <Labels  />
        </div>
      </div>      

    </section>

    <section class="home__bar">
      <h3>Nuvarande pensionslösning</h3>
      <span>Prognosen ser ut som följande ifall du behåller din nuvarande strategi.</span>
    </section>

    <section class="home__bar">
      <h3>Pension on demand</h3>
      <span>Baserat på analysen finns följande potential att uppnå.</span>
    </section>


    <section class="home__optimize">
      <h2>Önskad pensionsmål på 32 330 kr/mån uppnåelig.</h2>
      <span>Fortsätt till nästa steg för att optimera din framtida pensionsplan.</span>
      <Button msg="Optimera med POD" />
    </section>


    </div>
  </main>
</template>

<script>
import { 
  DoughnutChart, 
  Slider, 
  Button, 
  Symbols,
  Labels
} from '../components/';

let labels = ["Skulder", "Tillgångar"];
let data = [999999, 9999999];
let colors = ["#C04D4D", "#0F7354"]; 

export default {
  name: 'home',
  data() {
    return {
      chartsData: {
        labels: labels,
        data: data,
        colors: colors
      },
      slideTitles: ['Önskad pension', 'Jag vill gå i pension vid', 'Utrymme för privat sparande', 'Riskprofil']
    }
  },

  components: {
    DoughnutChart, Slider, Symbols, Button, Labels
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
  }

  .home {
    background: $white;
    max-width: 64rem;
    margin: 0 auto;
    padding: 0 1rem;

    .title {
      display: flex;
      align-items: center;
    }


    &__intro {
      padding-top: 5rem;
      flex-direction: column;
      display: flex;

      @include breakpoints(large) {
        flex-direction: row;
      }

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

        &__header {
          background: $white; 
        }

        &__chart {
          background: $light;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          width: inherit;
          padding-bottom: 1rem;

          &--text {
            display: flex;
            flex-direction: column;
          }

        }

      }

      @include breakpoints(large) {
        flex-direction: row;
      }

    }

  }

</style>