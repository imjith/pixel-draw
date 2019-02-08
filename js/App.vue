<template>
    <div class="container">
        <h1 class="display-4">PIXEL DRAW</h1>
        <div class="row">
            <div class="color-picker">
                <Pixel :class="['green',{active: activeColor=='green'}]" @click.native="selectColor('green')"></Pixel>
                <Pixel :class="['blue',{active: activeColor=='blue'}]" @click.native="selectColor('blue')"></Pixel>
                <Pixel :class="['red',{active: activeColor=='red'}]" @click.native="selectColor('red')"></Pixel>
                <Pixel :class="['yelloworange',{active: activeColor=='yelloworange'}]" @click.native="selectColor('yelloworange')"></Pixel>
                <Pixel :class="['black',{active: activeColor=='black'}]" @click.native="selectColor('black')"></Pixel>
                <Pixel :class="['orange',{active: activeColor=='orange'}]" @click.native="selectColor('orange')"></Pixel>
                <Pixel :class="['yellow',{active: activeColor=='yellow'}]" @click.native="selectColor('yellow')"></Pixel>
                <Pixel :class="['white',{active: activeColor=='white'}]" @click.native="selectColor('white')"></Pixel>
            </div>
            <div class="canvas">
                <Pixel v-for="n in 20*20" :key="n" :color="colorArr[n]" @click.native="fillPixel(n)"></pixel>
            </div>
        </div>
        <div class="row">
            <button class="btn btn-danger btn-clear" @click="clear()">Clear canvas</button>
        </div>
    </div>
</template>

<script>
    import Pixel from './Pixel.vue'

    export default {
        components: {
            Pixel
        },
        name: 'App',
        data() {
            return {
                activeColor: 'green',
                colorArr: Array(401).fill('white')
            }
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
    }
</script>