<template>
    <div class="site-footer__widget footer-newsletter">
        <h5 class="footer-newsletter__title">
            Social Links
        </h5>

        <div class="footer-newsletter__text footer-newsletter__text--social">
            Follow us on social networks
        </div>

        <social-links class="footer-newsletter__social-links" shape="circle" />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import SocialLinks from '~/components/shared/social-links.vue'

@Component({
    components: { SocialLinks }
})
export default class FooterNewsletter extends Vue { }

</script>
