<template>
    <div v-if="($setting('services') || {enabled: false}).enabled" :class="`block block-features block-features--layout--${layout}`">
        <div class="container">
            <div class="block-features__list">
                <div class="block-features__item">
                    <div class="block-features__icon">
                        <FiFreeDelivery48Svg />
                    </div>
                    <div class="block-features__content">
                        <div class="block-features__title">
                            {{ $setting('services').one.title }}
                        </div>
                        <div class="block-features__subtitle">
                            {{ $setting('services').one.detail }}
                        </div>
                    </div>
                </div>
                <div class="block-features__divider" />
                <div class="block-features__item">
                    <div class="block-features__icon">
                        <Fi24Hours48Svg />
                    </div>
                    <div class="block-features__content">
                        <div class="block-features__title">
                            {{ $setting('services').two.title }}
                        </div>
                        <div class="block-features__subtitle">
                            {{ $setting('services').two.detail }}
                        </div>
                    </div>
                </div>
                <div class="block-features__divider" />
                <div class="block-features__item">
                    <div class="block-features__icon">
                        <FiPaymentSecurity48Svg />
                    </div>
                    <div class="block-features__content">
                        <div class="block-features__title">
                            {{ $setting('services').three.title }}
                        </div>
                        <div class="block-features__subtitle">
                            {{ $setting('services').three.detail }}
                        </div>
                    </div>
                </div>
                <div class="block-features__divider" />
                <div class="block-features__item">
                    <div class="block-features__icon">
                        <FiTag48Svg />
                    </div>
                    <div class="block-features__content">
                        <div class="block-features__title">
                            {{ $setting('services').four.title }}
                        </div>
                        <div class="block-features__subtitle">
                            {{ $setting('services').four.detail }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { Action, Getter } from 'vuex-class'
import { Vue, Component, Prop } from 'vue-property-decorator'
import FiFreeDelivery48Svg from '~/svg/fi-free-delivery-48.svg'
import Fi24Hours48Svg from '~/svg/fi-24-hours-48.svg'
import FiPaymentSecurity48Svg from '~/svg/fi-payment-security-48.svg'
import FiTag48Svg from '~/svg/fi-tag-48.svg'

type BlockFeaturesLayout = 'classic' | 'boxed'

@Component({
    components: { FiFreeDelivery48Svg, Fi24Hours48Svg, FiPaymentSecurity48Svg, FiTag48Svg }
})
export default class BlockFeatures extends Vue {
    @Prop({ type: String, default: () => 'classic' }) layout!: BlockFeaturesLayout

    @Action('setting/fetchSettings') fetchSettings!: Function

    async mounted() {
        await this.fetchSettings(['services'])
    }
}

</script>
