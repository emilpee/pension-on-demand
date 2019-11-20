<template>

  <a class="tabs__item"  :class="{ active: tab.isActive }" @click="changeView">
    {{ this.tab.title }}
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
      
      // TODO - snygga till.
      if (!this.tab.isActive) {
        tabs[0].isActive = !tabs[0].isActive;
        tabs[1].isActive = !tabs[1].isActive;
      } 
  
    }
  }

}
</script>

<style lang="scss">
@import '@/scss/';

  .tabs__item {
      background: #efefef;
      border: 1px solid $borderColor;
      border-top-left-radius: $borderRadius;
      border-top-right-radius: $borderRadius;
      border-bottom: none;
      color: $gray;
      cursor: pointer;
      @extend %center-content;
      font-family: $btnText;
      font-size: 1.125rem;
      flex: 1;
      padding: 1rem;

      &:nth-child(1) {
        margin-right: .5rem;
      }
  }

  .active {
    background: $white;
  }

</style>