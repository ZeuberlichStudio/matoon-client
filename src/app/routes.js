module.exports = [
    {
        path: '/',
        exact: true,
        moduleName: 'pages/main/index',
        componentName: 'MainPage'
    },
    {
        path: '/catalog/category=:slug',
        exact: false,
        moduleName: `pages/category/index`,
        componentName: 'CategoryPage'
    },
    {
        path: '/catalog/product=:slug',
        exact: false,
        moduleName: `pages/product/index`,
        componentName: 'ProductPage'
    },

    //DEVELOPMENT PAGE
    {
        path: '/dev',
        exact: false,
        moduleName: `pages/dev`,
        componentName: 'DevPage'
    }
]