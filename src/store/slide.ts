import { ActionTree, GetterTree, MutationTree } from 'vuex'

export interface SlideImage {
    ltr: string
    rtl: string
}

export interface Slide {
    title: string
    text: string
    imageClassic: SlideImage
    imageFull: SlideImage
    imageMobile: SlideImage
}

export interface SlideState {
    slides: Slide[]
    isLoading: boolean
    error: string | null
}

function getDefaultState (): SlideState {
    return {
        slides: [],
        isLoading: false,
        error: null
    }
}

export const state = getDefaultState

// Mutations
export const mutations: MutationTree<SlideState> = {
    fetchSlidesStart(state) {
        state.isLoading = true
        state.error = null
    },
    fetchSlidesSuccess(state, slides: Slide[]) {
        state.isLoading = false
        state.slides = slides
    },
    fetchSlidesFailure(state, error: string) {
        state.isLoading = false
        state.error = error
    }
}

// Actions
export const actions: ActionTree<SlideState, {}> = {
    async fetchSlides({ commit }) {
        commit('fetchSlidesStart')
        try {
            const response = await fetch('http://localhost/api/slides') // Replace with your API endpoint
            if (!response.ok) {
                throw new Error(`Failed to fetch slides: ${response.statusText}`)
            }
            const slides = await response.json()
            commit('fetchSlidesSuccess', slides)
        } catch (error) {
            commit('fetchSlidesFailure', error.message || 'Error fetching slides')
        }
    }
}

// Getters
export const getters: GetterTree<SlideState, {}> = {
    allSlides: state => state.slides,
    isLoading: state => state.isLoading,
    error: state => state.error
}
