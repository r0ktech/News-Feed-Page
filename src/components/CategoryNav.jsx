import './CategoryNav.css'

const CategoryNav = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'top-stories', label: 'Top Stories' },
    { id: 'world', label: 'World' },
    { id: 'politics', label: 'Politics' },
    { id: 'business', label: 'Business' },
    { id: 'tech', label: 'Tech' }
  ]

  return (
    <nav className="category-nav">
      <div className="category-nav-container">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default CategoryNav

