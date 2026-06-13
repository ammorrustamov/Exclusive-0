import { useSelector } from "react-redux";
import ProductCard from "./ProductCard"; // Mahsulot kartasi

const ProductsList = ({ allProducts }) => {
    // Redux-dan qidiruv so'zini olamiz
    const searchQuery = useSelector(state => state.shop.searchQuery);

    // Qidiruv so'zi bo'yicha mahsulotlarni filtrlaymiz
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h2>Mahsulotlar</h2>
            <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))
                ) : (
                    <p>Ushbu qidiruv bo'yicha mahsulot topilmadi.</p>
                )}
            </div>
        </div>
    );
};

export default ProductsList;