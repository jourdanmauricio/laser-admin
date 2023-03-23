import { FaEdit, FaPen, FaPlus, FaTimes, FaTrashAlt } from 'react-icons/fa';
import useNotes from './useNotes';

const Notes = () => {
  const {
    notes,
    editData,
    myRefs,
    error,
    action,
    onCopy,
    onEdit,
    onCancel,
    onChange,
    onDelete,
    onSubmit,
  } = useNotes();
  return (
    <form onSubmit={onSubmit} className="py-10 px-2 sm:px-10">
      <div className="relative p-5 rounded text-black bg-slate-800">
        <div className="flex flex-col sm:flex-row sm:gap-2">
          <div className="form__group w-full">
            <label className="form__label text-slate-500">Nombre</label>
            <input
              className="form__input border-gray-500 w-full"
              type="text"
              name="name"
              placeholder="Nombre"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={editData.name}
            />
            <p
              className={`input__error ${
                error.name ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.name}
            </p>
          </div>
          <div className="form__group w-full">
            <label className="form__label text-slate-500">Valor</label>
            <input
              className="form__input border-gray-500 w-full"
              type="text"
              name="value"
              placeholder="Valor"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              value={editData.value}
            />
            <p
              className={`input__error ${
                error.value ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.value}
            </p>
          </div>
          <div className="absolute right-3 top-2">
            <button
              type="submit"
              className="p-1 rounded-full hover:bg-slate-700 text-slate-200"
            >
              {action === 'NEW' ? <FaPlus /> : <FaPen />}
            </button>
          </div>
          <div className="absolute left-3 top-2">
            <button
              type="button"
              onClick={() => onCancel()}
              className="p-1 rounded-full hover:bg-slate-700"
            >
              <FaTimes className="text-slate-200" />
            </button>
          </div>
        </div>
      </div>

      {notes && (
        <>
          {notes.map((note) => (
            <div
              className="mt-2 p-2 rounded bg-blue-200 flex gap-1"
              key={note.id}
            >
              <p className="w-full break-all">{note.name}</p>

              <div className="relative w-full">
                <button
                  // ref={(el) => (myRefs.current[note.id] = el)}
                  type="button"
                  onClick={() => onCopy(note)}
                  className="break-all rounded hover:cursor-pointer hover:text-gray-600 active:bg-black"
                >
                  {note.value}
                </button>
                <span
                  ref={(el) => (myRefs.current[note.id] = el)}
                  id="test-id"
                  className="absolute -top-6 -left-1 hidden px-1  py-0.5 border bg-white border-gray-600 rounded"
                >
                  Copiado!
                </span>
              </div>

              <button
                type="button"
                onClick={() => onEdit(note)}
                className="p-1 rounded-full text-blue-900"
              >
                <FaEdit />
              </button>
              <button
                type="button"
                onClick={() => onDelete(note)}
                className="p-1 rounded-full text-red-500"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </>
      )}
    </form>
  );
};

export default Notes;
