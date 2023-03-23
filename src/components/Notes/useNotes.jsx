import { useEffect, useRef, useState } from 'react';
import { getAllNotes } from '@/services/api/notes.api';
import { createNote, deleteNote, updateNote } from '@/services/api/notes.api';

const INITAL_ERROR = {
  name: null,
  value: null,
};

const INITIAL_DATA = {
  name: '',
  value: '',
};

const useNotes = () => {
  const myRefs = useRef([]);
  const [notes, setNotes] = useState([]);
  const [action, setAction] = useState('NEW');
  const [editData, setEditData] = useState(INITIAL_DATA);
  const [error, setError] = useState(INITAL_ERROR);

  const fetchData = async () => {
    const data = await getAllNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (name, value) => {
    setEditData({
      ...editData,
      [name]: value,
    });

    setError({
      ...error,
      [name]: null,
    });
  };

  const onEdit = (note) => {
    setAction('EDIT');
    setEditData(note);
    setError(INITAL_ERROR);
  };

  const onCancel = () => {
    setAction('NEW');
    setError(INITAL_ERROR);
    setEditData(INITIAL_DATA);
  };

  const onDelete = async (note) => {
    try {
      const { id } = await deleteNote(note.id);
      const newNotes = notes.filter((note) => note.id !== parseInt(id));
      setNotes(newNotes);
      setError(INITAL_ERROR);
    } catch (error) {
      console.log('ERRR', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({
      ...error,
      name: editData.name.trim().length === 0 ? 'requerido' : null,
      value: editData.value.trim().length === 0 ? 'requerido' : null,
    });

    if (editData.name.trim().length === 0 || editData.value.trim().length === 0)
      return;

    try {
      if (action === 'NEW') {
        const newNote = await createNote(editData);
        setNotes([...notes, newNote]);
        setEditData(INITIAL_DATA);
      } else {
        const newNote = await updateNote(editData);
        const newNotes = notes.map((note) =>
          note.id === parseInt(newNote.id) ? newNote : note
        );
        setNotes(newNotes);
        setEditData(INITIAL_DATA);
        setAction('NEW');
      }
    } catch (error) {
      console.log('ERRR', error);
    }
  };

  const onCopy = (note) => {
    navigator.clipboard.writeText(note.value);
    myRefs.current[note.id].classList.remove('hidden');
    setTimeout(() => {
      myRefs.current[note.id].classList.add('hidden');
    }, 500);
  };

  return {
    notes,
    myRefs,
    editData,
    error,
    action,
    onCopy,
    onEdit,
    onCancel,
    onChange,
    onDelete,
    onSubmit,
  };
};

export default useNotes;
