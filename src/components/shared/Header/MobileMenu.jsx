import React from 'react';

const MobileMenu = (props) => {
    const { handleMobileMenu, isMobileMenu = false, handleMenuSelect } = props;
    const handleClass = isMobileMenu ? 'show' : 'hide';

    return (
        <nav className="mobileMenu" onClick={(e) => handleMenuSelect(e)}>
            <div className={`mobileMenu_content ${handleClass}`}>
                <p
                    className="mobileMenu_closeBtn"
                    onClick={() => handleMobileMenu()}
                >
                    ×
                </p>
                <p data-value="masks" className="mobileMenu_item">
                    Masks
                </p>
                <p data-value="sanitizers" className="mobileMenu_item">
                    Sanitizers
                </p>
                <p data-value="handwash" className="mobileMenu_item">
                    Hand Wash
                </p>
                <p data-value="gloves" className="mobileMenu_item">
                    Gloves
                </p>
            </div>
            <span
                className="mobileMenu_menuBar"
                onClick={() => handleMobileMenu()}
            >
                ☰
            </span>
        </nav>
    );
};

export default MobileMenu;
