import { Context } from '@nuxt/types'

declare module 'vue/types/vue' {
    interface Vue {
        $setting: (key: string, _default?: any) => any
    }
}

declare module '@nuxt/types' {
    interface Context {
        $setting: (key: string, _default?: any) => any
    }
    interface NuxtAppOptions {
        $setting: (key: string, _default?: any) => any
    }
}

export default ({ store }: Context, inject: (key: string, value: any) => void) => {
    const $setting = (key: string, _default: any = null): any => {
        const state = store.state.setting
        return state.settings?.[key] ?? _default
    }

    inject('setting', $setting)
}
