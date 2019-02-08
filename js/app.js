const pixel= {
    props: ['color'],
    template: `<div :class="['pixel', color]"></div>`
}

var app = new Vue({
    el: '#app',
    components: {
        pixel
    },
    data: {
        activeColor: 'green',
        colorArr: Array(401).fill('white')
    },

    methods: {
        selectColor(clr) {
            this.activeColor = clr
        },

        fillPixel(n) {
            this.colorArr.splice(n,1,this.activeColor)
        },

        clear() {
            this.colorArr = Array(401).fill('')
        }

       }
})