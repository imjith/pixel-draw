<template>
  <div class="container">
    <h1 class="display-4">PIXEL DRAW</h1>
    <div class="slidecontainer">
      <input
        v-model="pixelSize"
        @change="changePixelSize"
        type="range"
        min="15"
        max="30"
        value="1"
        class="slider"
        id="pixelSize"
      >
      <label for="pixelSize">Pixel size</label>
    </div>
    <div class="slidecontainer">
      <input
        v-model="rowCount"
        @change="changePixelSize"
        type="range"
        min="15"
        max="30"
        value="1"
        class="slider"
        id="rowCount"
      >
      <label for="rowCount">Row count</label>
    </div>
    <div class="slidecontainer">
      <input
        v-model="colCount"
        @change="changePixelSize"
        type="range"
        min="15"
        max="30"
        value="1"
        class="slider"
        id="colCount"
      >
      <label for="colCount">Column count</label>
    </div>
    <div class="row">
      <button class="btn btn-danger btn-clear" @click="clear()">Clear canvas</button>
    </div>
    <div class="row">
      <div class="color-picker">
        <Pixel
          v-for="color in colorPalette"
          :key="color"
          :style="{ width: '20px' , height: '20px'}"
          :class="[color,{active: activeColor==color}]"
          @click.native="selectColor(color)"
        ></Pixel>
      </div>
      <div class="canvas" :style="{ width: rowCount*pixelSize + 'px'}">
        <Pixel
          v-for="n in totalPixels"
          :key="n"
          :style="{ width: pixelSize + 'px' , height: pixelSize + 'px'}"
          :color="colorArr[n]"
          @click.native="fillPixel(n)"
          @mousemove.native="onMove($event, n)"
          @mouseup.native="stopDrag"
          @mousedown.native="startDrag"
        ></Pixel>
      </div>
    </div>
    
  </div>
</template>

<script>
import Pixel from "./Pixel.vue";

export default {
  components: {
    Pixel
  },
  name: "App",
  data() {
    return {
      activeColor: "green",
      colorPalette: [
        "green",
        "blue",
        "red",
        "yelloworange",
        "black",
        "orange",
        "yellow",
        "white"
      ],
      dragging: false,
      pixelSize: 20,
      rowCount: 20,
      colCount: 20,
      totalPixels: 400,
      colorArr: Array(400).fill("white")
    };
  },
  methods: {
    selectColor(clr) {
      this.activeColor = clr;
    },
    startDrag() {
      this.dragging = true;
    },
    stopDrag() {
      this.dragging = false;
    },
    onMove(evt, n) {
      if (this.dragging) {
        this.colorArr.splice(n, 1, this.activeColor);
      }
    },
    fillPixel(n) {
      this.colorArr.splice(n, 1, this.activeColor);
    },
    clear() {
      this.colorArr = Array(this.totalPixels).fill("white");
    },
    changePixelSize() {
      this.totalPixels = this.rowCount * this.colCount;
    //   this.colorArr = Array(this.totalPixels).fill("white");
      console.log(this.colorArr.length);
    }
  }
};
</script>