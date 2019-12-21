<template>
  <footer class="footer">
      <div class="footer__item">
        <ul>
            <p>Hitta snabbt</p>
            <li>Vanliga frågor</li>
            <li>Ordlista</li>
            <li>Press</li>
            <li>Webbkarta</li>
            <li>Cookies</li>
        </ul>
      </div>
      <div class="footer__item">
        <ul>
            <p>Följ oss</p>
            <li>Vår blogg</li>
            <li>PD-podden</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Snapchat</li>
        </ul>
      </div>
      <div class="footer__item">
        <ul>
            <p>Kontakta oss</p>
            <li>Kundservice</li>
            <li>Företagsservice</li>
        </ul>
      </div>
      <div class="footer__item">
        <ul>
            <p>Om oss</p>
            <li>Om Pension on Demand</li>
            <li>Allt om Pension on Demand</li>
            <li>Kom igång</li>
            <li>Mina sidor</li>
            <li>Behandling av personuppgifter</li>
        </ul>
      </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/scss/';

.footer {
    background: $gray;
    @extend %column;
    align-items: flex-start;

    &__item {
        display: flex;
        justify-content: center;
        margin: 0 1rem;
    }

    @include breakpoints(large) {
        flex-direction: row;
        justify-content: space-between;
        padding: 5rem;
    }
}

</style>