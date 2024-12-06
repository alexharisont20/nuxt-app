<template>
    <BlockProductsCarouselContainer
        v-slot="{ products, isLoading, tabs, handleTabChange }"
        :tabs="section.categories"
        :data-source="sectionProductsSource"
    >
        <BlockProductsCarousel
            v-if="section.type == 'carousel-grid'"
            :title="section.title"
            :layout="`grid-${section.data.cols}`"
            :rows="parseInt(section.data.rows)"
            :products="products"
            :loading="isLoading"
            :groups="tabs"
            @groupClick="handleTabChange"
        />
        <div
            v-else-if="section.type == 'pure-grid'"
            :class="[
                'container products-view',
                {
                    'block-products-carousel--loading': isLoading,
                }
            ]"
        >
            <div class="block-header">
                <h3 class="block-header__title">
                    <AppLink
                        :to="`/shop?filter_section=${ section.id }`"
                        class="text-dark"
                    >
                        {{ section.title }}
                    </AppLink>
                </h3>
                <div class="block-header__divider" />

                <ul class="block-header__groups-list">
                    <li>
                        <AppLink
                            :to="`/shop?filter_section=${ section.id }`"
                            :class="[
                                'block-header__group',
                            ]"
                        >
                            View All
                        </AppLink>
                    </li>
                </ul>
            </div>
            <div class="products-view__content">
                <div
                    class="products-view__list products-list"
                    data-layout="grid-4-full"
                    :data-with-features="true"
                    :data-mobile-grid-columns="2"
                >
                    <div class="products-list__body">
                        <div class="block-products-carousel__preloader" />

                        <div
                            v-for="product in products"
                            :key="product.id"
                            class="products-list__item"
                        >
                            <ProductCard :product="product" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BlockProductsCarouselContainer>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProduct } from '~/interfaces/product'
import { ISection } from '~/store/section'
import ProductCard from '../shared/product-card.vue'
import BlockProductsCarouselContainer from './block-products-carousel-container.vue'
import BlockProductsCarousel from './block-products-carousel.vue'
import BlockHeader from '../shared/block-header.vue'
import AppLink from '../shared/app-link.vue'

@Component({
    components: {
        AppLink,
        ProductCard,
        BlockHeader,
        BlockProductsCarouselContainer,
        BlockProductsCarousel
    }
})

export default class BlockSection extends Vue {
    @Prop({ type: Object, default: () => {} }) readonly section!: ISection

    products: IProduct[] = this.section.products || []

    isLoading: boolean = !this.section.products

    mounted () {
        if (!this.products.length) {
            this.sectionProductsSource({ sectionId: this.section.id, id: 0 }).then((products) => {
                this.products = products
                this.isLoading = false
            })
        }
    }

    sectionProductsSource(tab: {
        sectionId: number;
        id: number;
    }): Promise<IProduct[]> {
        return fetch(this.$url.api(`sections/${tab.sectionId}/products?category=${tab.id}`))
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching section products:', error)
                return []
            })
    }
}

</script>
