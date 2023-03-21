import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import {
  getAllSettings,
  changeSettings,
  updateSettings,
} from '@/store/settings';
import {
  setNewService,
  changeService,
  onCreateService,
  onUpdateService,
  onDeleteService,
  setActionServices,
  delMessage,
} from '@/store/services';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const INITIAL_ERROR_SERVICE = {
  image: null,
  alt_image: null,
};

const useServicesSection = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const quillRef = useRef();
  const quillRef2 = useRef();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const [errorFields, setErrorFields] = useState(INITIAL_ERROR_SERVICE);
  const [editData, setEditData] = useState();
  const [service, setService] = useState();

  // Data
  const { actionServices, status, message } = useSelector(
    (state) => state.services
  );
  const columns = [
    {
      name: 'Imagen',
      width: '150px',
      cell: (servicesSection) => (
        <img src={servicesSection.image} alt={servicesSection.image_alt} />
      ),
    },
    {
      name: 'Nombre',
      selector: (servicesSection) =>
        servicesSection.name.replace(/(<([^>]+)>)/gi, ''),
    },
    {
      name: 'Acciones',
      button: true,
      cell: (servicesSection) => (
        <>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onEdit(servicesSection)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onConfirmDelete(servicesSection)}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];
  const sectionBlog = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'sectionBlog')
  );
  const blogSection = sectionBlog.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const sectionServices = useSelector((state) =>
    state.settings.settings.filter(
      (setting) => setting.type === 'sectionServices'
    )
  );
  const servicesSection = sectionServices.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const settings = useSelector((state) => state.settings.settings);

  // Methods
  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: `${status === 'success' ? 'SUCCESS' : 'ERROR'}`,
        message: message,
      });
      dispatch(delMessage());
    }
  }, [message]);
  const onEdit = (service) => {
    setService(service);
    dispatch(setActionServices({ action: 'EDIT' }));
  };
  const onNew = () => {
    const service = {
      id: 0,
      image: '',
      alt_image: '',
      name: '',
      content: '',
    };
    dispatch(setNewService({ service }));
    setService(service);
  };
  const onConfirmDelete = (service) => {
    setService(service);
    openModal();
  };
  const handleDelete = (service) => {
    dispatch(onDeleteService(service));
  };
  const handleCancelDelete = () => {
    setService(null);
    closeModal();
  };
  const actionsMemo = useMemo(
    () => (
      <button onClick={onNew} className="btn__primary font-normal text-base">
        Nueva
      </button>
    ),
    [servicesSection]
  );
  const onChangeSetting = (feature, value) => {
    dispatch(
      changeSettings({ feature, value, type: servicesSection.bgColor.type })
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      const updated = settings.findIndex((setting) => setting.updated === true);
      if (updated !== -1) dispatch(updateSettings());

      if (actionServices === 'NEW') {
        dispatch(onCreateService());
      } else {
        dispatch(onUpdateService());
      }
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };
  const onCancel = () => {
    dispatch(getAllSettings());
    dispatch(setActionServices({ action: 'SERVICES' }));
  };
  const setDelError = () => {
    setErrorFields(INITIAL_ERROR_SERVICE);
  };
  const onChangeService = (name, value) => {
    dispatch(changeService({ name, value, id: editData.id }));
    setErrorFields({ ...errorFields, [name]: null });
  };

  return {
    servicesSection,
    blogSection,
    actionServices,
    quillRef,
    quillRef2,
    columns,
    actionsMemo,
    service,
    isOpenModal,
    closeModal,
    errorFields,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    editData,
    setDelError,
    setEditData,
    onChangeSetting,
    onChangeService,
    onCancel,
    onSubmit,
    handleCancelDelete,
    handleDelete,
  };
};

export default useServicesSection;
