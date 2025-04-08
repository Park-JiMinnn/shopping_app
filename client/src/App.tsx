import { useRef, useState } from 'react';


interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}
function App() {

  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: 'Iphone 13 Max',
      explanation: '디스플레이는 6.1인치 19.5:9 비율의 2532x1170 해상도를 지원하며 패널 형식은 아몰라방식으 슈퍼어쩌구 디스플레이이다. 인치당 픽셀 수는 몇개이다. 좋은 기능 다 있고 우리 제품 개쩔고', 
      price: 1230000,
    },
  ]);

  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);
  const fakeId = useRef(0);

  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    fakeId.current += 1;
    setProducts([
      ...products,
      {
        id: fakeId,
        name,
        explanation,
        price,          
      },
    ]);
  }
  
  
  

  return (
    <>
    <form onSubmit={(event) => {
        event.preventDefault();      
        fakeId += 1;
        setProducts([
          ...products,
          {
            id: fakeId,
            name,
            explanation,
            price,          
          },
        ]);
      }}
    >

      <input 
        value={name}
        onChange={(event) => setName(event.target.value)}       
        type='text' 
        placeholder='상품 이름' 
      />

      <input 
        value={explanation}
        onChange={(event) => setExplanation(event.target.value)}       
        type='text' 
        placeholder='상품 설명' 
      />
      
      <input 
        value={price}
        onChange={(event) => setPrice(parseInt(event.target.value, 10))}       
        type='number' 
        placeholder='상품 가격' 
      />

      <input type='submit' value='상품 만들기' />
    </form>

    {products.map((product) => (
      <div>
        <div>{products[0].id}</div>
        <div>{products[0].name}</div>
        <div>{products[0].price}</div>
        <div>{products[0].explanation}</div>
      </div>
    ))}
    </>
  );
}

export default App;
