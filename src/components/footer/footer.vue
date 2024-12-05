<template>
    <div class="site-footer">
        <div class="container">
            <div class="site-footer__widgets">
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4">
                        <footer-contacts />
                    </div>
                    <div class="col-6 col-md-6 col-lg-4">
                        <footer-links
                            title="Quick Links"
                            :links="items"
                        />
                    </div>
                    <div class="col-12 col-md-12 col-lg-4">
                        <footer-newsletter />
                    </div>
                </div>
            </div>

            <div class="site-footer__bottom">
                <div class="site-footer__copyright">
                    <!-- copyright -->
                    Developed by <a class="text-danger" :href="$setting('company').dev_href || 'https://cyber32.com'" target="_blank">{{ $setting('company').dev_name || 'Cyber 32' }}</a>
                    <!-- copyright / end -->
                </div>
                <div class="site-footer__payments">
                    <img :src="$url.img('/images/payments.png')" alt="">
                </div>
            </div>
        </div>
        <ToTop />
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import FooterContacts from '~/components/footer/footer-contacts.vue'
import FooterLinks from '~/components/footer/footer-links.vue'
import FooterNewsletter from '~/components/footer/footer-newsletter.vue'
import ToTop from '~/components/footer/to-top.vue'
import theme from '~/data/theme'

@Component({
    components: { ToTop, FooterNewsletter, FooterLinks, FooterContacts }
})
export default class Footer extends Vue {
    theme = theme
    @Getter('menu/getMenu') getMenu!: Function

    items = []

    mounted() {
        this.items = this.getMenu('quick-links').map((x: Object) => ({ title: x.name, url: x.href }))
    }
}

</script>
