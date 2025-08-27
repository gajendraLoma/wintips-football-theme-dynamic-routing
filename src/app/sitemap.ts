// app/sitemap.ts

import { MetadataRoute } from 'next';
import { fetchSitemapData } from '@/apis'; 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.API_DOMAIN; 
  const data = await fetchSitemapData();
  const sitemap: MetadataRoute.Sitemap = [];

  sitemap.push({
    url: `${baseUrl}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });


  data.pages.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  
  data.posts.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`, 
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });


  data.bookmakers.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/bookmakers/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

 
  data.leagues.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: new Date(), 
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  data.predicts.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/predict/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  return sitemap;
}