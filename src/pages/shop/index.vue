<template>
    <ShopPageCategory :columns="parseInt($setting('products_page').cols)" view-mode="grid" />
</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator'
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
            categorySlug: query.filter_category,
            options,
            filters
        })
    }
})
export default class Page extends Vue {
    // Watch for changes to the filter_category route query
    @Watch('$route.query.filter_category', { immediate: false })
    async onFilterCategoryChange(newCategory: string, oldCategory: string) {
        if (newCategory !== oldCategory) {
            const options = parseQueryOptions(this.$route.query as ParsedQuery)
            const filters = parseQueryFilters(this.$route.query as ParsedQuery)

            // Re-dispatch shop/init with updated query parameters
            await this.$store.dispatch('shop/init', {
                categorySlug: newCategory,
                options,
                filters
            })
        }
    }
}

</script>
