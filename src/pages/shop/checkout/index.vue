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
                                    <div class="text-center text-danger" v-text="error" />
                                    <div class="mb-2 text-center border text-danger" style="padding: 2px 10px; font-size: 1.25rem;">
                                        নিচের তথ্যগুলো সঠিকভাবে পূরণ করে <strong>কনফার্ম অর্ডার</strong> বাটনে ক্লিক করুন।
                                    </div>
                                    <div class="form-row">
                                        <div class="m-0 form-group col-md-3">
                                            <label>আপনার নাম: <span class="text-danger">*</span></label>
                                        </div>
                                        <div class="form-group col-md-9">
                                            <input v-model="form.name" type="text" id="name" :class="['form-control', {'is-invalid': errors.name}]" wire:model="name" place-holder="এখানে আপনার নাম লিখুন।" placeholder="Type your name here.">
                                            <div v-if="errors.name" class="invalid-feedback" v-text="errors.name[0]" />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="m-0 form-group col-md-3">
                                            <label>মোবাইল নম্বর: <span class="text-danger">*</span></label>
                                        </div>
                                        <div class="form-group col-md-9">
                                            <div class="input-group">
                                                <!--[if BLOCK]><![endif]--><!--[if ENDBLOCK]><![endif]-->
                                                <input v-model="form.phone" type="tel" id="phone" :class="['form-control', {'is-invalid': errors.phone}]" wire:model="phone" place-holder="আপনার ফোন নম্বর লিখুন।" placeholder="Type your phone number.">
                                                <div v-if="errors.phone" class="invalid-feedback" v-text="errors.phone[0]" />
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
                                            <div :class="['h-auto form-control', {'is-invalid': errors.shipping}]">
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" @click="() => $store.dispatch('cart/updateShipping', 'Inside Dhaka')" class="custom-control-input" id="inside-dhaka" name="shipping" value="Inside Dhaka" v-bind:checked="cart.shipping == 'Inside Dhaka'">
                                                    <label class="custom-control-label" for="inside-dhaka">ঢাকা শহর <!--[if BLOCK]><![endif]--> ({{ $setting('delivery_charge').inside_dhaka }} টাকা) <!--[if ENDBLOCK]><![endif]--></label>
                                                </div>
                                                <div class="custom-control custom-radio custom-control-inline">
                                                    <input type="radio" @click="() => $store.dispatch('cart/updateShipping', 'Outside Dhaka')" class="custom-control-input" id="outside-dhaka" name="shipping" value="Outside Dhaka" v-bind:checked="cart.shipping == 'Outside Dhaka'">
                                                    <label class="custom-control-label" for="outside-dhaka">ঢাকার বাইরে <!--[if BLOCK]><![endif]--> ({{ $setting('delivery_charge').outside_dhaka }} টাকা) <!--[if ENDBLOCK]><![endif]--></label>
                                                </div>
                                            </div>
                                            <div v-if="errors.shipping" class="invalid-feedback" v-text="errors.shipping[0]" />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="m-0 form-group col-md-3">
                                            <label>আপনার ঠিকানা: <span class="text-danger">*</span></label>
                                        </div>
                                        <div class="form-group col-md-9">
                                            <textarea v-model="form.address" id="address" rows="3" :class="['form-control', {'is-invalid': errors.address}]" wire:model="address" place-holder="এখানে আপনার পুরো ঠিকানা লিখুন।" placeholder="Type your address here."></textarea>
                                            <div v-if="errors.address" class="invalid-feedback" v-text="errors.address[0]" />
                                        </div>
                                    </div>
                                    <!--[if ENDBLOCK]><![endif]-->
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

                                    <button type="submit" @click="submit" class="btn btn-primary btn-xl btn-block">
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

import axios from 'axios'
import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { Quantity } from '../cart.vue'
import { IPayment } from '~/interfaces/payment'
import { RootState } from '~/store'
import { Cart, CartItem } from '~/interfaces/cart'
import PageHeader from '~/components/shared/page-header.vue'
import AppLink from '~/components/shared/app-link.vue'
import Collapse from '~/components/shared/collapse.vue'
import Check9x7Svg from '~/svg/check-9x7.svg'
import dataShopPayments from '~/data/shopPayments'
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

    form: {
        name: string
        phone: string
        address: string
        shipping: string
        cart: {
            id: number
            quantity: number
        }[]
    } = {
        name: '',
        phone: '',
        address: '',
        shipping: 'Inside Dhaka',
        cart: []
    }

    errors: [] = []
    error: string = ''

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

    async submit() {
        this.errors = []
        this.error = ''
        // merge cart with form
        this.form = {
            ...this.form,
            shipping: this.cart.shipping,
            cart: this.cart.items.map((x: CartItem) => ({
                id: x.product.id,
                quantity: x.quantity
            }))
        }
        axios.post(this.$url.api('checkout'), this.form)
            .then(response => {
                // redirect to success page
                console.log(response.data.order.id)
                this.$router.push('/shop/checkout/success?order_id='+response.data.order.id)
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.data.errors) {
                        this.errors = error.response.data.errors
                    } else {
                        this.error = error.response.data.message
                    }
                } else {
                    console.log(error)
                }
            })
    }
}

</script>
