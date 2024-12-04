<template>
    <LayoutError v-if="page.message" :error="{statusCode: 404, message: 'Page Not Found'}" />
    <div v-else>
        <PageHeader
            :breadcrumb="[
                { title: 'Home', url: '' },
                { title: page.title, url: '/site'+page.slug },
            ]"
        />

        <div class="block">
            <div class="container">
                <div v-if="page.content == '<p>[CONTACT_PAGE]</p>'" class="mb-0 card">
                    <div class="card-body contact-us">
                        <div class="contact-us__container">
                            <div class="row">
                                <div class="pb-4 col-12 col-lg-4 pb-lg-0">
                                    <h4 class="contact-us__header card-title">
                                        Our Address
                                    </h4>

                                    <div class="contact-us__address">
                                        <div class="contact-info">
                                            <ul class="list-unstyled">
                                                <li>
                                                    <div class="part-icon">
                                                        <span><i class="fas fa-id-card"></i></span>
                                                    </div>
                                                    <div class="part-txt">
                                                        <div>{{$setting('company').contact_name}}</div>
                                                        <a class="text-dark" :href="`mailto:${$setting('company').email}`">{{$setting('company').email}}</a>
                                                        <br>
                                                        <a class="text-dark" :href="`tel:${$setting('company').phone}`">{{$setting('company').phone}}</a>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="part-icon">
                                                        <span><i class="fas fa-map-marker-alt"></i></span>
                                                    </div>
                                                    <div class="part-txt" v-html="$setting('company').address" />
                                                </li>
                                                <li>
                                                    <div class="part-icon">
                                                        <span><i class="fas fa-clock"></i></span>
                                                    </div>
                                                    <div class="part-txt" v-html="$setting('company').office_time" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-lg-8">
                                    <div class="contact-us__map" v-html="$setting('company').gmap_ecode" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="document">
                    <div class="document__header">
                        <h1 class="document__title">
                            {{ page.title }}
                        </h1>
                    </div>
                    <div class="document__content typography" v-html="page.content" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Context } from '@nuxt/types'
import { Vue, Component } from 'vue-property-decorator'
import PageHeader from '~/components/shared/page-header.vue'
import AppLink from '~/components/shared/app-link.vue'
import LayoutError from '~/layouts/error.vue'

@Component({
    components: { PageHeader, AppLink, LayoutError },
    async asyncData(context: Context) {
        return { page: await fetch(`http://localhost/api/page${context.route.path}`).then(response => response.json()) }
    },
    head () {
        return {
            title: this.page.title
        }
    }
})
export default class SitePageTerms extends Vue {
    mounted() {
        console.log(this.page)
    }
}

</script>
