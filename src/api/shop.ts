/* eslint-disable @typescript-eslint/no-unused-vars */
// noinspection JSUnusedLocalSymbols

import { Context, Plugin } from '@nuxt/types'
import qs from 'qs'
import { getCategories, getCategoryBySlug } from '~/fake-server/endpoints/categories'
import { IFilterValues, IListOptions } from '~/interfaces/list'
import { IProduct, IProductsList } from '~/interfaces/product'
import { IShopCategory } from '~/interfaces/category'
import {
    getDiscountedProducts,
    getFeaturedProducts,
    getLatestProducts,
    getPopularProducts,
    getProductBySlug,
    getProductsList,
    getRelatedProducts,
    getSuggestions,
    getTopRatedProducts
} from '~/fake-server/endpoints/products'

export interface GetCategoriesOptions {
    depth?: number;
}

export interface GetCategoryBySlugOptions {
    depth?: number;
}

export interface GetRelatedProductsOptions {
    limit?: number;
}

export interface GetProductsOptions {
    limit?: number;
    category?: string;
}

export type GetSuggestionsOptions = {
    limit?: number;
    category?: string;
};

/**
 * @param context Can be used, for example, to access the axios plugin.
 */
function make (context: Context) {
    return {
        /**
         * Returns array of categories.
         */
        getCategories: (options: GetCategoriesOptions = {}): Promise<IShopCategory[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/categories.json?depth=2
             *
             * where:
             * - 2 = options.depth
             */
            return fetch(context.$url.api(`categories?${qs.stringify(options)}`))
                .then(response => response.json())

            // This is for demonstration purposes only. Remove it and use the code above.
            // return getCategories(options)
        },
        /**
         * Returns category by slug.
         */
        getCategoryBySlug: (slug: string, options: GetCategoryBySlugOptions = {}): Promise<IShopCategory> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/categories/power-tools.json?depth=2
             *
             * where:
             * - power-tools = slug
             * - 2           = options.depth
             */
            slug = encodeURIComponent(slug);

            return fetch(context.$url.api(`categories/${slug}.json?${qs.stringify(options)}`))
                .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            // return getCategoryBySlug(slug, options)
        },
        /**
         * Returns product.
         */
        getProductBySlug: (slug: string): Promise<IProduct> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/products/screwdriver-a2017.json
             *
             * where:
             * - screwdriver-a2017 = slug
             */
            slug = encodeURIComponent(slug);

            return fetch(context.$url.api(`products/${slug}.json`))
                .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            // return getProductBySlug(slug)
        },
        getProductVariation: (slug: string, options: Object): Promise<IProduct> => {
            return fetch(context.$url.api(`products/${slug}.json?${qs.stringify(options)}`))
                .then((response) => response.json());
        },
        /**
         * Returns array of related products.
         */
        getRelatedProducts: (slug: string, options: GetRelatedProductsOptions = {}): Promise<IProduct[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/products/screwdriver-a2017/related.json&limit=3
             *
             * where:
             * - screwdriver-a2017 = slug
             * - limit             = options.limit
             */
            slug = encodeURIComponent(slug);

            return fetch(context.$url.api(`products/${slug}/related.json?${qs.stringify(options)}`))
                .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            // return getRelatedProducts(slug, options)
        },
        /**
         * Return products list.
         */
        getProductsList: (options: IListOptions = {}, filters: IFilterValues = {}): Promise<IProductsList> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/products.json?page=2&limit=12&sort=name_desc&filter_category=screwdriwers&filter_price=500-1000
             *
             * where:
             * - page            = options.page
             * - limit           = options.limit
             * - sort            = options.sort
             * - filter_category = filters.category
             * - filter_price    = filters.price
             */
            const params: { [key: string]: any } = {
                page: options.page,
                per_page: options.limit
            }

            Object.keys(filters).forEach((slug) => {
                if (filters[slug]) {
                    params[`filter_${slug}`] = encodeURIComponent(filters[slug])
                }
            })

            return fetch(context.$url.api(`shop?${qs.stringify(params)}`))
                .then(response => response.json())
                .then(({data, meta}) => ({
                    filters: [],
                    from: meta.from,
                    items: data,
                    limit: meta.per_page,
                    page: meta.current_page,
                    pages: meta.last_page,
                    sort: 'default',
                    to: meta.to,
                    total: meta.total
                }))

            // This is for demonstration purposes only. Remove it and use the code above.
            // return getProductsList(options, filters)
        },
        /**
         * Returns array of featured products.
         */
        getFeaturedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/featured-products.json?limit=3&category=power-tools
             *
             * where:
             * - 3           = options.limit
             * - power-tools = options.category
             */
            // return fetch(`https://example.com/api/featured-products.json?${qs.stringify(options)}`)
            //     .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            return getFeaturedProducts(options)
        },
        /**
         * Returns array of latest products.
         */
        getLatestProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/latest-products.json?limit=3&category=power-tools
             *
             * where:
             * - 3           = options.limit
             * - power-tools = options.category
             */
            // return fetch(`https://example.com/api/latest-products.json?${qs.stringify(options)}`)
            //     .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            return getLatestProducts(options)
        },
        /**
         * Returns an array of top rated products.
         */
        getTopRatedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/top-rated-products.json?limit=3&category=power-tools
             *
             * where:
             * - 3           = options.limit
             * - power-tools = options.category
             */
            // return fetch(`https://example.com/api/top-rated-products.json?${qs.stringify(options)}`)
            //     .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            return getTopRatedProducts(options)
        },
        /**
         * Returns an array of discounted products.
         */
        getDiscountedProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/discounted-products.json?limit=3&category=power-tools
             *
             * where:
             * - 3           = options.limit
             * - power-tools = options.category
             */
            // return fetch(`https://example.com/api/discounted-products.json?${qs.stringify(options)}`)
            //     .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            return getDiscountedProducts(options)
        },
        /**
         * Returns an array of most popular products.
         */
        getPopularProducts: (options: GetProductsOptions = {}): Promise<IProduct[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/shop/popular-products.json?limit=3&category=power-tools
             *
             * where:
             * - 3           = options.limit
             * - power-tools = options.category
             */
            // return fetch(`https://example.com/api/popular-products.json?${qs.stringify(options)}`)
            //     .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            return getPopularProducts(options)
        },
        /**
         * Returns search suggestions.
         */
        getSuggestions: (query: string, options: GetSuggestionsOptions = {}): Promise<IProduct[]> => {
            /**
             * This is what your API endpoint might look like:
             *
             * https://example.com/api/search/suggestions.json?query=screwdriver&limit=5&category=power-tools
             *
             * where:
             * - screwdriver = query
             * - 5           = options.limit
             * - power-tools = options.category
             */
            return fetch(context.$url.api(`search/suggestions.json?${qs.stringify({ ...options, query })}`))
                .then((response) => response.json());

            // This is for demonstration purposes only. Remove it and use the code above.
            // return getSuggestions(query, options)
        }
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $shopApi: ReturnType<typeof make> & Context
    }
}

declare module '@nuxt/types' {
    interface Context {
        $shopApi: ReturnType<typeof make> & Context
    }
}

declare module 'vuex/types/index' {
    interface Store<S> {
        $shopApi: ReturnType<typeof make> & Context,
    }
}

const plugin: Plugin = (context, inject) => {
    inject('shopApi', make(context))
}

export type ShopApi = ReturnType<typeof make>;

export default plugin
