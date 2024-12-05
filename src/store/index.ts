import { ActionTree } from 'vuex';
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
    async nuxtServerInit({ dispatch }) {
        console.log('nuxtServerInit is called!');
        await dispatch('department/fetchCategories');
        await dispatch('setting/fetchSettings', [
            'logo', 'company', 'social', 'scroll_text',
        ]);
        await dispatch('menu/fetchMenus');
    }
};

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
