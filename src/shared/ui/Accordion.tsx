import AccordionItem from './AcordionItems';

interface AccordionProps {
  items: { question: string; answer: string }[]
}

export function Accordion({ items }: AccordionProps) {
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
