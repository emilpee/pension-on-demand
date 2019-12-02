<template>
  <div class="slider">
      <div class="slider__text">
        <span>{{ title }}</span>
        <label for="item">{{ inputValue }}</label>
      </div>
      <div class="slider__input">
        <input ref="input" @input="updateColor(); updateValue()" class="slider__item" type="range" min="0" max="10" name="item" value="5"/> 
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
        this.updateColor();
        this.updateValue();
    },

    props: ['title', 'value'],

    methods: {
        updateValue() {
            this.inputValue = this.$refs.input.value;
        },

        updateColor() {
            let input = this.$refs.input;
            let value = (input.value - input.min)/(input.max - input.min);
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
        }
    },
    
}

</script>

<style lang="scss">
@import '@/scss/';

.slider {
    display: flex;
    flex-direction: column;
    background: $light;
    margin: .8rem 0;

    &__text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: -.5rem;

        > span {
            font-family: $mainText;
            font-weight: 300;
        }
    }

    input[type=range] {
      -webkit-appearance: none;
      margin: 1rem 0;
      width: 100%;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            border: 2px solid $white;
            width: 2rem;
            height: 2rem;
            border-radius: 9999rem;
            background: $green;
            cursor: pointer;
            margin-top: -1rem;
        }

        &::-moz-range-track {
            -webkit-appearance: none;
            border: 2px solid $white;
            width: 2rem;
            border-radius: 9999rem;
            background: $green;
            cursor: pointer;
            margin-top: -.8rem;
        }

        &::-webkit-slider-runnable-track  {
            background: $borderColor;
            border-radius: 9999rem;
            cursor: pointer;
            height: .5rem;
            padding: .5rem;
            width: 100%;
        }

    }
}

</style>