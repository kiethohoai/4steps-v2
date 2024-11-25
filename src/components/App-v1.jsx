import { useState } from 'react';

const faqs = [
  {
    title: 'Where are these chairs assembled?',
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
  },
  {
    title: 'How long do I have to return my chair?',
    text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
  },
  {
    title: 'Do you ship to countries outside the EU?',
    text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
  },
];

export default function App() {
  return (
    <div>
      <Accordion datas={faqs} />
    </div>
  );
}

function Accordion({ datas }) {
  const [curOpen, setCurOpen] = useState(null);

  return (
    <div className="accordion">
      {datas.map((data, i) => (
        <AccordionItem
          title={data.title}
          num={i + 1}
          key={`id-${i}`}
          curOpen={curOpen}
          setCurOpen={setCurOpen}
        >
          {data.text}
        </AccordionItem>
      ))}
    </div>
  );
}

function AccordionItem({ num, title, curOpen, setCurOpen, children }) {
  const open = curOpen === num;

  function handleClick() {
    setCurOpen(open ? null : num);
  }

  return (
    <div className={`item ${open ? 'open' : ''}`} onClick={handleClick}>
      <p className="number">{num < 10 ? `0${num}` : `${num}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{open ? '➖' : '➕'}</p>

      {open && <div className="content-box">{children}</div>}
    </div>
  );
}
