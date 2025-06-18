import { createRouter, createWebHistory } from 'vue-router'
import EasyGame from '../views/EasyGame.vue'
import MediumGame from '../views/MediumGame.vue'
import HardGame from '../views/HardGame.vue'
import HomePage from '../views/HomePage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/easy',
      name: 'easy',
      component: EasyGame,
    },
    {
      path: '/medium',
      name: 'medium',
      component: MediumGame,
    },
    {
      path: '/hard',
      name: 'hard',
      component: HardGame,
    },
  ],
})

export default router
