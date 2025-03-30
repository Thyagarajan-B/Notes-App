import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onEdit, deleteNote }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md border w-full max-w-xs mt-5 ml-5">
            <h2 className="text-xl font-bold mb-2">{note.title}</h2>
            <p className="text-gray-700 mb-4">{note.description}</p>
            <div className="flex justify-end space-x-4">
                <button className="text-blue-500 hover:text-blue-700 transition text-xl cursor-pointer" onClick={()=> onEdit(note)}>
                    <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700 transition text-xl cursor-pointer" onClick={()=> deleteNote(note._id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
