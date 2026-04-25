import { createRouter, createWebHashHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

if (import.meta.hot && import.meta.env.MODE !== 'test') {
  handleHotUpdate(router)
}

export default router
