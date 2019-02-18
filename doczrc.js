import { css } from 'docz-plugin-css'

export default {
    title: 'RUI',
    description: 'A Design UI library for React',
    htmlContext: {
        favicon: 'public/favicon.ico'
    },
    themeConfig:{
        colors:{
            primary:"#1890ff",
        },
        styles: {
            h1: {
                fontSize: 24,
            },
            h2: {
                fontSize: 20,
            },
            h3: {
                fontSize: 16,
            },
            h4: {
                fontSize: 12,
            },
        },
    },
    plugins: [
        css({
            preprocessor: 'postcss'
        })
    ]
}