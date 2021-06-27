export function filterProducts(filters, products) {
    const { price, category, search } = filters;

    let filteredProducts = products;

    if (price) {
        const [min, max] = price;
        filteredProducts = filteredProducts.filter(
            (product) => product.price >= min && product.price <= max
        );
    }
    if (category) {
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === category
            );
        }
    }

    if (search) {
        filteredProducts = filteredProducts.filter((product) =>
            Object.values(product).some((value) => {
                return typeof value === 'string'
                    ? value
                          .toLocaleLowerCase()
                          .includes(search.toLocaleLowerCase())
                    : false;
            })
        );

        console.log('filter', filteredProducts);
    }

    return filteredProducts;
}
