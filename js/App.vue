<template>
  <div class="container">
    <h1 class="display-4">PIXEL DRAW</h1>
    <div class="slidecontainer">
      <input
        v-model="pixelSize"
        type="range"
        :min="pixelCountMin"
        :max="pixelCountMax"
        value="1"
        class="slider"
        id="pixelSize"
      >
      <label for="pixelSize">Pixel size</label>
    </div>
    <div class="slidecontainer">
      <input
        v-model="rowCount"
        @input="changeRowSize"
        type="range"
        :min="rowMin"
        :max="rowMax"
        value="1"
        class="slider"
        id="rowCount"
      >
      <label for="rowCount">Row count</label>
    </div>
    <div class="slidecontainer">
      <input
        v-model="colCount"
        @input="changeColSize"
        type="range"
        :min="colMin"
        :max="colMax"
        value="1"
        class="slider"
        id="colCount"
      >
      <pre>{{ colCount }}</pre>
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
      <div
        class="canvas"
        :style="{ width: colCount*pixelSize + 'px'}"
        @mouseleave="stopDrag"
        @mouseup="stopDrag"
        @mousedown="startDrag"
      >
        <Pixel
          v-for="n in totalPixels"
          :key="n"
          :style="{ width: pixelSize + 'px' , height: pixelSize + 'px'}"
          :color="colorArr[n-1]"
          @click.native="fillPixel(n-1)"
          @mousemove.native="onMove($event, n-1)"
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
      pixelSize: 15,
      rowCount: 15,
      colCount: 15,
      prevColCount: 15,
      prevRowCount: 15,
      totalPixels: 225,
      colorArr: Array(226).fill("white"),
      pixelCountMin: 15,
      pixelCountMax: 30,
      rowMin: 15,
      rowMax: 30,
      colMin: 15,
      colMax: 30,
      pixelArr: []
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
        this.fillPixel(n);
      }
    },
    fillPixel(n) {
      this.colorArr.splice(n, 1, this.activeColor);

      let row = Math.floor(n / this.colCount);
      let col = n % this.colCount;
      let pixelArr = this.pixelArr;
      if (typeof pixelArr[row] === "undefined") {
        pixelArr[row] = [];
      }
      pixelArr[row][col] = this.activeColor;
    },
    clear() {
      this.colorArr = Array(this.totalPixels).fill("white");
      this.pixelArr = [];
    },
    changeRowSize() {
      this.reArrageColors();
      if (this.rowCount < this.prevRowCount) {
        this.clearOutBoundPixels();
      }
      this.prevRowCount = this.rowCount;
      this.calculateTotalPix();
      
    },
    changeColSize() {
      this.reArrageColors();
      if (this.colCount < this.prevColCount) {
        this.clearOutBoundPixels();
      }
      this.prevColCount = this.colCount;
      this.calculateTotalPix();
    },
    reArrageColors() {
      for (let i = 0; i < this.totalPixels; i++) {
        let row = Math.floor(i / this.colCount);
        let col = i % this.colCount;
        this.colorArr.splice(i, 1, this.getColor(row, col));
      }
    },
    calculateTotalPix(){
      this.totalPixels = this.rowCount * this.colCount;
    },
    clearOutBoundPixels() {
      let tmp = [];
      for (let i = 0; i < this.rowCount; i++) {
        let p = this.pixelArr[i];
        if (typeof p !== "undefined") {
          tmp[i] = [];
          for (let j = 0; j < this.colCount; j++) {
            tmp[i][j] = p[j];
          }
        }
      }
      this.pixelArr = tmp;
    },
    getColor(row, col) {
      let pixelArr = this.pixelArr;
      if (
        typeof pixelArr[row] !== "undefined" &&
        typeof pixelArr[row][col] !== "undefined"
      ) {
        return pixelArr[row][col];
      }
      return "white";
    }
  }
};
</script>