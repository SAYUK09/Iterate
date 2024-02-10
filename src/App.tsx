import { useRef, useState } from "react";
import { fetchProducts, generateImage } from "./util";
import bulb from "./assets/bulb.svg";
import Loader from "./components/Loader";

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
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-2 flex rounded-md my-4 justify-center items-center relative">
        <input
          className="border border-sky-300 p-2 text-2xl rounded-md pr-12 mr-1 outline-none focus:border-blue-500"
          type="text"
          onChange={() => {
            handleSearch(inputRef.current?.value);
          }}
          ref={inputRef}
        />
        {loading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-4">
            <Loader />
          </div>
        )}
        {!loading && imgURL && (
          <img
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-md mr-2"
            src={imgURL}
            alt="icon"
          />
        )}
      </div>

      {loading && <Loader />}
      <div>
        {!loading && products && (
          <div className="grid grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 my-4 w-96 "
              >
                <div className="flex items-center pb-4 border-b border-gray-300">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={product.icon}
                    alt="product-icon"
                  />
                  <p className="text-lg font-semibold">{product.title}</p>
                </div>
                <div>
                  <p className="pt-4">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && message && (
          <div className="bg-yellow-100 text-2xl border border-yellow-300 text-yellow-800 p-4 rounded-md shadow-md flex items-center">
            <img
              className="mx-2"
              width={50}
              height={50}
              src={bulb}
              alt="bulb-svg"
            />
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
