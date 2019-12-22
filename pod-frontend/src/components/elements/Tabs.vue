<template>

  <a class="tabs__item"  :class="{ active: tab.isActive }" @click="changeView">
    {{ tab.title }}
  </a>
  
</template>

<script>
export default {

  props: {
    tab: Object
  },

  methods: {
    changeView() {
      let tabs = this.$parent.tabs;

      if (!this.tab.isActive) {
        for (let i = 0; i < tabs.length; i++) {
          tabs[i].isActive = !tabs[i].isActive;
        }
      } 
  
    }
  }

}
</script>

<style lang="scss">
@import '../../scss/';

  .tabs__item {
      background: #efefef;
      border: 1px solid $borderColor;
      border-radius: 0px;
      border-bottom: none;
      color: $black;
      cursor: pointer;
      flex-direction: column;
      @extend %center-content;
      font-family: $btnText;
      font-size: 1.125rem;
      flex: 1;
      padding: 1rem;

      @include breakpoints(large) {
        background: #efefef;
        border-top-left-radius: $borderRadius;
        border-top-right-radius: $borderRadius;
        color: $gray;
        flex-direction: row;

        &:nth-child(1) {
          margin-right: .5rem;
        }

      }

  }


  .active {
      background: $mediumGreen;
      color: white;

      @include breakpoints (large) {
        background: $white;
        color: $gray;
      }
  }



</style>