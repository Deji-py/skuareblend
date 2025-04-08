import { deleteObject, listAll } from "firebase/storage";

export const deleteAllFilesInStorageRef = async (storageRef) => {
  try {
    const files = await listAll(storageRef);

    const deletePromises = files.items.map(async (item) => {
      console.log(item.name);
      await deleteObject(item);
    });

    await Promise.all(deletePromises);

    console.log("All files deleted successfully");
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};
