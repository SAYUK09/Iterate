import { useRef } from "react";
import "./App.css";

function App(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 1000
  ) => {
    let timeoutId: number;
    console.log(delay, "ddee");
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleSearch = debounce(async (searchQuery: string) => {
    fetch("http://localhost:5000/generate-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: searchQuery }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={() => {
            handleSearch(inputRef.current?.value);
          }}
          ref={inputRef}
        />
        <button>Enter</button>
      </div>
    </div>
  );
}

export default App;
