import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import API from '../components/layout/API';

export default function Owner() {
  const [topping, setTopping] = useState([]);
  const [toppingName, setToppingName] = useState('');
  const [error, setError] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayDelete, setDisplayDelete] = useState(false);
  useEffect(() => {
    allTopping();
  }, []);
  const allTopping = () => {
    API.get('owner/toppings')
      .then((res) => {
        setTopping(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  /* create handle submit function for a button to add new topping */
  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('owner/toppings/create', {
      name: capitalizeFirstLetter(toppingName),
    })
      .then((res) => {
        setToppingName('');
        allTopping();
        setDisplaySuccess(true);
        setTimeout(() => {
          setDisplaySuccess(false);
        }, 4000);
      })
      .catch((err) => {
        setDisplayError(true);
        setTimeout(() => {
          setDisplayError(false);
        }, 4000);
        setToppingName('');
      });
  };

  const handleDelete = (id) => {
    API.delete(`owner/toppings/${id}/delete`)
      .then((res) => {
        allTopping();
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
  return (
    <div className='mx-auto mt-20 flex flex-col text-center'>
      <div className='mb-10 text-6xl'>Toppings</div>
      <div className='mb-10 flex flex-row items-center justify-center'>
        <form className='space-x-2' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            text='text'
            placeholder='Add Topping'
            className='focus:border-blue100 ring-0 focus:outline-none focus:ring-0'
            value={toppingName}
            onChange={(e) => setToppingName(e.target.value)}
          />

          <button
            className='rounded-xl border-2 hover:bg-yellow-100 border-yellow-400 p-3'
            type='submit'
          >
            Add
          </button>
          <div className='text-left'>
            {displaySuccess && (
              <p className='my-2 text-lg font-semibold text-green-500'>
                Topping added.
              </p>
            )}
            {displayError && (
              <p className='text-red-500'>
                Oops! Cannot create duplicate topping. Please try again.
              </p>
            )}{' '}
            {displayDelete && (
              <p className='text-red-500'>Topping deleted successfully.</p>
            )}
          </div>
        </form>
      </div>
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
                {topping
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((topping, toppingIdx) => (
                    <tr
                      key={topping.name}
                      className={
                        toppingIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }
                    >
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                        {topping.name}
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                        <Link href={`/toppings/${topping.id}`}>
                          <a className='text-indigo-600 hover:text-indigo-900'>
                            Edit
                          </a>
                        </Link>
                      </td>
                      <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                        <button
                          href='#'
                          className='text-indigo-600 hover:text-indigo-900'
                          onClick={() => handleDelete(topping.id)}
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
