<script setup>
    import IconPlanet from "@/components/icons/IconPlanet.vue";
    import IconPlanet1 from "@/components/icons/IconPlanet1.vue";
    import IconPlanet2 from "@/components/icons/IconPlanet2.vue";
    import IconPlanet6 from "@/components/icons/IconPlanet6.vue";
    import { RouterView } from "vue-router";
</script>

<template>
  <div class="home-container">
    <div class="content-box">
      <h1 class="title"><IconPlanet1 /> Welcome to <em>Planet Pair-Up <IconPlanet2 /></em></h1>
      <h2>The outer space memory theme game!</h2>


      <div class="instructions">
        <h3>How to play?</h3>
        <p>
          Select tiles until you match two tiles with the same image on them. <br />
          The goal is to match all pairs in the least amount of moves. <br />
          If you complete the game while achieving a new lowest score, your score will be saved as the new best for that difficulty level. <br>Good Luck!

        </p>
      </div>


         

      <div class="difficulty">
        <h3>Select Difficulty Level to Play</h3>
        
        <div class="buttons">
          <button class="easy" variant="primary" @click="$router.push('/easy')">Easy</button>
          <button class="medium" variant="primary" @click="$router.push('/medium')">Medium</button>
          <button class="hard" variant="primary" @click="$router.push('/hard')">Hard</button>
          <!-- <button class="hard" variant="primary" @click="$router.push('/mock')">mockup</button> -->
        </div>
      </div>
      <div class="descriptions">
        <h3 class="descipt-title">Difficulty Level Descriptions</h3>
        <ul class="descipt-list">
          <li>
            Easy - 3x2 grid & 10s to memorize
          </li>
          <li>
            Medium - 4x2 grid & 6s to memorize
          </li>
          <li>
            Hard - 5x2 grid & 4s to memorize
          </li>
        </ul>
      </div>   



      <router-link to="/" class="home-link"><IconPlanet6 />Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
}

.content-box {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 1rem;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* texts */
h1 {
  font-size: 2rem;
}

h2 {
  font-weight: 400;
  margin-bottom: 1rem;
}

.instructions {
  margin-top: 1rem;
  font-size: 1rem;
}

.difficulty h3 {
  margin-top: 1rem;
}

.descipt-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem; 
}
.descriptions {
  margin-top: 2rem;
  border: 1px dotted rgb(168, 167, 167);
  border-radius: 10px;
}
.descipt-title {
  margin-top: 1rem;
}

/* buttons */
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  margin-left: 8rem;
  margin-right: 8rem;
}

button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 1.8rem;
}

.easy {
  background-color: #63e682;
}

.medium {
  background-color: #ffdf53;
  color: black;
}

.hard {
  background-color: #d95454;
}

.game-info {
  margin-top: 1.8rem;
}

/* breadcrumb */
.home-link {
  display: inline;
  margin-top: 2.8rem;
  margin-bottom: -0.8rem;
  text-decoration: none;
  color: black;
  font-weight: bold;
  width: wrap;
}
.home-link:hover {
  text-decoration: underline;
  background-color: transparent;
}
.title {
  text-decoration: underline;
  margin-bottom: 0.8rem;
}

@media (min-width: 1024px) {
  .content-box {
    max-width:1000px;
    padding: 4rem;
    margin: auto;
  }
  .buttons{
    margin-left: 15rem;
    margin-right: 15rem;
  }
  .home-link {
    margin-top: 2.8rem;
    margin-bottom: -4rem;
    display: inline-block;
  }

}

</style>
