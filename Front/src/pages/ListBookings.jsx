import { Fragment, useState } from 'react'
import{TableBookings} from "../components/ListBookings/TableBookings"



function ListProduct() {
  const [count, setCount] = useState(0)

  return (
    
    <div className='min-h-screen max-w-[100vw] bg-neutral pt-24 pb-12'>
    <TableBookings/>
    </div>
    
  )
}

export  default ListProduct;