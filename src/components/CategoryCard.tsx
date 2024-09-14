import React from 'react';

const CategoryList: React.FC = () => {
  return (
    <div className="category-list">
      <CategoryCard title={"test"} description={"resr"} />
      <CategoryCard title={"test"} description={"resr"} />
      <CategoryCard title={"test"} description={"resr"} />
      <CategoryCard title={"test"} description={"resr"} />
    </div>
  );
};

const CategoryCard: React.FC<{ title: string, description: string }> = ({ title, description }) => {
  return (
    <div className="category-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CategoryList;