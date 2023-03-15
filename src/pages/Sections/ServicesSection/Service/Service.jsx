import ReactQuill from 'react-quill';
import AddPicture from '../../AddPicture/AddPicture';
import { useRef } from 'react';
import { changeSubsection } from '@/store/sections';
import { useDispatch, useSelector } from 'react-redux';
import { quillSimpleModules } from '@/config/constants';

const Service = ({ service, errorFields }) => {
  const quillRef = useRef();
  const quillRef2 = useRef();
  const dispatch = useDispatch();

  const servicesBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'servicesBgColor'
    )
  );

  const section = useSelector((state) =>
    state.sections.sections.find((section) => section.id === service.section_id)
  );
  const subsection = section.subsections.find((sub) => sub.id === service.id);

  const onChangeSubsection = (name, value) => {
    dispatch(
      changeSubsection({
        name,
        value,
        sectionId: subsection.section_id,
        id: subsection.id,
      })
    );
  };

  return (
    <div>
      <div className="form__group w-full">
        <label className="form__label">Título</label>
        <ReactQuill
          ref={quillRef}
          style={{ backgroundColor: `${servicesBgColor.value}` }}
          theme="snow"
          value={subsection.name}
          onChange={(e) => onChangeSubsection('name', e)}
          placeholder={'Write something awesome...'}
          modules={quillSimpleModules}
        />
      </div>

      <AddPicture
        container={subsection}
        handleChangeImage={onChangeSubsection}
        error={errorFields}
      />

      <div className="form__group w-full">
        <label className="form__label">Contenido</label>
        <ReactQuill
          ref={quillRef2}
          style={{ backgroundColor: `${servicesBgColor.value}` }}
          theme="snow"
          value={subsection.content}
          onChange={(e) => onChangeSubsection('content', e)}
          placeholder={'Write something awesome...'}
          modules={quillSimpleModules}
        />
      </div>
    </div>
  );
};

export default Service;
