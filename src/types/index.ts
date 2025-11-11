export interface ShoppingListItem {
  id: string
  itemName: string
  isEditing: boolean
  isEdited: boolean
}

export interface ShoppingList {
  id: string
  name: string
  items: ShoppingListItem[]
}
