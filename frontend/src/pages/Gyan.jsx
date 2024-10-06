import { useLocation } from "react-router-dom"

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

import "react-accessible-accordion/dist/fancy-example.css";
import UserRecord from "../components/UserRecord";

const Gyan = () => {
    const location = useLocation();
    const gyan = location.state.gyan
  return (
    <section className="m-4">
      <div className="container mx-auto">
        <h1 className="underline text-3xl mb-4 text-center uppercase font-bold text-orange-500">
          {gyan.category.name}
        </h1>
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-20 md:justify-center px-4 mb-8">
          <div>
            <img src={gyan.user.avatar} alt={gyan.user.name} className="w-60" />
          </div>
          <div className="flex flex-col space-y-4">
            <UserRecord name="Name" value={gyan.user.name} />
            <UserRecord name="Branch" value={gyan.user.branch} />
            <UserRecord name="Batch" value={gyan.user.yearOfPassing} />
            <UserRecord name="Status" value={gyan.user.status} />
          </div>
        </div>
        <Accordion>
          {gyan.answers.map((answer) => (
            <AccordionItem key={answer._id}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {answer.question.question}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p>{answer.answer}</p>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
export default Gyan