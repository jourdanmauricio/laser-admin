import useEditor from '@/config/useEditor';
import { useRef, useState } from 'react';
import { useModal } from '@/hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSubsection,
  changeSection,
  getAllSections,
  updateSections,
  updateSubsections,
} from '@/store/sections';
import { changeSettings, updateSettings } from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import {
  changeTestimonial,
  onCreateTestimonial,
  onUpdateTestimonial,
} from '@/store/testimonials';

const INITIAL_ERROR_TESTOMIALS = {
  name: null,
  message: null,
  stars: null,
  order: null,
};

const useTestimonialsSection = () => {
  const { actionTestimonials } = useSelector((state) => state.testimonials);

  const [errorField, setErrorField] = useState({});
  const [editData, setEditData] = useState();
  const { message, status } = useSelector((state) => state.sections);
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const testimonialsSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'testimonials')
  );
  const testimonialsBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'testimonialsBgColor'
    )
  );
  const testimonialsTextColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'testimonialsTextColor'
    )
  );

  const testimonial = useSelector((state) =>
    state.testimonials.testimonials.find(
      (testimonial) => testimonial.id === editData?.id
    )
  );

  const footerBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'footerBgColor'
    )
  );

  const waveTestimonialsShow = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'waveTestimonialsShow'
    )
  );
  const waveTestimonials = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'waveTestimonials'
    )
  );

  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const quillRef = useRef();
  const quillRef2 = useRef();

  const imageHandler = async () => {
    openModal();
  };

  const { modules } = useEditor({ imageHandler });

  const onChangeSubsection = (name, value, sectionId, id) => {
    dispatch(changeSubsection({ name, value, sectionId, id }));
  };

  const onChangeSection = (name, value) => {
    dispatch(changeSection({ name, value, id: testimonialsSection.id }));
  };

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef2.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef2.current.unprivilegedEditor.getHTML();
    dispatch(
      changeSubsection({
        name: 'content',
        value: changes,
        sectionId: testimonialsSection.id,
        id: quillRef2.current.props.id,
      })
    );
  };

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
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
    console.log('editData', editData);
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
      dispatch(updateSettings());

      if (actionTestimonials === 'NEW') {
        dispatch(onCreateTestimonial());
      } else {
        dispatch(onUpdateTestimonial());
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

  const setDelError = () => {
    setErrorField(INITIAL_ERROR_TESTOMIALS);
  };

  const onCancel = () => {
    dispatch(getAllSections());
  };

  return {
    testimonialsSection,
    quillRef,
    testimonialsBgColor,
    testimonialsTextColor,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    waveTestimonialsShow,
    waveTestimonials,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    footerBgColor,
    errorField,
    editData,
    setDelError,
    setEditData,
    onChangeTestimonial,
    onChangeSection,
    onChangeSubsection,
    onSubmit,
    handleSelect,
    onChangeSetting,
    onCancel,
  };
};

export default useTestimonialsSection;
