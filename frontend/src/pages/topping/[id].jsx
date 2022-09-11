import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import API from '@/components/layout/API';
export default function Topping() {
  const [topping, setTopping] = useState([]);
  const [toppingName, setToppingName] = useState('');
  const [error, setError] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [edit, setEdit] = useState(false);

  const router = useRouter();
  useEffect(() => {
    API.get(`owner/toppings/${router.asPath}`)
      .then((res) => {
        setTopping(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, []);

  /* create handle submit function for a button to add new topping */
  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('owner/toppings/create', { name: toppingName })
      .then((res) => {
        setToppingName('');
        setDisplayError(false);
      })
      .catch((err) => {
        setError("Can't create duplicate topping");
        setDisplayError(true);
      });
  };

  return (
    <div className='mx-auto mt-20 flex flex-col text-center'>
      <div className='mb-10 text-6xl'>{topping}</div>
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
            className='rounded-xl border-2 border-yellow-400 p-3'
            type='submit'
          >
            Add
          </button>
          <div className='text-xl text-red-500'>
            {displayError && (
              <div className='text-xl text-red-500'>{error}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
{
  /* const handleUpdate = (id) => {
    API.post(`owner/toppings/${id}`, { name: toppingName })
      .then((res) => {
        setToppingName('');
        allTopping();
        setDisplayError(false);
      })
      .catch((err) => {
        setError("Can't create duplicate topping");
        setDisplayError(true);
          const router = useRouter();
  console.log(router.query);
  return (
  */
}
