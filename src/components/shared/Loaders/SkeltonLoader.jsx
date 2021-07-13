import React from 'react';
import './loaders.scss';

const SkeltonLoader = ({ width = '', height = '' }) => {
    return (
        <div
            class="skeleton-box"
            style={{ width: width, height: height }}
        ></div>
    );
};

export default SkeltonLoader;
