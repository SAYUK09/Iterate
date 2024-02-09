import { useRef, useState } from "react";
import "./App.css";
import { fetchProducts, generateImage } from "./util";

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
    try {
      const imgURL = await generateImage(searchQuery);
      setImgURL(imgURL);

      const { products, message } = await fetchProducts(searchQuery);

      if (products.length) {
        setProducts(products);
      } else {
        setMessage(message);
      }
    } catch (error) {
      console.error("There was a problem with the search operation:", error);
    }
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
