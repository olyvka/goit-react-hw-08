import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";

export default function ContactList() {
  const filtereContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {filtereContacts.map((contact) => (
        <li className={css.listItem} key={contact.id}>
          <Contact
            name={contact.name}
            number={contact.number}
            id={contact.id}
          />
        </li>
      ))}
    </ul>
  );
}
