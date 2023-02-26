import Layout from '@/components/Layout/layout';
import DataTable from 'react-data-table-component';
import { Modal } from '@/commons/Modal/Modal';
import Message from '@/commons/Message/Message';
import Spinner from '@/commons/Spinner/Spinner';
import useClinic from './useClinics';
import Clinic from './Clinic/Clinic';
import DeleteClinic from './DeleteClinic/DeleteClinic';

const Clinics = () => {
  const {
    clinics,
    clinic,
    setClinic,
    setAction,
    action,
    status,
    error,
    columns,
    closeMessage,
    handleSubmit,
    paginationComponentOptions,
    actionsMemo,
    isOpenModalDelete,
    closeModalDelete,
    handleCancelDelete,
    handleDelete,
  } = useClinic();
  return (
    <Layout>
      {status === 'loading' && <Spinner />}
      <h1 className="title">
        {action === 'NEW' && 'Nueva clínica'}
        {action === 'EDIT' && 'Editar clínicas'}
      </h1>
      {error && <Message msg={error} closeMessage={closeMessage} />}
      {action === 'VIEW' && (
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
      {(action === 'NEW' || action === 'EDIT') && (
        <Clinic
          clinic={clinic}
          setClinic={setClinic}
          action={action}
          setAction={setAction}
          handleSubmit={handleSubmit}
        />
      )}

      <Modal isOpenModal={isOpenModalDelete} closeModal={closeModalDelete}>
        <DeleteClinic
          clinic={clinic}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>
    </Layout>
  );
};

export default Clinics;
