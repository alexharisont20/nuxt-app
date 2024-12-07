import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { IProduct } from '~/interfaces/product'

export interface ISection {
    id: number
    title: string
    type: string
    data: { rows: string, cols: string }
    categories: [],
    products: IProduct[]
}

export interface SectionState {
    sections: ISection[]
    isLoading: boolean
    error: string | null
}

function getDefaultState (): SectionState {
    return {
        sections: [],
        isLoading: false,
        error: null
    }
}

export const state = getDefaultState

// Mutations
export const mutations: MutationTree<SectionState> = {
    fetchSectionsStart(state) {
        state.isLoading = true
        state.error = null
    },
    fetchSectionsSuccess(state, sections: ISection[]) {
        state.isLoading = false
        state.sections = sections
    },
    fetchSectionsFailure(state, error: string) {
        state.isLoading = false
        state.error = error
    }
}

// Actions
export const actions: ActionTree<SectionState, {}> = {
    async fetchSections({ commit }) {
        commit('fetchSectionsStart')
        try {
            const response = await fetch(this.$url.api('sections')) // Replace with your API endpoint
            if (!response.ok) {
                throw new Error(`Failed to fetch sections: ${response.statusText}`)
            }
            const sections = await response.json()
            commit('fetchSectionsSucceses', sections)
        } catch (error) {
            commit('fetchSectionsFailure', error.message || 'Error fetching sections')
        }
    }
}

// Getters
export const getters: GetterTree<SectionState, {}> = {
    allSections: state => state.sections,
    isLoading: state => state.isLoading,
    error: state => state.error
}
