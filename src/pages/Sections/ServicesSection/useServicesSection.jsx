import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '@/commons/Notifications/NotificationProvider';
import { getAllSettings, updateSettings } from '@/store/settings';
import {
  changeService,
  onCreateService,
  onUpdateService,
  onDeleteService,
  setActionServices,
  delMessage,
} from '@/store/services';

const INITIAL_ERROR_SERVICE = {
  image: null,
  alt_image: null,
};

const useServicesSection = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [errorFields, setErrorFields] = useState(INITIAL_ERROR_SERVICE);
  const [editData, setEditData] = useState();

  // Data
  const { actionServices, status, message } = useSelector(
    (state) => state.services
  );
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

  const handleDelete = (service) => {
    dispatch(onDeleteService(service));
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
    errorFields,
    editData,
    setDelError,
    setEditData,
    onChangeService,
    onCancel,
    onSubmit,
    handleDelete,
  };
};

export default useServicesSection;
