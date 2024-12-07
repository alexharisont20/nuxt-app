<template>
    <div :class="[$attrs.class, 'social-links', `social-links--shape--${shape}`]">
        <ul class="social-links__list">
            <li v-for="item in items" :key="item.type" class="social-links__item">
                <a
                    :class="['social-links__link', `social-links__link--type--${item.type}`]"
                    :href="item.url"
                    target="_blank"
                >
                    <i :class="item.icon" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import theme from '~/data/theme'

type Shape = 'circle' | 'rounded';

@Component
export default class SocialLinks extends Vue {
    @Prop({ type: String, default: () => 'circle' }) readonly shape!: Shape

    items = [
        { type: 'youtube', icon: 'fab fa-youtube', url: this.$setting('social').youtube.link },
        { type: 'facebook', icon: 'fab fa-facebook-f', url: this.$setting('social').facebook.link },
        { type: 'twitter', icon: 'fab fa-twitter', url: this.$setting('social').twitter.link },
        { type: 'instagram', icon: 'fab fa-instagram', url: this.$setting('social').instagram.link }
    ]
}

</script>
