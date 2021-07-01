import { Fragment, useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import api from '../../../services/api';
import Divider from '../../shared/Divider/Divider';
import QuantityControl from '../../shared/QuantityControl/QuantityControl';
import ProductItem from '../../shared/ProductItem/ProdcutItem';
import useGetAllProducts from '../../shared/Hooks/useGetAllProducts';
import { CartContext } from '../../shared/Contexts/CartContext';
import './productDetail.scss';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import FullPageLoader from '../../shared/Loaders/FullPageLoader';
import BottomMobilePrice from './BottomMobilePrice';

function ProductDetailed(props) {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        price: 0,
        description: '',
        images: [],
        quantity: 10,
    });
    const [currentImage, setCurrentImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    // Fetch similar products
    const similarProducts = useGetAllProducts().filter(
        (item) => item.category === product.category && item.id !== product.id
    );
    const { cartItems, addProduct, increase, decrease } =
        useContext(CartContext);

    const isInCart = (product) => {
        return !!cartItems.find((item) => item.id === product.id);
    };

    // Fetch product by id based on route params
    useEffect(() => {
        const { id } = props.match.params;
        api.product.getById(id).then((snapshot) => {
            const product = snapshot.val();
            product.id = id;
            setProduct(product);
        });
    }, [props.match.params.id]);

    useEffect(() => {
        setCurrentImage(product.thumbnail);
        // Set the title of document to the name of the product for
        document.title = `${product.name} | HyGenie`;
    }, [product]);

    const shareUrl = window.location.href;
    const { images = [] } = product;
    // if product is in cart, fetch quanitiy from cart
    useEffect(() => {
        console.log('CART', cartItems);
        if (isInCart(product)) {
            const { quantity } = cartItems.find(
                (item) => item.id === product.id
            );
            setProduct({ ...product, quantity });
        }
    }, [cartItems]);

    const handleQuantityChange = (quantity) => {
        if (product.id) {
            setQuantity((prevQuantity) => {
                // prevQuantity < quantity ? increase(product) : decrease(product);
                return quantity;
            });
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
                                Quantity
                            </p>
                            <QuantityControl onChange={handleQuantityChange} />
                            <button
                                onClick={(e) => props.history.push('/checkout')}
                                className="product-detailed_details_btn"
                            >
                                Checkout
                            </button>
                        </div>
                    </section>
                    <section className="product-detailed_similar_section">
                        <h4 className="product-detailed_details_name">
                            Similar products
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
                    <BottomMobilePrice price={product.price} />
                </div>
            ) : (
                <FullPageLoader />
            )}
        </Fragment>
    );
}

export default withRouter(ProductDetailed);
