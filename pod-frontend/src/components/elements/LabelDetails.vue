<template>
  <div class="details">
      <p  v-for="detail in $attrs.detail" :key="detail.id">{{ detail }}</p>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>