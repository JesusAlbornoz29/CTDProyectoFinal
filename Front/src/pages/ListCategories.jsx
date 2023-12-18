import { Fragment, useState } from 'react'
import {TableCategories} from '../components/ListCategories/TableCategories'



function ListProduct() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='min-h-screen bg-neutral pt-24 pb-12'>
    <TableCategories/>
    </div>
    
  )
}

export  default ListProduct;