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

    <section class="home__doughnut" v-if="userData !== undefined">

      <div class="doughnut">
        <div class="doughnut__header title">
          <i class="far icons fa-laugh-beam"></i>
          <h3>Översikt</h3>
        </div>
        <div class="doughnut__chart">
          <div class="doughnut__charttext">
            <p>Tillgångar</p>
            <p v-text="totalAssets.toString()"></p>
          </div>
          <doughnut-chart v-if="totalAssets" :chartsData="doughnutData" :pensionData="[totalAssets, totalDebts]" /> 
          <div class="doughnut__charttext">
            <p>Skulder</p>
            <p v-text="totalDebts.toString()"></p>
          </div>
        </div>

        <div class="doughnut__labels">
          <Labels />
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
          <bar-chart :chartData="barData" :pension="jsonData.pension" />
        </div>
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
      <div v-show="!showResponse" class="optimize__header title" :class="{ loading: loading }">
        <h2>Se hur mycket pension du kan få för ett sparande på {{ privateSavings }} kr/mån.</h2>
        <span>Fortsätt till nästa steg för att optimera din framtida pensionsplan.</span> 
      </div>
      <div class="optimize__footer" :class="{ loading: loading }">
        <h2 v-show="showResponse">Enligt vår analys kan du få cirka {{ response }} kr/mån, om du går i pension vid {{ shownAge }} år. </h2>
        <loading-spinner v-show="loading" />
        <Button v-show="!loading && !showResponse" msg="Optimera med PD" @click.native="optimize" />
        <Button v-show="!loading && showResponse" msg="Optimera igen" @click.native="optimize" />
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
  Labels,
  LoadingSpinner
} from '../components/';

import jsonData from '../data/data.json';

export default {
  name: 'home',
  data() {
    return {
      doughnutData: {
        labels: ['Tillgångar', 'Skulder'],
        colors: [ "#0F7354", "#C04D4D"]
      },
      barData: {
        colors: ['#fab', '#h0a', '#b4f', '#a3b'],
        years: []
      },
      jsonData: jsonData[0],
      loading: false,
      showResponse: false,
      response: '', 
      shownAge: ''
    }
  },

  components: {
    DoughnutChart, BarChart, Slider, Symbols, Button, Labels, LoadingSpinner
  },

  methods: {
    optimize() {

      this.loading = true;

      setTimeout(() => {
        const age = this.userAge;
        let savings = this.privateSavings;
        let pensionAge = this.pensionAge; 
        let chosenRisk = this.risk;
        let risks = this.jsonData.risks;
        let inflation = this.jsonData.inflation;

        this.shownAge = pensionAge;
        
        // Calculate total saving years
        let years = pensionAge - age; 

        let totalSavings = (savings * 12) * years;

        let risk = risks[chosenRisk];
        let generalValue;
        let occupationalValue;

        this.pensionData.forEach(item => item.type === "Allmän pension" ? generalValue = item.value : occupationalValue = item.value);

        // Räkna ut pension baserat på nuvarande pension, lön med årlig ökning, samt hur många år till pensionen.
        let generalPension = ((this.salary.value *= this.salary.procent) * 0.185) * years;
        generalPension += generalValue;
        let occupationalPension = ((this.salary.value *= this.salary.procent) * 0.045) * years;
        occupationalPension += occupationalValue;

        let totalPension = generalPension + occupationalPension;

        // Räkna ut totalen
        let total = totalPension / (12 * (80 / pensionAge)); 
 
        total += ((totalSavings * risk) * (inflation * years)) / (pensionAge * (years / 12));

        this.response = Number(total).toFixed();

        this.loading = !this.loading;
        this.showResponse = true;

      }, 2000)
 
    }
  }, 

  mounted() {
      this.$store.dispatch('getUserData', sessionStorage.getItem('personal')).then(doc => {
        this.$store.commit('setUserData', doc.data());  
        this.$store.commit('setChoices', doc.data().choices);
        this.$store.commit('setUserAge', doc.data().user.age);
        this.$store.commit('setSalary', doc.data().salary);
        this.$store.commit('setPensionData', doc.data().pension);


      })

      // TODO - skapa ålderslogik.
      if (this.userAge < 30) {
        this.barData.years.push('', 30, 35, 40, 45, 50, 55, 60, 65);
      } else if (this.userAge > 40) {
        this.barData.years.push('', 45, 50, 55, 60, 65, 70, 75, 80);
      }
  },

  computed: {
    user() {
      return this.$store.state.user;
    }, 
    userAge() {
      return this.$store.state.userAge;
    },
    privateSavings() {
      return this.$store.state.privateSavings;
    },
    salary() {
      return this.$store.state.salary;
    },
    risk() {
      return this.$store.state.risk;
    },
    pensionAge() {
      return this.$store.state.pensionAge;
    },
    pensionData() {
      return this.$store.state.pensionData;
    },
    totalDebts() {
      return this.$store.getters.getTotalDebts;
    },
    totalAssets() {
      return this.$store.state.totalAssets
    },
    personalNr() {
      return this.$store.state.personalNr;
    },
    userData() {
      return this.$store.state.userData;
    }
  }
}
</script>

<style lang="scss">
@import '../scss/';

  .container {
    background: $white;
    overflow: hidden;
    padding: 0 1.25rem;

    @include breakpoints(large) {
      padding: 0 8rem;
    }

  }

  .loading {
    
    > * {
      color: rgba($gray, .3);
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

    > section:not(:generalValue-child) {
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

      .title {
        @extend %column;
      }

      .optimize__footer {
        padding: 1rem 0;
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
          flex-direction: column;
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

    }

    .bar {
        @extend %column;
        margin: 2rem 0;

        &__chart {
          background: $light;
          padding: 1rem 0;
        }

        &__header {
          @extend %column;
          align-items: flex-start;
        }

    }

      @include breakpoints(large) {
        flex-direction: row;
      
        .doughnut__labels {
          flex-direction: row;
        }

      }

  }

</style>