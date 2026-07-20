import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createNote } from '../../services/noteService';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormData {
  title: string;
  content: string;
  tag: string;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm<NoteFormData>();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      reset();
      onClose();
    },
  });

  const onSubmit = (data: NoteFormData) => {
    const noteData = {
      title: data.title,
      content: data.content,
      tag: data.tag as any,
    };
    mutate(noteData);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={css.formGroup} style={{ alignItems: 'flex-start' }}>
        Title
        <input 
          {...register('title', { 
            required: 'Title is required', 
            minLength: { value: 3, message: 'Title must be at least 3 characters' } 
          })} 
          className={css.input} 
          style={{ width: '100%' }} 
        />
        {errors.title && <span className={css.error}>{errors.title.message}</span>}
      </label>

      <label className={css.formGroup} style={{ alignItems: 'flex-start' }}>
        Content
        <textarea 
          {...register('content', { required: 'Content is required' })} 
          className={css.textarea} 
          style={{ width: '100%' }} 
          rows={4} 
        />
        {errors.content && <span className={css.error}>{errors.content.message}</span>}
      </label>

      <label className={css.formGroup} style={{ alignItems: 'flex-start' }}>
        Tag
        <select {...register('tag', { required: true })} className={css.select} style={{ width: '100%' }}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;