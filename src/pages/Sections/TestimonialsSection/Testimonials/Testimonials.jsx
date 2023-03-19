import DataTable from 'react-data-table-component';
import { paginationComponentOptions } from '@/config/constants';
import { Modal } from '@/commons/Modal/Modal';
import Testimonial from '../Testimonial/Testimonial';
import DeleteTestimonial from '../DeleteTestimonial/DeleteTestimonial';
import useTestimonials from './useTestimonials';

const Testimonials = ({
  errorField,
  setDelError,
  onChangeTestimonial,
  // onChangeClinicImage,
  editData,
  setEditData,
}) => {
  const {
    actionTestimonials,
    columns,
    testimonials,
    actionsMemo,
    isOpenModal,
    closeModal,
    handleCancelDelete,
    handleDelete,
  } = useTestimonials({ setEditData, setDelError, editData });
  return (
    <>
      TEST {actionTestimonials}
      {actionTestimonials === 'TESTIMONIALS' && (
        <DataTable
          title={<h1 className="title text-left">Clínicas</h1>}
          columns={columns}
          data={testimonials}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          actions={actionsMemo}
          dense
        />
      )}
      HOLAS: {actionTestimonials}
      {actionTestimonials !== 'TESTIMONIALS' && (
        <Testimonial
          editData={editData}
          errorField={errorField}
          onChangeTestimonial={onChangeTestimonial}
          // onChangeClinicImage={onChangeClinicImage}
        />
      )}
      <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
        <DeleteTestimonial
          testimonial={editData}
          handleCancelDelete={handleCancelDelete}
          handleDelete={handleDelete}
        />
      </Modal>
    </>
  );
};

export default Testimonials;
