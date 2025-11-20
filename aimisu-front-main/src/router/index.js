import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: () => import('../views/home/HomePage.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/home/Login.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: () => import('@/views/home/ForgotPassword.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/home/Register.vue'),
    },

    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard',
        },
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/Dashboard.vue'),
        },
        {
          path: 'events',
          name: 'admin-events',
          component: () => import('@/views/admin/Events.vue'),
        },
        {
          path: 'announcements',
          name: 'admin-announcements',
          component: () => import('@/views/admin/Announcements.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/views/admin/Users.vue'),
        },
        {
          path: 'organizations',
          name: 'admin-organizations',
          component: () => import('@/views/admin/Organizations.vue'),
        },
        {
          path: 'departments',
          name: 'admin-departments',
          component: () => import('@/views/admin/Departments.vue'),
        },
        {
          path: 'analytics',
          name: 'admin-analytics',
          component: () => import('@/views/admin/Analytics.vue'),
        },
      ],
    },

    // User Layout
    {
      path: '/user',
      component: () => import('@/layouts/UserLayout.vue'),
      meta: { requiresUser: true },
      children: [
        {
          path: '',
          redirect: '/user/dashboard',
        },
        {
          path: 'dashboard',
          name: 'user-dashboard',
          component: () => import('@/views/user/Dashboard.vue'),
        },
        {
          path: 'events',
          name: 'user-events',
          component: () => import('@/views/user/Events.vue'),
        },
        {
          path: 'announcements',
          name: 'user-announcements',
          component: () => import('@/views/user/Announcements.vue'),
        },
        {
          path: 'profile',
          name: 'user-profile',
          component: () => import('@/views/user/Profile.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRoles = JSON.parse(localStorage.getItem('userRoles') || '[]')

  if (!token) {
    if (to.meta.requiresAdmin || to.meta.requiresUser) {
      return next('/login')
    }
    return next()
  }

  // User is authenticated
  if (to.meta.requiresAdmin && !userRoles.includes('admin')) {
    return next('/login')
  }
  if (to.meta.requiresUser && !userRoles.includes('user')) {
    return next('/login')
  }
  if (to.meta.guestOnly) {
    if (userRoles.includes('admin')) {
      return next('/admin/dashboard')
    } else if (userRoles.includes('user')) {
      return next('/user/dashboard')
    }
  }

  next()
})

export default router
