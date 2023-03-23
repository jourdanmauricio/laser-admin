import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActionClinics,
  onDeleteClinic,
  setNewClinic,
} from '@/store/clinics';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';
import Tooltip from '@/commons/Tooltip/Tooltip';

const useClinics = ({ setEditData, setDelError, editData }) => {
  const dispatch = useDispatch();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const { clinics, actionClinics } = useSelector((state) => state.clinics);

  const onEdit = (clinic) => {
    setEditData(clinic);
    setDelError();
    dispatch(setActionClinics({ action: 'EDIT' }));
  };

  const confirmDeleteClinic = (clinic) => {
    setEditData(clinic);
    openModal();
  };

  const onNew = () => {
    const order = clinics.length + 1;
    const clinic = {
      id: 0,
      name: '',
      email: '',
      phone: '',
      state: '',
      city: '',
      cp: '',
      street: '',
      number: '',
      floor: null,
      apartment: '',
      order,
      main: true,
      days: '',
      observation: '',
    };
    setEditData(clinic);
    setDelError();

    dispatch(setNewClinic({ clinic }));
  };

  const handleCancelDelete = () => {
    setEditData({});
    closeModal();
  };

  const actionsMemo = useMemo(
    () => (
      <Tooltip content="Nuevo consultorio" position="left">
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
    dispatch(onDeleteClinic(editData));
    closeModal();
  };

  const columns = [
    {
      name: 'Nombre',
      selector: (clinic) => clinic.name,
    },
    {
      name: 'Ciudad',
      selector: (clinic) =>
        clinic.state + ', ' + clinic.city + ' - ' + clinic.cp,
    },
    {
      name: 'Orden',
      width: '90px',
      selector: (clinic) => clinic.order,
    },
    {
      name: 'Acciones',
      button: true,
      cell: (clinic) => (
        <>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onEdit(clinic)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => confirmDeleteClinic(clinic)}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];

  return {
    actionClinics,
    columns,
    clinics,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  };
};

export default useClinics;
