import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getPayload } from 'payload'
import config from '@payload-config'


export default async function Footer() {
  const payload = await getPayload({ config })

  const { docs: categories } = await payload.find(
    {
      collection: 'categories',
      select: {
        title: true,
        slug: true,
        subcategories: true
      }
    }
  );
  return (
    <footer className="w-full  bg-black text-white mt-10">
      <div className="w-[90%] mx-auto py-6">
        <div className="w-full py-5">
          <Link href="/">
            <Image src={'/logo.png'} alt="logo-small.png" width={150} height={150} priority />
          </Link>
        </div>
        <div className="mt-6 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 space-y-1">
          {categories.map((category) => (
            <React.Fragment key={category.slug}>
              <Link href={`/${category.slug}`} className="text-white font-semibold">
                {category.title}
              </Link>
              {category.subcategories?.docs?.map((subcategory) => {
                if (typeof subcategory === 'string') return null
                return <Link href={`/${category.slug}/${subcategory.slug}`} key={subcategory.id}>
                  {subcategory.title}
                </Link>
              })}
            </React.Fragment>
          ))}
        </div>
        <div className="md:text-center my-10 space-y-1">
          <h6 className="text-white text-lg font-semibold">Contact us</h6>
          <p>
            For enquiries:{' '}
            <a className="text-accent" href="mailto://info@theleadng.com">
              info@theleadng.com
            </a>
          </p>
          <p>
            Adverts & Editorials:{' '}
            <a className="text-accent" href="mailto://info@theleadng.com">
              editor@theleadng.com
            </a>
          </p>
        </div>
        <div className="w-full p-4">
          <p className="text-center text-white">Copyright © 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
