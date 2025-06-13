"use client"

import { Head } from "@inertiajs/react"
import { PageProps } from "@/types"
import AppLayout from "@/layouts/AppLayout"
import { lazy, Suspense } from "react"

// Lazy loading du composant SportNewsHome
const SportNewsHome = lazy(() => import("@/components/SportNewsHome"))

// Composant de chargement
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
)

interface HomeProps extends PageProps {
  articles: {
    data: Array<{
      id: number
      title: string
      excerpt: string
      content: string
      image: string
      published_at: string
      views: number
      user: {
        id: number
        name: string
        profile_photo_url?: string
      }
      category: {
        id: number
        name: string
      }
      tags: Array<{
        id: number
        name: string
      }>
    }>
    links: Array<{
      url: string | null
      label: string
      active: boolean
    }>
  }
  categories: Array<{
    id: number
    name: string
    articles_count: number
  }>
  tags: Array<{
    id: number
    name: string
    articles_count: number
  }>
  popularArticles: Array<{
    id: number
    title: string
    published_at: string
    views: number
    user: {
      name: string
    }
    category: {
      name: string
    }
  }>
  filters: {
    search: string
    category: string
    tag: string
  }
}

export default function Home({
  auth,
  articles,
  categories = [],
  tags = [],
  popularArticles = [],
  filters = { search: "", category: "", tag: "" },
  ...props
}: HomeProps) {
  return (
    <AppLayout auth={auth}>
      <Head title="Accueil - SportNews" />
      <Suspense fallback={<LoadingSpinner />}>
        <SportNewsHome
          auth={auth}
          articles={articles}
          categories={categories}
          tags={tags}
          popularArticles={popularArticles}
          filters={filters}
          {...props}
        />
      </Suspense>
    </AppLayout>
  )
}
