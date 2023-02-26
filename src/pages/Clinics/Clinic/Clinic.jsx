import useClinic from './useClinic';

const Clinic = ({ clinic, setClinic, action, setAction, handleSubmit }) => {
  const { error, handleChange, onSubmit, handleCancel } = useClinic({
    clinic,
    setClinic,
    setAction,
    handleSubmit,
  });
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="bg-white p-5 flex justify-center items-center flex-col"
      >
        <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-8">
          <div className="form__group w-full sm:w-1/2">
            <label className="form__label">Nombre</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="name"
              placeholder="Clínica las amelias"
              value={clinic.name}
            />
            <p
              className={`input__error ${
                error.name ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.name}
            </p>
          </div>
          <div className="form__group w-full sm:w-1/2">
            <label className="form__label">Email</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="email"
              placeholder="email@domain.com"
              value={clinic.email}
            />
            <p
              className={`input__error ${
                error.email ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center w-full gap-0 sm:gap-8">
          <div className="form__group w-full sm:w-1/3">
            <label className="form__label">Teléfono</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="phone"
              placeholder="(0221) 452 3030"
              value={clinic.phone}
            />
            <p
              className={`input__error ${
                error.phone ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.phone}
            </p>
          </div>
          <div className="form__group w-full sm:w-1/3">
            <label className="form__label">Orden</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="order"
              placeholder="(0221) 452 3030"
              value={clinic.order}
            />
            <p
              className={`input__error ${
                error.order ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.order}
            </p>
          </div>

          <div className="form__group w-full sm:w-1/3">
            <input
              checked={clinic.main}
              type="checkbox"
              value=""
              name="main"
              onChange={(e) => handleChange(e.target.name, e.target.checked)}
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
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="state"
              placeholder="Buenos Aires"
              value={clinic.state}
            />
            <p
              className={`input__error ${
                error.state ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.state}
            </p>
          </div>
          <div className="form__group w-full sm:w-1/3">
            <label className="form__label">Ciudad</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="city"
              placeholder="La Plata"
              value={clinic.city}
            />
            <p
              className={`input__error ${
                error.city ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.city}
            </p>
          </div>
          <div className="form__group w-full sm:w-1/3">
            <label className="form__label">Cod postal</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="cp"
              placeholder="1900"
              value={clinic.cp}
            />
            <p
              className={`input__error ${
                error.cp ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.cp}
            </p>
          </div>
        </div>
        <div className="form__group w-full">
          <label className="form__label">Calle</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form__input border-gray-500 w-full"
            type="text"
            name="street"
            placeholder="Diagonal 74"
            value={clinic.street}
          />
          <p
            className={`input__error ${
              error.street ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error.street}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-8">
          <div className="form__group w-full">
            <label className="form__label">Número</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="number"
              placeholder="1578"
              value={clinic.number}
            />
            <p
              className={`input__error ${
                error.number ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.number}
            </p>
          </div>
          <div className="form__group w-full">
            <label className="form__label">Piso</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="floor"
              placeholder="4"
              value={clinic.floor}
            />
            <p
              className={`input__error ${
                error.floor ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.floor}
            </p>
          </div>
          <div className="form__group w-full">
            <label className="form__label">Departamento</label>
            <input
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500 w-full"
              type="text"
              name="apartment"
              placeholder="B"
              value={clinic.apartment}
            />
            <p
              className={`input__error ${
                error.apartment ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.apartment}
            </p>
          </div>
        </div>
        <div className="form__group w-full">
          <label className="form__label">Días</label>
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form__input border-gray-500 w-full"
            type="text"
            name="days"
            placeholder="Viernes"
            value={clinic.days}
          />
          <p
            className={`input__error ${
              error.days ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error.days}
          </p>
        </div>
        <div className="form__group w-full">
          <label className="form__label">Observación</label>
          <textarea
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="form__input border-gray-500 w-full"
            type="text"
            name="observation"
            rows="3"
            placeholder="Observación"
            value={clinic.observation}
          ></textarea>
          <p
            className={`input__error ${
              error.observation ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {error.observation}
          </p>
        </div>
        <div className="actions">
          <button
            onClick={handleCancel}
            className="mt-8 btn__secondary"
            type="button"
          >
            Cancelar
          </button>
          <button className="mt-8 btn__primary" type="submit">
            {action === 'NEW' ? 'Crear clínica' : 'Editar clínica'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Clinic;
