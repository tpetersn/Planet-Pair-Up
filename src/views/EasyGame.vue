<script setup>
    import Tile from '../components/Tile.vue'
</script>


<template>
  <div class="easy-game-container">
    <div class="content-box">
      <!--Header row -->
      <div class="header-row">
        <div class="header-left">Planet Pair-Up</div>
        <div class="header-right">Easy Mode</div>
      </div>

      <!--scoring row -->
      <div class="score-row">
        <div class="score-box">Moves - #</div>
        <div class="score-box">Best - #</div>
      </div>

      <!-- grid -->
      <div class="tile-grid">
        <div v-for="i in 8" :key="i" class="tile"></div>
      </div>

      <!-- buttons -->
      <div class="button-row">
        <button class="btn start">Start</button>
        <button class="btn restart">Restart</button>
      </div>

      <!-- breadcrumb footer -->
      <router-link class="footer-link" to="/">Home › Easy</router-link>
    </div>
  </div>
</template>



<style scoped>
.easy-game-container {
  min-height: 100vh;
  background: url('../images/planetBackground.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
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

/* header */
.header-row {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.header-left,
.header-right {
  padding: 0.5rem 1rem;
  background-color: #00bfff;
  border: 2px solid black;
  border-radius: 5px;
  color: black;
}

/* scoring */
.score-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.score-box {
  background-color: #af9bdc;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;
}

/* grid */
.tile-grid {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.tile {
  width: 60px;
  height: 60px;
  background-color: black;
  border: 2px solid white;
  border-radius: 5px;
}

/* buttons */
.button-row {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.start {
  background-color: #00e3e3;
  color: black;
}

.restart {
  background-color: #d6543d;
  color: white;
}

/* breadcrumb */
.footer-link {
  display: block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: white;
  text-decoration: underline;
}
</style>
