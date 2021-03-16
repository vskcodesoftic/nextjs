import fs from 'fs/promises';
import path from 'path';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
     {products.map(product => <li key={product.id}>
       {product.title}
     </li>)}
    </ul>
  );
}

export async function getStaticProps(context){
  //root directory (project)
  const filePath = path.join(process.cwd(), 'data', 'dummyData.json')
  const JsonData = await fs.readFile(filePath);
  const data = JSON.parse(JsonData)


//redirect if no data
if(!data) {
  return {
    redirect : {
      destination : '/no-data'
    }
  }
}
// when not found
 if (data.products.length === 0){
   return {
     notFound : true
   };
 }

  return { props : {
    products : data.products
  },
  //regenrate page every 10sec
  revalidate : 10,
};
}

export default HomePage;
