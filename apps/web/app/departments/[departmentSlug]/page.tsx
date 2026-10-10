import React from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import {
  parentCategories,
  getProductsByCategory,
} from "@workspace/mock-data"
import { StorefrontShell } from "@/components/layout/storefront-shell"
import { ProductListingView } from "@/components/catalog/product-listing-view"

interface DepartmentPageProps {
  params: Promise<{
    departmentSlug: string
  }>
}

export async function generateMetadata({
  params,
}: DepartmentPageProps): Promise<Metadata> {
  const { departmentSlug } = await params
  const department = parentCategories.find((p) => p.slug === departmentSlug)

  if (!department) {
    return { title: "Department Not Found | Happymart" }
  }

  return {
    title: `${department.nameEn} | ${department.nameZh} | Happymart`,
    description: department.descriptionEn,
  }
}

export default async function DepartmentPage({ params }: DepartmentPageProps) {
  const { departmentSlug } = await params
  const department = parentCategories.find((p) => p.slug === departmentSlug)

  if (!department) {
    notFound()
  }

  const initialProducts = getProductsByCategory(department.slug)

  const breadcrumbs = [
    {
      labelEn: department.nameEn,
      labelZh: department.nameZh,
      href: `/departments/${department.slug}`,
    },
  ]

  return (
    <StorefrontShell>
      <ProductListingView
        titleEn={department.nameEn}
        titleZh={department.nameZh}
        descriptionEn={department.descriptionEn}
        descriptionZh={department.descriptionZh}
        breadcrumbs={breadcrumbs}
        subcategories={department.subcategories}
        baseHref={`/departments/${department.slug}`}
        initialProducts={initialProducts}
      />
    </StorefrontShell>
  )
}
