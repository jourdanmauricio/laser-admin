import { useRef } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AccordionItem = ({ children, page, active, onToggle }) => {
  const contentEl = useRef();

  return (
    <li
      className={`border-t border-solid border-gray-400 ${
        active ? 'bg-slate-200' : ''
      }`}
    >
      <button
        className="bg-slate-900 text-white text-left flex flex-wrap w-full justify-between items-center py-4 px-10 cursor-pointer border-none"
        onClick={onToggle}
      >
        {page}
        <span className="text-xl">
          {active ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div
        ref={contentEl}
        className="overflow-hidden transition-height"
        style={
          active
            ? { height: contentEl.current?.scrollHeight }
            : { height: '0px' }
        }
      >
        <div className="p-2">{children}</div>
      </div>
    </li>
  );
};

export default AccordionItem;
