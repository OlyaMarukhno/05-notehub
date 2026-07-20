import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import { noteSchema } from '../../schemas/noteSchema';
import type { NoteTag } from '../../types/note'; 
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    
    onError: (error) => {
      console.error("Error while creating note:", error);
      alert("Error. Please try again.");
    }
  });

  return (
    <Formik
     
      initialValues={{ title: '', content: '', tag: 'Todo' as NoteTag }}
      validationSchema={noteSchema}
      onSubmit={(values) => {
       
        mutate({ 
          ...values, 
          tag: values.tag as NoteTag 
        });
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
          <label htmlFor="title">Title</label>
          <Field name="title" id="title" className={css.input} style={{ width: '100%' }} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
          <label htmlFor="content">Content</label>
          <Field as="textarea" name="content" id="content" className={css.textarea} style={{ width: '100%' }} />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" name="tag" id="tag" className={css.select} style={{ width: '100%' }}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;