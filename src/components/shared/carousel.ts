import { Vue, Component, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Swiper, Autoplay, Pagination, Navigation } from 'swiper'
import { SwiperOptions } from 'swiper/types/swiper-options'
import { IDirection } from '~/interfaces/language'

Swiper.use([Autoplay, Pagination, Navigation])

@Component
export default class Carousel extends Vue {
    @Prop({ type: Object, default: () => ({}) }) options!: SwiperOptions

    @Getter('locale/direction') direction!: IDirection

    swiper: Swiper | null = null

    mounted () {
        if (!(this.$el instanceof HTMLElement)) {
            return
        }

        this.swiper = new Swiper(this.$el, Object.assign({}, {
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            watchOverflow: true,
            autoplay: {
                delay: 2000
            }
        }, this.options))
    }
}
