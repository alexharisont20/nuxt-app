<template>
    <div class="swiper-container" :dir="direction">
        <div class="swiper-wrapper">
            <slot />
        </div>
        <div class="swiper-pagination" />
        <template v-if="options.navigation">
            <div class="swiper-button-prev" />
            <div class="swiper-button-next" />
        </template>
    </div>
</template>

<script lang="ts" src="./carousel.ts" />
