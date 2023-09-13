import ProductsGrid from '../../components/ProductsGrid'
import SectionTitle from '../../components/SectionTitle'

const FeaturedProducts = () => {
   return (
      <div className='pt-24'>
         <SectionTitle text='featured products' />
         <ProductsGrid />
      </div>
   )
}

export default FeaturedProducts
