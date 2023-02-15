import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { variables } from '@/config/variables';
import { useNotification } from '@/commons/Notifications/NotificationProvider';

const useAddPicture = ({ handleAddPict }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatchNotif = useNotification();

  let user = useSelector((state) => state.user.user);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    setDragActive(false);
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = async (file) => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append('image', file);
      const upload = await axios.post(
        `${variables.basePath}/posts/upload-file`,
        fd,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      handleAddPict('image', upload.data.image);
    } catch (error) {
      console.log('Error', error);
      dispatchNotif({
        type: 'ERROR',
        message: 'Error cargando la imagen',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    dragActive,
    loading,
    handleDrag,
    handleDrop,
    handleChange,
  };
};

export default useAddPicture;
