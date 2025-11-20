<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-50 via-orange-50 to-white py-8 px-2"
  >
    <div
      class="w-2/3 flex flex-row tablet:max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      <div
        class="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 relative p-10 min-h-96"
      >
        <div class="absolute inset-0 opacity-20 pointer-events-none z-0">
          <svg class="w-full h-full" viewBox="0 0 400 400">
            <circle cx="140" cy="120" r="150" fill="#ffedd5" />
            <circle cx="330" cy="320" r="170" fill="#fef3c7" />
          </svg>
        </div>
        <div class="relative z-10 text-center">
          <h2 class="text-4xl font-bold mb-2 text-white">Hello, welcome!</h2>
          <p class="text-teal-50 text-base max-w-xs mb-3">Hopia, Mani, Popcorn, Tuna, etc.</p>
        </div>
      </div>
      <div class="flex-1 flex justify-center items-center p-6 phone:p-8 tablet:p-12">
        <div class="w-full justify-center items-center max-w-sm">
          <div class="mb-8 flex justify-center">
            <img
              src="@/assets/images/logo/logo.png"
              alt="AimISU Logo"
              class="h-17 tablet:h-30 object-contain"
            />
          </div>
          <form class="space-y-5 tablet:space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block text-sm font-medium text-teal-700 mb-1">
                Email Address
              </label>
              <input
                v-model="email"
                id="email"
                type="email"
                required
                class="block w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-teal-700 mb-1">
                Password
              </label>
              <input
                v-model="password"
                id="password"
                type="password"
                required
                class="block w-full px-4 py-3 border border-orange-200 rounded-xl bg-orange-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
                placeholder="Your Password"
              />
            </div>
            <div v-if="errorMessage" class="p-3 bg-orange-100 border border-orange-200 rounded-lg">
              <p class="text-orange-700 text-xs">{{ errorMessage }}</p>
            </div>
            <div class="flex items-center justify-between text-xs tablet:text-sm gap-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="w-4 h-4 text-orange-400 border-orange-200 rounded focus:ring-orange-400"
                />
                <span class="ml-2 text-teal-700">Remember me</span>
              </label>
              <router-link
                to="/forgot-password"
                class="font-medium text-orange-500 hover:text-orange-600 whitespace-nowrap"
              >
                Forgot password?
              </router-link>
            </div>
            <button
              type="submit"
              class="w-full border-0 bg-gradient-to-r from-teal-400 to-orange-400 text-white font-bold rounded-xl px-6 phone:px-8 py-3 text-sm tablet:text-base shadow-lg hover:from-teal-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all"
            >
              Sign In
            </button>
          </form>
          <div class="mt-6 text-center text-xs tablet:text-sm">
            <p class="text-teal-700">
              Don't have an account?
              <router-link to="/register" class="font-medium text-orange-500 hover:text-orange-700">
                Sign up
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/axios.js'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    login() {
      api
        .post('/login', {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          // It's already data, not response
          console.log('Login data:', data)

          if (!data) {
            throw new Error('No data received from server')
          }

          const { token, roles, user } = data

          if (!token) {
            throw new Error('No token received from server')
          }

          localStorage.setItem('token', token)
          localStorage.setItem('userRoles', JSON.stringify(roles || []))
          localStorage.setItem('user_data', JSON.stringify(user))

          if (roles && roles.includes('admin')) {
            console.log('Redirect to admin dashboard')
            this.$router.push('/admin/dashboard')
          } else {
            this.$router.push('/user/dashboard')
          }
        })
        .catch((error) => {
          console.error('Login error:', error)
          this.errorMessage =
            error.response?.data?.message || error.message || 'Login failed. Please try again.'
        })
    },
  },
}
</script>
