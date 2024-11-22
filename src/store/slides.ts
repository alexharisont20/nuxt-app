import { Module } from 'vuex'

interface SlideImage {
    ltr: string
    rtl: string
}

interface Slide {
    title: string
    text: string
    imageClassic: SlideImage
    imageFull: SlideImage
    imageMobile: SlideImage
}

interface SlidesState {
    slides: Slide[]
}

const slides: Module<SlidesState, any> = {
    namespaced: true,
    state: {
        slides: []
    },
    mutations: {
        SET_SLIDES (state, slides: Slide[]) {
            state.slides = slides
        }
    },
    actions: {
        async fetchSlides ({ commit }) {
            try {
                const response = await fetch('http://localhost/api/slides') // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error(`Failed to fetch slides: ${response.statusText}`)
                }
                const slides = await response.json()
                commit('SET_SLIDES', slides)
            } catch (error) {
                console.error('Failed to fetch slides:', error)
            }
        }
    },
    getters: {
        slides: state => state.slides
    }
}

export default slides
