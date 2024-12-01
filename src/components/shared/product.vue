<template>
    <div :class="`product product--layout--${layout}`">
        <div class="product__content">
            <ProductGallery :layout="layout" :images="product.images" />

            <div class="product__info">
                <div class="product__wishlist-compare">
                    <AsyncAction v-slot="{ run, isLoading }" :action="() => $store.dispatch('wishlist/add', { product })">
                        <button
                            type="button"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Wishlist"
                            :class="[
                                'btn btn-sm btn-light btn-svg-icon',
                                {'btn-loading': isLoading}
                            ]"
                            @click="run"
                        >
                            <Wishlist16Svg />
                        </button>
                    </AsyncAction>

                    <AsyncAction v-slot="{ run, isLoading }" :action="() => $store.dispatch('compare/add', { product })">
                        <button
                            type="button"
                            data-toggle="tooltip"
                            data-placement="right"
                            title="Compare"
                            :class="[
                                'btn btn-sm btn-light btn-svg-icon',
                                {'btn-loading': isLoading}
                            ]"
                            @click="run"
                        >
                            <Compare16Svg />
                        </button>
                    </AsyncAction>
                </div>
                <h1 class="product__name">
                    {{ product.name }}
                </h1>
                <ul class="product__meta">
                    <li class="product__meta-availability">
                        Availability:
                        <template v-if="product.availability == 'In Stock'">
                            <span class="text-success">In Stock</span>
                        </template>
                        <template v-else>
                            <span v-if="parseInt(product.availability) > 0" class="text-success">{{ product.availability }} In Stock</span>
                            <span v-else class="text-danger">Out Of Stock</span>
                        </template>
                    </li>
                    <li v-if="product.brand">
                        Brand:
                        <AppLink to="/">
                            {{ product.brand.name }}
                        </AppLink>
                    </li>
                    <li>SKU: {{ product.sku }}</li>
                </ul>
            </div>

            <div class="product__sidebar">
                <div class="product__availability">
                    Availability:
                    <span class="text-success">In Stock</span>
                </div>

                <div class="product__prices">
                    <template v-if="product.compareAtPrice">
                        <span class="product__new-price">
                            {{ $price(product.price) }}
                        </span>
                        <span class="product__old-price">
                            {{ $price(product.compareAtPrice) }}
                        </span>
                    </template>
                    <template v-if="!product.compareAtPrice">
                        {{ $price(product.price) }}
                    </template>
                </div>

                <form class="product__options">
                    <div v-for="attribute in product.attributes" :key="attribute.id" class="form-group product__option">
                        <div class="product__option-label">
                            {{ attribute.name }}
                        </div>
                        <div v-if="attribute.name === 'Color'" class="input-radio-color">
                            <div class="input-radio-color__list">
                                <label
                                    v-for="option in product.optionGroup[attribute.id.toString()]"
                                    :key="option.id"
                                    class="input-radio-color__item input-radio-color__item--white"
                                    :style="{ color: option.value }"
                                    data-toggle="tooltip"
                                    :title="option.name"
                                >
                                    <input v-model="product.options[attribute.id.toString()]" type="radio" :value="option.id">
                                    <span />
                                </label>
                            </div>
                        </div>
                        <div v-else class="input-radio-label">
                            <div class="input-radio-label__list">
                                <label
                                    v-for="option in product.optionGroup[attribute.id.toString()]"
                                    :key="option.id"
                                >
                                    <input v-model="product.options[attribute.id.toString()]" type="radio" :value="option.id">
                                    <span>{{ option.name }}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group product__option">
                        <!--suppress XmlInvalidId -->
                        <label for="product-quantity" class="product__option-label">Quantity</label>
                        <div class="product__actions">
                            <div class="product__actions-item">
                                <InputNumber
                                    id="product-quantity"
                                    v-model="quantity"
                                    aria-label="Quantity"
                                    class="product__quantity"
                                    size="lg"
                                    :min="1"
                                />
                            </div>
                            <div class="product__actions-item product__actions-item--addtocart">
                                <AsyncAction v-slot="{ run, isLoading }" :action="addToCart">
                                    <button
                                        type="button"
                                        :class="[
                                            'btn btn-primary btn-lg',
                                            {'btn-loading': isLoading}
                                        ]"
                                        :disabled="!quantity"
                                        @click="run"
                                    >
                                        Add to cart
                                    </button>
                                </AsyncAction>
                            </div>
                            <div class="product__actions-item product__actions-item--wishlist">
                                <AsyncAction v-slot="{ run, isLoading }" :action="() => $store.dispatch('wishlist/add', { product })">
                                    <button
                                        type="button"
                                        data-toggle="tooltip"
                                        title="Wishlist"
                                        :class="[
                                            'btn btn-secondary btn-svg-icon btn-lg',
                                            {'btn-loading': isLoading}
                                        ]"
                                        @click="run"
                                    >
                                        <Wishlist16Svg />
                                    </button>
                                </AsyncAction>
                            </div>
                            <div class="product__actions-item product__actions-item--compare">
                                <AsyncAction v-slot="{ run, isLoading }" :action="() => $store.dispatch('compare/add', { product })">
                                    <button
                                        type="button"
                                        data-toggle="tooltip"
                                        title="Compare"
                                        :class="[
                                            'btn btn-secondary btn-svg-icon btn-lg',
                                            {'btn-loading': isLoading}
                                        ]"
                                        @click="run"
                                    >
                                        <Compare16Svg />
                                    </button>
                                </AsyncAction>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div class="product__footer">
                <div class="product__tags tags">
                    <div class="tags__list">
                        <AppLink v-for="category in product.categories" :key="category.id" to="/">
                            {{ category.name }}
                        </AppLink>
                    </div>
                </div>

                <div class="product__share-links share-links">
                    <ul class="share-links__list">
                        <li class="share-links__item share-links__item--type--like">
                            <AppLink to="/">
                                Like
                            </AppLink>
                        </li>
                        <li class="share-links__item share-links__item--type--tweet">
                            <AppLink to="/">
                                Tweet
                            </AppLink>
                        </li>
                        <li class="share-links__item share-links__item--type--pin">
                            <AppLink to="/">
                                Pin It
                            </AppLink>
                        </li>
                        <li class="share-links__item share-links__item--type--counter">
                            <AppLink to="/">
                                4K
                            </AppLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { IProduct } from '~/interfaces/product'
import Rating from '~/components/shared/rating.vue'
import ProductGallery from '~/components/shared/product-gallery.vue'
import AppLink from '~/components/shared/app-link.vue'
import AsyncAction from '~/components/shared/async-action.vue'
import InputNumber from '~/components/shared/input-number.vue'
import Wishlist16Svg from '~/svg/wishlist-16.svg'
import Compare16Svg from '~/svg/compare-16.svg'

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
    components: { Rating, AppLink, ProductGallery, AsyncAction, Wishlist16Svg, Compare16Svg, InputNumber }
})
export default class Product extends Vue {
    @Prop({ type: String, required: true }) readonly layout!: ProductLayout
    @Prop({ type: Object, required: true }) readonly product!: IProduct

    quantity: number | string = 1

    addToCart (): Promise<void> {
        if (typeof this.quantity === 'string' || this.quantity < 1) {
            return Promise.resolve()
        }

        return this.$store.dispatch('cart/add', { product: this.product, quantity: this.quantity })
    }
}

</script>
