import { useDispatch, useSelector } from 'react-redux';
import { delError } from '@/store/testimonials';

const useTestimonial = ({ editData }) => {
  const testimonial = useSelector((state) =>
    state.testimonials.testimonials.find(
      (testimonial) => testimonial.id === editData.id
    )
  );
  const { error } = useSelector((state) => state.testimonials);
  const dispatch = useDispatch();

  const closeMessage = () => {
    dispatch(delError());
  };
  return {
    testimonial,
    error,
    closeMessage,
  };
};

export default useTestimonial;
