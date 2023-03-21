import { useState } from 'react';
import AccordionItem from './AccordionItem';
import PageSetting from '../PageSetting/PageSetting';
import { useSelector } from 'react-redux';

const Accordion = () => {
  const [toggleState, setToggleState] = useState(null);

  const toggleTab = (index) => {
    toggleState === index ? setToggleState(null) : setToggleState(index);
  };

  const contact = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'pageContact')
  );
  const pageContact = contact.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  const blog = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'pageBlog')
  );
  const pageBlog = blog.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  const post = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'pagePost')
  );
  const pagePost = post.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );

  const privacy = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'pagePrivacy')
  );
  const pagePrivacy = privacy.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const cookies = useSelector((state) =>
    state.settings.settings.filter((setting) => setting.type === 'pageCookies')
  );
  const pageCookies = cookies.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  const dataProtect = useSelector((state) =>
    state.settings.settings.filter(
      (setting) => setting.type === 'pageDataProtect'
    )
  );
  const pageDataProtect = dataProtect.reduce(
    (obj, cur) => ({ ...obj, [cur.feature]: cur }),
    {}
  );
  return (
    <ul className="list-none">
      <AccordionItem
        onToggle={() => toggleTab(0)}
        active={toggleState === 0}
        page="Blog"
      >
        <PageSetting page={pageBlog} />
      </AccordionItem>
      <AccordionItem
        onToggle={() => toggleTab(1)}
        active={toggleState === 1}
        page="Post - Entrada"
      >
        <PageSetting page={pagePost} />
      </AccordionItem>

      <AccordionItem
        onToggle={() => toggleTab(2)}
        active={toggleState === 2}
        page="Contacto"
      >
        <PageSetting page={pageContact} />
      </AccordionItem>
      <AccordionItem
        onToggle={() => toggleTab(3)}
        active={toggleState === 3}
        page="Políticas de privacidad"
      >
        <PageSetting page={pagePrivacy} />
      </AccordionItem>
      <AccordionItem
        onToggle={() => toggleTab(4)}
        active={toggleState === 4}
        page="Políticas de cookies"
      >
        <PageSetting page={pageCookies} />
      </AccordionItem>
      <AccordionItem
        onToggle={() => toggleTab(5)}
        active={toggleState === 5}
        page="Protección de datos"
      >
        <PageSetting page={pageDataProtect} />
      </AccordionItem>
    </ul>
  );
};

export default Accordion;
