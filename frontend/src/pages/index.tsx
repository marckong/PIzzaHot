import * as React from 'react';

import Layout from '@/components/layout/Layout';

import Vercel from '~/svg/Vercel.svg';



export default function HomePage() {
  return (
    <Layout>

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <Vercel className='text-5xl' />
            <h1 className='mt-4'>
              Next.js + Tailwind CSS + TypeScript Starter
            </h1>
            <p className='mt-2 text-sm text-gray-800'>
      {' '}
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
