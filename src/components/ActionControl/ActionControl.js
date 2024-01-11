import styles from './ActionControl.module.css';

import { ACTIONS } from '../../constants/Action';

export function ActionControl({ handleAction }) {
  return (
    <div className={styles['action-control']}>
      <div className={styles['apply-btn-container']}>
        <button
          className={styles['apply-btn']}
          onClick={() => handleAction(ACTIONS.APPLY)}
        >
          Применить
        </button>
      </div>
      <div className={styles['undo-redo-btn-container']}>
        <button
          className={styles['undo-redo-btn']}
          onClick={() => handleAction(ACTIONS.UNDO)}
        >
          {'\u21B6'}
        </button>
        <button
          className={styles['undo-redo-btn']}
          onClick={() => handleAction(ACTIONS.REDO)}
        >
          {'\u21B7'}
        </button>
      </div>
    </div>
  );
}