import { Collapse, Steps } from 'antd';
import qs from 'query-string';
import { useContext, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getFormattedDate } from '../../../helper/Utils';
import { CartContext } from '../../shared/Contexts/CartContext';
import './orderHistory.scss';

const { Step } = Steps;

function OrderHistory(props) {
    const { orders } = props;
    const { clearCart } = useContext(CartContext);

    useEffect(() => {
        // clear cart when redirected successully from checkout
        const { checkout } = qs.parse(window.location.search);
        if (checkout && checkout === 'true') {
            clearCart();
        }
    }, [clearCart]);

    const { Panel } = Collapse;

    return (
        <div className="order-history">
            {!orders.length ? (
                <div className="order-history_empty-state">
                    <img
                        className="order-history_empty-state_image"
                        src="/orders.svg"
                        alt="orders empty state"
                    />
                    <div className="order-history_empty-state_text">
                        <p> You have made no orders yet</p>
                        <Link
                            to="/products?category=all"
                            className="cartDetail_checkoutBtn"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            ) : (
                orders.map((order) => (
                    <div className="order-history_item">
                        <h3>
                            Order ID : <span>{order.id}</span>
                        </h3>
                        <h4 className="order-history_item_date">
                            {getFormattedDate(new Date(order.date_ordered))}
                        </h4>
                        <div className="order-history_item_progress">
                            <Steps size="small" current={1}>
                                <Step title="Order placed" />
                                <Step title="Out for delivery" />
                                <Step title="Delivered" />
                            </Steps>
                        </div>

                        <div className="order-history_item_products">
                            <Collapse>
                                <Panel
                                    header={
                                        order && (
                                            <span>
                                                View all
                                                <strong>
                                                    {` ${order.products.length} `}
                                                </strong>
                                                items
                                            </span>
                                        )
                                    }
                                >
                                    {order.products.map((product) => (
                                        <div className="order-history_item_products_item">
                                            <Link
                                                to={`/products/${product.id}`}
                                            >
                                                <img
                                                    className="order-history_item_products_item_image"
                                                    src={product.img}
                                                    alt={product.name}
                                                />
                                            </Link>
                                            <h4 className="order-history_item_products_item_title">
                                                {product.name}
                                            </h4>
                                        </div>
                                    ))}
                                </Panel>
                            </Collapse>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default withRouter(OrderHistory);
