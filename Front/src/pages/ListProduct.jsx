import { Fragment, useState } from 'react'
import { TableListProduct } from '../components/ListProduct/TableListProduct';



function ListProduct() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='min-h-screen bg-neutral pt-24 pb-12'>
    <TableListProduct/>
    </div>
    
  )
}

export  default ListProduct;
