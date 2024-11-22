import { Module } from 'vuex'
import { INav } from '~/interfaces/menus/nav'

interface INavState {
    categories: INav[]
}

const url = (category: { slug: string }) => ('/shop/category-grid-4-columns-full?category=' + category.slug)

const withChildren = (categories: any[]): any => categories.map(category => ({
    title: category.name,
    url: url(category),
    children: category.childrens.length ? withChildren(category.childrens) : null
}))

const withMenu = (categories: any[]) => categories.map(category => ({
    title: category.name,
    url: url(category),
    submenu: category.childrens.length
        ? {
            type: 'menu',
            menu: withChildren(category.childrens)
        }
        : null
}))

const categories: Module<INavState, any> = {
    namespaced: true,
    state: {
        categories: []
    },
    mutations: {
        SET_CATEGORIES (state, categories: INav[]) {
            state.categories = categories
        }
    },
    actions: {
        async fetchCategories ({ commit }) {
            try {
                const response = await fetch('http://localhost/api/categories?nested=true') // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`Failed to fetch categories: ${response.statusText}`)
                }
                const categories = await response.json()
                commit('SET_CATEGORIES', withMenu(categories))
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }
    },
    getters: {
        categories: state => state.categories
    }
}

export default categories
