import * as React from "react";
import Link from "next/link";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import MobileMenu from "./mobile-menu";
import { getPayload } from 'payload'
import config from '@payload-config'
import { Category, Subcategory } from '@/payload-types'

export async function NavMenu() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find(
    {
      collection: 'categories',
      select: {
        title: true,
        slug: true,
        subcategories: true
      }
    }
  );
  const categories: Partial<Category>[] = docs
  return (
    <nav>
      <Menubar className="md:hidden">
        <MobileMenu categories={categories} />
      </Menubar>
      <Menubar className="hidden md:flex justify-center flex-wrap md:space-x-4 lg:space-x-6 ">
        <MenubarMenu>
          <Link
            href="/"
            className="text-accent hover:text-accent-foreground font-medium"
          >
            Home
          </Link>
        </MenubarMenu>
        {categories.map((category) => (
          <MenubarMenu key={category.id} >
            <Link
              href={`/${category.slug}`}
              className="text-accent hover:text-accent-foreground font-medium"
            >
              {category.title}
            </Link>
            {category.subcategories?.docs?.length ? <MenubarTrigger asChild={true}><span className='text-accent'>&#x2B9F;</span></MenubarTrigger> : ""}
            <MenubarContent className='absolute -right-20'>
              {category.subcategories?.docs?.map((subcategory) => (
                <MenubarItem key={(subcategory as Subcategory).slug}>
                  <Link
                    href={`/${category.slug}/${(subcategory as Subcategory).slug}`}
                    className="text-accent hover:text-accent-foreground"
                  >
                    {(subcategory as Subcategory).title}
                  </Link>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </nav>
  );
}
