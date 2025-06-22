<template>
  <div class="easy-game-container">
    <div class="content-box">
      <!--Header row -->
      <div class="header-row">
        <div class="header-inner">
          <div class="header-left">Planet Pair-Up</div>
          <div class="header-right">Expert Mode</div>
        </div>
      </div>

      <!-- Top Controls: Timer, Moves, Best, Reset -->
      <div class="top-controls">
        <div class="score-box-moves">Moves - {{ moves }}</div>
        <div class="score-box-best">Best - {{ expertBestScore ?? '--' }}</div>
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
      </div>

      <!-- popup -->
      <PopUp :visible="gameOver" @close="gameOver = false">
        <template #title>
          <h2>Game Completed,</h2>
          <h2>Well Done!</h2>
        </template>
        <p>You finished the game in <strong>{{ moves }}</strong> moves!</p>
        <p>Close & Press Start to Play Again.</p>
        <p>Or go to the main menu and choose a different difficulty.</p>
      </PopUp>

      <!-- breadcrumb footer -->
      <nav class="breadcrumb-nav">
        <router-link to="/">Home</router-link>
        <span class="separator">›</span>
        <router-link to="/expert">Expert</router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Tile from '../components/Tile.vue'
import PopUp from '@/components/PopUp.vue'

const tiles = ref([])
const moves = ref(0)
const expertBestScore = ref(JSON.parse(localStorage.getItem('expertBestScore')) || null)
const gameStarted = ref(false)
const isFlippingAllowed = ref(false)
const flippedIndexes = ref([])
const timer = ref(0)
let timerInterval = null
const gameOver = ref(false)

const imageOptions = ['greenPlanet.png', 'redPlanet.png', 'purplePlanet.png', 'blackPlanet.png', 'orangePlanet.png', 'pinkPlanet.png']

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
  timer.value = 4

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
        gameOver.value = true
        if (!expertBestScore.value || moves.value < expertBestScore.value) {
          expertBestScore.value = moves.value
          localStorage.setItem('expertBestScore', JSON.stringify(expertBestScore.value))
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

onMounted(() => {
  createTileGrid()
})
</script>

<style scoped>
.easy-game-container {
  min-height: 100vh;
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
  background-color: #049dd5f5;
  border: 2px solid black;
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
  grid-template-columns: repeat(6, 75px);
  gap: 0.5rem;
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
  font-size: 1.1rem;
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
    grid-template-columns: repeat(5,85);
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

@media (max-width: 600px) {
  .content-box {
    width: 100%;
    max-width: 90vw;
    padding: 1.5rem;
    padding-top: 4.2rem;
    padding-bottom: 4rem;
    margin-top: -2rem;
  }

  .header-left,
  .header-right {
    margin-top: -1rem;
    min-width: unset;
    width: 100%;
    font-size: 1.2rem;
  }

  .top-controls,
  .timer-box {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .tile-grid {
    grid-template-columns: repeat(3, 75px);
    gap: 0.75rem;
  }

  .btn {
    width: 75%;
  }

  .breadcrumb-nav {
    font-size: 1rem;
    margin-top: 2rem;
  }
}
</style>
