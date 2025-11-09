<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  item: string
  id: number
  isEditing: boolean
  isEdited: boolean
}

const itemText = ref('')
const items = ref<Item[]>([])

const idGenerator = (() => {
  let id = 0
  return () => ++id
})()

const addItem = () => {
  const text = itemText.value.trim()
  if (text) {
    items.value.push({ item: text, isEdited: false, isEditing: false, id: idGenerator() })
    itemText.value = ''
  }
}

const deleteItem = (id: number) => {
  const target = items.value.find(i => i.id === id)
  if (!target) return
    items.value = items.value.filter((item) => item.id !== id)
}

const onClickEdit = (id: number) => {
  items.value = items.value.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
}

const editItem = (id: number, updatedItem: string) => {
  items.value = items.value.map((item) => {
    if (item.id === id) {
      return { ...item, item: updatedItem, isEditing: false, isEdited: true }
    }
    return item
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <main class="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <header class="mb-4">
        <h1 class="text-2xl font-semibold text-gray-800">My Shopping List</h1>
        <p class="text-sm text-gray-500 mt-1">{{ items.length }} item(s)</p>
      </header>

      <form @submit.prevent="addItem" class="flex gap-3 items-center mb-6">
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
          class="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm"
          aria-label="Add item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add
        </button>
      </form>

      <section>
        <ul class="space-y-3">
          <li
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between gap-3 p-3 border border-gray-100 rounded-md hover:shadow-sm transition"
          >
            <div class="flex-1 min-w-0">
              <div v-if="!item.isEditing" class="flex items-center gap-3">
                <span class="truncate text-gray-800">{{ item.item }}</span>
                <span v-if="item.isEdited" class="ml-2 text-xs text-green-600">edited</span>
              </div>

              <div v-else class="flex items-center gap-3">
                <input
                  type="text"
                  class="flex-1 border border-gray-200 rounded-md px-2 py-1 focus:outline-none"
                  v-model="item.item"
                />
                <button type="button" @click="editItem(item.id, item.item)" class="text-sm bg-green-100 px-3 py-1 rounded-md">
                  Save
                </button>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="text-sm text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md hover:bg-yellow-200"
                @click="onClickEdit(item.id)"
                aria-label="Edit item"
              >
                Edit
              </button>

              <button
                type="button"
                class="text-sm text-red-700 bg-red-100 px-2 py-1 rounded-md hover:bg-red-200"
                @click="deleteItem(item.id)"
                aria-label="Delete item"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>

        <div v-if="items.length === 0" class="mt-6 text-center text-gray-500">
          No items yet — add something to get started.
        </div>
      </section>
    </main>
  </div>
</template>
