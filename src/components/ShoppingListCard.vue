<script setup lang="ts">
import { useShoppingListsCounter } from '@/stores/shoppingLists'
import type { ShoppingListItem } from '@/types'
import { ref } from 'vue'

const store = useShoppingListsCounter()
const itemText = ref('')

const props = defineProps<{
  shoppingListItems: ShoppingListItem[]
  shoppingListName: string
  shoppingListId: string
}>()

const onAddItem = () => {
  store.addItemToShoppingList(props.shoppingListId, itemText.value)
  itemText.value = ''
}
</script>

<template>
  <main class="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
    <header class="mb-4">
      <h1 class="text-2xl font-semibold text-gray-800">
        My Shopping List {{ props.shoppingListName }}
      </h1>
    </header>

    <form @submit.prevent="onAddItem" class="flex gap-3 items-center mb-6">
      <label for="new-item" class="sr-only">New item</label>
      <input
        id="new-item"
        type="text"
        placeholder="Add an item (press Enter to submit)"
        class="flex-1 border border-gray-200 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        v-model="itemText"
        autocomplete="off"
      />

      <button
        type="submit"
        class="inline-flex items-center gap-2 h-10 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm"
        aria-label="Add item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add
      </button>
    </form>

    <section>
      <ul class="space-y-3 -mx-6">
        <li
          v-for="item in shoppingListItems"
          :key="item.id"
          class="flex items-center justify-between gap-3 border border-gray-100 hover:shadow-sm transition"
        >
          <div class="flex-1 min-w-0">
            <div v-if="!item.isEditing" class="flex items-center gap-3 px-6">
              <span class="truncate text-gray-800">{{ item.itemName }}</span>
              <span v-if="item.isEdited" class="ml-2 text-xs text-green-600">edited</span>
            </div>

            <div v-else class="flex items-center gap-3">
              <input
                type="text"
                class="flex-1 border border-gray-200 rounded-md px-2 py-1 focus:outline-none"
                v-model="item.itemName"
              />
              <button
                type="button"
                @click="store.editItemInShoppingList(props.shoppingListId, item.id, item.itemName)"
                class="text-sm bg-green-100 px-3 p-3"
              >
                Save
              </button>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              v-if="!item.isEditing"
              type="button"
              :aria-label="`Edit item: ${item.itemName}`"
              class="text-sm text-yellow-700 bg-yellow-100 p-3 hover:bg-yellow-200"
              @click="store.setIsEditing(props.shoppingListId, item.id, true)"
            >
              Edit
            </button>
            <button
              v-else
              type="button"
              aria-label="Cancel editing"
              class="text-sm text-gray-700 bg-gray-100 p-3 hover:bg-gray-200"
              @click="store.setIsEditing(props.shoppingListId, item.id, false)"
            >
              Cancel
            </button>

            <button
              type="button"
              class="text-sm text-red-700 bg-red-100 p-3 hover:bg-red-200"
              @click="store.deleteItemInShoppingList(props.shoppingListId, item.id)"
              aria-label="Delete item"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>

      <div v-if="shoppingListItems.length === 0" class="mt-6 text-center text-gray-500">
        No items yet — add something to get started.
      </div>
    </section>
  </main>
</template>
