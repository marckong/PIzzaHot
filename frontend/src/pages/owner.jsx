import React, { useEffect, useState } from 'react';

import API from '@/components/layout/API';

export default function Owner() {
  const [topping, setTopping] = useState([]);

  useEffect(() => {
    allTopping();
  }, []);
  const allTopping = () => {
    API.get('owner/toppings')
      .then((res) => {
        setTopping(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const item = { name };
    API.post('/owner/toppings/create', item).then(() => allTopping());
  };

  const onUpdate = (id) => {
    const item = { name };
    API.patch(`/${id}/`, item).then((res) => allTopping());
  };

  const onDelete = (id) => {
    API.delete(`/${id}/`).then((res) => allTopping());
  };
  return (
    <div className='mt-20 flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
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
                    Title
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
                  >
                    Role
                  </th>
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {topping.map((topping, toppingIdx) => (
                  <tr
                    key={topping.name}
                    className={toppingIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900'>
                      {topping.name}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                      <a
                        href='#'
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Delete
                      </a>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
                      <a
                        href='#'
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit
                      </a>
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
