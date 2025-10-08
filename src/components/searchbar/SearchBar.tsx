import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import "./SearchBar.scss";
import type { Product } from "../../types/products";

function SearchBar() {
  const [query, setQuery] = useState<string>("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchAllProducts = async (): Promise<void> => {
      setLoading(true);
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        if (!res.ok) throw new Error("Error fetching products");
        const data: Product[] = await res.json();
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

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allProducts.filter((product) =>
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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
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
              <li key={item.id}>
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
