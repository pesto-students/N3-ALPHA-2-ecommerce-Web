import { Steps } from 'antd';
import './orderHistory.scss';
import { Link } from 'react-router-dom';
import Divider from '../../shared/Divider/Divider';
import { getFormattedDate } from '../../../helper/Utils';

const { Step } = Steps;

export default function OrderHistory(props) {
    const { orders } = props;
    console.log(orders);
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
                        <p> You have no orders yet</p>
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
                            Order id : <span>{order.id}</span>
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
                            {order.products.map((product) => (
                                <div className="order-history_item_products_item">
                                    <Link to={`/products/${product.id}`}>
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
                        </div>
                        <Divider />
                    </div>
                ))
            )}
        </div>
    );
}
