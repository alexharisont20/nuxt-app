import { Context } from '@nuxt/types'

declare module 'vue/types/vue' {
    interface Vue {
        $setting: (key: string) => any
    }
}

export default ({ store }: Context, inject: (key: string, value: any) => void) => {
    try {
        // Load global settings
        // await store.dispatch('setting/fetchSettings', ['logo', 'company'])

        // Inject $setting for global use
        const $setting = (key: string) => {
            const state = store.state.setting
            return state.settings[key]
        }

        inject('setting', $setting)
    } catch (error) {
        console.error('Failed to load global settings:', error)
    }
};
