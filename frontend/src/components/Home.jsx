import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import NoteModel from './NoteModel';
import axios from 'axios';
import NoteCard from './NoteCard';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';

const Home = () => {
  const { user } = useAuth();
  const [isModel, setModelOpen] = useState(false);
  const [filterNotes, setFilterNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (user) {
      fetchNotes();
    } else {
      setNotes([]);
    }
  }, [user]);

  useEffect(() => {
    setFilterNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const closeModel = () => {
    setModelOpen(false);
    setCurrentNote(null);
  };

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/auth', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setNotes(data.notes);
    } catch (err) {
      console.log(err);
      setNotes([]);
    }
  };

  const addNote = async (title, description) => {
    if (!user) {
      toast.warn('Please Login OR SignUp');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModel();
        toast.success('Note Added');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/auth/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Note Deleted');
        fetchNotes();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/auth/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />
      
      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filterNotes.length > 0 ? (
          filterNotes.map((note) => (
            <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNote={deleteNote} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full text-lg font-semibold">
            No notes available
          </p>
        )}
      </div>

      <button
        onClick={user ? () => setModelOpen(true) : () => toast.warn('Please Login OR SignUp')}
        className="fixed right-4 bottom-4 md:right-8 md:bottom-8 text-2xl bg-blue-600 text-white font-bold p-3.5 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
      >
        +
      </button>

      {isModel && <NoteModel closeModel={closeModel} addNote={addNote} currentNote={currentNote} editNote={editNote} />}
    </div>
  );
};

export default Home;
