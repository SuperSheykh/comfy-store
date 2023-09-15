import SectionTitle from '../../components/SectionTitle'
import ProductGrid from '../Products/ProductGrid'

const FeaturedProducts = () => {
   return (
      <div className='pt-24'>
         <SectionTitle text='featured products' />
         <ProductGrid />
      </div>
   )
}

export default FeaturedProducts
