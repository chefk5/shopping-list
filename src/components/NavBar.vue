<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import { useRoute } from 'vue-router'

const route = useRoute()

const { data, error } = useFetch('...')
</script>

<template>
  <nav class="sticky top-0 z-10 flex justify-center p-4 gap-3 bg-gray-800 text-white">
    <router-link
      :class="[
        'px-4 py-2 rounded transition-colors',
        route.path === '/'
          ? 'bg-gray-600 font-semibold hover:bg-gray-700'
          : 'text-gray-300 hover:text-white hover:bg-gray-600',
      ]"
      to="/"
    >
      Home
    </router-link>
    <router-link
      :class="[
        'px-4 py-2 rounded transition-colors',
        route.path === '/settings'
          ? 'bg-gray-600 font-semibold hover:bg-gray-700'
          : 'text-gray-300 hover:text-white hover:bg-gray-600',
      ]"
      to="/settings"
    >
      Settings
    </router-link>
  </nav>
</template>
