import ProductLanding from '@/components/products/ProductLanding'
import { productData } from '@/lib/static-data/Products'
import { notFound } from 'next/navigation'

type PageParams = {
  category: string
  collection: string
  product: string
}

// 👇 Notice: params is a Promise so we await it
interface PageProps {
  params: Promise<PageParams>
}

const Page = async ({ params }: PageProps) => {
  const { category, collection, product } = await params

  const categoryData = productData.find((cat) => cat.category === category)
  if (!categoryData) notFound()

  const collectionData = categoryData.collections.find(
    (col) => col.collectionType === collection
  )
  if (!collectionData) notFound()

  const productDetails = collectionData.products.find(
    (prod) => prod.slug === product
  )
  if (!productDetails) notFound()

  return <ProductLanding productDetails={productDetails} />
}

export default Page
