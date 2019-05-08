type InventoryItemData = {
  Name: string,
  Description: string,
  Presentation: string,
  Brand: string,
  Category: string,
  Tags: string[],
}
export type InventoryItem = {
  Id: string,
  Data: InventoryItemData,
}