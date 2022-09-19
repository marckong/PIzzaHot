# SMPizza

## Summary

StrongMind Pizza is an application that assists both the owner of a restaurant and head chef with modifying ingredients and pizza.

Visit the site here: [StrongMindPizza](https://strongmindpizza.vercel.app/).

Visit the API docs here: [OpenAPI](https://desolate-inlet-48037.herokuapp.com/api/docs/).

## Technical Summary

SMPizza offeres two different REST APIs. One for the owner, and the other for the chef.
The APIs have full crud functionality.

Technical specifications:

- backend: Python(Django)
- frontend: React(NextJS)
- styling: TailwindCSS
- database: PostgreSQL
- documentation: OpenAPI
- hosting: Heroku and Vercel
- local development: both with and without Docker

### API walkthrough

Owner/Toppings:
_ Create new topping /create
_ Edit topping /<pk:id>
_ View/get individual topping /<pk:id>
_ Delete topping /<pk:id>/delete \* No duplicate toppings allowed

Chef/Pizza:
_ Create new pizza /create
_ Edit pizza name || toppings /<pk:id>
_ View/get individual pizza /<pk:id>
_ Delete pizza /<pk:id>/delete \* No duplicate pizzas allowed

## Local Install

Two different methods are offered for backend local development. Either from scratch or with Docker.

#### Backend

1. install python 3.8.10 or higher.
2. either install PostgreSQL locally, or use a hosted PSQL DB.
3. download and change the .env.sample to .env and to your desired credentials.
4. install project requirements `pip install -r requirements.txt`
5. run from your backend source directory:
   - python manage.py makemigrations
   - python manage.py migrate
   - python manage.py runserver
   - to test your backend is working correctly, navigate to
     - http://127.0.0.1:8000/api/docs/
     - http://127.0.0.1:8000/chef/pizza
     - http://127.0.0.1:8000/owner/toppings

##### Docker for backend

If you'd like to use Docker instead:

1. download Docker
2. change .env.sample -> .env and change the credentials.
3. run Docker-Compose up -d --build
4. Python, PostgreSQL will both be installed in the container, along with all the dependencies.
5. entrypoint.sh will handle the migrations.

#### Frontend

Regardless of base deployment or Docker, these instructions stay the same.

1. install npm
2. install project dependencies. From the frontend project source run: `npm install`
3. change frontend/components/API.jsx comment the current heroku it is pointing to out, and uncomment the local URL:
   - http://127.0.0.1:8000/ by default
4. run: `npm run dev` to start the development environment

## Run tests

- python manage.py test
