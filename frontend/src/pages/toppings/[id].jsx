import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import API from '../../components/layout/API';
export default function Topping() {
  const [topping, setTopping] = useState([]);
  const [toppingName, setToppingName] = useState('');
  const [error, setError] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  //loads the selected topping given pk id
  useEffect(() => {
    API.get(`owner/toppings/view/${id}`)
      .then((res) => {
        setTopping(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [id, toppingName]);

  //Makes sure that there are no duplicate toppings
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  /* create handle submit function for a button to add new topping */
  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`owner/toppings/${id}`, {
      name: capitalizeFirstLetter(toppingName),
    })
      .then((res) => {
        setToppingName('');
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

  return (
    <div className='mx-auto mt-20 flex flex-col text-center'>
      <div className='mb-10 text-4xl'>Edit topping: {topping.name}</div>
      <div className='mb-10 flex flex-row items-center justify-center'>
        <form className='space-x-2' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            text='text'
            placeholder='Edit Topping'
            className='focus:border-blue100 ring-0 focus:outline-none focus:ring-0'
            value={toppingName}
            onChange={(e) => setToppingName(e.target.value)}
          />

          <button
            className='rounded-xl border-2 border-yellow-400 p-3'
            type='submit'
          >
            Edit
          </button>
          <div className='text-left'>
            {displaySuccess && (
              <p className='my-2 text-lg font-semibold text-green-500'>
                Topping succesfully edited.
              </p>
            )}
            {displayError && (
              <p className='text-red-500'>
                Oops! Cannot create duplicate topping. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
      <Link href='/owner' passHref>
        <a className='text-indigo-600 underline underline-offset-2 hover:text-indigo-900'>
          Back to Toppings list
        </a>
      </Link>
    </div>
  );
}
