<template>
    <nav class="burger" :class="{ darkBg: position && !showMenu }" >
        <div class="burger__container">
            <input id="responsive-menu" type="checkbox">
            <label @click="toggleMenu" for="responsive-menu"> 
                <span id="menu-icon"></span>
            </label>
            <div v-show="showMenu" id="overlay"></div>
            <ul v-show="showMenu">
                <li><router-link to="/">Om tjänsten</router-link></li>
                <li><router-link to="/">Kom igång</router-link></li>
                <div class="seperator"></div>
                <li><router-link to="/settings">Mina tillgångar</router-link></li>
                <li><router-link to="/">Logga ut</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>


export default {

    data() {
        return {
            showMenu: false,
            position: false
        }
    },

    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        handleScroll() {
            this.position = window.pageYOffset > 160;
        }
    },

    created() {
        window.addEventListener('scroll', this.handleScroll);
    },

    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    },

    watch: {
        position: function() {
            console.log('hej')
        }
    }
    

}
</script>

<style lang="scss">

@import '../../scss/';

*,
*:before,
*:after {
    box-sizing: border-box;
}

.burger__container {
    width: 100vw;
    margin-top: .5rem;
}

.seperator {
    height: 10px;
    width: 100%;
    margin: 1rem;
    background: $white;
}

.darkBg {
    background: rgba($black, .8);
}

.burger {
    color: $white;
    right: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    min-height: 3rem;
    display: flex;
    width: 100%;
    z-index: 9999;

    &__container {

        input {
            opacity: 0;
            position: absolute;
            z-index: -1;
        }

        /* Close Icon */
        input[type=checkbox]:checked + label #menu-icon {
            background: transparent;
        }

        input[type=checkbox]:checked + label #menu-icon:before {
            top: 0;
            background: $white;
            transform: rotate(-45deg);
        }

        input[type=checkbox]:checked + label #menu-icon:after {
            bottom: 0;
            background: $white;
            transform: rotate(45deg);
        }

        input:checked ~ #overlay {
            background: $black;
            bottom: 0;
            left: 0;
            height: 100vh;
            position: fixed;
            right: 0;
            top: 0;
            width: 100vw;
            z-index: -1;
        }

    
        label {
            cursor: pointer;
            padding: 1rem;
        }

        > ul {
            font-size: 1.5em;
            height: 100vh;
            @extend %column;
            align-items: center;
            justify-content: center;
            margin-top: -2rem !important;
            padding: 0;
            
            > li {
                margin: 2rem 0;
            }

            a {
                color: $light;
                text-decoration: none;
                text-transform: uppercase;
                letter-spacing: $letterSpacing * 8;
                font-family: $mainText;
                font-size: 1em;
                font-weight: 500;
            }
        }

        input:checked ~ ul {
            margin: 1em;
            max-height: inherit;
            opacity: 1;
        }

    }
}


/* Hamburger Icon */
#menu-icon,
#menu-icon:before,
#menu-icon:after {
    background: $white;
    height: 0.2em;
    transition: all 0.2s ease-in-out;
    width: 100%;
}

#menu-icon {
    display: inline-block;
    max-width: 1.5rem;
    position: relative;

    &:before, &:after {
        content: '';
        right: 0;
        position: absolute;
    }

    &:before {
        top: -0.4em;
    }

    &:after {
        bottom: -0.4em;
    }
}

</style>