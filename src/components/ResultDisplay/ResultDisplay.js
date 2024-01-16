

export function ResultDisplay({ numTransformations }) {
  return (
    <>
      <h2 style={{textAlign: "center"}}>Результат</h2>
      <p>Разность координат: ...</p>
      <p>Длина пути: ...</p>
      <p>Число преобразований: {numTransformations}</p>
    </>
  );
}
