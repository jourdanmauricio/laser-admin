// import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const colourOptions = [
  { value: '/#inicio', label: 'Inicio' },
  { value: '/#about', label: 'Sobre mi' },
  { value: '/#services', label: 'Servicios' },
  { value: '/blog', label: 'Blog' },
  { value: '/contact', label: 'Contacto' },
];

const SelectOptions = ({ label, name, onHandleChange, value }) => {
  const handleChange = (e) => {
    console.log('change', e);
    onHandleChange(name, e.value);
  };
  console.log('value', value);

  return (
    <>
      <label className="form__label">{label}</label>
      <CreatableSelect
        className="basic-single"
        classNamePrefix="select"
        // defaultValue={value}
        value={colourOptions.find((opt) => opt.value === value)}
        // isClearable
        isSearchable
        name="color"
        options={colourOptions}
        onChange={handleChange}
      />
    </>
  );
};

export default SelectOptions;
