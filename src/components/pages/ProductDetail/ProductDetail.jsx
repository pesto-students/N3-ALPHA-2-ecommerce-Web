import { Fragment, useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { WhatsappIcon, WhatsappShareButton } from 'react-share';
import api from '../../../services/api';
import { CartContext } from '../../shared/Contexts/CartContext';
import Divider from '../../shared/Divider/Divider';
import useGetAllProducts from '../../shared/Hooks/useGetAllProducts';
import FullPageLoader from '../../shared/Loaders/FullPageLoader';
import ProductItem from '../../shared/ProductItem/ProdcutItem';
import BottomMobilePrice from './BottomMobilePrice';
import { useTranslation } from 'react-i18next';
import { toaster } from '../../../helper/Utils';
import './productDetail.scss';

function ProductDetailed(props) {
    const { t } = useTranslation();
    const isAuthenticated = localStorage.userDetails;
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        price: 0,
        description: '',
        images: [],
        quantity: 10,
    });

    const [cartProduct, setCartProduct] = useState({
        id: '',
        name: '',
        img: '',
        quantity: 1,
        price: 0,
    });

    const [currentImage, setCurrentImage] = useState('');

    // Fetch similar products
    const similarProducts = useGetAllProducts().filter(
        (item) => item.category === product.category && item.id !== product.id
    );

    const { cartItems, addProduct, increase, decrease } =
        useContext(CartContext);

    const isInCart = (product) => {
        return !!cartItems.find((item) => item.id === product.id);
    };

    // Fetch product details by id based on route params
    useEffect(() => {
        const { id } = props.match.params;
        api.product.getById(id).then((snapshot) => {
            const product = snapshot.val();
            if (product) {
                product.id = id;
                setProduct(product);
                window.scrollTo(0, 0);
            } else {
                props.history.push('/products?category=all');
            }
        });
    }, [props.match.params.id]);

    useEffect(() => {
        setCurrentImage(product.thumbnail);
        // Set the title of document to the name of the product for
        document.title = `${product.name} | HyGenie`;
    }, [product]);

    const shareUrl = window.location.href;
    const { images = [] } = product;

    // fetch product from cart
    useEffect(() => {
        const { id } = props.match.params;

        const cartProduct = cartItems.find((item) => item.id === id);
        if (cartProduct) setCartProduct(cartProduct);
    }, [cartItems]);

    const handleAddProduct = () => {
        const _product = {
            img: `/assets/${product.thumbnail}`,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            id: product.id,
        };
        addProduct(_product);
    };

    const handleClick = (type) => {
        if (type === 'checkout') {
            if (isAuthenticated) {
                props.history.push('/checkout');
            } else {
                toaster('Please login to continue', 3000, 'error');
            }
        } else {
            handleAddProduct();
        }
    };

    return (
        <Fragment>
            {images.length > 0 ? (
                <div className="product-detailed">
                    <section className="product-detailed_product_section">
                        <div className="product-detailed_thumbnails">
                            {product.images.map((image) => (
                                <img
                                    className={`product-detailed_thumbnails_item ${
                                        currentImage === image && 'selected'
                                    }`}
                                    src={`/assets/${image}`}
                                    alt={product.name}
                                    onClick={(e) => setCurrentImage(image)}
                                />
                            ))}
                        </div>
                        <img
                            className="product-detailed_preview"
                            src={`/assets/${currentImage}`}
                            alt={product.name}
                        />
                        <div className="product-detailed_details">
                            <h4 className="product-detailed_details_name">
                                {product.name}
                            </h4>
                            <span className="product-detailed_details_price">
                                <h2 className="product-detailed_details_price_new">
                                    {`₹${product.price}`}
                                    <span>
                                        <del>{`₹${parseInt(
                                            (110 / 100) * product.price
                                        )}`}</del>
                                    </span>{' '}
                                </h2>
                            </span>
                            <p className="product-detailed_details_description">
                                {product.description}
                            </p>
                            <Divider />

                            <p className="product-detailed_details_count">
                                {t('qty_text')}
                            </p>

                            <p className="cartItem_text">
                                <button
                                    className="cartItem_btn"
                                    onClick={() => {
                                        if (isInCart(cartProduct)) {
                                            increase(cartProduct);
                                        } else {
                                            handleAddProduct();
                                        }
                                    }}
                                    title="Increase Quantity"
                                >
                                    +
                                </button>
                                <span className="cartItem_qty">
                                    {cartProduct.quantity}
                                </span>
                                {
                                    <button
                                        className="cartItem_btn"
                                        onClick={() => {
                                            if (cartProduct.quantity < 2)
                                                return;
                                            else decrease(cartProduct);
                                        }}
                                        title="Decrease Quantity"
                                    >
                                        -
                                    </button>
                                }
                            </p>

                            {/* Proceed to checkout if item is in cart else add to cart */}

                            <button
                                className="product-detailed_details_btn"
                                onClick={(e) =>
                                    handleClick(
                                        isInCart(product)
                                            ? 'checkout'
                                            : 'addToCart'
                                    )
                                }
                            >
                                {isInCart(product)
                                    ? t('checkout_text')
                                    : t('addCart_text')}
                            </button>
                        </div>
                    </section>
                    <section className="product-detailed_similar_section">
                        <h4 className="product-detailed_details_name">
                            {t('similar_text')}
                        </h4>
                        <div className="product-detailed_similar_section_products">
                            {similarProducts.map(
                                ({ id, name, thumbnail, price }) => (
                                    <ProductItem
                                        name={name}
                                        id={id}
                                        img={`/assets/${thumbnail}`}
                                        price={price}
                                    />
                                )
                            )}
                        </div>
                    </section>
                    <div className="product-detailed_details_share">
                        <WhatsappShareButton url={shareUrl}>
                            <WhatsappIcon size={55} round={true} />
                        </WhatsappShareButton>
                    </div>
                    <BottomMobilePrice
                        price={product.price}
                        isInCart={isInCart(product)}
                        handleClick={handleClick}
                    />
                </div>
            ) : (
                <FullPageLoader />
            )}
        </Fragment>
    );
}

export default withRouter(ProductDetailed);
