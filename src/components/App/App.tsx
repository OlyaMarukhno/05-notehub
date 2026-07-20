import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query'; 
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';

const App = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Логіка дебаунсу
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 500); 

    return () => clearTimeout(handler);
  }, [search]);

 
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox 
          value={search} 
          onChange={setSearch} 
        />
        
        {data && (
          <Pagination 
            page={page} 
            totalPages={data.totalPages} 
            onPageChange={setPage} 
          />
        )}

        <button 
          className={css.createButton} 
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      <main>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading notes.</p>}
        {data && <NoteList notes={data.notes} />}
      </main>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;