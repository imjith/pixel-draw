<template>
  <div :class="['pixel', color]"></div>
</template>
<script>
export default {
  props: ["color", "w", "h"],
  name: "Pixel"
};
</script>