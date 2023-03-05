import ReactQuill from 'react-quill';
import AddPicture from '../AddPicture/AddPicture';
import useEditor from '@/config/useEditor';

const SectionType = ({ section, onChange, handleChangeSubsection }) => {
  const imageHandler = async () => {
    // openModal();
  };
  const { modules } = useEditor({ imageHandler });

  return (
    <>
      <div className="p-2 sm:p-10">
        <div className="flex flex-col sm:flex-row justify-between">
          <label>
            <input
              type="radio"
              id=""
              name="type"
              value="TEXT"
              checked={section.type === 'TEXT'}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <span className="ml-2">Texto</span>
          </label>
          <label>
            <input
              type="radio"
              id=""
              name="type"
              value="CARD"
              checked={section.type === 'CARD'}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <span className="ml-2">Tarjeta</span>
          </label>
          <label>
            <input
              type="radio"
              id=""
              name="type"
              value="SPLIT"
              checked={section.type === 'SPLIT'}
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <span className="ml-2">Pantilla dividida</span>
          </label>
        </div>

        <div className="mt-10">
          {section.type === 'TEXT' && (
            <div className="flex flex-col justify-between gap-2 w-full p-2 h-[300px] rounded border-4 border-solid border-teal-700">
              <p className="text-sm text-center">
                <span>Título</span>
              </p>
              <p className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                earum cum illum saepe et consequuntur, ratione deleniti enim
                praesentium ipsum impedit esse eaque natus molestiae. Dolorem
                voluptas architecto ex culpa.
              </p>
              <svg className="w-full md:w-1/2 mx-auto h-[50%]">
                <rect
                  width="100%"
                  height="100%"
                  stroke="gray"
                  strokeWidth="2"
                  fill="transparent"
                ></rect>
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="100%"
                  stroke="gray"
                  strokeWidth="2"
                />
                <line
                  x1="100%"
                  y1="0"
                  x2="0"
                  y2="100%"
                  stroke="gray"
                  strokeWidth="2"
                />
                Su navegador no soporta SVG :/
              </svg>
            </div>
          )}

          {section.type === 'CARD' && (
            <div className="w-full p-2 h-[300px] rounded border-4 border-solid border-teal-700">
              <div className="w-[300px] h-full m-auto overflow-hidden rounded border border-solid border-gray-700">
                <svg className="w-full h-[40%]">
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="100%"
                    y1="0"
                    x2="0"
                    y2="100%"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  Su navegador no soporta SVG :/
                </svg>
                <p className="text-sm text-center mt-2">
                  <span>Título</span>
                </p>
                <p className="text-xs p-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  earum cum illum saepe et consequuntur, ratione deleniti enim
                  praesentium ipsum impedit esse eaque natus molestiae. Dolorem
                  voluptas architecto ex culpa.
                </p>
              </div>
            </div>
          )}

          {section.type === 'SPLIT' && (
            <div className="flex flex-col sm:flex-row justify-between gap-2 w-full p-2 h-[300px] rounded border-4 border-solid border-teal-700">
              <div className="w-full sm:w-1/2 h-full overflow-hidden rounded border border-solid border-gray-700">
                <svg className="w-full h-[100%]">
                  <line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="100%"
                    y1="0"
                    x2="0"
                    y2="100%"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="100%"
                    stroke="gray"
                    strokeWidth="2"
                  />
                  Su navegador no soporta SVG :/
                </svg>
              </div>
              <div className="w-full sm:w-1/2 overflow-hidden">
                <p className="text-sm text-center mt-2">
                  <span>Título</span>
                </p>
                <p className="text-xs p-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  earum cum illum saepe et consequuntur, ratione deleniti enim
                  praesentium ipsum impedit esse eaque natus molestiae. Dolorem
                  voluptas architecto ex culpa.
                </p>
                <p className="text-xs p-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                  earum cum illum saepe et consequuntur, ratione deleniti enim
                  praesentium ipsum impedit esse eaque natus molestiae. Dolorem
                  voluptas architecto ex culpa.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="form__group w-full">
        <label className="form__label">Título</label>
        <input
          onChange={(e) => onChange(e.target.name, e.target.value)}
          onBlur={(e) => onBlurTitle(e.target.value)}
          className="form__input border-gray-500 w-full"
          type="text"
          id="title"
          name="title"
          placeholder="Título de post"
          value={section.title}
        />
        {/* <p
              className={`input__error ${
                error.title ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {error.title}
            </p> */}
      </div>

      {section.subsections.map((subsection) => (
        <div key={subsection.id}>
          {section.type !== 'TEXT' && (
            <AddPicture
              subsection={subsection}
              handleChangeSubsection={handleChangeSubsection}
            />
          )}
          <div className="form__group w-full editor">
            <label className="form__label">Contenido</label>
            <ReactQuill
              className="bg-gray-600"
              theme="snow"
              value={subsection.content}
              onChange={(e) =>
                handleChangeSubsection('content', e, subsection.id)
              }
              placeholder={'Write something awesome...'}
              modules={modules}
            />
          </div>
        </div>
      ))}
      <hr />
    </>
  );
};

export default SectionType;
