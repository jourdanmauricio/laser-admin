import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  onDeleteService,
  setNewService,
  setActionServices,
} from '@/store/services';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import Tooltip from '@/commons/Tooltip/Tooltip';

const useServices = ({ setEditData, setDelError, editData }) => {
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const { services, actionServices } = useSelector((state) => state.services);

  const confirmDeleteService = (service) => {
    setEditData(service);
    openModal();
  };

  const onNew = () => {
    const order = services.length + 1;
    const service = {
      id: 0,
      title: '',
      image: '',
      alt_image: '',
      content: '',
      order,
    };
    setEditData(service);
    setDelError();
    dispatch(setNewService({ service }));
  };

  const onEdit = (service) => {
    setEditData(service);
    setDelError();
    dispatch(setActionServices({ action: 'EDIT' }));
  };

  const handleCancelDelete = () => {
    setEditData(null);
    closeModal();
  };

  const actionsMemo = useMemo(
    () => (
      <Tooltip content="Nuevo servicio" position="left">
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
    dispatch(onDeleteService(editData));
    closeModal();
  };

  const columns = [
    {
      name: 'Imagen',
      width: '100px',
      cell: (service) => <img src={service.image} alt={service.image_alt} />,
    },
    {
      name: 'Título',
      sortable: true,
      cell: (service) => (
        <div className="text-wrap">
          {service.title.replace(/(<([^>]+)>)/gi, '')}
        </div>
      ),
    },
    {
      name: 'Orden',
      width: '90px',
      center: true,
      sortable: true,
      selector: (service) => service.order,
    },
    {
      name: 'Acciones',
      button: true,
      cell: (service) => (
        <>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onEdit(service)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => confirmDeleteService(service)}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];

  return {
    actionServices,
    columns,
    services,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  };
};

export default useServices;
