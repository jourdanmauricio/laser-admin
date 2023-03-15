import { useDispatch, useSelector } from 'react-redux';
import { delError } from '@/store/clinics';

const useClinic = ({ editData }) => {
  const clinic = useSelector((state) =>
    state.clinics.clinics.find((clinic) => clinic.id === editData.id)
  );
  const { error } = useSelector((state) => state.clinics);
  const dispatch = useDispatch();

  const closeMessage = () => {
    dispatch(delError());
  };
  return {
    clinic,
    error,
    closeMessage,
  };
};

export default useClinic;
