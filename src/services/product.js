import nedb from "nedb-promises";
import { getFormattedDateTime } from "../utils/date.js";

const database = new nedb({ filename: "product.db", autoload: true });

const defaultProducts = [
  {
    title: "Bryggkaffe",
    desc: "Bryggd på månadens bönor.",
    price: 39,
    createdAt: getFormattedDateTime(),
  },
  {
    title: "Caffè Doppio",
    desc: "Bryggd på månadens bönor.",
    price: 49,
    createdAt: getFormattedDateTime(),
  },
  {
    title: "Cappuccino",
    desc: "Bryggd på månadens bönor.",
    price: 49,
    createdAt: getFormattedDateTime(),
  },
  {
    title: "Latte Macchiato",
    desc: "Bryggd på månadens bönor.",
    price: 49,
    createdAt: getFormattedDateTime(),
  },
  {
    title: "Kaffe Latte",
    desc: "Bryggd på månadens bönor.",
    price: 54,
    createdAt: getFormattedDateTime(),
  },
  {
    title: "Cortado",
    desc: "Bryggd på månadens bönor.",
    price: 39,
    createdAt: getFormattedDateTime(),
  },
];

// Initialize database with default data if empty
async function initializeDatabase() {
  try {
    const count = await database.count({});
    if (count === 0) {
      await database.insert(defaultProducts);
      console.log("Default products inserted.");
    }
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
}

const findProductById = async (id) => {
  return await database.findOne({ _id: id });
};

export { initializeDatabase, database, findProductById };
