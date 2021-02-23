import ProductGallery from './gallery';
import ProductShare from './share';
import ProductHeader from './header';
import ProductOptions from './options';
import ProductPrice from './price';
import ProductDetails from './details';
import ProductAddToCart from './add-to-cart';
import ProductSuggested from './suggested';

const Product = {
    Gallery: ProductGallery,
    Share: ProductShare,
    Header: ProductHeader,
    Options: ProductOptions,
    Price: ProductPrice,
    Details: ProductDetails,
    AddToCart: ProductAddToCart,
    Suggested: ProductSuggested
}

export default Product;

export {
    ProductGallery,
    ProductShare,
    ProductHeader,
    ProductOptions,
    ProductPrice,
    ProductDetails,
    ProductAddToCart,
    ProductSuggested
};
