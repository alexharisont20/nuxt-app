import { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface MenuState {
    menus: Record<string, any>
    isLoading: boolean
    error: string | null
}

// State function
export const state = (): MenuState => ({
    menus: {}, // Centralized menus store
    isLoading: false,
    error: null
})

// Mutations
export const mutations: MutationTree<MenuState> = {
    fetchMenusStart(state) {
        state.isLoading = true
        state.error = null
    },
    fetchMenusSuccess(state, menus: Object) {
        state.isLoading = false
        state.menus = { ...state.menus, ...menus }
    },
    fetchMenusFailure(state, error: string) {
        state.isLoading = false
        state.error = error
    }
}

// Actions
export const actions: ActionTree<MenuState, {}> = {
    async fetchMenus({ commit }) {
        commit('fetchMenusStart')
        try {
            // Construct the query string for the API
            const response = await fetch(this.$url.api('menus'))
            if (!response.ok) {
                throw new Error(`Failed to fetch menus: ${response.statusText}`)
            }
            const data = await response.json()
            commit('fetchMenusSuccess', data)
        } catch (error) {
            commit('fetchMenusFailure', error.message || 'Error fetching menus')
        }
    }
}

// Getters
export const getters: GetterTree<MenuState, {}> = {
    getMenu: state => (key: string) => state.menus[key], // Get a specific setting
    allMenus: state => state.menus,
    isLoading: state => state.isLoading,
    error: state => state.error
}
