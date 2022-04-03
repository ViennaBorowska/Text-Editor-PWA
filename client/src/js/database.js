import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const postDb = async (id, value) => {
  if (id && value) {
    console.log("Post to the database");

    // Create a connection to the database database and version we want to use.
    const jateDb = await openDB("jate", 1);
    // Create a new transaction and specify the database and data privileges.
    const userText = jateDb.transaction("jate", "readwrite");
    // Open up the desired object store.
    const objStore = userText.objectStore("jate");
    // Use the .add() method on the store and pass in the content.
    const request = objStore.add({ id: id, value: value });
    // Get confirmation of the request.
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  }
  console.error("Post to database not implemented :(");
};

export const getDb = async () => {
  try {
    // Create a connection to the database database and version we want to use.
    const jateDb = await openDB("jate", 1);
    // Create a new transaction and specify the database and data privileges.
    const userText = jateDb.transaction("jate", "readonly");
    // Open up the desired object store.
    const objStore = userText.objectStore("jate");
    // Use the .getAll() method to get all data in the database.
    const request = objStore.getAll();
    // Get confirmation of the request.
    const result = await request;
    console.log("Found results from database", result);
  } catch {
    console.error("getDb not implemented");
  }
};

initdb();
