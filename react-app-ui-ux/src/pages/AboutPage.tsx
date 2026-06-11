import { useEffect, useState } from "react";

type AboutPageProps = {};

export default function AboutPage({}: AboutPageProps) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count === 0) {
      setCount(5);
    }
  }, [count]);
  return (
    <>
      <h1>Count: {count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
          return;
        }}
      >
        increase
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
          return;
        }}
      >
        decrease
      </button>
    </>
  );
}
