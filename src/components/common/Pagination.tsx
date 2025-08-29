// src/app/components/Pagination.tsx
'use client';

import Image from 'next/image';
import ReactPaginate from "react-paginate";
interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (event: { selected: number }) => void;
}

export default function Pagination({ totalPage, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="w-full py-2 flex justify-end">
      <ReactPaginate
        previousLabel={<Image src="/svg/arrow_left.svg" alt='Larrow' height={10} width={10} />}
        nextLabel={<Image src="/svg/arrow_right.svg" alt='Rarrow' height={10} width={10}/>}
        breakLabel={'...'}
        pageCount={totalPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageChange}
        containerClassName={"paginations"}
        activeClassName={"active"}
        forcePage={currentPage - 1} 
      />
    </div>
  );
}