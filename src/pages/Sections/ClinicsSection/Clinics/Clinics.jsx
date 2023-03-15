import DataTable from 'react-data-table-component';
import { paginationComponentOptions } from '@/config/constants';
import DeleteClinic from '../DeleteClinic/DeleteClinic';
import { Modal } from '@/commons/Modal/Modal';
import useClinics from './useClinics';
import Clinic from '../Clinic/Clinic';

const Clinics = ({
  errorField,
  setDelError,
  onChangeClinic,
  editData,
  setEditData,
}) => {
  const {
    actionClinics,
    columns,
    clinics,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  } = useClinics({ setEditData, setDelError, editData });
  return (
    <>
      {actionClinics === 'CLINICS' && (
        <DataTable
          title={<h1 className="title text-left">Clínicas</h1>}
          columns={columns}
          data={clinics}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          actions={actionsMemo}
          dense
        />
      )}

      {actionClinics !== 'CLINICS' && (
        <Clinic
          editData={editData}
          errorField={errorField}
          onChangeClinic={onChangeClinic}
        />
      )}

      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <DeleteClinic
          clinic={editData}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
};

export default Clinics;
