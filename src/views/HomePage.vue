<script setup>
    import IconPlanet from "@/components/icons/IconPlanet.vue";
    import { RouterView } from "vue-router";
</script>

<template>
  <div class="home-container">
    <div class="content-box">
      <h1>Welcome to <em>Planet Pair-Up <IconPlanet /></em></h1>
      <h2>The outer space memory theme game!</h2>
      <div class="instructions">
        <h3>How to play?</h3>
        <p>
          Select tiles until you match two tiles with the same image on them. <br />
          The goal is to match all pairs in the least amount of moves. <br />
          If you complete the game in the least amount of moves, it will be saved as your best for that difficulty.
        </p>
      </div>

      <div class="difficulty">
        <h3>Select Difficulty Level</h3>
        
        <div class="buttons">
          <button class="easy" variant="primary" @click="$router.push('/easy')">Easy</button>
          <button class="medium" variant="primary" @click="$router.push('/medium')">Medium</button>
          <button class="hard" variant="primary" @click="$router.push('/hard')">Hard</button>


        </div>
      </div>

      <router-link to="/" class="home-link">Home</router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  background: url('../images/planetBackground.png') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.content-box {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
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
  margin-top: 2rem;
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

/* breadcrumb */
.home-link {
  display: inline-block;
  margin-top: 2rem;
  text-decoration: none;
  color: black;
  font-weight: bold;
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
}
</style>
