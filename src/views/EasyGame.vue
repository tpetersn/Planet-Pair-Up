<template>
  <div class="easy-game-container">
    <div class="content-box">
      <!--Header row -->
      <div class="header-row">
        <div class="header-inner">
          <div class="header-left">Planet Pair-Up</div>
          <div class="header-right">Easy Mode</div>
        </div>
      </div>


      <!-- Top Controls: Timer, Moves, Best, Reset -->
      <div class="top-controls">
        
        <div class="score-box-moves">Moves - {{ moves }}</div>
        <div class="score-box-best">Best - {{ easyBestScore ?? '--' }}</div>
        
      </div>

      <!-- grid -->
      <div class="tile-grid">
        <Tile
          v-for="(tile, index) in tiles"
          :key="index"
          :tile="tile"
          @flip="flipTile(index)"
        />
      </div>

      <!-- countdown timer -->
       <div class="timer-box">
        <div class="score-box-timer">Timer: {{ timer }} seconds</div>
       </div>

      <!-- buttons -->
      <div class="button-row">
        <button class="btn start" @click="startGame">Start</button>
        <!-- <button class="reset-button" @click="resetEasyBestScore">Reset Best</button> -->
        
      </div>

      <!-- breadcrumb footer -->
      <nav class="breadcrumb-nav">
        <router-link to="/">Home</router-link>
        <span class="separator">›</span>
        <router-link to="/easy">Easy</router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Tile from '../components/Tile.vue'

const tiles = ref([])
const moves = ref(0)
const easyBestScore = ref(JSON.parse(localStorage.getItem('easyBestScore')) || null)
const gameStarted = ref(false)
const isFlippingAllowed = ref(false)
const flippedIndexes = ref([])
const timer = ref(0)
let timerInterval = null

const imageOptions = ['greenPlanet.png', 'redPlanet.png', 'purplePlanet.png']

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5)
}

function createTileGrid() {
  const duplicated = [...imageOptions, ...imageOptions]
  const shuffled = shuffle(duplicated).map(image => ({
    image,
    flipped: false,
    matched: false
  }))
  tiles.value = shuffled
}

function startGame() {
  createTileGrid()
  moves.value = 0
  gameStarted.value = true
  isFlippingAllowed.value = false
  timer.value = 10

  tiles.value.forEach(tile => tile.flipped = true)

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

function flipTile(index) {
  if (!isFlippingAllowed.value) return
  const tile = tiles.value[index]
  if (tile.flipped || tile.matched) return

  tile.flipped = true
  moves.value++
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
        if (!easyBestScore.value || moves.value < easyBestScore.value) {
          easyBestScore.value = moves.value
          localStorage.setItem('easyBestScore', JSON.stringify(easyBestScore.value))
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

function resetEasyBestScore() {
  easyBestScore.value = null
  localStorage.removeItem('easyBestScore')
}

onMounted(() => {
  createTileGrid()
})
</script>

<style scoped>
.easy-game-container {
  min-height: 100vh;
  background: url('../images/planetBackground.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3.25rem 1rem 2rem 1rem;
}

.content-box {
  background: rgba(100, 0, 150, 0.75);
  border-radius: 20px;
  padding: 5rem;
  text-align: center;
  color: white;
  width: 32.5rem;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.header-row {
  display: flex;
  justify-content: center;
  margin-top: -1.8rem;
  margin-bottom: 2.5rem;
  width: 100%;
  font-weight: bold;
  font-size: 1.3rem;
}

.header-inner {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.header-left,
.header-right {
  padding: 0.5rem 1.5rem;
  background-color: #049dd5f5 ;
  border: 2px solid black;
  text-decoration: underline;
  border-radius: 5px;
  color: black;
  text-align: center;
  min-width: 200px;
}



.top-controls {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;


  /* insert */
}
.timer-box{
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.score-box-timer {
    background-color: #df562898;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;
  border: 2px solid white;
}


.score-box-moves,
.score-box-best,
.reset-button {
  background-color: rgba(51, 8, 73, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  font-size: 1.25rem;
  border: 2px solid white;
}

.reset-button {
  background-color: #d6543d;
  cursor: pointer;
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(3, 85px);
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0 3rem 0;
}


.button-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.btn {
  padding: 0.5rem 2.5rem;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #00d7b0;
  color: black;
}
.start:hover {
  transform: scale(1.05);
}

.start {
  background-color: #00d7b0;
  color: black;
  border: 2px solid white;
  font-size: 1.25rem;
}

.breadcrumb-nav {
  font-size: 0.75rem;
  margin-top: 4rem;
  color: white;
  margin-bottom: -4rem;
}

.breadcrumb-nav a {
  color: white;
  transition: color 0.3s;
}

.breadcrumb-nav a:hover {
  color: #00e3e3;
  background-color: transparent;
}

.separator {
  margin: 0 0;
  color: white;
}

@media (min-width: 1024px) {
  .content-box {
    width: 40rem;
  }

  .tile-grid {
    grid-template-columns: repeat(3, 100px);
    gap: 2rem;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  .header-row {
    margin-bottom: 1.5rem;
  }

  .top-controls {
    margin-bottom: 1.5rem;
  }
  .header-row {
  font-size: 1.5rem;
}
.easy-game-container {
  padding: 7rem 1rem 2rem 1rem;
}

}
</style>
