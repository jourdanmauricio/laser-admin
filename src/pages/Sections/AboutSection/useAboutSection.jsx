import useEditor from '@/config/useEditor';
import { useRef } from 'react';
import { useModal } from '@/hooks/useModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllSettings,
  changeSettings,
  updateSettings,
} from '@/store/settings';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const useAboutSection = () => {
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const [isOpenModalWave, openModalWave, closeModalWave] = useModal(false);
  const quillRef = useRef();
  const quillRef2 = useRef();

  // Data
  const sectionAbout = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'sectionAbout')
  );
  const aboutSection = sectionAbout.reduce(
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

  // Images Module
  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  // Methods
  const onChangeSetting = (feature, value) => {
    dispatch(
      changeSettings({
        feature,
        value,
        type: aboutSection.bgColor.type,
      })
    );
  };
  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef2.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef2.current.unprivilegedEditor.getHTML();
    onChangeSetting('text', changes);
  };
  const onCancel = () => {
    dispatch(getAllSettings());
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const updated = settings.findIndex((setting) => setting.updated === true);
    if (updated === -1) return;

    try {
      dispatch(updateSettings());
    } catch (error) {
      dispatchNotif({
        type: 'ERROR',
        message: error,
      });
    }
  };

  return {
    aboutSection,
    servicesSection,
    quillRef,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    isOpenModalWave,
    openModalWave,
    closeModalWave,
    onChangeSetting,
    onSubmit,
    handleSelect,
    onCancel,
  };
};

export default useAboutSection;
