import React from 'react';
import { Link } from 'react-router-dom';

const orders = [
    {
        id: '-Mctftc9aDIyZ82Pb8Um',
        date_ordered: 'Sat Jun 26 2021 21:49:52 GMT+0530 (India Standard Time)',
        status: 0, // 0 - order places, 1- out for delivery, 2 - delivered,
        product: {
            category: 'handwash',
            description:
                '99.9% Germ Kill (as tested by NABL accredited laboratory. Patented Formula reinforced with clove oil. Safe on skin',
            id: '33c6ee03-0f86-af6d-55e6-ee1757971668',
            images: [
                'handwash1_01.jpg',
                'handwash1_02.jpg',
                'handwash1_03.jpg',
            ],
            name: 'Gentle Hand wash',
            price: 108,
            thumbnail: 'handwash1_01.jpg',
        },
    },
    {
        id: '-Mctftc9aDIyZ82Pb8Um',
        date_ordered: 'Sat Jun 26 2021 21:49:52 GMT+0530 (India Standard Time)',
        status: 2, // 0 - order places, 1- out for delivery, 2 - delivered,
        product: {
            category: 'handwash',
            description:
                '99.9% Germ Kill (as tested by NABL accredited laboratory. Patented Formula reinforced with clove oil. Safe on skin',
            id: '33c6ee03-0f86-af6d-55e6-ee1757971668',
            images: [
                'handwash1_01.jpg',
                'handwash1_02.jpg',
                'handwash1_03.jpg',
            ],
            name: 'Gentle Hand wash',
            price: 108,
            thumbnail: 'handwash1_01.jpg',
        },
    },
    {
        id: '-Mctftc9aDIyZ82Pb8Um',
        date_ordered: 'Sat Jun 26 2021 21:49:52 GMT+0530 (India Standard Time)',
        status: 1, // 0 - order places, 1- out for delivery, 2 - delivered,
        product: {
            category: 'handwash',
            description:
                '99.9% Germ Kill (as tested by NABL accredited laboratory. Patented Formula reinforced with clove oil. Safe on skin',
            id: '33c6ee03-0f86-af6d-55e6-ee1757971668',
            images: [
                'handwash1_01.jpg',
                'handwash1_02.jpg',
                'handwash1_03.jpg',
            ],
            name: 'Gentle Hand wash',
            price: 108,
            thumbnail: 'handwash1_01.jpg',
        },
    },
];

const OrderHistory = () => {
    return (
        <div>
            {orders.map((order, key) => {
                const {
                        id = '',
                        product = {},
                        date_ordered = '',
                        status = 0,
                    } = order,
                    { name = '', thumbnail = '', price = '' } = product;
                return (
                    <Link
                        to={`/products/${id}`}
                        className="orderHistory"
                        key={key}
                    >
                        <img
                            src={`/assets/${thumbnail}`}
                            alt={name}
                            className="orderHistory_img"
                        />
                        <div className="orderHistory_content">
                            <h4 className="orderHistory_content_name">
                                {name}
                            </h4>
                            <p className="orderHistory_content_date">
                                {date_ordered}
                            </p>
                            <p className="orderHistory_content_price">
                                &#8377; {price}
                            </p>
                            <div className="orderHistory_content_status">
                                <p className="orderHistory_content_status_wrap">
                                    <span
                                        className={`orderHistory_content_status_step ${
                                            status >= 0 ? 'active' : ''
                                        }`}
                                    >
                                        1
                                    </span>{' '}
                                    <span className="orderHistory_content_status_text">
                                        Order placed
                                    </span>
                                </p>
                                <p className="orderHistory_content_status_wrap">
                                    <span
                                        className={`orderHistory_content_status_step ${
                                            status >= 1 ? 'active' : ''
                                        }`}
                                    >
                                        2
                                    </span>{' '}
                                    <span className="orderHistory_content_status_text">
                                        Out For Delivery
                                    </span>
                                </p>
                                <p className="orderHistory_content_status_wrap">
                                    <span
                                        className={`orderHistory_content_status_step ${
                                            status >= 2 ? 'active' : ''
                                        }`}
                                    >
                                        3
                                    </span>{' '}
                                    <span className="orderHistory_content_status_text">
                                        Delivered
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default OrderHistory;
