import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  description: string;
  attributes: string[];
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    // Fetch categories from the server
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/category/all', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Category[] = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-list">
      
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.name}
          description={category.description}
        />
      ))}
    </div>
  );
};

const CategoryCard: React.FC<{ title: string, description: string }> = ({ title, description }) => {
  return (
    <div className="category-card " onClick={()=>window.location.href=`/all?fromValue=10&toValue=10000&categories=${title}&currentPage=0`}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CategoryList;
