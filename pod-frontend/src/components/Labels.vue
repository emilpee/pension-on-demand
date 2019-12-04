<template>
    <main class="doughnut__labels">
        <div class="label">
            <div v-for="label in assetsLabels" :key="label.id" class="label__asset">
                <span class="asset__item">{{ label.name }}</span>
                <p class="asset__data"> {{ label.data }}</p> 
                <div class="debt__lights">
                    <traffic-lights />
                </div>
            </div>
        </div>

        <div class="label">
            <div v-for="label in debtsLabels" :key="label.id" class="label__debt">
                <span class="debt__item">{{ label.name }}</span>
                <p class="debt__data"> {{ label.data }}</p> 
                <div class="debt__lights">
                    <traffic-lights :data="label.data" />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import TrafficLights from './TrafficLights.vue';
import { assetsLabels, debtsLabels } from '../data/';

export default {
    data() {
        return {
            assetsLabels: assetsLabels,
            debtsLabels: debtsLabels
        }
    },
    components: {
        TrafficLights
    }
}
</script>

<style lang="scss">
@import '@/scss/';

.label {
    @extend %column;
    flex: 1;

    &:first-child {
        margin-right: 1rem;
    }

    &:nth-child(2) {
        margin-left: 1rem;
    }

    &__asset, &__debt {
        background: $light;
        border: 4px solid rgba($gray, .04);
        display: flex;
        align-items: center;
        flex-direction: row;
        margin: .5rem 0;
        width: 100%;
    }

    .debt__item, .asset__item {
        flex: 6;
        margin: 0 .75rem;

        ~ p {
            flex: 3;
            text-align: center;
        }

        ~ div {
            flex: 1;
            @extend %center-content;
        }
    
    }
    
}

</style>