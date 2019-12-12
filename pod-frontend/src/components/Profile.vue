<template>
  <aside class="user">
      <i class="fas fa-user"></i>
      <span>{{ user.name }}</span>
      <i class="fas fa-chevron-circle-down"></i>
      <div class="user__dropdown">
        <router-link to="/settings">Mina tillgångar</router-link>
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
@import '../scss/';

.user {
    align-items: center;
    background: $white;   
    border-radius: $rounded;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    max-width: 20rem;
    position: relative;

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
        margin-top: 6rem;
        right: 1rem;    
        z-index: 1;
        box-shadow: 3px 2px 5px $borderColor;
        
        a {
            color: $green;
            font-size: 1.25em;
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
        margin-right: 2rem;
    }

}

</style>