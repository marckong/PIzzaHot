import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import API from '../components/layout/API';

export default function Owner() {
  const [pizza, setPizza] = useState([]);
  const [error, setError] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [displayDelete, setDisplayDelete] = useState(false);
  const [topping, setTopping] = useState([]);

  useEffect(() => {
    allPizza();
    allTopping();
  }, []);

  const allPizza = () => {
    API.get('chef/pizza')
      .then((res) => {
        setPizza(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const allTopping = () => {
    API.get('owner/toppings')
      .then((res) => {
        setTopping(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  const handleDelete = (id) => {
    API.delete(`chef/pizza/${id}/delete`)
      .then((res) => {
        allPizza();
        setDisplayDelete(true);
        setTimeout(() => {
          setDisplayDelete(false);
        }, 4000);
      })
      .catch((err) => {
        setDisplayError(true);
        setTimeout(() => {
          setDisplayError(false);
        }, 4000);
      });
  };

  const toppingsFromPizza = (pizza) => {
    let newName = [];
    for (let i = 0; i < pizza.toppings.length; i++) {
      for (let j = 0; j < topping.length; j++) {
        if (pizza.toppings[i] === topping[j].id) {
          newName += ', ' + topping[j].name;
        }
      }
    }
    return newName.toString().replace(',', '');
  };

  return (
    <div className='mx-auto mt-20 flex flex-col text-center'>
      <div className='mb-10 text-6xl'>Pizza</div>
      <div className='mb-10 flex flex-row items-center justify-center'>
        <Link href='/createpizza'>
          <button
            className='rounded-xl border-2 border-yellow-400 p-3 hover:bg-yellow-100'
            type='submit'
          >
            Cick here to go create a pizza!
          </button>
        </Link>
      </div>
      {displayDelete && (
        <p className='text-red-500'>Topping deleted successfully.</p>
      )}
      <div className='-my-2 overflow-x-auto'>
        <div className='inline-block py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Toppings
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Edit
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {pizza
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((pizza, pizzaIdx) => (
                    <tr
                      key={pizza.name}
                      className={pizzaIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                        {pizza.name}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                        {toppingsFromPizza(pizza)}
                        {/* {pizza.toppings} */}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        <Link href={`/pizza/${pizza.id}`}>
                          <a className='text-indigo-600 hover:text-indigo-900'>
                            Edit
                          </a>
                        </Link>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                        <button
                          href='#'
                          className='text-indigo-600 hover:text-indigo-900'
                          onClick={() => handleDelete(pizza.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
