import type { MetadataRoute } from "next"
import { getAllBrands, categories, parentCategories, products } from "@workspace/mock-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://happymart.hk"
  const brands = getAllBrands()

  const productUrls: MetadataRoute.Sitemap = products.map((prod) => ({
    url: `${baseUrl}/products/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const brandUrls: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/categories/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const departmentUrls: MetadataRoute.Sitemap = parentCategories.map((dept) => ({
    url: `${baseUrl}/departments/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...departmentUrls,
    ...categoryUrls,
    ...brandUrls,
    ...productUrls,
  ]
}
