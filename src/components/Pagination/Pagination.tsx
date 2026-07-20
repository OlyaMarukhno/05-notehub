import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      <li className={page === 1 ? css.disabled : ''} onClick={() => page > 1 && onPageChange(page - 1)}>
        <a href="#">&larr;</a>
      </li>

      {pages.map((p) => (
        <li 
          key={p} 
          className={page === p ? css.active : ''} 
          onClick={() => onPageChange(p)}
        >
          <a href="#">{p}</a>
        </li>
      ))}

      {/* Кнопка "Вперед" */}
      <li className={page === totalPages ? css.disabled : ''} onClick={() => page < totalPages && onPageChange(page + 1)}>
        <a href="#">&rarr;</a>
      </li>
    </ul>
  );
};

export default Pagination;