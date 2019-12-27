<template>
  <aside class="user">
      <i class="fas fa-user" :style="{ fontSize: '1.25em' }"></i>
      <span>{{ user.name }}</span>
      <i class="fas fa-chevron-circle-down" :style="{ fontSize: '1.25em' }"></i>
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
    text-align: center;
    padding: 1rem;
    margin: 0 auto;
    position: relative;

    > span {
        color: $green;
        font-family: $mainText;
        font-size: 1.375em;
        font-weight: 700;
        letter-spacing: $letterSpacing * 4;
        margin: 0 1rem;
    }

    &__dropdown {
        background: inherit;
        box-shadow: 3px 2px 5px $borderColor;
        display: none;
        top: 3.5rem;
        right: 1.05rem;
        position: absolute;
        z-index: 1;
        min-width: 12rem;
        
        a {
            color: $green;
            display: flex;
            font-size: 1.25em;
            font-family: $mainText;
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

        > span {
            font-size: 1.25em;
            min-width: 14.5rem;
            padding: .2rem 0;
        }
    }   

}

</style>