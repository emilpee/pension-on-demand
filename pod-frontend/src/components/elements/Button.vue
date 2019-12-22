<template>
  <a class="btn" v-text="this.msg"></a>
</template>

<script>
export default {
    props: ['msg']
}
</script>

<style lang="scss">
@import '../../scss/';

.btn {
    background: $mediumGreen;
    border-radius: $borderRadius * 4;
    color: $white;
    cursor: pointer;
    font-family: $btnText;
    font-size: 1.125em;
    padding: 1rem 3.5rem;
    text-decoration: none;
}

</style>