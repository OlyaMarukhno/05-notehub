import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox 
          value={search} 
          onChange={(val) => {
            setSearch(val);
            setPage(1); 
          }} 
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