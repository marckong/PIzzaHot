import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

import API from '../components/layout/API';

export default function Owner() {
  const [pizzaName, setPizzaName] = useState('');
  const [error, setError] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [topping, setTopping] = useState([]);
  const [selected, setSelected] = useState([]);
  const [noValue, setNoValue] = useState(false);

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
 
  //iterate through the selected array and return the value of each object
  const selectedToppings = selected.map((topping) => {
    return topping.value;
  });

  //Makes sure no duplicate entries
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  // return a list of objects with label and value
  const options = topping.map((topping) => {
    return { label: topping.name, value: topping.id };
  });
  const handleError = () => {
    selected.length == 0 ? setNoValue(true) : setDisplayError(true);
    setTimeout(() => {
      setDisplayError(false);
      setNoValue(false);
    }, 4000);
  };

  /* create handle submit function for a button to add new pizza */
  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('chef/pizza/create', {
      name: capitalizeFirstLetter(pizzaName),
      toppings: selectedToppings,
    })
      .then((res) => {
        setPizzaName('');
        setSelected([]);
        allTopping();
        setDisplaySuccess(true);
        setTimeout(() => {
          setDisplaySuccess(false);
        }, 4000);
      })
      .catch((err) => {
        handleError();
        setPizzaName('');
        setSelected([]);
      });
  };

  return (
    <div className='mx-auto mt-20 items-center justify-center'>
      <div className='mb-6 text-center text-6xl'>Create a Pizza</div>
      <div className='mb-10 text-center'>
        <Link href='/chef' passHref>
          <a className='text-indigo-600 underline underline-offset-2 hover:text-indigo-900'>
            Back to Pizza list
          </a>
        </Link>
      </div>
      <div className='mb-10 flex flex-row items-center '>
        <div className=' mb-10 flex flex-row items-center '>
          <form onSubmit={handleSubmit}>
            <div className=' flex flex-row  justify-center space-x-6'>
              <div className='flex  flex-col items-center'>
                Pizza Name
                <input
                  type='text'
                  name='name'
                  text='text'
                  placeholder='Pizza Name'
                  className='focus:border-blue100 ring-0 focus:outline-none focus:ring-0'
                  value={pizzaName}
                  onChange={(e) => setPizzaName(e.target.value)}
                />
              </div>
              <div className='flex flex-col  items-center'>
                Select Toppings
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy='Select Toppings'
                />
              </div>
            </div>
            <div className='mt-10'>
              <button
                className='rounded-xl border-2 border-yellow-400 p-3 hover:bg-yellow-100'
                type='submit'
              >
                Create
              </button>
            </div>
            <div className='text-left'>
              {displaySuccess && (
                <p className='my-2 text-lg font-semibold text-green-500'>
                  Pizza created successfully.
                </p>
              )}
              {displayError && (
                <p className='text-red-500'>
                  Pizza name already used, please try another name.
                </p>
              )}
              {noValue && (
                <p className='text-red-500'>
                  No toppings selected, please select at least one topping.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
