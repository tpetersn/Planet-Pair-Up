<template>
  <div class="mock-game-container">
    <!-- countdown timer  -->
    <div class="timer-button">Timer: {{ timer }} seconds</div>

    <!-- Header -->
    <h2>Planet Pair-Up: Easy Mode</h2>

    <!-- scoreboard counters -->
    <div class="scoreboard">
      <div>Moves: {{ moves }}</div>
      <div>Best: {{ bestScore ?? '--' }}</div>
    </div>

    <!-- tile grid -->
    <div class="tile-grid">
      <Tile
        v-for="(tile, index) in tiles"
        :key="index"
        :tile="tile"
        @flip="flipTile(index)"
      />
    </div>

    <!--start button -->
    <div class="controls">
      <button @click="startGame">Start</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Tile from '../components/Tile.vue'

// game constants
const tiles = ref([])
const moves = ref(0)
const bestScore = ref(null)
const gameStarted = ref(false)
const isFlippingAllowed = ref(false)
const flippedIndexes = ref([])
const timer = ref(0)
let timerInterval = null

// planet images for the tiles
const imageOptions = ['greenPlanet.png', 'redPlanet.png', 'purplePlanet.png']

//shuffling function for the tiles
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

//function for the initial grid creation
function createTileGrid() {
  const duplicated = [...imageOptions, ...imageOptions] // 3 images x2
  const shuffled = shuffle(duplicated).map(image => ({
    image,
    flipped: false,
    matched: false
  }))
  tiles.value = shuffled
}

//fuction for starting the game
function startGame() {
  createTileGrid()
  moves.value = 0
  gameStarted.value = true
  isFlippingAllowed.value = false
  timer.value = 10

  // flip and show all cards initially
  tiles.value.forEach(tile => tile.flipped = true)

  // start the countdon timer
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--

    } else {
      clearInterval(timerInterval)
      tiles.value.forEach(tile => tile.flipped = false)
      isFlippingAllowed.value = true
    }

  }, 1000)
}

//function for flipping and matching the tiles
function flipTile(index) {
  if (!isFlippingAllowed.value) return

  const tile = tiles.value[index]
  if (tile.flipped || tile.matched) return

  tile.flipped = true
  flippedIndexes.value.push(index)

  if (flippedIndexes.value.length === 2) {
    moves.value++
    const [firstIndex, secondIndex] = flippedIndexes.value
    const firstTile = tiles.value[firstIndex]
    const secondTile = tiles.value[secondIndex]

    if (firstTile.image === secondTile.image) {
      firstTile.matched = true
      secondTile.matched = true
      flippedIndexes.value = []

      if (tiles.value.every(t => t.matched)) {
        if (!bestScore.value || moves.value < bestScore.value) {
          bestScore.value = moves.value
        }
      }
    } else {
      isFlippingAllowed.value = false
      setTimeout(() => {
        firstTile.flipped = false
        secondTile.flipped = false
        flippedIndexes.value = []
        isFlippingAllowed.value = true
      }, 1000)
    }
  }
}

// create the grid once on mount
onMounted(() => {
  createTileGrid()
})
</script>

<style scoped>
.mock-game-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  color: white;
  padding-top: 2rem;
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-template-rows: repeat(2, 60px);
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.scoreboard,
.controls {
  margin: 1rem 0;
  display: flex;
  justify-content: space-around;
}

.timer-button {
  display: inline-block;
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  font-size: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}
</style>
