import categories from "../data/categories.js";

export const getCategories = (req, res) => {
  res.json(categories);
};

export const createCategory = (req, res) => {
  const { name, type } = req.body;

  if (!name || !type)
    return res.status(400).json({ message: "Name & type required" });

  const newCat = {
    id: categories.length + 1,
    name,
    type
  };

  categories.push(newCat);

  res.json(newCat);
};

export const deleteCategory = (req, res) => {
  const id = Number(req.params.id);
  const idx = categories.findIndex(c => c.id === id);

  if (idx === -1)
    return res.status(404).json({ message: "Category not found" });

  categories.splice(idx, 1);

  res.json({ message: "Category deleted" });
};
