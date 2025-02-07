import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { get_orders } from '../../store/reducers/orderReducer'

const Orders = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const { myOrders, order } = useSelector(state => state.order)
    const [state, setState] = useState('all')


    useEffect(() => {
        dispatch(get_orders({ status: state, customerId: userInfo.id }))
    }, [state])

    const traducirEstadoPago =(estado)=>{
        switch (estado) {
            case "paid":
                return "pagado"

            case "unpaid":
                return "no pagado"
            default:
                return estado;
        }
    }

    const traducirEstadoOrden =(estado)=>{
        switch (estado) {
            case "placed":
                return "completado"

            case "cancelled":
                return "cancelado"

            case "pending":
                return "pendiente"
            default:
                return estado;
        }
    }

    const redirect = (ord) => {
        let items = 0;
        for (let i = 0; i < ord.length; i++) {
            items = ord.products[i].quantity + items
        }
        navigate('/payment', {
            state: {
                price: ord.price,
                items,
                orderId: ord._id
            }
        })
    }

    return (
        <div className='bg-white p-4 rounded-md'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-slate-600'>Mis Ordenes </h2>
                <select className='outline-none px-3 py-1 border rounded-md text-slate-600' value={state} onChange={(e) => setState(e.target.value)}>
                    <option value="all">--Estado de la orden ---</option>
                    <option value="placed">Completado</option>
                    <option value="pending">Pendiente</option>
                    <option value="cancelled">Cancelado</option>
                    <option value="warehouse">Depósito</option>
                </select>
            </div>
            <div className='pt-4'>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>Id de la orden</th>
                                <th scope='col' className='px-6 py-3'>Precio</th>
                                <th scope='col' className='px-6 py-3'>Estado del pago</th>
                                <th scope='col' className='px-6 py-3'>Estado de la orden </th>
                                <th scope='col' className='px-6 py-3'>Accion</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                myOrders.map((o, i) => <tr key={i} className='bg-white border-b'>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{o._id}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>${o.price}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{traducirEstadoPago(o.payment_status)}</td>
                                    <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>{traducirEstadoOrden(o.delivery_status)}</td>
                                    <td scope='row' className='px-6 py-4'>
                                        <Link to={`/dashboard/order/details/${o._id}`}>
                                            <span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded'>Ver</span>
                                        </Link>
                                        {
                                            o.payment_status !== 'paid' && <span onClick={() => redirect(o)} className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded cursor-pointer'>Pagar ahora </span>
                                        }
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders