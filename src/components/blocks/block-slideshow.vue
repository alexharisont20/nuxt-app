<template>
    <!-- .block-slideshow -->
    <div
        :class="[
            'block-slideshow',
            `block-slideshow--layout--${layout}`,
            'block'
        ]"
    >
        <div class="container">
            <div class="row">
                <div v-if="layout === 'with-departments'" class="col-lg-3 d-none d-lg-block" />
                <div
                    :class="[
                        'col-12',
                        {'col-lg-9': layout === 'with-departments'}
                    ]"
                >
                    <div class="block-slideshow__body">
                        <Carousel
                            v-if="slides.length && !isSlidesLoading"
                            :options="{
                                navigation: {
                                    nextEl: '.swiper-button-next',
                                    prevEl: '.swiper-button-prev'
                                }
                            }"
                        >
                            <CarouselSlide v-for="(slide, index) in slides" :key="index">
                                <AppLink class="block-slideshow__slide" to="/">
                                    <div
                                        class="block-slideshow__slide-image block-slideshow__slide-image--desktop"
                                        :style="{ backgroundImage: getDesktopImage(slide) }"
                                    />
                                    <div
                                        class="block-slideshow__slide-image block-slideshow__slide-image--mobile"
                                        :style="{ backgroundImage: getMobileImage(slide) }"
                                    />
                                    <div class="block-slideshow__slide-content">
                                        <!-- eslint-disable-next-line vue/no-v-html -->
                                        <div class="block-slideshow__slide-title" v-html="slide.title" />
                                        <!-- eslint-disable-next-line vue/no-v-html -->
                                        <div class="block-slideshow__slide-text" v-html="slide.text" />
                                        <a v-if="slide.btn_name" :href="slide.btn_href" class="block-slideshow__slide-button">
                                            <span class="btn btn-primary btn-lg">{{ slide.btn_name }}</span>
                                        </a>
                                    </div>
                                </AppLink>
                            </CarouselSlide>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- .block-slideshow / end -->
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { ILanguage } from '~/interfaces/language'
import departments from '~/services/departments'
import Carousel from '~/components/shared/carousel.vue'
import CarouselSlide from '~/components/shared/carousel-slide.vue'
import AppLink from '~/components/shared/app-link.vue'

type BlockSlideshowLayout = 'full' | 'with-departments';

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

@Component({
    components: { CarouselSlide, Carousel, AppLink }
})
export default class BlockSlideshow extends Vue {
    @Prop({ type: String, default: () => 'full' }) readonly layout!: BlockSlideshowLayout
    @Getter('locale/language') language!: ILanguage
    @Getter('slide/allSlides') slides!: Slide[]
    @Getter('slide/isLoading') isSlidesLoading!: boolean
    @Action('slide/fetchSlides') fetchSlides!: () => Promise<void>

    get direction () {
        return this.language.direction
    }

    mounted() {
        if (this.slides.length === 0) {
            this.fetchSlides()
        }
        departments.set(this.$el)
    }

    beforeDestroy () {
        departments.set(null)
    }

    getDesktopImage (slide: Slide): string {
        const url = (this.layout === 'with-departments' ? slide.imageClassic : slide.imageFull)[this.direction]

        return `url(${this.$url.img(url)})`
    }

    getMobileImage (slide: Slide): string {
        return `url(${this.$url.img(slide.imageMobile[this.direction])})`
    }
}

</script>
