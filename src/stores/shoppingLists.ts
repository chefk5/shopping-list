import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { ShoppingList, ShoppingListItem } from '@/types'

export const useShoppingListsCounter = defineStore('shoppingLists', () => {
  const shoppingLists = ref<ShoppingList[]>([])

  // Add shopping list
  function addShoppingList(name: string) {
    if (!name.trim()) {
      return
    }
    shoppingLists.value.push({ id: uuidv4(), name: name.trim(), items: [] })
  }

  // Add item to specific shopping list
  function addItemToShoppingList(shoppingListId: string, itemNameToAdd: string) {
    if (!itemNameToAdd.trim()) {
      return
    }
    const selectedShoppingListIndex = shoppingLists.value.findIndex(
      (sl) => sl.id === shoppingListId,
    )
    if (selectedShoppingListIndex === -1) return

    const newItem: ShoppingListItem = {
      id: uuidv4(),
      itemName: itemNameToAdd.trim(),
      isEditing: false,
      isEdited: false,
    }
    shoppingLists.value[selectedShoppingListIndex]?.items.push(newItem)
  }

  // Edit item in specific shopping list
  function editItemInShoppingList(shoppingListId: string, itemId: string, editedItemName: string) {
    const selectedShoppingListIndex = shoppingLists.value.findIndex(
      (sl) => sl.id === shoppingListId,
    )
    if (selectedShoppingListIndex === -1) return

    shoppingLists.value[selectedShoppingListIndex]?.items.forEach((item) => {
      if (item.id === itemId) {
        item.itemName = editedItemName
        item.isEdited = true
        item.isEditing = false
      }
      return item
    })
  }

  // Delete item in specific shopping list
  function deleteItemInShoppingList(shoppingListId: string, itemId: string) {
    const selectedShoppingListIndex = shoppingLists.value.findIndex(
      (sl) => sl.id === shoppingListId,
    )

    if (selectedShoppingListIndex === -1) return

    const selectedShoppingList = shoppingLists.value[selectedShoppingListIndex]

    if (!selectedShoppingList) return

    selectedShoppingList.items = selectedShoppingList.items.filter((item) => item.id !== itemId)
  }

  function setIsEditing(shoppingListId: string, itemId: string, isEditing: boolean) {
    const selectedShoppingListIndex = shoppingLists.value.findIndex(
      (sl) => sl.id === shoppingListId,
    )

    if (selectedShoppingListIndex === -1) {
      return
    }

    const item = shoppingLists.value[selectedShoppingListIndex]?.items.find(
      (item) => item.id === itemId,
    )

    if (item) {
      item.isEditing = isEditing
    }
  }

  return {
    shoppingLists: computed(() => shoppingLists.value),
    addShoppingList,
    addItemToShoppingList,
    editItemInShoppingList,
    deleteItemInShoppingList,
    setIsEditing,
  }
})
