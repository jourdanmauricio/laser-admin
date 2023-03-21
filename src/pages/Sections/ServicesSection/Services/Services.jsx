import DataTable from 'react-data-table-component';
import { paginationComponentOptions } from '@/config/constants';
import DeleteService from '../DeleteService/DeleteService';
import { Modal } from '@/commons/Modal/Modal';
import Service from '../Service/Service';
import useServices from './useServices';

const Services = ({
  errorFields,
  setDelError,
  onChangeService,
  editData,
  setEditData,
}) => {
  const {
    actionServices,
    columns,
    services,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  } = useServices({ setEditData, setDelError, editData });
  return (
    <>
      {actionServices === 'SERVICES' && (
        <DataTable
          title={<h1 className="title text-left">Servicios</h1>}
          columns={columns}
          data={services}
          actions={actionsMemo}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      )}
      {actionServices !== 'SERVICES' && (
        <Service
          editData={editData}
          errorFields={errorFields}
          onChangeService={onChangeService}
        />
      )}
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <DeleteService
          service={editData}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
};
export default Services;
