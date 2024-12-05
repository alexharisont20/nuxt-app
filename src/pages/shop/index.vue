<template>
    <ShopPageCategory :columns="parseInt($setting('products_page').cols)" view-mode="grid" />
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { ParsedQuery } from 'query-string'
import { parseQueryFilters, parseQueryOptions } from '~/services/helpers'
import ShopPageCategory from '~/components/shop/shop-page-category.vue'

@Component({
    components: { ShopPageCategory },
    async asyncData ({ store, query }): Promise<object | void> {
        const options = parseQueryOptions(query as ParsedQuery)
        const filters = parseQueryFilters(query as ParsedQuery)

        await store.dispatch('setting/fetchSettings', ['products_page'])

        await store.dispatch('shop/init', {
            categorySlug: null,
            options,
            filters
        })
    }
})
export default class Page extends Vue { }

</script>
