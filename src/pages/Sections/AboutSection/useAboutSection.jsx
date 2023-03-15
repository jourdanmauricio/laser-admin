import useEditor from '@/config/useEditor';
import { useEffect, useRef } from 'react';
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

const useAboutSection = () => {
  const { message, status } = useSelector((state) => state.sections);
  const dispatch = useDispatch();
  const dispatchNotif = useNotification();
  const aboutSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'about')
  );
  const aboutBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'aboutBgColor'
    )
  );
  const waveAboutShow = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'waveAboutShow'
    )
  );
  const waveAbout = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'waveAbout')
  );

  const [isOpenModal, openModal, closeModal] = useModal(false);
  const quillRef = useRef();
  const quillRef2 = useRef();

  useEffect(() => {
    if (message) {
      dispatchNotif({
        type: `${status === 'success' ? 'SUCCESS' : 'ERROR'}`,
        message: message,
      });
    }
  }, [message]);

  const imageHandler = async () => {
    openModal();
  };

  const { modules } = useEditor({ imageHandler });

  const onChangeSubsection = (name, value, sectionId, id) => {
    dispatch(changeSubsection({ name, value, sectionId, id }));
  };

  const onChangeSection = (name, value) => {
    dispatch(changeSection({ name, value, id: aboutSection.id }));
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
        sectionId: aboutSection.id,
        id: quillRef.current.props.id,
      })
    );
  };

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(updateSettings());

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
    dispatch(getAllSections());
  };

  return {
    aboutSection,
    quillRef,
    aboutBgColor,
    quillRef2,
    modules,
    isOpenModal,
    closeModal,
    waveAboutShow,
    waveAbout,
    onChangeSubsection,
    onChangeSection,
    onSubmit,
    handleSelect,
    onChangeSetting,
    onCancel,
  };
};

export default useAboutSection;
