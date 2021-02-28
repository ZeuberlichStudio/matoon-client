module.exports = [
    {
        path: '/',
        exact: true,
        moduleName: '~/pages/MainPage',
        componentName: 'MainPage'
    },
    {
        path: '*',
        exact: true,
        moduleName: '~/pages/404',
        componentName: 'NotFoundPage'
    },
    {
        path: '/feed/post=:slug',
        exact: false,
        moduleName: `pages/post/index`,
        componentName: 'PostPage'
    },
    {
        path: '/catalog/category=:slug',
        exact: false,
        moduleName: `pages/category/index`,
        componentName: 'CategoryPage'
    },
    {
        path: '/catalog/search=:search',
        exact: false,
        moduleName: `pages/search/index`,
        componentName: 'SearchPage'
    },
    {
        path: '/catalog/product=:slug',
        exact: false,
        moduleName: `pages/product/index`,
        componentName: 'ProductPage'
    }
]