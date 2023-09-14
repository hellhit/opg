import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import OrdersView from '../views/OrdersView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/ProductsView',
    name: 'ProductsView',
    component: ProductsView
  },
  {
    path: '/OrdersView',
    name: 'OrdersView',
    component: OrdersView
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
