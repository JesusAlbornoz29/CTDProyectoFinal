import { Fragment, useState } from 'react'
import {TableUsers} from '../components/ListUsers/TableUsers'



function ListUsers() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-neutral pt-24 pb-12'>
    <TableUsers/>
    </div>
  )
}

export  default ListUsers;