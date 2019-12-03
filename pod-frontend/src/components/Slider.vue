<template>
  <div class="slider">
      <div class="slider__text">
        <span>{{ title }}</span>
        <label for="item">{{ inputValue }}</label>
      </div>
      <div class="slider__input">
        <input ref="input" @input="updateSlider()" class="slider__item" type="range" min="0" max="20" name="item" value="10"/> 
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

    props: ['title', 'value'],

    methods: {
        updateSlider() {
            let input = this.$refs.input;
            let value = (input.value - input.min)/(input.max - input.min);

            this.inputValue = this.$refs.input.value;

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
    margin: .75rem 0;

    &__button {
        margin: 1rem auto;
    }

    &__text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        > span {
            font-family: $mainText;
            font-weight: 300;
        }
    }

    input[type=range] {
      -webkit-appearance: none;
      margin: .5rem 0;

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
        }

        &::-webkit-slider-runnable-track  {
            background: $borderColor;
            border-radius: 9999rem;
            cursor: pointer;
            height: .5rem;
            padding: .5rem;
        }

    }
}

</style>