import React, { useState, useMemo } from "react";
import ProductCard from "../ProductCard/ProductCard";
import Sidebar from "../Sidebar/Sidebar";
import productData from "../../data/products.json";
import filterOptions from "../../data/filterOptions.json";
import { Pagination } from "./Pagination/pagination"; 
import "./Products.scss";

type FilterSection = "categories" | "discount" | "price" | "rate" | "color";

interface FilterState {
  categories: string[];
  discount: string[];
  price: string[];
  rate: string[];
  color: string[];
}

interface Category {
  id: string;
  label: string;
}

const CATEGORY_MAPPINGS: { [key: string]: string[] } = {
  // Input/Control Devices
  keyboard: ["keyboard", "mouse", "audio"],
  mouse: ["keyboard", "mouse"],

  // Audio & Streaming
  audio: ["audio", "streaming", "webcam"],
  streaming: ["audio", "streaming", "webcam"],
  webcam: ["audio", "streaming", "webcam"],

  // Storage Devices
  storage: ["storage", "hard"],
  hard: ["storage", "hard"],

  // Display Devices
  monitor: ["monitor", "tv"],
  tv: ["monitor", "tv"],

  // Networking
  networking: ["networking", "router"],
  router: ["networking", "router"],

  // Gaming Hardware
  game: ["console", "controller", "vr"],
  console: ["console", "game"],
  controller: ["controller", "game"],
  vr: ["vr", "game"],

  // Computer Components
  processor: ["processor", "motherboard", "memory", "cooling", "power"],
  motherboard: ["processor", "motherboard", "memory", "cooling", "power"],
  memory: ["memory"],
  cooling: ["processor", "motherboard", "memory", "cooling", "power"],
  power: ["processor", "motherboard", "memory", "cooling", "power"],

  // Cases and Accessories
  case: ["case", "cooling"],

  // Laptops and Computers
  laptop: ["laptop", "computer"],
};

const Products: React.FC = () => {
  const productsRef = React.useRef<HTMLDivElement>(null);

  // Add helper function to calculate price
  const calculatePrice = (product: (typeof productData.products)[0]) => {
    return product.discount > 0
      ? product.originalPrice - product.originalPrice * (product.discount / 100)
      : product.originalPrice;
  };

  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    discount: true,
    price: true,
    rate: true,
    color: true,
  });

  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    categories: [],
    discount: [],
    price: [],
    rate: [],
    color: [],
  });

  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
    applied: { min: "", max: "" }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [displayCount, setDisplayCount] = useState(20);

  const toggleSection = (section: FilterSection) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleFilter = (section: keyof FilterState, value: string) => {
    setSelectedFilters((prev) => {
      const currentFilters = prev[section];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter((item) => item !== value)
        : [...currentFilters, value];

      return {
        ...prev,
        [section]: newFilters,
      };
    });
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const resetFilters = () => {
    setSelectedFilters({
      categories: [],
      discount: [],
      price: [],
      rate: [],
      color: [],
    });
    setPriceRange({ min: "", max: "", applied: { min: "", max: "" } });
  };

  const isFilterSelected = (section: keyof FilterState, value: string) => {
    return selectedFilters[section].includes(value);
  };

  const getRelatedCategories = (categoryId: string): string[] => {
    return CATEGORY_MAPPINGS[categoryId] || [categoryId];
  };

  const handlePriceRangeChange = (type: "min" | "max", value: string) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const applyPriceRange = () => {
    setPriceRange(prev => ({
      ...prev,
      applied: { min: prev.min, max: prev.max }
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filteredProducts = useMemo(() => {
    return productData.products.filter((product) => {
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Category filter - Updated to handle related categories
      if (selectedFilters.categories.length > 0) {
        const allowedCategories =
          selectedFilters.categories.flatMap(getRelatedCategories);
        if (!allowedCategories.includes(product.category)) {
          return false;
        }
      }

      // Discount filter
      if (
        selectedFilters.discount.length > 0 &&
        !selectedFilters.discount.includes(product.discount.toString())
      ) {
        return false;
      }

      // Price range filter - Updated to use applied values
      if (priceRange.applied.min && calculatePrice(product) < Number(priceRange.applied.min)) {
        return false;
      }
      if (priceRange.applied.max && calculatePrice(product) > Number(priceRange.applied.max)) {
        return false;
      }

      // Price checkbox filter
      if (selectedFilters.price.length > 0) {
        const price = calculatePrice(product);
        const matchesPrice = selectedFilters.price.some((range) => {
          switch (range) {
            case "under25":
              return price < 25;
            case "25to50":
              return price >= 25 && price <= 50;
            case "50to100":
              return price > 50 && price <= 100;
            case "100to200":
              return price > 100 && price <= 200;
            case "200above":
              return price > 200;
            default:
              return true;
          }
        });
        if (!matchesPrice) return false;
      }

      // Rating filter
      if (selectedFilters.rate.length > 0) {
        const matchesRating = selectedFilters.rate.some(
          (rating) => product.rating >= Number(rating)
        );
        if (!matchesRating) return false;
      }

      // Color filter
      if (selectedFilters.color.length > 0) {
        const productColors = product.colors || [product.colors];
        if (
          !selectedFilters.color.some((color) => productColors.includes(color))
        ) {
          return false;
        }
      }

      return true;
    });
  }, [selectedFilters, priceRange.applied, searchQuery]);

  const sortProducts = (products: typeof productData.products) => {
    switch (sortBy) {
      case "a-z":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case "price-low":
        return [...products].sort(
          (a, b) => calculatePrice(a) - calculatePrice(b)
        );
      case "price-high":
        return [...products].sort(
          (a, b) => calculatePrice(b) - calculatePrice(a)
        );
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    return sortProducts(filteredProducts);
  }, [filteredProducts, sortBy]);

  // Calculate products for current page
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * displayCount;
    const indexOfFirstProduct = indexOfLastProduct - displayCount;
    return filteredAndSortedProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
  }, [currentPage, displayCount, filteredAndSortedProducts]);

  // Split products into rows
  const productRows = useMemo(() => {
    const rows = [];
    const productsPerRow = 4; // Number of products per row

    for (let i = 0; i < currentProducts.length; i += productsPerRow) {
      rows.push(currentProducts.slice(i, i + productsPerRow));
    }

    return rows;
  }, [currentProducts]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / displayCount);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Ensure the scroll happens after the state update and re-render
    setTimeout(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Add this useEffect to listen to search events from header
  React.useEffect(() => {
    const handleHeaderSearch = (event: CustomEvent) => {
      handleSearch(event.detail);
    };
    window.addEventListener(
      "headerSearch",
      handleHeaderSearch as EventListener
    );
    return () => {
      window.removeEventListener(
        "headerSearch",
        handleHeaderSearch as EventListener
      );
    };
  }, []);

  // Update the getCategoryLabel function with proper typing
  const getCategoryLabel = (categoryId: string): string => {
    const category = filterOptions.categories.find(
      (cat: Category) => cat.id === categoryId
    );
    return category ? category.label : categoryId;
  };

  return (
    <section className="products-section" ref={productsRef}>
      <Sidebar
        expandedSections={expandedSections}
        selectedFilters={selectedFilters}
        priceRange={priceRange}
        totalItems={filteredAndSortedProducts.length}
        toggleSection={toggleSection}
        toggleFilter={toggleFilter}
        resetFilters={resetFilters}
        isFilterSelected={isFilterSelected}
        handlePriceRangeChange={handlePriceRangeChange}
        applyPriceRange={applyPriceRange}
      />

      <div className="main-content">
        <div className="products-controls">
          <div className="sort-section">
            <span className="control-label">Sort By</span>
            <div className="select-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="a-z">A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            <span className="control-label">Display</span>
            <div className="select-wrapper">
              <select
                value={displayCount}
                onChange={(e) => {
                  setDisplayCount(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
          <div className="display-section">
            <div className="view-options">
              <button className="view-button grid-view active">
              <img src="/icons/element-3.svg" alt="element-3" />

              </button>
              <button className="view-button list-view">
              <img src="/icons/row-vertical.svg" alt="row-vertical" />

              </button>
            </div>
          </div>
        </div>

        <div className="products-grid">
          {productRows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  colors={product.colors || ["#000000"]}
                />
              ))}

              {/* Always show banner after first row, regardless of filter results */}
              {rowIndex === 0 && (
                <div className="discount-banner-wrapper">
                  <div className="discount-banner">
                    <div className="banner-content">
                      <h2>
                        {selectedFilters.categories.length > 0
                          ? getCategoryLabel(selectedFilters.categories[0])
                          : "COMPUTERS"}
                      </h2>
                      <p>50% OFF</p>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* Show banner even when no products */}
          {productRows.length === 0 && (
            <div className="discount-banner-wrapper">
              <div className="discount-banner">
                <div className="banner-content">
                  <h2>
                    {selectedFilters.categories.length > 0
                      ? getCategoryLabel(selectedFilters.categories[0])
                      : "COMPUTERS"}
                  </h2>
                  <p>50% OFF</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {totalPages > 0 && (
          <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        )}
      </div>
    </section>
  );
};

export default Products;
