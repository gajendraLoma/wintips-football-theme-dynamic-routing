// app/category/ClientCategoryBlog.tsx
'use client';
import {useState} from 'react';
import BigImageBlogSection from '@/components/blog/BigImageBlogSection';
import GridViewSection from '@/components/blog/GridViewSection';
import ListViewSection from '@/components/blog/ListViewSection';
import Pagination from '../common/Pagination';
import {fetchPostByCat} from '@/apis';
import {PostByCatResponse, Post} from '../../types/interface/getPostByCatTypo';

interface ClientCategoryPaginationProps {
  initialData: PostByCatResponse;
  perPage: number;
  slug: string;
}

export default function ClientCategoryBlog({
  initialData,
  perPage,
  slug
}: ClientCategoryPaginationProps) {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(initialData.total_posts / perPage);

  const posts = data.posts;
  const mainMatch = posts[0];
  const sidebarMatches = posts[1];
  const gridMatches = posts?.slice(2, 5);
  const listMatches = posts?.slice(5);

  const loadPage = async (page: number) => {
    const res = await fetchPostByCat('category', slug, 'post', perPage, page);
    setData(res);
    setCurrentPage(page);
  };

  const handlePageChange = async (event: {selected: number}) => {
    const newPage = event.selected + 1;
    await loadPage(newPage);
  };

  return (
    <>
      <BigImageBlogSection
        mainMatch={mainMatch}
        sidebarMatches={sidebarMatches}
      />
      <div className="my-4" />
      <GridViewSection gridMatches={gridMatches} />
      <ListViewSection listMatches={listMatches} />

      <div className="mt-4 lg:mt-6">
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
