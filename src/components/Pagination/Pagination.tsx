import type { ComponentType } from "react";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<ComponentType<ReactPaginateProps>>
).default;

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={page - 1} 
      onPageChange={(data) => onPageChange(data.selected + 1)}
      
      containerClassName={css.pagination}
      pageClassName={""} 
      pageLinkClassName={""} 
      
      activeClassName={css.active}
      
      previousLabel="&larr;"
      nextLabel="&rarr;"
      
      breakClassName={css.pagination}
    />
  );
};

export default Pagination;