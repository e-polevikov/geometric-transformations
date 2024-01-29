import { Link } from 'react-router-dom';

import styles from './Home.module.css'

export function Home() {
  return (
    <div className={styles['homepage']}>
      <h1 style={{textAlign: "center"}}>Задача «Геометрические преобразования»</h1>

      <ul>
        <li><Link to="/geometric-transformations/level-1">Уровень 1</Link></li>
        <li><Link to="/geometric-transformations/level-2">Уровень 2</Link></li>
        <li><Link to="/geometric-transformations/level-3">Уровень 3</Link></li>
      </ul>

      <h2>Описание</h2>

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
  );
};
