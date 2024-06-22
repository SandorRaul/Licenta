import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./filters.css";

const Sweat = () => {
  const { id } = useParams(); // Extrage ID-ul din URL
  const [products, setProducts] = useState([]); // Starea pentru produse
  const [filters, setFilters] = useState({});
  const [elements, setElements] = useState([]);
  const [savedWords, setSavedWords] = useState([]);

  useEffect(() => {
    const words = JSON.parse(localStorage.getItem("previousWords"));
    console.log("Cuvintele primite: ", words);

    setSavedWords(words);
  }, []);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await fetch(`/getelements/hoodie`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          const initialFilters = Object.keys(data).reduce(
            (acc, key) => ({ ...acc, [key]: [] }),
            {}
          );
          setElements(data);
        } else {
          console.log("No elements data available");
        }
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    fetchElements();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/getproductshoodie/hoodie`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          console.log("no data available");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [id]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevState) => {
      const updatedFilter = prevState[filterType] ? prevState[filterType] : [];
      return {
        ...prevState,
        [filterType]: updatedFilter.includes(value)
          ? updatedFilter.filter((item) => item !== value)
          : [...updatedFilter, value],
      };
    });
  };

  const filteredProducts = products.filter((product) =>
    Object.keys(filters).every((filterType) => {
      if (filterType === "size") {
        // Pentru filtrele de tip 'size', verifica dacă produsul are marimea selectata disponibila
        return filters.size.every(
          (size) => product.size[size] && product.size[size] > 0
        );
      }
      // Pentru celelalte tipuri de filtre, pastreaza logica existenta
      return (
        filters[filterType].length === 0 ||
        filters[filterType].includes(product[filterType])
      );
    })
  );

  useEffect(() => {
    if (
      Object.keys(elements).length > 0 &&
      Array.isArray(savedWords) &&
      savedWords.length > 0
    ) {
      const newFilters = { ...filters };
      Object.keys(elements)
        .slice(2, -1)
        .forEach((filterType) => {
          savedWords.forEach((word) => {
            if (
              Array.isArray(elements[filterType]) &&
              elements[filterType].includes(word)
            ) {
              if (!newFilters[filterType]) {
                newFilters[filterType] = [];
              }
              if (!newFilters[filterType].includes(word)) {
                newFilters[filterType].push(word);
              }
            }
          });
        });
      setFilters(newFilters);

      setTimeout(() => {
        localStorage.removeItem("previousWords");
      }, 1000);
    }
  }, [elements, savedWords]);

  return (
    <section>
      <div className="container">
        <div className="filters">
          <h2>Filters</h2>
          {Object.keys(elements)
            .slice(2, -1)
            .map((filterType) => (
              <div key={filterType}>
                <h2>
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </h2>
                <ul>
                  {Array.isArray(elements[filterType])
                    ? elements[filterType].map((value) => (
                        <li key={value}>
                          <input
                            type="checkbox"
                            name={filterType}
                            id={`${filterType}-${value}`}
                            onChange={() =>
                              handleFilterChange(filterType, value)
                            }
                            checked={filters[filterType]?.includes(value)}
                          />
                          <label htmlFor={`${filterType}-${value}`}>
                            {value}
                          </label>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            ))}
        </div>

        <div className="products">
          {filteredProducts.map((product) => (
            <NavLink
              to={`/getproductsone/${product.code}`}
              className="product-link"
            >
              <div className="product-card">
                <div className="product-info">
                  <h3>{product.title.longTitle}</h3>
                  <div className="rating">
                    <img src={product.url} alt="productitem" />
                  </div>
                  <p className="price">{product.price} RON</p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sweat;
