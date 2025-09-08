// app/sitemap.ts
import { MetadataRoute } from 'next';
import { fetchSitemapData } from '@/apis';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const HOME_URL = process.env.HOME_URL;
  const data = await fetchSitemapData();
  const sitemap: MetadataRoute.Sitemap = [];

  sitemap.push({
    url: `${HOME_URL}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1.0,
  });

 data.categories.forEach((item) => {
    sitemap.push({
      url: `${HOME_URL}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  data.leagues.forEach((item) => {
    sitemap.push({
      url: `${HOME_URL}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });


 data.pages.forEach((item) => {
=======
  data.categories.forEach((item) => {
>>>>>>> Stashed changes
    sitemap.push({
      url: `${HOME_URL}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  });
<<<<<<< Updated upstream

 data.posts.forEach((item) => {
    sitemap.push({
      url: `${HOME_URL}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  });

 data.bookmakers.forEach((item) => {
    sitemap.push({
      url: `${HOME_URL}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  });

  data.predicts.forEach((item) => {
=======
  data.leagues.forEach((item) => {
>>>>>>> Stashed changes
    sitemap.push({
      url: `${HOME_URL}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });
  data.pages.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  });
  data.posts.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  });
  data.bookmakers.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  });
  data.predicts.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    });
  });
  return sitemap;
}