import { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface SettingState {
    settings: Record<string, any>
    isLoading: boolean
    error: string | null
}

// State function
export const state = (): SettingState => ({
    settings: {}, // Centralized settings store
    isLoading: false,
    error: null
})

// Mutations
export const mutations: MutationTree<SettingState> = {
    fetchSettingsStart(state) {
        state.isLoading = true
        state.error = null
    },
    fetchSettingsSuccess(state, settings: Object) {
        state.isLoading = false
        state.settings = { ...state.settings, ...settings }
    },
    fetchSettingsFailure(state, error: string) {
        state.isLoading = false
        state.error = error
    }
}

// Actions
export const actions: ActionTree<SettingState, {}> = {
    async fetchSettings({ commit, state }, keys: string[]) {
        // Filter out keys that are already present in `state.settings`
        const keysToFetch = keys.filter(key => !(key in state.settings))
        if (keysToFetch.length === 0) { return } // Nothing to fetch

        commit('fetchSettingsStart')
        try {
            // Construct the query string for the API
            const query = keysToFetch.map(key => `keys[]=${encodeURIComponent(key)}`).join('&')
            const response = await fetch(this.$url.api(`settings?${query}`))
            if (!response.ok) {
                throw new Error(`Failed to fetch settings: ${response.statusText}`)
            }
            const data = await response.json()
            commit('fetchSettingsSuccess', data)
        } catch (error) {
            commit('fetchSettingsFailure', error.message || 'Error fetching settings')
        }
    }
}

// Getters
export const getters: GetterTree<SettingState, {}> = {
    getSetting: state => (key: string) => state.settings[key], // Get a specific setting
    allSettings: state => state.settings,
    isLoading: state => state.isLoading,
    error: state => state.error
}
