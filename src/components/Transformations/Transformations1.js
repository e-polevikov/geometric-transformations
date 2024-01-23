import styles from './Transformations.module.css';

import { TRANSFORMATIONS } from '../../constants/Transformations';
import { ACTIONS } from '../../constants/Action';

export function Transformations1({
  transformation,
  setTransformation,
  handleChange
}) {
  return (
    <>
      <h2 style={{textAlign: "center"}}>Преобразования</h2>
      <div className={styles['radio-btn']}>
        <input
          type={"radio"}
          id={TRANSFORMATIONS.REFLECT}
          value={TRANSFORMATIONS.REFLECT}
          checked={transformation === TRANSFORMATIONS.REFLECT}
          onChange={() => {
            setTransformation(TRANSFORMATIONS.REFLECT);
            handleChange(
              ACTIONS.SET_TRANSFORMATION,
              {transformation: TRANSFORMATIONS.REFLECT}
            );
          }}
        />
        <label htmlFor={TRANSFORMATIONS.REFLECT}>
          Симметрия относительно прямой DE
        </label>
      </div>
    </>
  );
}
