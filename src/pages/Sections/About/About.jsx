import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { getSections } from '@/services/api/sections';
import { quillSimpleModules } from '@/config/constants';
import { updateSubsection } from '../../../services/api/sections';

const About = () => {
  const [section, setSection] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getSections();
    const about = data.find((el) => el.name === 'Sobre mi');
    setSection(about);
  };

  console.log('SECTION', section);

  const handleChange = (name, value) => {
    setSection({
      ...section,
      [name]: value,
    });
  };

  const handleChangeSubsection = (name, value, id) => {
    const newData = section.subsections.map((subsection) => {
      if (subsection.id === id) {
        const subsection2 = { ...subsection, [name]: value };
        return subsection2;
      } else {
        return subsection;
      }
    });

    setSection({
      ...section,
      subsections: newData,
    });
  };

  const onCancel = () => {
    // dispatch(initEditSettings());
  };

  const onSubmit = async () => {
    console.log('section', section);
    const newSection = await updateSubsection(section);

    setSection(newSection);
    console.log('section', newSection);
  };

  return (
    <>
      {section && (
        <>
          <div className="form__group w-full">
            <label className="form__label">Posición Título</label>
            <select
              name="type"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="form__input border-gray-500"
              value={section.type}
            >
              <option value="TEXT">Texto</option>
              <option value="CARD">Tarjeta</option>
              <option value="SPLIT">Pantalla divida</option>
            </select>
          </div>

          <div className="form__group w-full editor">
            <label className="form__label">Contenido</label>
            <ReactQuill
              className="bg-gray-600"
              theme="snow"
              value={section.subsections[0].content}
              onChange={(e) =>
                handleChangeSubsection('content', e, section.subsections[0].id)
              }
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
              // formats={section.type === 'TEXT' ? formats : ''}
            />
          </div>
          <div className="actions">
            <button
              onClick={onCancel}
              className="mt-8 btn__secondary"
              type="button"
            >
              Cancelar
            </button>

            <button
              onClick={onSubmit}
              className="my-8 btn__primary"
              type="button"
            >
              Modificar
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default About;
