import { Context } from '@nuxt/types'

// Inject $setting for global use
const setting = (store: any) => (key: string) => {
    const state = store.state.setting;
    return state.settings[key];
};

declare module 'vue/types/vue' {
    interface Vue {
        $setting: (key: string) => any;
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $setting: (key: string) => any;
    }
    interface Context {
        $setting: (key: string) => any;
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $setting: (key: string) => any;
    }
}

export default async ({ store }: Context, inject: (key: string, value: any) => void) => {
    try {
        // Load global settings
        await store.dispatch('setting/fetchSettings', {keys:['logo', 'company']});

        // Inject $setting function
        inject('setting', setting(store));
    } catch (error) {
        console.error('Failed to load global settings:', error);
    }
};
