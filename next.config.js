const API = 'https://marketplace.elliesoft.com'
const VERSION = '1.0.0'
const API_PRODUCTION = 'https://farq-api.elliesoft.com'
const VERSION_PRODUCTION = 'v1.1'


module.exports = {
    env: {
        API_CATEGORIES: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/categories`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/categories`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/categories`
        },
        API_BRANDS: {
            "ru": `${API_PRODUCTION}/${VERSION_PRODUCTION}/brands`, //https://farq-api.elliesoft.com/api/v1.1/brands
        },
        API_BRAND: {
            "ru": `${API_PRODUCTION}/${VERSION_PRODUCTION}/brand`, //https://farq-api.elliesoft.com/api/v1.1/brand/{slug}
        },
        API_REFRESH_TOKEN: `${API_PRODUCTION}/sanctum/csrf-cookie`,
        API_REGISTER: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/auth/register`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/auth/register`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/auth/register`
        },
        API_LOGIN: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/auth/login`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/auth/login`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/auth/login`
        },
        API_LOGOUT: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/auth/logout`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/auth/logout`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/auth/logout`
        },
        API_PRODUCTS_HOME: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/home_products`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/home_products`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/home_products`
        },
        API_PRODUCT_VIEW: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/product`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/product`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/product`
        },
        API_PRODUCTS_LIST:{
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/filter_products`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/filter_products`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/filter_products`
        },

        GET_POPULAR_PRODUCTS: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/home_products`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/home_products`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/home_products`
        },

        API_ADD_ADDRESS: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/address/add`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/address/add`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/address/add`
        },
        API_ADDRESS: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/address`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/address`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/address`
        },
        API_GET_ADDRESS_LIST: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/address/list`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/address/list`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/address/list`
        },
        API_EDIT_NAME: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/edit_name`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/edit_name`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/edit_name`
        },
        API_EDIT_EMAIL: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/change_email`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/change_email`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/change_email`
        },
        GET_CART: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/cart_list`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/cart_list`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/cart_list`
        },
        DEVICE: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/device`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/device`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/device`
        },
        ADD_TO_CART: { //method PUT query warehouse_slug/slug
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/cart_add`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/cart_add`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/cart_add`
        },
        REMOVE_TO_CART: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/cart_remove`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/cart_remove`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/cart_remove`
        },

        EDIT_TO_CART: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/cart_edit`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/cart_edit`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/cart_edit`
        },
        NEWS: {
            "ru": `${API}/ru/${VERSION}/blog`,
            "uz": `${API}/uz/${VERSION}/blog`,
            "en": `${API}/en/${VERSION}/blog`
        },
        COMPARES_GET_LIST: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/comparison_list`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/comparison_list`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/comparison_list`
        },
        COMPARES_ADD: { //method PUT query warehouse_slug/slug
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/comparison_add`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/comparison_add`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/comparison_add`
        },
        COMPARES_REMOVE: { //method DELETE query warehouse_slug/slug
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/comparison_remove`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/comparison_remove`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/comparison_remove`
        },
        COMPARES_REMOVE_ALL: { //method DELETE
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/comparison_remove_all`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/comparison_remove_all`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/comparison_remove_all`
        },
        COMPARES_SUGGESTIONS: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/comparison_suggestions`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/comparison_suggestions`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/comparison_suggestions`
        },
        COMPARES_SUGGEST: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/comparison_suggest`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/comparison_suggest`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/comparison_suggest`
        },
        GET_RECENTLY_LIST: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/recently_products`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/recently_products`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/recently_products`
        },
        ORDER_SEND: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/place_order`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/place_order`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/place_order`
        },
        GET_TRACK_ORDER_ID: {
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/track`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/track`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/track`
        },

        GET_SAVED:{
            "ru": `${API_PRODUCTION}/ru/${VERSION_PRODUCTION}/home_products`,
            "uz": `${API_PRODUCTION}/uz/${VERSION_PRODUCTION}/home_products`,
            "en": `${API_PRODUCTION}/en/${VERSION_PRODUCTION}/home_products`
        }

    }
}