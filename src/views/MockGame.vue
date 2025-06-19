<template>
  <div class="mock-game-container">
    <!-- important values: timer, # of moves, best score, reset score -->
    <div class="top-controls">
      <div class="timer-button">Timer: {{ timer }} seconds</div>
      <div class="score-button">Moves: {{ moves }}</div>
      <div class="score-button">Best: {{ bestScore ?? '--' }}</div>
      <button class="reset-button" @click="resetBestScore">Reset Best</button>
    </div>

    <!--tile Grid -->
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

//game constants
const tiles = ref([])
const moves = ref(0)
const bestScore = ref(JSON.parse(localStorage.getItem('easyBestScore')) || null)
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
  const duplicated = [...imageOptions, ...imageOptions] // 3 images x2 = 6 tiles
  const shuffled = shuffle(duplicated).map(image => ({
    image,
    flipped: false,
    matched: false
  }))
  tiles.value = shuffled
}

//function for starting the game, 10 seconds to memorize
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
  moves.value++ // Increment moves on every flip
  flippedIndexes.value.push(index)

  if (flippedIndexes.value.length === 2) {
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
          localStorage.setItem('easyBestScore', JSON.stringify(bestScore.value))
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

//function to reset the best score
function resetBestScore() {
  bestScore.value = null
  localStorage.removeItem('easyBestScore')
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

.top-controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-template-rows: repeat(2, 60px);
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.controls {
  margin-top: 1rem;
}

.timer-button,
.score-button,
.reset-button {
  display: inline-block;
  background-color: #ff9800;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  min-width: 100px;
  text-align: center;
  border: none;
  cursor: pointer;
}

.reset-button {
  background-color: #d6543d;
}
</style>
