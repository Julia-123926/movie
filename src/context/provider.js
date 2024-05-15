/* eslint-disable react/jsx-no-constructed-context-values */

import { useState } from 'react';

import CategoryContext from '.';

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  return <CategoryContext.Provider value={[categories, setCategories]}>{children}</CategoryContext.Provider>;
};

export default CategoriesProvider;
