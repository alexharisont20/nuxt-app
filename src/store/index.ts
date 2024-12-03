import { ActionTree } from 'vuex'
import { OffcanvasCartState } from '~/store/offcanvasCart'
import { MobileMenuState } from '~/store/mobileMenu'
import { OptionsState } from '~/store/options'
import { CurrencyState } from '~/store/currency'
import { QuickviewState } from '~/store/quickview'
import { WishlistState } from '~/store/wishlist'
import { CartState } from '~/store/cart'
import { LocaleState } from '~/store/locale'
import { ShopState } from '~/store/shop'
import { SettingState } from '~/store/setting'

export const actions: ActionTree<{}, {}> = {
    async nuxtServerInit ({ dispatch }) {
        // Call other module actions during initialization
        await dispatch('setting/fetchSettings', { keys: ['logo', 'company'], merge: false })
    }
}

export interface RootState {
    cart: CartState;
    offcanvasCart: OffcanvasCartState;
    mobileMenu: MobileMenuState;
    options: OptionsState;
    currency: CurrencyState;
    quickview: QuickviewState;
    wishlist: WishlistState;
    locale: LocaleState;
    shop: ShopState;
    setting: SettingState;
}
