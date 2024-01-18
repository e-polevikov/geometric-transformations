

export function ResultDisplay({
  sumOfDistances,
  pathLength,
  numTransformations
}) {
  return (
    <>
      <h2 style={{textAlign: "center"}}>Результат</h2>
      <p>Сумма расстояний: {sumOfDistances}</p>
      <p>Длина пути: {pathLength}</p>
      <p>Число преобразований: {numTransformations}</p>
    </>
  );
}
