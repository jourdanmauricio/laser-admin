import ReactQuill from 'react-quill';
import AddPicture from '../../AddPicture/AddPicture';
import useEditor from '@/config/useEditor';
import { useRef, useState } from 'react';

const NewService = ({ servicesSection, onChangeNewSubsection }) => {
  const quillRef = useRef();
  const [newSubsection, setNewSubsection] = useState({
    image: '',
    alt_image: '',
    name: '',
    content: '',
    section_id: servicesSection.id,
  });

  const imageHandler = async () => {
    openModal();
  };
  const { modules } = useEditor({ imageHandler });

  const onChange = (name, value) => {
    setNewSubsection({
      ...newSubsection,
      [name]: value,
    });
    onChangeNewSubsection({
      ...newSubsection,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="form__group w-full">
        <label className="form__label">Nombre</label>
        <input
          onChange={(e) =>
            onChange(
              e.target.name,
              e.target.value
              // newSubsection.id
              // subsection.id
            )
          }
          className="form__input border-gray-500 w-full"
          type="text"
          name="name"
          placeholder="Nombre de subsección"
          value={newSubsection.name}
        />
        {/* <p
              className={`input__error ${
                error.title ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.title}
            </p> */}
      </div>
      <AddPicture
        subsection={newSubsection}
        handleChangeSubsection={onChange}
      />

      <div className="form__group w-full">
        <label className="form__label">Contenido</label>
        <ReactQuill
          ref={quillRef}
          className="bg-gray-300"
          theme="snow"
          value={newSubsection.content}
          onChange={(e) =>
            onChange(
              'content',
              e
              // newSubsection.section_id
              // subsection.id
            )
          }
          placeholder={'Write something awesome...'}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default NewService;
