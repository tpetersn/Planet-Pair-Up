<script setup>
    import Tile from '../components/Tile.vue'
</script>


<template>
  <div class="easy-game-container">
    <div class="content-box">
      <!--Header row -->
      <div class="header-row">
        <div class="header-left">Planet Pair-Up</div>
        <div class="header-right">Hard Mode</div>
      </div>

      <!--scoring row -->
      <div class="score-row">
        <div class="score-box-moves">Moves - #</div>
        <div class="score-box-best">Best - #</div>
      </div>

      <!-- grid -->
      <div class="tile-grid">
        <div v-for="i in 10" :key="i" class="tile"></div>
      </div>

      <!-- buttons -->
      <div class="button-row">
        <button class="btn start">Start</button>
        <button class="btn restart">Restart</button>
      </div>

      <!-- breadcrumb footer -->
      <nav class="breadcrumb-nav">
      <router-link to="/">Home</router-link>
      <span class="separator">›</span>
      <router-link to="/hard">Hard</router-link>
      </nav>
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
  justify-content: space-around;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
}

.header-left,
.header-right {
  padding: 0.5rem 1rem;
  background-color: #00bfff;
  border: 2px solid black;
  border-radius: 5px;
  color: black;
}
.header-left {
  margin-right: -1rem;
}
.header-right {
    margin-left: -1rem;
}


/* scoring */
.score-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.score-box-moves {
  background-color: #af9bdc;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  margin-right: -2rem;
}
.score-box-best {
  background-color: #af9bdc;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: bold;
  color: white;
  margin-left: -2rem;
}

/* grid */
.tile-grid {
  display: grid;
  grid-template-columns: repeat(5, 60px);
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
  margin-bottom: 3rem;
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

.start {
  background-color: #00e3e3;
  color: black;
}

.restart {
  background-color: #d6543d;
  color: white;
}

/* breadcrumb */
.breadcrumb-nav {
  font-size: 0.75rem;
  margin-top: 4rem;
  color: white;
  margin-bottom: -4rem;
}

.breadcrumb-nav a {
  color: white;
  text-decoration: underline;
  transition: color 0.3s;
}

.breadcrumb-nav a:hover {
  color: #00e3e3;
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
  display: grid;
  grid-template-columns: repeat(3, 60px);
  gap: 2rem;
  justify-content: center;
  margin: 1.5rem 0;
  margin-top: 3rem;
  margin-bottom: 3rem;
}
.header-row {
  margin-bottom: 1.5rem;
}
.score-row {
  margin-bottom: 0px
}

}
</style>
