import { useEffect, useState } from 'react';
import { getSections } from '@/services/api/sections';
// import { quillSimpleModules } from '@/config/constants';
import { updateSubsection } from '@/services/api/sections';

import SectionType from '../SectionType/SectionType';

const About = () => {
  const [section, setSection] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getSections();
    const about = data.find((el) => el.name === 'about');
    setSection(about);
  };

  console.log('SECTION', section);

  const onChange = (name, value) => {
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
          <SectionType
            section={section}
            onChange={onChange}
            handleChangeSubsection={handleChangeSubsection}
          />

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
