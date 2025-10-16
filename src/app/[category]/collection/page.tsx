import Collection from '@/components/Collection/Collection'
import React from 'react'

interface PageProps {
  params: Promise<{
    category: string
    collection: string
  }>
}

const Page = async ({ params }: PageProps) => {
  const { category, collection } = await params

  // You can now safely use category and collection
  return (
    <div>
      <Collection />
    </div>
  )
}

export default Page
