import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import News from '../views/NewsView.vue'
import axios from 'axios';


const routes = [
  {
    path: '/',
    name: 'login',
    component:Login,
    
  },
  {
    path: "/news",
    name: "news",
    component: News,
    meta: { requiresAuth: true }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth) {
//     const url = `http://172.17.100.110:3000`
//     axios.post(`${url}/confirm/login`).then((res) => {
//       if (res.data.status === 'success') {
//         next()
//       } else {
//         next({
//             path: '/'
//         })
//         // next(false)
//       }
//     })
//   } else {
//     next()
//   }
// })

export default router
