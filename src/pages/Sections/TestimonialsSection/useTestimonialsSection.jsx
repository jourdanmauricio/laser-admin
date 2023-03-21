import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { useModal } from '@/hooks/useModal';
import useEditor from '@/config/useEditor';
import {
  getAllSettings,
  changeSettings,
  updateSettings,
} from '@/store/settings';
import {
  getAllTestimonials,
  changeTestimonial,
  onCreateTestimonial,
  onUpdateTestimonial,
  delMessage,
} from '@/store/testimonials';

const INITIAL_ERROR_TESTOMIALS = {
  name: null,
  message: null,
  stars: null,
  order: null,
};

const useTestimonialsSection = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const quillRef = useRef();
  const quillRef2 = useRef();
  const [errorField, setErrorField] = useState({});
  const [editData, setEditData] = useState();

  // Data
  const testimonial = useSelector((state) =>
    state.testimonials.testimonials.find(
      (testimonial) => testimonial.id === editData?.id
    )
  );
  const { actionTestimonials, status, message } = useSelector(
    (state) => state.testimonials
  );
  const sectionFooter = useSelector((state) =>
    state.settings.settings.filter(
      (setting) => setting.type === 'sectionFooter'
    )
  );
  const footerSection = sectionFooter.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
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
  const settings = useSelector((state) => state.settings.settings);

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
    const quillObj = quillRef2.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef2.current.unprivilegedEditor.getHTML();
    onChangeSetting('text', changes);
  };
  const onChangeSetting = (feature, value) => {
    dispatch(
      changeSettings({
        feature,
        value,
        type: testimonialsSection.bgColor.type,
      })
    );
  };
  const onChangeTestimonial = (name, value) => {
    dispatch(changeTestimonial({ name, value, id: editData.id }));

    if (value === '') {
      setErrorField({
        ...errorField,
        [name]: 'Requerido',
      });
      return;
    } else {
      setErrorField({
        ...errorField,
        [name]: null,
      });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      let formError = false;
      let fieldsErrors = Object.assign({}, errorField);
      const fields = ['name', 'message', 'stars', 'order'];
      for (let field of fields) {
        if (testimonial[field] === '') {
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

      if (actionTestimonials === 'NEW') {
        dispatch(onCreateTestimonial());
      } else {
        dispatch(onUpdateTestimonial());
      }
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };
  const setDelError = () => {
    setErrorField(INITIAL_ERROR_TESTOMIALS);
  };
  const onCancel = () => {
    dispatch(getAllTestimonials());
    dispatch(getAllSettings());
  };

  return {
    testimonialsSection,
    footerSection,
    quillRef,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    errorField,
    editData,
    setDelError,
    setEditData,
    onChangeTestimonial,
    onSubmit,
    handleSelect,
    onChangeSetting,
    onCancel,
  };
};

export default useTestimonialsSection;
