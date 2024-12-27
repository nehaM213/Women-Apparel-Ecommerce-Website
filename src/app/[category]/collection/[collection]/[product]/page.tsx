import ProductLanding from '@/components/products/ProductLanding'
import { productData } from '@/lib/static-data/Products'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    category: string
    collection: string
    product: string
  }
}

const Page = ({ params }: PageProps) => {
  const { category, collection, product } = params
  const categoryData = productData.find(
    (cat) => cat.category === category
  )

  if (!categoryData) {
    notFound()
  }

  const collectionData = categoryData.collections.find(
    (col) => col.collectionType === collection
  )
  if (!collectionData) {
    notFound()
  }

  // Find the product
  const productDetails = collectionData.products.find(
    (prod) => prod.slug === product
  )
  if (!productDetails) {
    notFound()
  }

  return (
    <ProductLanding productDetails={productDetails} />
  )
}

export default Page