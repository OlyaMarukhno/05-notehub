import axios from 'axios';
import type { Note } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  total: number;
  totalPages: number;
}

export const fetchNotes = async (page: number = 1, search: string = ''): Promise<FetchNotesResponse> => {
  const { data } = await api.get('/notes', {
    params: { page, perPage: 12, search },
  });
  return data;
};

export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
  const { data } = await api.post('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};