<script setup lang="ts">
import { useShoppingListsCounter } from '@/stores/shoppingLists'
import ShoppingListCard from '@/components/ShoppingListCard.vue'
const store = useShoppingListsCounter()
</script>

<template>
  <div class="bg-background min-h-[calc(100vh-4rem)]">
    <div
      v-if="store.shoppingLists.length === 0"
      class="flex flex-col items-center justify-center text-center text-gray-500 min-h-[calc(100vh-4rem)]"
    >
      <p class="mb-6">No shopping lists yet. Add one to get started.</p>
      <button
        @click="store.addShoppingList('test')"
        class="flex items-center justify-center py-2 px-4 bg-success text-white rounded-md"
      >
        Add list
      </button>
    </div>

    <!-- Shopping Lists View -->
    <div v-else class="py-12 px-4">
      <div class="mb-6" v-for="shoppingList in store.shoppingLists" :key="shoppingList.id">
        <ShoppingListCard
          :shopping-list-items="shoppingList.items"
          :shopping-list-name="shoppingList.name"
          :shopping-list-id="shoppingList.id"
        />
      </div>
      <div class="flex justify-center mt-8">
        <button
          @click="store.addShoppingList('test')"
          class="flex items-center justify-center py-2 px-4 bg-success text-white rounded-md"
        >
          Add list
        </button>
      </div>
    </div>
  </div>
</template>
