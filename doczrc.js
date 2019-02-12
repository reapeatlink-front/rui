import { css } from 'docz-plugin-css'

export default {
    title: 'RUI',
    description: 'A Design UI library for React',
    themeConfig:{
        colors:{
            primary:"red",
        }
    },
    plugins: [
        css({
            preprocessor: 'postcss'
        })
    ]
}