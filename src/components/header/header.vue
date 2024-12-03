<template>
    <div class="site-header">
        <Topbar />

        <div v-if="layout === 'default'" class="container site-header__middle">
            <div class="site-header__logo">
                <AppLink to="/">
                    <!-- logo -->
                    <img :src="`http://localhost${$setting('logo').desktop}`" class="img-fluid" alt="Logo" style="width: 260px;" />
                    <!-- logo / end -->
                </AppLink>
            </div>
            <div class="site-header__search">
                <Search location="header" />
            </div>
            <div class="site-header__phone">
                <div class="site-header__phone-title">
                    Customer Service
                </div>
                <div class="site-header__phone-number">
                    {{ $setting('company').phone }}
                </div>
            </div>
        </div>

        <div class="site-header__nav-panel">
            <NavPanel :layout="layout" sticky-mode="alwaysOnTop" />
        </div>
    </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { RootState } from '~/store'
import { HeaderLayout } from '~/store/options'
import Search from '~/components/header/search.vue'
import NavPanel from '~/components/header/nav-panel.vue'
import Topbar from '~/components/header/topbar.vue'
import AppLink from '~/components/shared/app-link.vue'
import LogoSvg from '~/svg/logo.svg'
import theme from '~/data/theme'

@Component({
    components: { AppLink, NavPanel, Search, Topbar, LogoSvg }
})
export default class Header extends Vue {
    theme = theme

    @State((state: RootState) => state.options.headerLayout) layout!: HeaderLayout
}

</script>
