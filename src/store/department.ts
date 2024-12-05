import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { INav } from '~/interfaces/menus/nav'

export interface DepartmentState {
    categories: []
    isLoading: boolean
    error: string | null
}

function getDefaultState (): DepartmentState {
    return {
        categories: [],
        isLoading: false,
        error: null
    }
}

export const state = getDefaultState

// Mutations
export const mutations: MutationTree<DepartmentState> = {
    fetchCategoriesStart(state) {
        state.isLoading = true
        state.error = null
    },
    fetchCategoriesSuccess(state, categories: []) {
        state.isLoading = false
        state.categories = categories
    },
    fetchCategoriesFailure(state, error: string) {
        state.isLoading = false
        state.error = error
    }
}

const url = (category: { slug: string }) => ('/shop?filter_category=' + category.slug)

const withChildren = (categories: any[]): any => categories.map(category => ({
    title: category.name,
    url: url(category),
    type: 'link',
    children: category.childrens.length ? withChildren(category.childrens) : null
}))

const withMenu = (categories: any[]): INav => categories.map(category => ({
    title: category.name,
    url: url(category),
    submenu: category.childrens.length
        ? {
            type: 'menu',
            menu: withChildren(category.childrens)
        }
        : undefined
}))

// Actions
export const actions: ActionTree<DepartmentState, {}> = {
    async fetchCategories({ commit }) {
        commit('fetchCategoriesStart')
        try {
            const response = await fetch('http://localhost/api/categories?nested=true') // Replace with your API endpoint
            if (!response.ok) {
                throw new Error(`Failed to fetch categories: ${response.statusText}`)
            }
            commit('fetchCategoriesSuccess', await response.json())
        } catch (error) {
            commit('fetchCategoriesFailure', error.message || 'Error fetching categories')
        }
    }
}

// Getters
export const getters: GetterTree<DepartmentState, {}> = {
    allCategories: state => withMenu(state.categories),
    mobileMenu: state => withChildren(state.categories),
    isLoading: state => state.isLoading,
    error: state => state.error
}
