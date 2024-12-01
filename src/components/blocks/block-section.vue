<template>
    <BlockProductsCarouselContainer
        v-if="section.type == 'carousel-grid'"
        v-slot="{ products, isLoading, tabs, handleTabChange }"
        :tabs="section.categories"
        :initial-data="products"
        :data-source="sectionProductsSource"
    >
        <BlockProductsCarousel
            :title="section.title"
            :layout="`grid-${section.data.cols}`"
            :rows="parseInt(section.data.rows)"
            :products="products"
            :loading="isLoading"
            :groups="tabs"
            @groupClick="handleTabChange"
        />
    </BlockProductsCarouselContainer>
    <div
        v-else-if="section.type == 'pure-grid'"
        class="container products-view"
    >
        <BlockHeader
            :title="section.title"
            :groups="section.categories"
            arrows
            @next="() => {}"
            @prev="() => {}"
            @group-click="$emit('groupClick', $event)"
        />
        <div class="products-view__content">
            <div
                class="products-view__list products-list"
                data-layout="grid-4-full"
                :data-with-features="true"
                :data-mobile-grid-columns="2"
            >
                <div class="products-list__body">
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
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProduct } from '~/interfaces/product'
import { ISection } from '~/store/section'
import ProductCard from '../shared/product-card.vue'
import BlockProductsCarouselContainer from './block-products-carousel-container.vue'
import BlockProductsCarousel from './block-products-carousel.vue'
import BlockHeader from '../shared/block-header.vue'

@Component({
    components: {
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
                console.log(products)
                this.isLoading = false
            })
        }
    }

    sectionProductsSource(tab: {
        sectionId: number;
        id: number;
    }): Promise<IProduct[]> {
        console.log(tab);
        return fetch(
            `http://localhost/api/sections/${tab.sectionId}/products?category=${tab.id}`
        )
            .then(response => response.json())
            .catch(error => {
                console.error("Error fetching section products:", error);
                return [];
            });
    }
}

</script>
