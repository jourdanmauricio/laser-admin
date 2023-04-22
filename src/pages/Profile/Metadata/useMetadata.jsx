import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSettings, updateSettings } from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { delError, delMessage } from '@/store/settings';

const useMetadata = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [errorField, setErrorField] = useState({
    meta_title: null,
    meta_description: null,
    meta_canonical: null,
    meta_url: null,
  });

  // Data
  const data = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'metaData')
  );
  const metaData = data.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const { error, statusSettings, message, settings } = useSelector(
    (state) => state.settings
  );

  // Methods
  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: statusSettings === 'success' ? 'SUCCESS' : 'ERROR',
        message,
      });
      dispatch(delMessage());
    }
  }, [message]);
  const onChangeSettings = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const pattern = e.target.pattern || e.target.dataset.pattern;
    const textError = e.target.title;

    dispatch(changeSettings({ feature: name, value, type: 'metaData' }));
    if (!e.target.required && !pattern) {
      setErrorField({
        ...errorField,
        [name]: null,
      });
    }

    if (e.target.required && value === '') {
      setErrorField({
        ...errorField,
        [name]: 'Requerido',
      });
    }

    let regex = new RegExp(pattern);
    regex.exec(value) === null
      ? setErrorField({
          ...errorField,
          [name]: textError,
        })
      : setErrorField({
          ...errorField,
          [name]: null,
        });
  };
  const closeMessage = () => {
    dispatch(delError());
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = settings.findIndex((setting) => setting.updated === true);
    if (updated === -1) return;

    let formError = false;
    let fieldsErrors = Object.assign({}, errorField);
    const fields = [
      'meta_title',
      'meta_description',
      'meta_canonical',
      'meta_url',
    ];
    for (let field of fields) {
      if (metaData[field]['value'] === '') {
        formError = true;
        fieldsErrors = {
          ...fieldsErrors,
          [field]: 'Requerido',
        };
      }
      if (error[field]) {
        formError = true;
      }
    }

    if (formError === true) {
      setErrorField(fieldsErrors);
      return;
    }

    dispatch(updateSettings());
  };

  return {
    metaData,
    errorField,
    statusSettings,
    error,
    closeMessage,
    onChangeSettings,
    handleSubmit,
  };
};

export default useMetadata;
