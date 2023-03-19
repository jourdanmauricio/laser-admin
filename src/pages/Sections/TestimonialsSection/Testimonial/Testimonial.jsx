import Message from '@/commons/Message/Message';
import useTestimonial from './useTestimonial';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Testimonial = ({ editData, errorField, onChangeTestimonial }) => {
  const { testimonial, error, closeMessage } = useTestimonial({
    editData,
  });

  const onClickStar = (index, value) => {
    let replacement;
    const newStars = testimonial.stars;
    if (value === '0') replacement = '1';
    if (value === '1') replacement = '2';
    if (value === '2') replacement = '0';

    const newValue =
      newStars.slice(0, index) + replacement + newStars.slice(index + 1);
    onChangeTestimonial('stars', newValue);
  };

  return (
    <div>
      {testimonial && (
        <div className="bg-white p-5 flex justify-center items-center flex-col">
          {error && <Message msg={error} closeMessage={closeMessage} />}
          <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-8">
            <div className="form__group w-full sm:w-1/2">
              <label className="form__label">Nombre</label>
              <input
                onChange={(e) =>
                  onChangeTestimonial(e.target.name, e.target.value)
                }
                className="form__input border-gray-500 w-full"
                type="text"
                name="name"
                placeholder="Nombre del paciente"
                value={testimonial.name || ''}
                required
              />
              <p
                className={`input__error ${
                  errorField.name ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.name}
              </p>
            </div>
            <div className="form__group w-full sm:w-2/5">
              <label className="form__label">Stars</label>

              <div className="form__input py-2.5 border-gray-500 flex gap-4 text-yellow-500">
                {testimonial.stars.split('').map((star, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => onClickStar(index, star)}
                  >
                    {star == '1' && <FaStar />}
                    {star === '0' && <FaStarHalfAlt />}
                    {star === '2' && <FaRegStar />}
                  </button>
                ))}
              </div>
            </div>
            <div className="form__group w-full sm:w-1/5">
              <label className="form__label">Orden</label>
              <input
                onChange={(e) =>
                  onChangeTestimonial(e.target.name, e.target.value)
                }
                className="form__input border-gray-500 w-full"
                type="number"
                min="0"
                name="order"
                placeholder="Orden de aparición"
                value={testimonial.order || ''}
              />
              <p
                className={`input__error ${
                  errorField.order ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.order}
              </p>
            </div>
          </div>
          <div className="form__group w-full">
            <label className="form__label">Testimonio</label>
            <textarea
              onChange={(e) =>
                onChangeTestimonial(e.target.name, e.target.value)
              }
              rows={4}
              className="form__input border-gray-500 w-full"
              type="text"
              name="message"
              placeholder="Testimonio"
              value={testimonial.message || ''}
              required
            ></textarea>
            <p
              className={`input__error ${
                errorField.message ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {errorField.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;
