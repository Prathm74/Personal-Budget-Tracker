import { categories } from "../data/categories.js";

export const getCategories = (req, res) => {
  res.json(categories);
};

export const addCategory = (req, res) => {
  const { name, type } = req.body;

  const newCategory = {
    id: categories.length + 1,
    name,
    type,
  };

  categories.push(newCategory);

  res.json(newCategory);
};
