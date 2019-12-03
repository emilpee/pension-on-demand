<template>
  <aside class="user">
      <i class="fas fa-user"></i>
      <span>{{ user.name }}</span>
      <i class="fas fa-chevron-circle-down"></i>
      <div class="user__dropdown">
        <router-link to="/">Mina tillgångar</router-link>
        <router-link to="/login" @click.native="signOut">Logga ut</router-link>
      </div>
  </aside>
</template>

<script>
export default {

    methods: {
        signOut() {
            sessionStorage.removeItem('user');
        }
    },

    computed: {
        user() {
            return this.$store.state.user;
        }
    }


}
</script>

<style lang="scss">
@import '@/scss/';

.user {
    align-items: center;
    background: $white;   
    border-radius: 9999rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    position: relative;
    max-width: 20rem;

    > span {
        font-family: $mainText;
        font-size: 1.375em;
        color: $green;
        font-weight: 700;
        letter-spacing: $letterSpacing * 4;
    }

    &__dropdown {
        background: inherit;
        display: none;
        position: absolute;
        margin-top: 4rem;
        right: 1rem;    
        z-index: 1;

        a {
            color: $green;
            font-size: 1.25rem;
            font-family: $mainText;
            display: flex;
            margin: .75rem 0;
            padding: 1rem .5rem;

            &:hover {         
                color: $lightGreen;
            }

        }
    }


    &:hover {
        cursor: pointer;

        .user__dropdown {
            display: block;
        }

    }

    @include breakpoints(large) {
        margin-right: 1rem;
    }

}

</style>