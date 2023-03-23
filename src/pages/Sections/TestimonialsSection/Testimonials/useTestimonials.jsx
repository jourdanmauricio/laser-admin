import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActionTestimonials,
  onDeleteTestimonial,
  setNewTestimonial,
} from '@/store/testimonials';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import Tooltip from '@/commons/Tooltip/Tooltip';

const useTestimonials = ({ setEditData, setDelError, editData }) => {
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const { testimonials, actionTestimonials } = useSelector(
    (state) => state.testimonials
  );

  const onEdit = (testimonial) => {
    setEditData(testimonial);
    setDelError();
    dispatch(setActionTestimonials({ action: 'EDIT' }));
  };

  const confirmDeleteTestimonial = (testimonial) => {
    setEditData(testimonial);
    openModal();
  };

  const onNew = () => {
    const order = testimonials.length + 1;
    const testimonial = {
      id: 0,
      name: '',
      message: '',
      stars: '11111',
      order,
    };
    setEditData(testimonial);
    setDelError();

    dispatch(setNewTestimonial({ testimonial }));
  };

  const handleCancelDelete = () => {
    setEditData({});
    closeModal();
  };

  const actionsMemo = useMemo(
    () => (
      <Tooltip content="Nuevo testimonio" position="left">
        <button
          type="button"
          className="hover:bg-slate-200 p-2 rounded-full cursor-pointer"
          onClick={onNew}
        >
          <FaPlus className="text-teal-500 text-xl" />
        </button>
      </Tooltip>
    ),
    []
  );

  const handleDelete = () => {
    dispatch(onDeleteTestimonial(editData));
    closeModal();
  };

  const columns = [
    {
      name: 'Nombre',
      selector: (testimonial) => testimonial.name,
    },
    {
      name: 'Testimonio',
      selector: (testimonial) => testimonial.stars,
    },
    {
      name: 'Orden',
      width: '90px',
      selector: (testimonial) => testimonial.order,
    },
    {
      name: 'Acciones',
      button: true,
      cell: (testimonial) => (
        <>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onEdit(testimonial)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => confirmDeleteTestimonial(testimonial)}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];

  return {
    actionTestimonials,
    columns,
    testimonials,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  };
};

export default useTestimonials;
