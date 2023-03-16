import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSection,
  deleteSubsection,
  setActionSection,
  getAllSections,
  updateSections,
  updateSubsections,
  setNewSubsection,
  createSubsection,
} from '@/store/sections';
import { changeSettings, updateSettings } from '@/store/settings';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useModal } from '@/hooks/useModal';

const useServicesSection = () => {
  const dispatch = useDispatch();
  const [service, setService] = useState();
  const quillRef = useRef();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const [errorFields, setErrorFields] = useState({
    image: null,
    alt_image: null,
  });

  const servicesSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'services')
  );
  const servicesBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'servicesBgColor'
    )
  );
  const blogBgColor = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'blogBgColor')
  );
  const waveServiceShow = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'waveServiceShow'
    )
  );
  const waveService = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'waveService')
  );
  const { actionSections } = useSelector((state) => state.sections);

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

  const onEdit = (service) => {
    setService(service);
    dispatch(setActionSection({ action: 'EDIT' }));
  };

  const onNew = () => {
    const subsection = {
      id: 0,
      image: '',
      alt_image: '',
      name: '',
      content: '',
      section_id: servicesSection.id,
    };
    dispatch(setNewSubsection({ subsection }));
    setService(subsection);
  };

  const onConfirmDelete = (subsection) => {
    setService(subsection);
    openModal();
  };

  const handleDelete = (subsection) => {
    dispatch(deleteSubsection(subsection.id));
  };

  const handleCancelDelete = () => {
    setService(null);
    closeModal();
  };

  const onChangeSection = (name, value) => {
    dispatch(changeSection({ name, value, id: servicesSection.id }));
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
    dispatch(changeSettings({ feature, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateSettings());

      dispatch(updateSections());
      if (actionSections === 'NEW') {
        dispatch(createSubsection());
      } else {
        dispatch(updateSubsections());
      }
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };

  const onCancel = () => {
    dispatch(getAllSections());
  };

  return {
    servicesSection,
    actionSections,
    quillRef,
    servicesBgColor,
    columns,
    actionsMemo,
    service,
    isOpenModal,
    closeModal,
    errorFields,
    waveServiceShow,
    waveService,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    blogBgColor,
    onChangeSection,
    onChangeSetting,
    onCancel,
    onSubmit,
    handleCancelDelete,
    handleDelete,
  };
};

export default useServicesSection;
