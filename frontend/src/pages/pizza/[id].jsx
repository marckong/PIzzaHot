import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

import API from '../../components/layout/API';

export default function EditPizza() {
  const [pizzaName, setPizzaName] = useState('');
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [topping, setTopping] = useState([]);
  const [selected, setSelected] = useState([]);
  const [noValue, setNoValue] = useState(false);
  const [error, setError] = useState('');
  const [displayError, setDisplayError] = useState(false);
  const [pizza, setPizza] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    allPizza();
    allTopping();
  }, [id, pizzaName]);
//returns all pizza
  const allPizza = () => {
    API.get(`chef/pizza/view/${id}`)
      .then((res) => {
        setPizza(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
//returns all toppings
  const allTopping = () => {
    API.get('owner/toppings')
      .then((res) => {
        setTopping(res.data);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
//extracts the pizza toppings from the pizza object and finds the topping object that matches the pizza topping
  const toppingsFromPizza = (pizza) => {
    let newName = [];
    for (let i = 0; i < pizza.toppings?.length; i++) {
      for (let j = 0; j < topping.length; j++) {
        if (pizza.toppings[i] === topping[j].id) {
          newName += ', ' + topping[j].name;
        }
      }
    }
    return newName.toString().replace(',', '');
  };
 //displays in drop down
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
    API.put(`chef/pizza/${id}`, {
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
      <div className='mb-6 text-center text-6xl'>Edit Pizza: {pizza.name}</div>
      <div className='mb-10 text-center'>
        <Link href='/chef' passHref>
          <a className='text-indigo-600 underline underline-offset-2 hover:text-indigo-900'>
            Back to Pizza list
          </a>
        </Link>
      </div>
      <div className='mb-10 items-center '>
        <div className=' mb-10 flex flex-col '>
          <form
            className='flex flex-col items-center justify-center'
            onSubmit={handleSubmit}
          >
            <div className=' flex flex-col items-center justify-center  space-y-10 space-x-6'>
              <div className='flex  flex-col items-center'>
                Edit Pizza Name
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
                <div className='mb-2'>Update Toppings</div>
                <div className='mb-2'>
                  Currently has:{toppingsFromPizza(pizza)}
                </div>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy='Select Toppings'
                />
              </div>
            </div>
            <div className='item mt-10'>
              <button
                className='rounded-xl border-2 border-yellow-400 p-3 hover:bg-yellow-100'
                type='submit'
              >
                Submit
              </button>
            </div>
            <div className='text-left'>
              {displaySuccess && (
                <p className='my-2 text-lg font-semibold text-green-500'>
                  Pizza updated successfully.
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
