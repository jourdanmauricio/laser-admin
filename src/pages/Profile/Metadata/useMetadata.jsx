import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSettings, updateSettings } from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { delError, delMessage } from '@/store/settings';

const useMetadata = () => {
  const [errorField, setErrorField] = useState({
    meta_title: null,
    meta_description: null,
    meta_canonical: null,
    meta_url: null,
  });
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const { error, status, message } = useSelector((state) => state.settings);

  const meta_title = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'meta_title')
  );
  const meta_description = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'meta_description'
    )
  );
  const meta_canonical = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'meta_canonical'
    )
  );
  const meta_url = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'meta_url')
  );
  const onChangeSettings = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const pattern = e.target.pattern || e.target.dataset.pattern;
    const textError = e.target.title;

    dispatch(changeSettings({ feature: name, value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formError = false;
    let fieldsErrors = Object.assign({}, errorField);
    const fields = [
      'meta_title',
      'meta_description',
      'meta_canonical',
      'meta_url',
    ];
    for (let field of fields) {
      if (eval(field)['value'] === '') {
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

  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: status === 'success' ? 'SUCCESS' : 'ERROR',
        message,
      });
      dispatch(delMessage());
    }
  }, [message]);

  const closeMessage = () => {
    dispatch(delError());
  };
  return {
    errorField,
    status,
    error,
    meta_title,
    meta_description,
    meta_canonical,
    meta_url,
    closeMessage,
    onChangeSettings,
    handleSubmit,
  };
};

export default useMetadata;
