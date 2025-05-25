// types
import { TestData } from "./types/index";

export const staticData = {
  endpoint: "https://www.google.com/",
  test_static_data: "muzzi",

  updateListInArray: (): TestData => {
    return "muzzi from static data func";
  },
};
