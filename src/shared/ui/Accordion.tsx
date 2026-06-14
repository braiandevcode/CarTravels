import type { ReactNode } from 'react';
import AccordionItem from './AccordionItems';

interface IAccordionProps {
  items: { question: string; answer: string }[]
}

const Accordion= ({ items }: IAccordionProps): ReactNode => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isDefaultOpen={index === 0}
        />
      ))}
    </div>
  )
}
export default Accordion;