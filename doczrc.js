import { css } from 'docz-plugin-css'

export default {
    title: 'RUI',
    description: 'A Design UI library for React',
    themeConfig:{
        colors:{
            primary:"red",
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