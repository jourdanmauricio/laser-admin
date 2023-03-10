import ReactQuill from 'react-quill';
import { quillSimpleModules } from '@/config/constants';
import useEditor from '@/config/useEditor';
import { useRef } from 'react';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/commons/Modal/Modal';
import Media from '@/components/Media/Media';
import { useDispatch, useSelector } from 'react-redux';
import { changeSection, changeSubsection } from '@/store/sections';
import { changeSettings } from '@/store/settings';

const Blog = () => {
  const dispatch = useDispatch();
  const blogSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'blog')
  );
  const [isOpenModal, openModal, closeModal] = useModal(false);
  const quillRef = useRef();
  const blogBgColor = useSelector((state) =>
    state.settings.settings.find((setting) => setting.feature === 'blogBgColor')
  );

  const imageHandler = async () => {
    openModal();
  };

  const { modules } = useEditor({ imageHandler });

  const onChangeSubsection = (name, value, sectionId, id) => {
    dispatch(changeSubsection({ name, value, sectionId, id }));
  };

  const onChangeSection = (name, value) => {
    dispatch(changeSection({ name, value, id: blogSection.id }));
  };

  const handleSelect = (image) => {
    closeModal();
    const quillObj = quillRef.current.getEditor();
    quillObj.focus();
    const position = quillObj.getSelection();
    quillObj.editor.insertEmbed(position.index, 'image', image, 'user');
    const changes = quillRef.current.unprivilegedEditor.getHTML();
    dispatch(
      changeSubsection({
        name: 'content',
        value: changes,
        sectionId: blogSection.id,
        id: quillRef.current.props.id,
      })
    );
  };

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };

  return (
    <>
      {blogSection && (
        <div>
          <div className="form__group w-full">
            <label className="form__label">Título</label>
            <ReactQuill
              ref={quillRef}
              id={blogSection.id}
              className="bg-slate-300"
              theme="snow"
              value={blogSection.title}
              onChange={(e) => onChangeSection('title', e)}
              placeholder={'Write something awesome...'}
              modules={quillSimpleModules}
            />
          </div>

          {blogSection.subsections.map((subsection) => (
            <div key={subsection.id}>
              <div className="form__group w-full editor">
                <label className="form__label">Contenido</label>
                <ReactQuill
                  ref={quillRef}
                  id={subsection.id}
                  className="bg-slate-300"
                  theme="snow"
                  value={subsection.content}
                  onChange={(e) =>
                    onChangeSubsection(
                      'content',
                      e,
                      blogSection.id,
                      subsection.id
                    )
                  }
                  placeholder={'Write something awesome...'}
                  modules={modules}
                />
              </div>
              <hr />
              <Modal isOpenModal={isOpenModal} closeModal={closeModal}>
                <Media handleSelect={handleSelect} />
              </Modal>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 form__group">
        <label className="form__label">Color fondo sección</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name="blogBgColor"
            value={blogBgColor.value}
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
          <input
            type="text"
            value={blogBgColor.value}
            name="blogBgColor"
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Blog;
