

export function ResultDisplay({ sumOfDistances, numTransformations }) {
  return (
    <>
      <h2 style={{textAlign: "center"}}>Результат</h2>
      <p>Сумма квадратов расстояний: {sumOfDistances}</p>
      <p>Длина пути: ...</p>
      <p>Число преобразований: {numTransformations}</p>
    </>
  );
}
