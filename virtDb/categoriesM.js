import {MENU, CATEGORIES, BRAND, PAGE} from '../constants'

export const categoriesM = [
    {
        id: 1,
        type: MENU,
        name: {
            'ru': 'Продукты',
            'uz': 'Продукты',
            'en': 'Продукты'
        },
        slug: 'null',
        children: [
            {
                id: 2,
                type: CATEGORIES,
                name: {
                    'ru': 'Бытовая техника',
                    'uz': 'Бытовая техника',
                    'en': 'Бытовая техника'
                },
                slug: 'bitovaya-texnika',
                children: [
                    {
                        id: 3,
                        type: CATEGORIES,
                        name: {
                            'ru': 'Блендер',
                            'uz': 'Блендер',
                            'en': 'Блендер'
                        },
                        slug: 'blender',
                        children: []
                    },
                    {
                        id: 4,
                        type: CATEGORIES,
                        name: {
                            'ru': 'Посудомоичная машина',
                            'uz': 'Посудомоичная машина',
                            'en': 'Посудомоичная машина'
                        },
                        slug: 'posudomoichnaya',
                        children: []
                    },
                    {
                        id: 5,
                        type: CATEGORIES,
                        name: {
                            'ru': 'Стиральная машина',
                            'uz': 'Стиральная машина',
                            'en': 'Стиральная машина'
                        },
                        slug: 'stiralnaya',
                        children: []
                    }
                ]
            },
            {
                id: 21,
                type: CATEGORIES,
                name: {
                    'ru': 'Техника для кухни',
                    'uz': 'Техника для кухни',
                    'en': 'Техника для кухни'
                },
                slug: 'bitovaya-texnika',
                children: [
                    {
                        id: 3,
                        type: CATEGORIES,
                        name: {
                            'ru': 'Блендер',
                            'uz': 'Блендер',
                            'en': 'Блендер'
                        },
                        slug: 'blender',
                        children: []
                    },
                    {
                        id: 4,
                        type: CATEGORIES,
                        name: {
                            'ru': 'Посудомоичная машина',
                            'uz': 'Посудомоичная машина',
                            'en': 'Посудомоичная машина'
                        },
                        slug: 'posudomoichnaya',
                        children: []
                    },
                    {
                        id: 5,
                        type: CATEGORIES,
                        name: {
                            'ru': 'Стиральная машина',
                            'uz': 'Стиральная машина',
                            'en': 'Стиральная машина'
                        },
                        slug: 'stiralnaya',
                        children: []
                    }
                ]
            },
            {
                id: 21,
                type: CATEGORIES,
                name: {
                    'ru': 'Копне',
                    'uz': 'Копне',
                    'en': 'Копне'
                },
                slug: 'bitovaya-texnika',
                children: []
            }
        ]
    },
    {
        id: 6,
        type: MENU,
        name: {
            'ru': 'Бренды',
            'uz': 'Бренды',
            'en': 'Бренды'
        },
        slug: 'null',
        children: [
            {
                id: 7,
                type: CATEGORIES,
                name: {
                    'ru': 'Apple',
                    'uz': 'Apple',
                    'en': 'Apple'
                },
                slug: 'apple',
                children: []
            },
            {
                id: 8,
                type: CATEGORIES,
                name: {
                    'ru': 'Artel',
                    'uz': 'Artel',
                    'en': 'Artel'
                },
                slug: 'artel',
                children: []
            },
            {
                id: 9,
                type: CATEGORIES,
                name: {
                    'ru': 'Bosh',
                    'uz': 'Bosh',
                    'en': 'Bosh'
                },
                slug: 'bosh',
                children: []
            }
        ]
    },
    {
        id: 10,
        type: MENU,
        name: {
            'ru': 'Предложения',
            'uz': 'Предложения',
            'en': 'Предложения'
        },
        slug: 'null',
        children: [
            {
                id: 11,
                type: CATEGORIES,
                name: {
                    'ru': 'Предложения',
                    'uz': 'Предложения',
                    'en': 'Предложения'
                },
                slug: 'вввв',
                children: []
            },
            {
                id: 12,
                type: CATEGORIES,
                name: {
                    'ru': 'Предложения',
                    'uz': 'Предложения',
                    'en': 'Предложения'
                },
                slug: 'fff',
                children: []
            },
            {
                id: 13,
                type: CATEGORIES,
                name: {
                    'ru': 'Предложения',
                    'uz': 'Предложения',
                    'en': 'Предложения'
                },
                slug: 'sddd',
                children: []
            }
        ]
    }
]


export const categoriesF = [
    {
        id: 1,
        type: MENU,
        name: {
            'ru': 'Покупателям',
            'uz': 'Покупателям',
            'en': 'Покупателям'
        },
        slug: '',
        children: [
            {
                id: 2,
                type: CATEGORIES,
                name: {
                    'ru': 'Как выбрать товар',
                    'uz': 'Как выбрать товар',
                    'en': 'Как выбрать товар'
                },
                slug: 'kak',
                children: []
            },
            {
                id: 3,
                type: CATEGORIES,
                name: {
                    'ru': 'Обратная связь',
                    'uz': 'Обратная связь',
                    'en': 'Обратная связь'
                },
                slug: 'kak1',
                children: []
            },
            {
                id: 4,
                type: CATEGORIES,
                name: {
                    'ru': 'Помощь по сервису',
                    'uz': 'Помощь по сервису',
                    'en': 'Помощь по сервису'
                },
                slug: 'kak2',
                children: []
            }
        ]

    },
    {
        id: 5,
        type: MENU,
        name: {
            'ru': 'Сотрудничество',
            'uz': 'Сотрудничество',
            'en': 'Сотрудничество'
        },
        slug: '',
        children: [
            {
                id: 6,
                type: CATEGORIES,
                name: {
                    'ru': 'Личный кабинет магазина',
                    'uz': 'Личный кабинет магазина',
                    'en': 'Личный кабинет магазина'
                },
                slug: 'ddd',
                children: []
            },
            {
                id: 7,
                type: CATEGORIES,
                name: {
                    'ru': 'Подключение магазина',
                    'uz': 'Подключение магазина',
                    'en': 'Подключение магазина'
                },
                slug: 'kakss',
                children: []
            },
            {
                id: 8,
                type: CATEGORIES,
                name: {
                    'ru': 'Помощь по сервису',
                    'uz': 'Помощь по сервису',
                    'en': 'Помощь по сервису'
                },
                slug: 'kak2',
                children: []
            },
            {
                id: 9,
                type: CATEGORIES,
                name: {
                    'ru': 'Производителям',
                    'uz': 'Производителям',
                    'en': 'Производителям'
                },
                slug: 'kak4',
                children: []
            },
            {
                id: 10,
                type: CATEGORIES,
                name: {
                    'ru': 'Партнёрская программа',
                    'uz': 'Партнёрская программа',
                    'en': 'Партнёрская программа'
                },
                slug: 'kak3',
                children: []
            }
        ]

    }
]

export const categoriesBot = [
    {
        id: 1,
        type: CATEGORIES,
        name: {
            'ru': 'Корпоративная мнформация',
            'uz': 'Корпоративная мнформация',
            'en': 'Корпоративная мнформация'
        },
        slug: 'slug1'
    },
    {
        id: 2,
        type: CATEGORIES,
        name: {
            'ru': 'Форум, Блог',
            'uz': 'Форум, Блог',
            'en': 'Форум, Блог'
        },
        slug: 'slug2'
    },
    {
        id: 3,
        type: CATEGORIES,
        name: {
            'ru': 'Вакансии',
            'uz': 'Вакансии',
            'en': 'Вакансии'
        },
        slug: 'slug3'
    },
    {
        id: 4,
        type: CATEGORIES,
        name: {
            'ru': 'Пользовательское соглашение',
            'uz': 'Пользовательское соглашение',
            'en': 'Пользовательское соглашение'
        },
        slug: 'slug4'
    },
    {
        id: 5,
        type: CATEGORIES,
        name: {
            'ru': 'Реклама на сайте',
            'uz': 'Реклама на сайте',
            'en': 'Реклама на сайте'
        },
        slug: 'slug1'
    }
]