<template>
    <!-- .topbar -->
    <div class="site-header__topbar topbar">
        <div class="container topbar__container">
            <div class="topbar__row">
                <div v-for="item in getMenu('topbar-menu')" :key="item.id" class="topbar__item topbar__item--link">
                    <AppLink :to="item.href" class="topbar-link" v-html="item.name" style="white-space: nowrap;" />
                </div>
                <marquee behavior="" direction="" v-html="$setting('scroll_text')"></marquee>
                <div class="topbar__spring" />
                <div class="topbar__item" />
            </div>
        </div>
    </div>
    <!-- .topbar / end -->
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { Getter, Mutation, State } from 'vuex-class'
import { RootState } from '~/store'
import { ICurrency } from '~/interfaces/currency'
import { ILanguage } from '~/interfaces/language'
import Dropdown from '~/components/header/dropdown.vue'
import AppLink from '~/components/shared/app-link.vue'
import dataLanguages from '~/data/languages'
import dataShopCurrencies from '~/data/shopCurrencies'

@Component({
    components: { Dropdown, AppLink }
})
export default class Topbar extends Vue {
    @State((state: RootState) => state.currency.current) currency!: ICurrency
    @Getter('locale/language') language!: ILanguage
    @Getter('menu/getMenu') getMenu!: Function
    @Mutation('currency/set') setCurrency!: (currency: ICurrency) => void

    currencies = dataShopCurrencies.map((currency) => {
        return {
            title: `${currency.symbol} ${currency.name}`,
            currency
        }
    })

    languages= dataLanguages.map((language) => {
        return {
            title: language.name,
            icon: language.icon,
            locale: language.locale
        }
    })

    setLanguage (locale: string) {
        const fullPath = this.$route.fullPath
        const re = new RegExp('^/(' + dataLanguages.map(x => x.locale).join('|') + ')(/|$)')
        const path = fullPath.replace(re, '/')

        this.$router.push(`/${locale}${path}`)
    }

    mounted() {
        console.log(this.$setting('scroll_text'))
    }
}

</script>
