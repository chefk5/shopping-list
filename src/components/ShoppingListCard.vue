<script setup lang="ts">
import AddIcon from '@/assets/Icons/AddIcon.vue'
import { useShoppingListsCounter } from '@/stores/shoppingLists'
import type { ShoppingListItem } from '@/types'
import { ref } from 'vue'
import Button from './common/Button.vue'

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

      <Button
        variant="primary"
        type="submit"
        aria-label="Add Item"
        :on-click="() => store.editItemInShoppingList(props.shoppingListId, item.id, item.itemName)"
        btn-text="Add Item"
        styles="inline-flex items-center gap-2 h-10"
      >
        <AddIcon />
      </Button>
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

              <Button
                variant="success"
                :on-click="
                  () => store.editItemInShoppingList(props.shoppingListId, item.id, item.itemName)
                "
                btn-text="Save"
              />
            </div>
          </div>

          <div class="flex items-center gap-3">
            <Button
              v-if="!item.isEditing"
              variant="warning"
              :on-click="() => store.setIsEditing(props.shoppingListId, item.id, true)"
              btn-text="Edit"
            />
            <Button
              v-else
              variant="warning"
              :on-click="() => store.setIsEditing(props.shoppingListId, item.id, false)"
              btn-text="Cancel"
            />
            <Button
              variant="danger"
              :on-click="() => store.deleteItemInShoppingList(props.shoppingListId, item.id)"
              btn-text="Delete"
            />
          </div>
        </li>
      </ul>

      <div v-if="shoppingListItems.length === 0" class="mt-6 text-center text-gray-500">
        No items yet — add something to get started.
      </div>
    </section>
  </main>
</template>
