import Message from '@/commons/Message/Message';
import useClinic from './useClinic';

const Clinic = ({ editData, errorField, onChangeClinic }) => {
  const { clinic, error, closeMessage } = useClinic({
    editData,
  });

  return (
    <div>
      {clinic && (
        <div className="bg-white p-5 flex justify-center items-center flex-col">
          {error && <Message msg={error} closeMessage={closeMessage} />}
          <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-8">
            <div className="form__group w-full sm:w-1/2">
              <label className="form__label">Nombre</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="name"
                placeholder="Clínica las amelias"
                value={clinic.name || ''}
                title="Obligatorio. Máximo 250 caracteres"
                pattern="^.{1,250}$"
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
            <div className="form__group w-full sm:w-1/2">
              <label className="form__label">Email</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="email"
                placeholder="email@domain.com"
                value={clinic.email || ''}
                title="Ingresa un email válido"
                pattern="^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$"
                required
              />
              <p
                className={`input__error ${
                  errorField.email ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full gap-0 sm:gap-8">
            <div className="form__group w-full sm:w-1/3">
              <label className="form__label">Teléfono</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="phone"
                placeholder="(0221) 452 3030"
                value={clinic.phone || ''}
                title="El teléfono solo admite números, -, +, y ()"
                pattern="^[0-9*\s()+?-]*$"
                required
              />
              <p
                className={`input__error ${
                  errorField.phone ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.phone}
              </p>
            </div>
            <div className="form__group w-full sm:w-1/3">
              <label className="form__label">Orden</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="number"
                min="0"
                name="order"
                placeholder="Orden de aparición"
                value={clinic.order || ''}
              />
              <p
                className={`input__error ${
                  errorField.order ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.order}
              </p>
            </div>

            <div className="form__group w-full sm:w-1/3">
              <input
                checked={clinic.main}
                type="checkbox"
                value=""
                name="main"
                onChange={(e) => onChangeClinic(e)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="main"
                className="ml-2 text-sm font-medium text-gray-700 text"
              >
                Página principal
              </label>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-8">
            <div className="form__group w-full sm:w-1/3">
              <label className="form__label">Provincia</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="state"
                placeholder="Buenos Aires"
                value={clinic.state || ''}
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$"
                title="Ingresa solo letras"
                required
              />
              <p
                className={`input__error ${
                  errorField.state ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.state}
              </p>
            </div>
            <div className="form__group w-full sm:w-1/3">
              <label className="form__label">Ciudad</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="city"
                placeholder="La Plata"
                value={clinic.city || ''}
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$"
                title="Ingresa solo letras"
                required
              />
              <p
                className={`input__error ${
                  errorField.city ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.city}
              </p>
            </div>
            <div className="form__group w-full sm:w-1/3">
              <label className="form__label">Cod postal</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="cp"
                placeholder="1900"
                value={clinic.cp || ''}
                required
              />
              <p
                className={`input__error ${
                  errorField.cp ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.cp}
              </p>
            </div>
          </div>
          <div className="form__group w-full">
            <label className="form__label">Calle</label>
            <input
              onChange={(e) => onChangeClinic(e)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="street"
              placeholder="Diagonal 74"
              value={clinic.street || ''}
              required
            />
            <p
              className={`input__error ${
                errorField.street ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {errorField.street}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-8">
            <div className="form__group w-full">
              <label className="form__label">Número</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="number"
                placeholder="1578"
                value={clinic.number || ''}
                required
              />
              <p
                className={`input__error ${
                  errorField.number ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.number}
              </p>
            </div>
            <div className="form__group w-full">
              <label className="form__label">Piso</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="number"
                name="floor"
                placeholder="4"
                value={clinic.floor || ''}
              />
            </div>
            <div className="form__group w-full">
              <label className="form__label">Departamento</label>
              <input
                onChange={(e) => onChangeClinic(e)}
                className="form__input border-gray-500 w-full"
                type="text"
                name="apartment"
                placeholder="B"
                value={clinic.apartment || ''}
              />
            </div>
          </div>
          <div className="form__group w-full">
            <label className="form__label">Días</label>
            <input
              onChange={(e) => onChangeClinic(e)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="days"
              placeholder="Viernes"
              value={clinic.days || ''}
            />
          </div>
          <div className="form__group w-full">
            <label className="form__label">Observación</label>
            <textarea
              onChange={(e) => onChangeClinic(e)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="observation"
              rows="3"
              placeholder="Observación"
              value={clinic.observation || ''}
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clinic;
