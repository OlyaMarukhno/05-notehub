import * as Yup from 'yup';

export const noteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content must not exceed 500 characters'),
  tag: Yup.string()
    .required('Tag is required'),
});


