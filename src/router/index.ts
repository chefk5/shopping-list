import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../pages/Settings.vue'),
    },
  ],
})

export default router
