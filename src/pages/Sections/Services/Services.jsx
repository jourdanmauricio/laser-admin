import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSection, deleteSubsection, setAction } from '@/store/sections';
import { changeSettings } from '@/store/settings';
import ReactQuill from 'react-quill';
import {
  quillSimpleModules,
  paginationComponentOptions,
} from '@/config/constants';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EditService from './EditService/EditService';
import NewService from './NewService/NewService';

const Services = ({ onChangeNewSubsection }) => {
  const dispatch = useDispatch();
  const [editSub, setEditSub] = useState();
  const quillRef = useRef();

  const servicesSection = useSelector((state) =>
    state.sections.sections.find((section) => section.name === 'services')
  );
  const servicesBgColor = useSelector((state) =>
    state.settings.settings.find(
      (setting) => setting.feature === 'servicesBgColor'
    )
  );
  const { action } = useSelector((state) => state.sections);

  const columns = [
    {
      name: 'Imagen',
      width: '150px',
      cell: (servicesSection) => (
        <img src={servicesSection.image} alt={servicesSection.image_alt} />
      ),
    },
    {
      name: 'Nombre',
      selector: (servicesSection) => servicesSection.name,
    },
    {
      name: 'Acciones',
      button: true,
      cell: (servicesSection) => (
        <>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onEdit(servicesSection)}
          >
            <FaEdit className="text-blue-500 text-lg" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-200 p-2 rounded-full cursor-pointer disabled:text-gray-300"
            onClick={() => onDelete(servicesSection)}
          >
            <FaTrashAlt className="text-red-500 text-lg" />
          </button>
        </>
      ),
    },
  ];

  const onEdit = (data) => {
    setEditSub(data);
    dispatch(setAction({ action: 'EDIT' }));
  };

  const onNew = () => {
    dispatch(setAction({ action: 'NEW' }));
  };

  const onDelete = (subsection) => {
    dispatch(deleteSubsection(subsection.id));
  };

  const onChangeSection = (name, value) => {
    dispatch(changeSection({ name, value, id: servicesSection.id }));
  };

  const actionsMemo = useMemo(
    () => (
      <button onClick={onNew} className="btn__primary font-normal text-base">
        Nueva
      </button>
    ),
    [servicesSection]
  );

  const onChangeSetting = (feature, value) => {
    dispatch(changeSettings({ feature, value }));
  };

  return (
    <div>
      {servicesSection && (
        <div>
          {action === 'SECTIONS' && (
            <>
              <div className="form__group w-full">
                <label className="form__label">Título</label>
                <ReactQuill
                  ref={quillRef}
                  id={servicesSection.id}
                  className="bg-slate-300"
                  theme="snow"
                  value={servicesSection.title}
                  onChange={(e) => onChangeSection('title', e)}
                  placeholder={'Write something awesome...'}
                  modules={quillSimpleModules}
                />
              </div>

              <DataTable
                title={<h1 className="title text-left">Servicios</h1>}
                columns={columns}
                data={servicesSection.subsections}
                actions={actionsMemo}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                // progressPending={status === 'loading'}
              />
            </>
          )}
        </div>
      )}
      <div className="mt-8 form__group">
        <label className="form__label">Color fondo sección</label>
        <div className="flex items-center gap-4">
          <input
            className="form__input--color w-full border-gray-500"
            type="color"
            name="servicesBgColor"
            value={servicesBgColor.value}
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
          <input
            type="text"
            value={servicesBgColor.value}
            name="servicesBgColor"
            placeholder="#531253"
            className="form__input border-gray-500"
            onChange={(e) => onChangeSetting(e.target.name, e.target.value)}
          />
        </div>
      </div>

      {action === 'EDIT' && <EditService editSub={editSub} />}
      {action === 'NEW' && (
        <NewService
          servicesSection={servicesSection}
          onChangeNewSubsection={onChangeNewSubsection}
        />
      )}
    </div>
  );
};

export default Services;
