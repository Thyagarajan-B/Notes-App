import React, { useEffect, useState } from "react";

const NoteModel = ({ closeModel, addNote, currentNote, editNote }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title);
            setDescription(currentNote.description);
        }
    }, [currentNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentNote) {
            editNote(currentNote._id, title, description);
        } else {
            await addNote(title, description);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {currentNote ? "Edit Note" : "Add a Note"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Add Title"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Add Description"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-32"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between flex-wrap gap-2">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full sm:w-auto cursor-pointer"
                        >
                            {currentNote ? "Update Note" : "Add Note"}
                        </button>

                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full sm:w-auto cursor-pointer"
                            onClick={closeModel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteModel;
