// app/sitemap.ts

import { MetadataRoute } from 'next';
import { fetchSitemapData } from '@/apis'; 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.API_DOMAIN; 
  const data = await fetchSitemapData("league");
  const sitemap: MetadataRoute.Sitemap = [];

  sitemap.push({
    url: `${baseUrl}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1.0,
  });


  data.pages.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  });

  
  data.posts.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`, 
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  });


  data.bookmakers.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

 
  data.leagues.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: new Date(), 
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  data.predicts.forEach((item) => {
    sitemap.push({
      url: `${baseUrl}/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  });

  return sitemap;
}