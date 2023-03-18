// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const linksOptions = [
  { value: '/#inicio', label: 'Inicio' },
  { value: '/#about', label: 'Sobre mi' },
  { value: '/#services', label: 'Servicios' },
  { value: '/blog', label: 'Blog' },
  { value: '/contact', label: 'Contacto' },
];

const SelectOptions = ({ label, button, onHandleChange }) => {
  const handleChange = (e) => {
    console.log('change', e);
    onHandleChange(button.link.feature, e.value, button.link.type);
  };

  return (
    <>
      <label className="form__label">{label}</label>
      <CreatableSelect
        className="basic-single"
        classNamePrefix="select"
        // defaultValue={value}
        value={linksOptions.find((opt) => opt.value === button.link.value)}
        // isClearable
        isSearchable
        name="links"
        options={linksOptions}
        onChange={handleChange}
      />
    </>
  );
};

export default SelectOptions;
