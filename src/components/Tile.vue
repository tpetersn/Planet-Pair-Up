<script setup>
defineProps({
  tile: Object // expects the following: { image: 'planet1.png', flipped: false, matched: false }
})
</script>

<template>
  <div class="tile" @click="$emit('flip')">
    <!-- front of the tile... show image if flipped or matched -->
    <img
      v-if="tile.flipped || tile.matched"
      :src="`../images/${tile.image}`"
      class="tile-image"
      alt="tile"
    />
    <!-- back of the tile -->
    <div v-else class="tile-back"></div>
  </div>
</template>


<style scoped>
.tile {
  width: 60px;
  height: 60px;
  border: 2px solid white;
  border-radius: 5px;
  overflow: hidden;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.tile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile-back {
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
