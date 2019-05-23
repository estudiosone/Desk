interface InventoryItemData {
  Name: string;
  Description: string;
  Presentation: string;
  Brand: string;
  Category: string;
  Tags: string[];
}
export interface InventoryItem {
  Id: string;
  Data: InventoryItemData;
}
