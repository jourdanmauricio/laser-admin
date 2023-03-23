import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { getAllSettings, updateSettings } from '@/store/settings';
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
      }
      if (actionTestimonials === 'EDIT') {
        dispatch(onUpdateTestimonial());
      }

      setEditData({});
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
    actionTestimonials,
    footerSection,
    errorField,
    editData,
    setDelError,
    setEditData,
    onChangeTestimonial,
    onSubmit,
    onCancel,
  };
};

export default useTestimonialsSection;
