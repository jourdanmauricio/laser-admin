import useBlogSection from './useBlogSection';
import Posts from './Posts/Posts';
import EditWave from '@/components/EditWave/EditWave';
import EditBtn from '@/components/EditBtn/EditBtn';
import SectionColors from '@/components/SectionColors/SectionColors';
import SectionContent from '@/components/SectionContent/SectionContent';
import SectionButtonPreview from '@/components/SectionButtonPreview/SectionButtonPreview';

const BlogSection = () => {
  const {
    blogSection,
    clinicsSection,
    actionPosts,
    button,
    editData,
    errorField,
    setEditData,
    setDelError,
    onSubmit,
    onCancel,
    onChangePost,
  } = useBlogSection();

  return (
    <form onSubmit={onSubmit} noValidate>
      {Object.keys(blogSection).length > 0 && (
        <>
          {/* SECTION */}
          <SectionContent section={blogSection} />
          <SectionButtonPreview button={button} section={blogSection} />
          <SectionColors section={blogSection} />
          {/* BOTON - WAVE */}
          <div className="flex flex-col sm:flex-row sm:gap-10">
            <EditWave
              currentSection={blogSection}
              waveColor={clinicsSection.bgColor} // Color siguiente seccion
              section="Entradas destacadas"
              nextSection="Consultorios"
            />

            <EditBtn button={button} currentSection={blogSection} />
          </div>
        </>
      )}

      <hr />

      <Posts
        errorField={errorField}
        onChangePost={onChangePost}
        editData={editData}
        setEditData={setEditData}
        setDelError={setDelError}
      />

      <div className="actions">
        <button
          onClick={onCancel}
          className="mt-8 btn__secondary"
          type="button"
        >
          Cancelar
        </button>

        <button className="my-8 btn__primary" type="submit">
          {actionPosts === 'NEW' ? 'Crear' : 'Modificar'}
        </button>
      </div>
    </form>
  );
};

export default BlogSection;
