<template>
    <div class="container">
        <h1 class="display-4">PIXEL DRAW</h1>
        <div class="row">
            <div class="color-picker">
                <Pixel v-for="color in colorPalette" :key="color" :class="[color,{active: activeColor==color}]" @click.native="selectColor(color)"></Pixel>
            </div>
            <div class="canvas">
                <Pixel v-for="n in 20*20" :key="n" :color="colorArr[n]" @click.native="fillPixel(n)" @mousemove.native="onMove($event, n)" @mouseup.native="stopDrag" @mousedown.native="startDrag"></pixel>
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
                colorArr: Array(401).fill('white'),
                colorPalette: ['green', 'blue', 'red', 'yelloworange', 'black', 'orange', 'yellow', 'white'],
                dragging: false
            }
        },
        methods: {
            selectColor(clr) {
            this.activeColor = clr
            },
            startDrag() {
                this.dragging = true;
            },
            stopDrag() {
                this.dragging = false;
            },
            onMove(evt, n) {
                if(this.dragging) {
                    this.colorArr.splice(n,1,this.activeColor)
                }
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