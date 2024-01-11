import styles from './ActionControl.module.css';

export function ActionControl() {
  return (
    <div className={styles['action-control']}>
      <div className={styles['apply-btn-container']}>
        <button
          className={styles['apply-btn']}
        >
          Применить
        </button>
      </div>
      <div className={styles['undo-redo-btn-container']}>
        <button
          className={styles['undo-redo-btn']}
        >
          {'\u21B6'}
        </button>
        <button
          className={styles['undo-redo-btn']}
        >
          {'\u21B7'}
        </button>
      </div>
    </div>
  );
}