import googleMeta from '@/assets/images/google_meta-opt.png';
import openGraph from '@/assets/images/open_graph-opt.png';
import Spinner from '@/commons/Spinner/Spinner';
import Message from '@/commons/Message/Message';
import useMetadata from './useMetadata';

const Metadata = () => {
  const {
    metaData,
    errorField,
    status,
    error,
    closeMessage,
    onChangeSettings,
    handleSubmit,
  } = useMetadata();
  return (
    <div className="mb-4">
      {status === 'loading' && <Spinner />}
      {error && <Message msg={error} closeMessage={closeMessage} />}
      <div className="w-full bg-slate-200 mt-4 p-4 rounded shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="flex flex-col justify-between items-center gap-4">
          <img src={googleMeta} alt="" />
          <div className="text-sm text-left text-gray-700">
            <p className="mb-4">
              El título de la página debe contener como máximo 60 cataracteres
            </p>
            <p className="mb-4">
              La descipción de la página debe contener como máximo 170
              cataracteres
            </p>
            <p className="mb-4">
              La imagen hero será la que aparecerá al mencionar la página en una
              red solcial
            </p>
          </div>
          <img src={openGraph} alt="" />

          <form className="w-full" onSubmit={handleSubmit} noValidate>
            <div className="form__group">
              <label className="form__label">Título Web</label>
              <input
                onChange={onChangeSettings}
                className={`form__input ${
                  !errorField.meta_title ? 'border-gray-500' : 'border-red-500'
                }`}
                type="text"
                name="meta_title"
                placeholder="Título para la web"
                value={metaData.meta_title.value || ''}
                title="Obligatorio. Máximo 60 caracteres"
                pattern="^.{1,60}$"
                required
              />
              <p
                className={`input__error ${
                  errorField.meta_title ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.meta_title}
              </p>
            </div>
            <div className="form__group">
              <label className="form__label">Descripción Web</label>
              <textarea
                onChange={onChangeSettings}
                className={`form__input ${
                  !errorField.meta_description
                    ? 'border-gray-500'
                    : 'border-red-500'
                }`}
                rows={3}
                type="text"
                name="meta_description"
                placeholder="Descripción para la web"
                value={metaData.meta_description.value || ''}
                title="Obligatorio. Máximo 170 caracteres"
                pattern="^.{1,170}$"
                required
              ></textarea>
              <p
                className={`input__error ${
                  errorField.meta_description ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.meta_description}
              </p>
            </div>
            <div className="form__group">
              <label className="form__label">Meta canonical</label>
              <input
                onChange={onChangeSettings}
                className={`form__input ${
                  !errorField.meta_canonical
                    ? 'border-gray-500'
                    : 'border-red-500'
                }`}
                type="text"
                name="meta_canonical"
                placeholder="Canonica de la web"
                value={metaData.meta_canonical.value || ''}
                title="Obligatorio. Ingresa una dirección web válida"
                pattern="^(https?://)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                required
              />
              <p
                className={`input__error ${
                  errorField.meta_canonical ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.meta_canonical}
              </p>
            </div>
            <div className="form__group">
              <label className="form__label">Meta url</label>
              <input
                onChange={onChangeSettings}
                className={`form__input ${
                  !errorField.meta_url ? 'border-gray-500' : 'border-red-500'
                }`}
                rows={3}
                type="text"
                name="meta_url"
                placeholder="url de la web"
                value={metaData.meta_url.value || ''}
                title="Obligatorio. Ingresa una dirección web válida"
                pattern="^(https?://)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$"
                required
              />
              <p
                className={`input__error ${
                  errorField.meta_url ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {errorField.meta_url}
              </p>
            </div>

            <button type="submit" className="btn__primary block ml-auto">
              Modificar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Metadata;
