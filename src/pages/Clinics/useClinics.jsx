import { useEffect, useMemo, useState } from 'react';
import {
  getAllClinics,
  createClinic,
  updateClinic,
  deleteClinic,
} from '@/services/api/clinics.api';
import { useModal } from '@/hooks/useModal';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const initialClinic = {
  name: '',
  phone: '',
  email: '',
  state: 'Buenos Aires',
  city: '',
  cp: '',
  street: '',
  number: '',
  floor: '',
  apartment: '',
  order: 0,
  main: false,
  days: '',
  observation: '',
};

const useClinics = () => {
  const [status, setStatus] = useState(null);
  const [action, setAction] = useState('VIEW');
  const [error, setError] = useState(null);
  const [clinics, setClinics] = useState([]);
  const [clinic, setClinic] = useState(initialClinic);
  const dispatchNotif = useNotification();
  const [isOpenModalDelete, openModalDelete, closeModalDelete] =
    useModal(false);

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
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
            onClick={() => onDelete(clinic)}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];

  const onEdit = (clinic) => {
    setClinic(clinic);
    setAction('EDIT');
  };

  const onNew = () => {
    setClinic({ ...clinic, order: clinics.length + 1 });
    setAction('NEW');
  };
  const onDelete = (clinic) => {
    setClinic(clinic);
    openModalDelete();
  };

  const handleDelete = async () => {
    const id = clinic.id;
    console.log('Delete ID', id);
    try {
      setStatus('loading');
      await deleteClinic(id);
      const newClinics = clinics.filter((cli) => cli.id !== id);
      setClinics(newClinics);
      handleCancelDelete();
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Clínica eliminada!',
      });
    } catch (error) {
      dispatchNotif({
        type: 'SUCCESS',
        message: 'Error eliminando la clínica!',
      });
      setError(error);
    } finally {
      setStatus(null);
    }
  };

  const handleCancelDelete = () => {
    setClinic(initialClinic);
    setAction('VIEW');
    closeModalDelete();
  };

  const loadClinics = async () => {
    try {
      setStatus('loading');
      const allClinics = await getAllClinics();
      setClinics(allClinics);
    } catch (error) {
      console.log('ERRRRRORRR', error);
      setError(error);
    } finally {
      setStatus(null);
    }
  };

  useEffect(() => {
    loadClinics();
  }, []);

  const closeMessage = () => {
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setStatus('loading');
      if (action === 'NEW') {
        clinic.order = clinics.length + 1;
        const newClinic = await createClinic(clinic);
        setClinics([newClinic, ...clinics]);
        setClinic(initialClinic);
        setAction('VIEW');
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Clínica creada!',
        });
      }
      if (action === 'EDIT') {
        // clinic.order = clinics.length + 1;
        const updClinic = await updateClinic(clinic);
        const newClinics = clinics.map((clinic) =>
          clinic.id === updClinic.id ? updClinic : clinic
        );
        setClinics(newClinics);
        setClinic(initialClinic);
        setAction('VIEW');
        dispatchNotif({
          type: 'SUCCESS',
          message: 'Clínica modificada!',
        });
      }
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: 'Error creando la clínica!',
      });
      setError(error);
    } finally {
      setStatus(null);
    }
  };

  // function convertArrayOfObjectsToCSV(array) {
  //   let result;
  //   const columnDelimiter = ',';
  //   const lineDelimiter = '\n';
  //   const keys = Object.keys(clinics[0]);

  //   result = '';
  //   result += keys.join(columnDelimiter);
  //   result += lineDelimiter;

  //   array.forEach((item) => {
  //     let ctr = 0;
  //     keys.forEach((key) => {
  //       if (ctr > 0) result += columnDelimiter;

  //       result += item[key];

  //       ctr++;
  //     });
  //     result += lineDelimiter;
  //   });

  //   return result;
  // }

  // function downloadCSV(array) {
  //   const link = document.createElement('a');
  //   let csv = convertArrayOfObjectsToCSV(array);
  //   if (csv == null) return;

  //   const filename = 'export.csv';

  //   if (!csv.match(/^data:text\/csv/i)) {
  //     csv = `data:text/csv;charset=utf-8,${csv}`;
  //   }

  //   link.setAttribute('href', encodeURI(csv));
  //   link.setAttribute('download', filename);
  //   link.click();
  // }

  // const Export = ({ onExport }) => (
  //   <button className="btn__primary" onClick={(e) => onExport(e.target.value)}>
  //     Export
  //   </button>
  // );

  // const actionsMemo = useMemo(
  //   () => <Export onExport={() => downloadCSV(clinics)} />,
  //   []
  // );

  const actionsMemo = useMemo(
    () => (
      <button onClick={onNew} className="btn__primary font-normal text-base">
        Nueva
      </button>
    ),
    []
  );

  return {
    clinics,
    clinic,
    setClinic,
    action,
    status,
    error,
    columns,
    paginationComponentOptions,
    actionsMemo,
    closeMessage,
    setAction,
    handleSubmit,
    isOpenModalDelete,
    openModalDelete,
    closeModalDelete,
    handleDelete,
    handleCancelDelete,
  };
};

export default useClinics;
