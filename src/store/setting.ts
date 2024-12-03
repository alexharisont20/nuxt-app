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
    fetchSettingsStart (state) {
        state.isLoading = true
        state.error = null
    },
    storeSettingsSuccess (state, settings: Object) {
        state.isLoading = false
        console.log('store', settings)
        state.settings = settings
    },
    mergeSettings (state, settings: Object) {
        state.isLoading = false
        state.settings = { ...state.settings, ...settings }
    },
    fetchSettingsFailure (state, error: string) {
        state.isLoading = false
        state.error = error
    }
}

// Actions
export const actions: ActionTree<SettingState, {}> = {
    async fetchSettings ({ commit, state }, { keys, merge = false }) {
        let keysToFetch = keys
        if (merge) {
            // Filter out keys that are already present in `state.settings`
            keysToFetch = keys.filter((key: string) => !(key in state.settings))
            if (keysToFetch.length === 0) { return } // Nothing to fetch
        }

        commit('fetchSettingsStart')
        try {
            console.log('fetching settings', keys, merge)
            // Construct the query string for the API
            const query = keysToFetch.map((key: string) => `keys[]=${encodeURIComponent(key)}`).join('&')
            const response = await fetch(`http://localhost/api/settings?${query}`)
            if (!response.ok) {
                throw new Error(`Failed to fetch settings: ${response.statusText}`)
            }
            const data = await response.json()
            if (merge) {
                commit('mergeSettingsSuccess', data)
            } else {
                commit('storeSettingsSuccess', data)
            }
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
