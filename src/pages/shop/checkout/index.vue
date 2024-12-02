<template>
    <div>
        <client-only>
            <PageHeader
                title="Checkout"
                :breadcrumb="[
                    { title: 'Home', url: $url.home() },
                    { title: 'Shopping Cart', url: $url.cart() },
                    { title: 'Checkout', url: '' },
                ]"
            />

            <div class="block checkout">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-6 col-xl-7">
                            <div class="card mb-lg-0">
                                <div class="p-3 card-body">
                                    <div class="mb-2 text-center border text-danger" style="padding: 2px 10px; font-size: 1.25rem;">
                                        নিচের তথ্যগুলো সঠিকভাবে পূরণ করে <strong>কনফার্ম অর্ডার</strong> বাটনে ক্লিক করুন।
                                    </div>
                                    <div class="form-row">
                                        <div class="m-0 form-group col-md-3">
                                            <label>আপনার নাম: <span class="text-danger">*</span></label>
                                        </div>
                                        <div class="form-group col-md-9">
                                            <input name="name" type="text" id="name" class="form-control is-invalid" wire:model="name" place-holder="এখানে আপনার নাম লিখুন।" placeholder="Type your name here.">
                                            <div class="invalid-feedback">
                                                The name field is required.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="m-0 form-group col-md-3">
                                            <label>মোবাইল নম্বর: <span class="text-danger">*</span></label>
                                        </div>
                                        <div class="form-group col-md-9">
                                            <div class="input-group">
                                                <!--[if BLOCK]><![endif]--><!--[if ENDBLOCK]><![endif]-->
                                                <input name="phone" type="tel" id="phone" class="form-control is-invalid" wire:model="phone" place-holder="আপনার ফোন নম্বর লিখুন।" placeholder="Type your phone number.">
                                                <div class="invalid-feedback">
                                                    The phone field is required.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="m-0 form-group col-md-3">
                                            <label class="d-block">
                                                <label>ডেলিভারি এরিয়া: <span class="text-danger">*</span></label>
                                            </label>
                                        </div>
                                        <div class="form-group col-md-9">
                                            <div class="h-auto form-control is-invalid">
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" wire:model.live="shipping" class="custom-control-input" id="inside-dhaka" name="shipping" value="Inside Dhaka">
                                                    <label class="custom-control-label" for="inside-dhaka">ঢাকা শহর <!--[if BLOCK]><![endif]--> (70 টাকা) <!--[if ENDBLOCK]><![endif]--></label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" wire:model.live="shipping" class="custom-control-input" id="outside-dhaka" name="shipping" value="Outside Dhaka">
                                                    <label class="custom-control-label" for="outside-dhaka">ঢাকার বাইরে <!--[if BLOCK]><![endif]--> (130 টাকা) <!--[if ENDBLOCK]><![endif]--></label>
                                                </div>
                                            </div>
                                            <div class="invalid-feedback">
                                                The shipping field is required.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="m-0 form-group col-md-3">
                                            <label>আপনার ঠিকানা: <span class="text-danger">*</span></label>
                                        </div>
                                        <div class="form-group col-md-9">
                                            <textarea name="address" id="address" rows="3" class="form-control is-invalid" wire:model="address" place-holder="এখানে আপনার পুরো ঠিকানা লিখুন।" placeholder="Type your address here."></textarea>
                                            <div class="invalid-feedback">
                                                The address field is required.
                                            </div>
                                        </div>
                                    </div>
                                    <!--[if ENDBLOCK]><![endif]-->
                                    <h3 class="card-title">
                                        Billing details
                                    </h3>
                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="checkout-first-name">First Name</label>
                                            <input
                                                id="checkout-first-name"
                                                class="form-control"
                                                type="text"
                                                placeholder="First Name"
                                            >
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="checkout-last-name">Last Name</label>
                                            <input
                                                id="checkout-last-name"
                                                class="form-control"
                                                type="text"
                                                placeholder="Last Name"
                                            >
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="checkout-company-name">
                                            Company Name
                                            <span class="text-muted">(Optional)</span>
                                        </label>
                                        <input
                                            id="checkout-company-name"
                                            class="form-control"
                                            type="text"
                                            placeholder="Company Name"
                                        >
                                    </div>
                                    <div class="form-group">
                                        <label for="checkout-street-address">Street Address</label>
                                        <input
                                            id="checkout-street-address"
                                            class="form-control"
                                            type="text"
                                            placeholder="Street Address"
                                        >
                                    </div>

                                    <div class="form-row">
                                        <div class="form-group col-md-6">
                                            <label for="checkout-email">Email address</label>
                                            <input
                                                id="checkout-email"
                                                class="form-control"
                                                type="email"
                                                placeholder="Email address"
                                            >
                                        </div>
                                        <div class="form-group col-md-6">
                                            <label for="checkout-phone">Phone</label>
                                            <input
                                                id="checkout-phone"
                                                class="form-control"
                                                type="text"
                                                placeholder="Phone"
                                            >
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label for="checkout-comment">
                                            Order notes
                                            <span class="text-muted">(Optional)</span>
                                        </label>
                                        <textarea id="checkout-comment" class="form-control" :rows="4" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 col-12 col-lg-6 col-xl-5 mt-lg-0">
                            <div class="mb-0 card">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        Your Order
                                    </h3>

                                    <table class="checkout__totals">
                                        <thead class="checkout__totals-header">
                                            <tr>
                                                <th>Product</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody class="checkout__totals-products">
                                            <tr v-for="item in cart.items" :key="item.id">
                                                <td>{{ item.product.name }} × {{ item.quantity }}</td>
                                                <td>{{ $price(item.total) }}</td>
                                            </tr>
                                        </tbody>
                                        <tbody v-if="cart.totals.length > 0" class="checkout__totals-subtotals">
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>{{ $price(cart.subtotal) }}</td>
                                            </tr>
                                            <tr v-for="(total, index) in cart.totals" :key="index">
                                                <th>{{ total.title }}</th>
                                                <td>{{ $price(total.price) }}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot class="checkout__totals-footer">
                                            <tr>
                                                <th>Total</th>
                                                <td>{{ $price(cart.total) }}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div class="checkout__agree form-group">
                                        <div class="form-check">
                                            <span class="form-check-input input-check">
                                                <span class="input-check__body">
                                                    <input
                                                        id="checkout-terms"
                                                        class="input-check__input"
                                                        type="checkbox"
                                                        checked
                                                        disabled
                                                    >
                                                    <span class="input-check__box" />
                                                    <Check9x7Svg class="input-check__icon" />
                                                </span>
                                            </span>
                                            <label class="form-check-label" for="checkout-terms">
                                                I have read and agree to the website
                                                <AppLink :to="$url.terms()">
                                                    terms and conditions
                                                </AppLink>
                                                *
                                            </label>
                                        </div>
                                    </div>

                                    <button type="submit" class="btn btn-primary btn-xl btn-block">
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-2 row">
                        <div class="col">
                            <table class="cart__table cart-table">
                                <thead class="cart-table__head">
                                    <tr class="cart-table__row">
                                        <th class="cart-table__column cart-table__column--image">
                                            Image
                                        </th>
                                        <th class="cart-table__column cart-table__column--product">
                                            Product
                                        </th>
                                        <th class="cart-table__column cart-table__column--price">
                                            Price
                                        </th>
                                        <th class="cart-table__column cart-table__column--quantity">
                                            Quantity
                                        </th>
                                        <th class="cart-table__column cart-table__column--total">
                                            Total
                                        </th>
                                        <th class="cart-table__column cart-table__column--remove" aria-label="Remove" />
                                    </tr>
                                </thead>
                                <tbody class="cart-table__body">
                                    <tr v-for="item in cart.items" :key="item.id" class="cart-table__row">
                                        <td class="cart-table__column cart-table__column--image">
                                            <div v-if="item.product.images.length > 0" class="product-image">
                                                <AppLink :to="$url.product(item.product)" class="product-image__body">
                                                    <!--suppress HtmlUnknownTarget -->
                                                    <img class="product-image__img" :src="$url.img(item.product.images[0])" alt="">
                                                </AppLink>
                                            </div>
                                        </td>
                                        <td class="cart-table__column cart-table__column--product">
                                            <AppLink :to="$url.product(item.product)" class="cart-table__product-name">
                                                {{ item.product.name }}
                                            </AppLink>
                                            <ul v-if="item.options.length > 0" class="cart-table__options">
                                                <li v-for="(option, index) in item.options" :key="index">
                                                    {{ option.optionTitle }}: {{ option.valueTitle }}
                                                </li>
                                            </ul>
                                        </td>
                                        <td class="cart-table__column cart-table__column--price" data-title="Price">
                                            {{ $price(item.price) }}
                                        </td>
                                        <td class="cart-table__column cart-table__column--quantity" data-title="Quantity">
                                            <InputNumber
                                                :value="getItemQuantity(item)"
                                                :min="1"
                                                @input="handleChangeQuantity(item, $event)"
                                            />
                                        </td>
                                        <td class="cart-table__column cart-table__column--total" data-title="Total">
                                            {{ $price(item.total) }}
                                        </td>
                                        <td class="cart-table__column cart-table__column--remove">
                                            <AsyncAction
                                                v-slot="{ run, isLoading }"
                                                :action="() => $store.dispatch('cart/remove', { itemId: item.id })"
                                            >
                                                <button
                                                    type="button"
                                                    :class="[
                                                        'btn btn-light btn-sm btn-svg-icon',
                                                        {'btn-loading': isLoading}
                                                    ]"
                                                    @click="run"
                                                >
                                                    <Cross12Svg />
                                                </button>
                                            </AsyncAction>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { IPayment } from '~/interfaces/payment'
import { RootState } from '~/store'
import { Cart, CartItem } from '~/interfaces/cart'
import PageHeader from '~/components/shared/page-header.vue'
import AppLink from '~/components/shared/app-link.vue'
import Collapse from '~/components/shared/collapse.vue'
import Check9x7Svg from '~/svg/check-9x7.svg'
import dataShopPayments from '~/data/shopPayments'
import { Quantity } from '../cart.vue'
import AsyncAction from '~/components/shared/async-action.vue'
import Cross12Svg from '~/svg/cross-12.svg'
import InputNumber from '~/components/shared/input-number.vue'

@Component({
    components: { PageHeader, AppLink, Check9x7Svg, Collapse, AsyncAction, Cross12Svg, InputNumber },
    head () {
        return {
            title: 'Checkout'
        }
    }
})
export default class Page extends Vue {
    @State((store: RootState) => store.cart) cart!: Cart

    quantities: Quantity[] = []

    currentPayment: string = dataShopPayments[0].key

    payments: IPayment[] = dataShopPayments

    clickTimer: any = null

    // noinspection JSUnusedGlobalSymbols
    beforeMount () {
        if (this.cart.quantity < 1) {
            this.$router.push(this.$url.cart())
        }
    }

    async updateQuantities () {
        await this.$store.dispatch('cart/updateQuantities', this.quantities.map(x => ({
            ...x,
            value: typeof x.value === 'string' ? parseFloat(x.value) : x.value
        })))
    }

    handleChangeQuantity (item: CartItem, quantity: number) {
        const itemQuantity = this.quantities.find(x => x.itemId === item.id)

        if (itemQuantity) {
            itemQuantity.value = quantity
        } else {
            this.quantities.push({
                itemId: item.id,
                value: quantity
            })
        }

        this.updateQuantities()
    }

    getItemQuantity (item: CartItem) {
        const quantity = this.quantities.find(x => x.itemId === item.id)

        return quantity ? quantity.value : item.quantity
    }

    handlePaymentChange (event: InputEvent) {
        if (event.target instanceof HTMLInputElement) {
            this.currentPayment = event.target.value
        }
    }

    // prevents unwanted scrolling
    handlePaymentClick (event: InputEvent) {
        const input = event.target

        clearTimeout(this.clickTimer)

        if (input instanceof HTMLInputElement) {
            input.blur()

            this.clickTimer = setTimeout(() => {
                input.focus()
            }, 500)
        }
    }
}

</script>
