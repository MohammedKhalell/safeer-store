import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/wishlistSlice";
import { toggleCart } from "../../store/cartSlice";
import { toggleCompare } from "../../store/compareSlice";
import { RootState } from "../../store/store";
import "./ProductCard.scss";

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  discount: number;
  rating: number;
  isNew?: boolean;
  colors: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  image,
  originalPrice,
  discount,
  rating,
  isNew,
  colors,
}) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const defaultImage = "/placeholder.png";

  const isInWishlist = useSelector((state: RootState) =>
    state.wishlist.items.includes(id)
  );
  const isInCompare = useSelector((state: RootState) =>
    state.compare.items.includes(id)
  );
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some((item) => item.id === id)
  );

  // Calculate the final price from originalPrice and discount
  const calculatedPrice =
    discount > 0
      ? originalPrice - originalPrice * (discount / 100)
      : originalPrice;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleWishlistClick = () => {
    dispatch(toggleWishlist(id));
  };

  const handleCompareClick = () => {
    dispatch(toggleCompare(id));
  };

  const handleCartClick = () => {
    dispatch(toggleCart(id));
  };

  return (
    <div className="product-card">
      <div className="product-image">
        {isNew && <span className="new-badge">New</span>}
        <button
          className={`wishlist-button ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isInWishlist ? "currentColor" : "none"}
            className="wishlist-icon"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <img
          src={imageError ? defaultImage : image}
          alt={name}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <div className="colors-section">
          {colors.map((color, index) => (
            <span
              key={index}
              className="color-dot"
              style={{ backgroundColor: color }}
              title={`Color option ${index + 1}`}
            />
          ))}
        </div>
        <div className="price-section">
          <div className="price-info">
            <span className="current-price">
              {calculatedPrice.toFixed(2)} JD
            </span>
            {discount > 0 && (
              <>
                <span className="original-price">
                  {originalPrice.toFixed(2)} 
                </span>
                <span className="discount">{discount}% Off</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="product-actions">
        <button
          className={`quick-view ${isInCompare ? 'active' : ''}`}
          onClick={handleCompareClick}
          aria-label="Compare"
        >
          <svg width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3137 15.8253C12.1529 15.8253 11.9921 15.7661 11.8651 15.6391C11.6197 15.3937 11.6197 14.9874 11.8651 14.7419L14.4381 12.169C14.6836 11.9235 15.0898 11.9235 15.3353 12.169C15.5807 12.4144 15.5807 12.8207 15.3353 13.0661L12.7623 15.6391C12.6438 15.7576 12.483 15.8253 12.3137 15.8253Z" />
            <path d="M14.8867 13.2522H6.16054C5.81353 13.2522 5.52576 12.9645 5.52576 12.6175C5.52576 12.2704 5.81353 11.9827 6.16054 11.9827H14.8867C15.2337 11.9827 15.5215 12.2704 15.5215 12.6175C15.5215 12.9645 15.2422 13.2522 14.8867 13.2522Z" />
            <path d="M6.16917 10.1714C6.00835 10.1714 5.84754 10.1121 5.72059 9.98518C5.47514 9.73973 5.47514 9.33347 5.72059 9.08802L8.29356 6.51502C8.53901 6.26957 8.94529 6.26957 9.19074 6.51502C9.43619 6.76047 9.43619 7.16676 9.19074 7.41221L6.61775 9.98518C6.49079 10.1121 6.32998 10.1714 6.16917 10.1714Z" />
            <path d="M14.8867 10.1714H6.16054C5.81353 10.1714 5.52576 9.88366 5.52576 9.53664C5.52576 9.18962 5.81353 8.90186 6.16054 8.90186H14.8867C15.2337 8.90186 15.5215 9.18962 15.5215 9.53664C15.5215 9.88366 15.2422 10.1714 14.8867 10.1714Z" />
            <path d="M10.528 20.1757C5.50899 20.1757 1.42944 16.0961 1.42944 11.0771C1.42944 6.05806 5.50899 1.97852 10.528 1.97852C15.547 1.97852 19.6266 6.05806 19.6266 11.0771C19.6266 16.0961 15.547 20.1757 10.528 20.1757ZM10.528 3.24808C6.21148 3.24808 2.69901 6.76055 2.69901 11.0771C2.69901 15.3936 6.21148 18.9061 10.528 18.9061C14.8445 18.9061 18.357 15.3936 18.357 11.0771C18.357 6.76055 14.8445 3.24808 10.528 3.24808Z" />
          </svg>
        </button>
        <button
          className={`add-to-cart ${isInCart ? 'active' : ''}`}
          onClick={handleCartClick}
          aria-label="Add to cart"
        >
          <svg width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.49076 6.3204C4.32995 6.3204 4.16067 6.25269 4.04218 6.13419C3.79673 5.88874 3.79673 5.48248 4.04218 5.23703L7.11453 2.16468C7.35998 1.91923 7.76625 1.91923 8.0117 2.16468C8.25715 2.41013 8.25715 2.81639 8.0117 3.06184L4.93934 6.13419C4.81238 6.25269 4.65157 6.3204 4.49076 6.3204Z" />
            <path d="M16.0184 6.3204C15.8576 6.3204 15.6968 6.26115 15.5699 6.13419L12.4975 3.06184C12.2521 2.81639 12.2521 2.41013 12.4975 2.16468C12.743 1.91923 13.1492 1.91923 13.3947 2.16468L16.467 5.23703C16.7125 5.48248 16.7125 5.88874 16.467 6.13419C16.3485 6.25269 16.1793 6.3204 16.0184 6.3204Z" />
            <path d="M17.2034 9.89214C17.1442 9.89214 17.0849 9.89214 17.0257 9.89214H16.831H3.48361C2.89114 9.90061 2.21404 9.90061 1.72314 9.40971C1.33381 9.02884 1.15607 8.43637 1.15607 7.5646C1.15607 5.23706 2.85729 5.23706 3.66981 5.23706H16.8395C17.652 5.23706 19.3532 5.23706 19.3532 7.5646C19.3532 8.44484 19.1755 9.02884 18.7861 9.40971C18.346 9.84982 17.7535 9.89214 17.2034 9.89214ZM3.66981 8.62258H17.0341C17.415 8.63104 17.7705 8.63104 17.889 8.51255C17.9482 8.4533 18.0752 8.25017 18.0752 7.5646C18.0752 6.60819 17.8382 6.50663 16.831 6.50663H3.66981C2.66262 6.50663 2.42563 6.60819 2.42563 7.5646C2.42563 8.25017 2.56106 8.4533 2.61184 8.51255C2.73033 8.62258 3.09427 8.62258 3.46668 8.62258H3.66981Z" />
            <path d="M8.35872 16.4092C8.01171 16.4092 7.72394 16.1215 7.72394 15.7744V12.7698C7.72394 12.4228 8.01171 12.135 8.35872 12.135C8.70574 12.135 8.99351 12.4228 8.99351 12.7698V15.7744C8.99351 16.1299 8.70574 16.4092 8.35872 16.4092Z" />
            <path d="M12.2521 16.4092C11.9051 16.4092 11.6173 16.1215 11.6173 15.7744V12.7698C11.6173 12.4228 11.9051 12.135 12.2521 12.135C12.5991 12.135 12.8869 12.4228 12.8869 12.7698V15.7744C12.8869 16.1299 12.5991 16.4092 12.2521 16.4092Z" />
            <path d="M12.7006 20.1756H7.59698C4.56694 20.1756 3.88984 18.3728 3.62746 16.807L2.43407 9.48587C2.37482 9.13885 2.61181 8.81723 2.95883 8.75798C3.30584 8.69874 3.62746 8.93572 3.68671 9.28274L4.8801 16.5954C5.12555 18.0935 5.63338 18.9061 7.59698 18.9061H12.7006C14.8758 18.9061 15.1213 18.1443 15.4006 16.6716L16.8225 9.26581C16.8902 8.9188 17.2203 8.69027 17.5673 8.76645C17.9143 8.83416 18.1344 9.16425 18.0667 9.51126L16.6448 16.9171C16.3147 18.6352 15.7645 20.1756 12.7006 20.1756Z" />
          </svg>
        </button>
        <div className="rating">
          <img src="/icons/star.svg" alt="star" />
          <span className="rating-value">{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
