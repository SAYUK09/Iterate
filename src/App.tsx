import { useRef, useState } from "react";
import "./App.css";

interface Product {
  id: number;
  icon: string;
  title: string;
  description: string;
  category: string[];
}

function App(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");

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
        setImgURL(data.image_url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch("http://localhost:5000/relevant-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_idea: searchQuery }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        console.log(data);
        if (data.products.length) {
          setProducts(data.products);
        } else {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  });

  return (
    <div>
      <div className="border border-sky-300 p-4">
        <div>
          <input
            type="text"
            onChange={() => {
              handleSearch(inputRef.current?.value);
            }}
            ref={inputRef}
          />
        </div>

        {imgURL && <img width={50} height={50} src={imgURL} />}
      </div>

      <div>
        {products.length ? (
          <div>
            {products.map((product) => {
              return <div>{product.title}</div>;
            })}
          </div>
        ) : (
          <div>{message}</div>
        )}
      </div>
    </div>
  );
}

export default App;
