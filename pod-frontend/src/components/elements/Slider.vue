<template>
  <div class="slider">
      <div class="slider__text">
        <span>{{ data.title }}</span>
        <label for="item">{{ inputValue }}</label>
      </div>
      <div class="slider__input">
        <input ref="input" @input="updateSlider()" class="slider__item" type="range" :id="data.id" :min="data.minValue" :max="data.maxValue" name="item"/> 
      </div>
  </div>
</template>

<script>

export default {

    data() {
        return {
            inputValue: ''
        }
    },

    mounted() {
        this.updateSlider();
    },


    props: ['data', 'value'],

    methods: {
        updateSlider() {
            let input = this.$refs.input;
            let value = (input.value - input.min) / (input.max - input.min);

            this.inputValue = input.value;

            input.id === "1" ? this.$store.commit('setGoal', input.value) : null;

            switch (input.value) {
                case "0":
                    this.inputValue = "Låg";
                    break;
                case "1": 
                    this.inputValue = "Medel";
                    break;
                case "2": 
                    this.inputValue = "Hög"; 
                    break;
                default: 
                    this.inputValue;
            }

            input.style.backgroundImage = [
                '-webkit-gradient(',
                'linear, ',
                'left top, ',
                'right top, ',
                'color-stop(' + value + ', #0F7354), ',
                'color-stop(' + value + ', transparent)',
                ')'
            ].join(''),
            input.style.borderRadius = '9999rem';
        },
    },
    
}

</script>

<style lang="scss">
@import '../../scss/';

.sliders {
    @extend %column;
    background: $light;

    .slider {
        padding: 1rem 3rem; 
        margin: .5rem 0;

        &__text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            > span {
                font-family: $mainText;
                font-weight: 300;
            }
        }

        label {
            font-weight: 500;
        }

        &:first-child {

            label {

                &::after {
                    content: " kr/mån";
                }

            }
        }

        &:nth-child(2) {

            label {

                &::after {
                    content: " år";
                }
            }

        }

    }
        

    &__button {
        margin: 1.5rem auto;
    }

}

</style>