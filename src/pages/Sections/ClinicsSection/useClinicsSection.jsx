import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import useEditor from '@/config/useEditor';
import {
  getAllClinics,
  onCreateClinic,
  onUpdateClinic,
  changeClinic,
  delMessage,
} from '@/store/clinics';
import {
  getAllSettings,
  changeSettings,
  updateSettings,
} from '@/store/settings';

const INITIAL_ERROR_CLINICS = {
  name: null,
  phone: null,
  email: null,
  state: null,
  order: null,
  city: null,
  cp: null,
  street: null,
  number: null,
  floor: null,
  apartment: null,
  days: null,
  observation: null,
};

const useClinicsSection = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalButton, openModalButton, closeModalButton] =
    useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const [errorField, setErrorField] = useState(INITIAL_ERROR_CLINICS);
  const [editData, setEditData] = useState();
  const quillRef = useRef();
  const quillRef2 = useRef();

  // Data
  const { actionClinics, status, message } = useSelector(
    (state) => state.clinics
  );
  const clinic = useSelector((state) =>
    state.clinics.clinics.find((clinic) => clinic.id === editData?.id)
  );
  const sectionTestimonials = useSelector((state) =>
    state.settings.settings.filter(
      (setting) => setting.type === 'sectionTestimonials'
    )
  );
  const testimonialsSection = sectionTestimonials.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const sectionClinics = useSelector((state) =>
    state.settings.settings.filter(
      (setting) => setting.type === 'sectionClinic'
    )
  );
  const clinicsSection = sectionClinics.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const settings = useSelector((state) => state.settings.settings);

  // Botones
  const clinicBtn = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'clinicBtn')
  );
  const button = clinicBtn.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  //Set Properties
  document.documentElement.style.setProperty(
    '--clinicBgColor',
    clinicsSection.bgColor?.value
  );
  if (Object.keys(button).length > 0) {
    document.documentElement.style.setProperty(
      '--btnTextColorClinic',
      `${button.textColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTextColorHoverClinic',
      `${button.textColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorClinic',
      `${button.bgColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBgColorHoverClinic',
      `${button.bgColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTlRadiusClinic',
      `${button.tlRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnTrRadiusClinic',
      `${button.trRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBlRadiusClinic',
      `${button.blRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBrRadiusClinic',
      `${button.brRadius.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorClinic',
      `${button.borderColor.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderColorHoverClinic',
      `${button.borderColorHover.value}`
    );
    document.documentElement.style.setProperty(
      '--btnShadowClinic',
      `${button.shadow.value}`
    );
    document.documentElement.style.setProperty(
      '--btnHeightClinic',
      `${button.height.value}`
    );
    document.documentElement.style.setProperty(
      '--btnWidthClinic',
      `${button.width.value}`
    );
    document.documentElement.style.setProperty(
      '--btnBorderClinic',
      `${button.border.value}`
    );
  }

  // Images Module
  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

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

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef.current.unprivilegedEditor.getHTML();
    onChangeSetting('text', changes);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      let formError = false;
      let fieldsErrors = Object.assign({}, errorField);
      const fields = [
        'name',
        'phone',
        'email',
        'state',
        'order',
        'city',
        'cp',
        'street',
        'number',
      ];
      for (let field of fields) {
        if (clinic[field] === '') {
          formError = true;
          fieldsErrors = {
            ...fieldsErrors,
            [field]: 'Requerido',
          };
        }
        if (errorField[field]) {
          formError = true;
        }
      }

      if (formError === true) {
        setErrorField(fieldsErrors);
        return;
      }
    }

    try {
      const updated = settings.findIndex((setting) => setting.updated === true);
      if (updated !== -1) dispatch(updateSettings());

      if (actionClinics === 'NEW') {
        dispatch(onCreateClinic());
      } else {
        dispatch(onUpdateClinic());
      }
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };

  const onCancel = () => {
    dispatch(getAllClinics());
    dispatch(getAllSettings());
  };

  const onChangeSetting = (feature, value) => {
    dispatch(
      changeSettings({ feature, value, type: clinicsSection.bgColor.type })
    );
  };

  const onChangeClinic = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const pattern = e.target.pattern || e.target.dataset.pattern;
    const textError = e.target.title;
    dispatch(changeClinic({ name, value, id: editData.id }));

    if (!e.target.required && !pattern) {
      setErrorField({
        ...errorField,
        [name]: null,
      });
      return;
    }

    if (e.target.required && value === '') {
      setErrorField({
        ...errorField,
        [name]: 'Requerido',
      });
      return;
    }

    let regex = new RegExp(pattern);
    if (regex.exec(value) === null) {
      setErrorField({
        ...errorField,
        [name]: textError,
      });
    } else {
      setErrorField({
        ...errorField,
        [name]: null,
      });
    }
  };

  const onChangeClinicImage = (name, value) => {
    dispatch(changeClinic({ name, value, id: editData.id }));
  };

  const setDelError = () => {
    setErrorField(INITIAL_ERROR_CLINICS);
  };

  return {
    clinicsSection,
    testimonialsSection,
    actionClinics,
    quillRef,
    quillRef2,
    isOpenModal,
    closeModal,
    isOpenModalButton,
    closeModalButton,
    openModalButton,
    modules,
    errorField,
    editData,
    button,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    setDelError,
    setEditData,
    handleSelect,
    onChangeSetting,
    onSubmit,
    onCancel,
    onChangeClinic,
    onChangeClinicImage,
  };
};

export default useClinicsSection;
