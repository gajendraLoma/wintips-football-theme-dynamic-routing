// app/category/ClientCategoryBlog.tsx
'use client';
import { useState } from 'react';
import BigImageBlogSection from '@/components/blog/BigImageBlogSection';
import GridViewSection from '@/components/blog/GridViewSection';
import ListViewSection from '@/components/blog/ListViewSection';
import Pagination from '../common/Pagination';
import { fetchPostByCat } from '@/apis';
import { PostByCatResponse, Post } from '../../types/interface/getPostByCatTypo';

interface ClientCategoryPaginationProps {
  initialData: PostByCatResponse;
  perPage: number;
  slug: string;
}

export default function ClientCategoryBlog({ initialData, perPage, slug }: ClientCategoryPaginationProps) {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(initialData.total_posts / perPage);

  const mainMatch: Post =
    data.posts.length > 0 ? { ...data.posts[0] } : { title: 'No Data', featured_image: '', slug: '', published_date: '', vn_date: '' };
  const sidebarMatches: Post =
    data.posts.length > 1 ? { ...data.posts[1] } : { title: 'No Data', featured_image: '', slug: '', published_date: '', vn_date: '' };
  const gridMatches: Post[] = data.posts.length > 2 ? data.posts.slice(2, 5) : [];
  const listMatches: Post[] = data.posts.length > 2 ? data.posts.slice(2) : [];

  const loadPage = async (page: number) => {
    const res = await fetchPostByCat('category', slug, 'post', perPage, page);
    setData(res);
    setCurrentPage(page);
  };

  const handlePageChange = async (event: { selected: number }) => {
    const newPage = event.selected + 1;
    await loadPage(newPage);
  };

  return (
    <>
      <BigImageBlogSection mainMatch={mainMatch} sidebarMatches={sidebarMatches} />
      <div className="my-4" />
      <GridViewSection gridMatches={gridMatches} />
      <ListViewSection listMatches={listMatches} />
      <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </>
  );
}
