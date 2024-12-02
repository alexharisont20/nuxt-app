<template>
    <ShopPageProduct :product="product" layout="standard" />
</template>

<script lang="ts">

import { Vue, Component, Watch } from 'vue-property-decorator'
import { Context } from '@nuxt/types'
import { IProduct } from '~/interfaces/product'
import ShopPageProduct from '~/components/shop/shop-page-product.vue'

@Component({
    components: { ShopPageProduct },
    async asyncData (context: Context): Promise<{ product: IProduct }> {
        return {
            product: await context.$shopApi.getProductBySlug(context.route.params.slug)
        }
    }
})
export default class Page extends Vue {
    product: IProduct = null!

    // Watch product.options for changes
    @Watch('product.options', { deep: true })
    async onProductOptionsChange(newOptions: any) {
        console.log('Product options changed:', newOptions);

        // Fetch variation based on the new options
        const newAttributes = await this.fetchVariation(newOptions);

        // Merge the new attributes into the product object, excluding `options`
        this.mergeProductAttributes(newAttributes);
    }

    // Fetch a product variation based on options
    fetchVariation(options: any): Promise<Partial<IProduct>> {
        // Example API call (adjust according to your actual API)
        return this.$shopApi.getProductVariation(this.product.slug, { options });
    }

    // Merge new attributes into the existing product object
    mergeProductAttributes(newAttributes: Partial<IProduct>) {
        const { options, ...attributesWithoutOptions } = newAttributes; // Exclude `options`

        // Update only the non-options properties of the product object
        Object.keys(attributesWithoutOptions).forEach((key) => {
            console.log('Updating product property:', key);
            if (key in this.product) {
                (this.product as any)[key] = (attributesWithoutOptions as any)[key];
            }
        });

        console.log('Updated product:', this.product);
    }
}

</script>
