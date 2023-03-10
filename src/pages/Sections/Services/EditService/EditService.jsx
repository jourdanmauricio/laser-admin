import ReactQuill from 'react-quill';
import AddPicture from '../../AddPicture/AddPicture';
import useEditor from '@/config/useEditor';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSubsection, setAction } from '@/store/sections';

const EditService = ({ editSub }) => {
  const quillRef = useRef();
  const dispatch = useDispatch();

  const servicesSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'services')
  );

  const subsection = servicesSection.subsections.find(
    (sub) => sub.id === editSub.id
  );

  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  const onChange = (name, image, id) => {
    onChangeSubsection(name, image, subsection.section_id, id);
  };

  const onChangeSubsection = (name, value, sectionId, id) => {
    dispatch(changeSubsection({ name, value, sectionId, id }));
  };

  return (
    <div>
      <div className="form__group w-full">
        <label className="form__label">Nombre</label>
        <input
          onChange={(e) =>
            onChangeSubsection(
              e.target.name,
              e.target.value,
              subsection.section_id,
              subsection.id
            )
          }
          className="form__input border-gray-500 w-full"
          type="text"
          name="name"
          placeholder="Nombre de subsección"
          value={subsection.name}
        />
        {/* <p
              className={`input__error ${
                error.title ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.title}
            </p> */}
      </div>

      <AddPicture subsection={subsection} handleChangeSubsection={onChange} />

      <div className="form__group w-full editor">
        <label className="form__label">Contenido</label>
        <ReactQuill
          ref={quillRef}
          className="bg-gray-600"
          theme="snow"
          value={subsection.content}
          onChange={(e) =>
            onChangeSubsection(
              'content',
              e,
              subsection.section_id,
              subsection.id
            )
          }
          placeholder={'Write something awesome...'}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default EditService;
