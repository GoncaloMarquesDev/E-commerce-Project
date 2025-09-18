import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import "./SearchBar.scss"

function SearchBar() {
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wrapperRef = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Puxa todos os produtos uma vez ao montar
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!res.ok) throw new Error("Error fetching products");
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Filtra produtos conforme o usuário digita
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setShowDropdown(true);
  }, [query, allProducts]);

  const handleSelect = () => {
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div className="searchbar-container" ref={wrapperRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="search-bar-input"
      />

      {showDropdown && (
        <ul className="searchbar-dropdown">
          {loading && <li>Loading...</li>}
          {error && <li>{error}</li>}
          {!loading && !error && results.length === 0 && (
            <li>No results for "{query}"</li>
          )}
          {!loading &&
            !error &&
            results.map((item) => (
              <li key={item.id} onClick={handleSelect}>
                <Link to={`/detail/${item.id}`} onClick={handleSelect}>
                  {item.title}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
