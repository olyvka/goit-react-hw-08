import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../redux/filters/selectors.js";
import { changeFilter } from "../../redux/filters/slice.js";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(changeFilter(value));
  };

  return (
    <div className={css.container}>
      <p>Find contact by name or by number</p>
      <input
        className={css.field}
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={handleChange}
      />
    </div>
  );
}
