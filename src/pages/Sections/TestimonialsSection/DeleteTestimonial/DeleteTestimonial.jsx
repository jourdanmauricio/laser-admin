const DeleteTestimonial = ({
  testimonial,
  handleDelete,
  handleCancelDelete,
}) => {
  return (
    <form className="bg-white p-10 flex flex-col justify-center items-center">
      <h2 className="title">Eliminar Testimonio</h2>
      <p className="text-center font-medium text-gray-800 my-6 mx-0">
        Esta seguro de eliminar el testimonio <i>{testimonial?.name}</i>?
      </p>
      <div className="mt-4 flex justify-between items-center w-full">
        <button
          className="btn__secondary"
          onClick={handleCancelDelete}
          id="cancel"
          type="button"
        >
          Cancelar
        </button>

        <button
          onClick={handleDelete}
          className="btn__primary"
          id="delete"
          type="button"
        >
          Eliminar
        </button>
      </div>
    </form>
  );
};

export default DeleteTestimonial;
