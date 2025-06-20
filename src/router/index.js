import { createRouter, createWebHistory } from 'vue-router'
import EasyGame from '../views/EasyGame.vue'
import MediumGame from '../views/MediumGame.vue'
import HardGame from '../views/HardGame.vue'
import HomePage from '../views/HomePage.vue'
import MockGame from '../views/MockGame.vue'
import ExpertGame from '@/views/ExpertGame.vue'
import InsaneGame from '@/views/InsaneGame.vue'


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
    {
      path: '/mock',
      name: 'mock',
      component: MockGame,
    },
    {
      path: '/expert',
      name: 'expert',
      component: ExpertGame,
    },
    {
      path: '/insane',
      name: 'insane',
      component: InsaneGame,
    },
  ],
})

export default router
