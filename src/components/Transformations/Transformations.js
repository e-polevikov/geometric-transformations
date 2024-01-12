import styles from './Transformations.module.css';

import { TRANSFORMATIONS } from '../../constants/Transformations';

export function Transformations({ transformation, setTransformation }) {
  return (
    <>
      <div className={styles['radio-btn']}>
        <input
          type={"radio"}
          id={TRANSFORMATIONS.ROTATE_CLOCKWISE}
          value={TRANSFORMATIONS.ROTATE_CLOCKWISE}
          checked={transformation === TRANSFORMATIONS.ROTATE_CLOCKWISE}
          onChange={(e) => setTransformation(e.target.value)}
        />
        <label htmlFor={TRANSFORMATIONS.ROTATE_CLOCKWISE}>
          Поворот относительно точки B на угол ABC по часовой стрелке
        </label>
      </div>

      <div className={styles['radio-btn']}>
        <input
          type={"radio"}
          id={TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
          value={TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
          checked={transformation === TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}
          onChange={(e) => setTransformation(e.target.value)}
        />
        <label htmlFor={TRANSFORMATIONS.ROTATE_COUNTER_CLOCKWISE}>
          Поворот относительно точки B на угол ABC против часовой стрелки
        </label>
      </div>

      <div className={styles['radio-btn']}>
        <input
          type={"radio"}
          id={TRANSFORMATIONS.REFLECT}
          value={TRANSFORMATIONS.REFLECT}
          checked={transformation === TRANSFORMATIONS.REFLECT}
          onChange={(e) => setTransformation(e.target.value)}
        />
        <label htmlFor={TRANSFORMATIONS.REFLECT}>
          Симметрия относительно прямой DE
        </label>
      </div>
    </>
  );
}
