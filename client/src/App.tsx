// App.tsx
import { useState, useRef } from "react";

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
};

interface ProductItemProps {
  product: ProductType;
  onDelete: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}

const ProductItem = ({ product, onDelete, onUpdate }: ProductItemProps) => {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>

      <button type="button" onClick={() => onDelete(id)}>
        삭제하기
      </button>

      <form onSubmit={(event) => {
        event.preventDefault();
        onUpdate({
          id, 
          name: editName,
          price: editPrice,
          explanation: editExplanation,
        });
      }}>
        <input 
          type="text" 
          placeholder="상품 이름" 
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
        />
        <input 
          type="text" 
          placeholder="상품 설명" 
          value={editExplanation}
          onChange={(event) => setEditExplanation(event.target.value)}
        />
        <input 
          type="number" 
          placeholder="상품 가격" 
          value={editPrice}
          onChange={(event) => setEditPrice(parseInt(event.target.value))}          
        />
        <input type="submit" value="상품 수정하기" />
      </form>
    </div>
  );
}


function App() {

  const [products, setProducts] = useState<ProductType[]>([  
      {
        id: 0,
        name: "Iphone 13 Max",
        explanation: '디스플레이는 6.1인치 19.5:9 비율의 2532*1170 해상도를 지원하며 패널 형식은 AMOLED 방식의 Super Retina XDR 디스플레이다. 인치당 픽셀 수는 460 ppi이다. 120Hz의 터치 샘플링 레이트를 제공하고 명암비는 2,000,000:1이다',
        price: 1230000,
      },
    ]);
  
  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);
  const fakeId = useRef(0);
  
  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    fakeId.current += 1;
    setProducts([...products, {
      ...newProduct,
      id: fakeId.current,
    }]);
  };
  const handleDelete = (id: number) => 
    setProducts(products.filter((product) => product.id !== id));
  
  const handleUpdate = (updateProduct: {
      id: number;
      name: string;
      explanation:  string;
      price: number;
    }) => { 
    setProducts(products.map((product) => (
      product.id === updateProduct.id ? updateProduct : product
    )));
  };
  
   return (
      <>
        <form 
          onSubmit={(event) => {
            event.preventDefault();
            handleCreate({
                name,
                explanation,
                price,
              });
          }}
        >
          <input 
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text" 
          placeholder="상품 이름" 
        />
        <input 
          value={explanation}
          onChange={(event) => setExplanation(event.target.value)}
          type="text" 
          placeholder="상품 설명" 
        />
        <input 
          value={price}
          onChange={(event) => setPrice(parseInt(event.target.value))}          
          type="number" 
          placeholder="상품 가격" 
        />
        <input type="submit" value="상품 만들기" />

    </form>

    {products.map((product) => ( 
      <ProductItem key={product.id} product={product} onDelete={handleDelete} onUpdate={handleUpdate} /> 
    ))}
    </>
  );
}

export default App;
