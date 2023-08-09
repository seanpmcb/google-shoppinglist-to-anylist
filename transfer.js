const { google } = require("googleapis");
const anylist = require("anylist");
const os = require("os");

const getShoppingListItems = async (shoppingListId) => {
  const service = google.googleShopping({
    version: "v1",
    credentials: os.getenv("GOOGLE_APPLICATION_CREDENTIALS"),
  });

  const request = service.shoppingLists().get(id=shoppingListId);
  const response = await request.execute();

  return response["items"];
};

const addItemsToList = async (listId, items) => {
  const client = anylist.ApiClient();
  const api = client.api();

  for (const item of items) {
    const request = api.lists().addItem(listId=list_id, text=item);
    const response = await request.execute();
  }
};

const deleteShoppingListItems = async (shoppingListId, itemIds) => {
  const service = google.googleShopping({
    version: "v1",
    credentials: os.getenv("GOOGLE_APPLICATION_CREDENTIALS"),
  });

  const request = service.shoppingLists().deleteItems(
    id=shoppingListId,
    itemIds=itemIds
  );
  await request.execute();
};

const main = async () => {
  const shoppingListId = "YOUR_SHOPPING_LIST_ID";
  const listId = "YOUR_ANYLIST_LIST_ID";

  const items = await getShoppingListItems(shoppingListId);
  await addItemsToList(listId, items);
  await deleteShoppingListItems(shoppingListId, [item["id"] for item in items]);
};

main();
