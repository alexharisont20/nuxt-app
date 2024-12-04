<template>
    <div class="site-footer__widget footer-contacts">
        <h5 class="footer-contacts__title">
            Contact Us
        </h5>

        <div class="footer-contacts__text">
            {{ $setting('company').tagline }}
        </div>

        <ul class="footer-contacts__contacts">
            <li>
                <i class="footer-contacts__icon fas fa-globe-americas" />
                {{ $setting('company').address }}
            </li>
            <li>
                <i class="footer-contacts__icon far fa-envelope" />
                {{ $setting('company').email }}
            </li>
            <li>
                <i class="footer-contacts__icon fas fa-mobile-alt" />
                {{ $setting('company').phone }}
            </li>
            <li>
                <i class="footer-contacts__icon far fa-clock" />
                <span v-html="$setting('company').office_time" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import theme from '~/data/theme'

@Component
export default class FooterContacts extends Vue {
    theme = theme
}

</script>
