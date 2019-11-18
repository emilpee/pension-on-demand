<template>
    <div class="login__form">
      <p>{{ tabs.title }}</p>
      <img src="../../src/assets/img/bankid.png" alt="BankID logo" />
      <Button msg="Öppna BankID-applikationen" @click.native="chooseDevice" />
    </div>
</template>

<script>
import { Button } from '../components/';

export default {
    
    props: {
        tabs: Array
    },

    components: {
        Button
    },

    methods: {
        chooseDevice() {
            this.$store.commit('setChoosedDevice', true);
        }
    }

}
</script>

<style lang="scss" scoped>
.login__form {
    border-top: none;
}

</style>