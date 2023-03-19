import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllClinics,
  onCreateClinic,
  onUpdateClinic,
  changeClinic,
} from '@/store/clinics';
import {
  getAllSections,
  changeSection,
  changeSubsection,
  updateSections,
  updateSubsections,
} from '@/store/sections';
import { useModal } from '@/hooks/useModal';
import useEditor from '@/config/useEditor';
import { changeSettings, updateSettings } from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { getAllSettings } from '@/store/settings';
import { changeSettings2 } from '@/store/settings';

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
  const { actionClinics, message, status } = useSelector(
    (state) => state.clinics
  );
  const clinicSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'clinic')
  );
  const clinicBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'clinicBgColor'
    )
  );

  const clinicTextColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'clinicTextColor'
    )
  );

  const clinicBtn = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'clinicBtn')
  );
  const button = clinicBtn.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  const [errorField, setErrorField] = useState(INITIAL_ERROR_CLINICS);
  const [editData, setEditData] = useState();
  const clinic = useSelector((state) =>
    state.clinics.clinics.find((clinic) => clinic.id === editData?.id)
  );
  const waveClinicShow = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'waveClinicShow'
    )
  );
  const waveClinic = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'waveClinic')
  );
  const testimonialsBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'testimonialsBgColor'
    )
  );

  document.documentElement.style.setProperty(
    '--clinicBgColor',
    clinicBgColor?.value
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

  const dispatchNotif = useNotification();
  const dispatch = useDispatch();
  const quillRef = useRef();
  const quillRef2 = useRef();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalButton, openModalButton, closeModalButton] =
    useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);

  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  const onChangeSubsection = (name, value, sectionId, id) => {
    dispatch(changeSubsection({ name, value, sectionId, id }));
  };

  const onChangeSection = (name, value) => {
    dispatch(changeSection({ name, value, id: clinicSection.id }));
  };

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef.current.unprivilegedEditor.getHTML();
    dispatch(
      changeSubsection({
        name: 'content',
        value: changes,
        sectionId: clinicSection.id,
        id: quillRef.current.props.id,
      })
    );
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
      dispatch(updateSettings());

      if (actionClinics === 'NEW') {
        dispatch(onCreateClinic());
      } else {
        dispatch(onUpdateClinic());
      }

      dispatch(updateSections());
      dispatch(updateSubsections());
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };

  const onCancel = () => {
    dispatch(getAllClinics());
    dispatch(getAllSections());
    dispatch(getAllSettings());
  };

  const onChangeSetting2 = (feature, value, type) => {
    dispatch(changeSettings2({ feature, value, type }));
  };

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
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
    actionClinics,
    clinicSection,
    quillRef,
    quillRef2,
    clinicBgColor,
    clinicTextColor,
    isOpenModal,
    closeModal,
    isOpenModalButton,
    closeModalButton,
    openModalButton,
    modules,
    errorField,
    editData,
    waveClinicShow,
    waveClinic,
    button,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    testimonialsBgColor,
    setDelError,
    setEditData,
    onChangeSection,
    handleSelect,
    onChangeSetting,
    onChangeSetting2,
    onChangeSubsection,
    onSubmit,
    onCancel,
    onChangeClinic,
    onChangeClinicImage,
  };
};

export default useClinicsSection;
