import { Button } from "@/components/ui/button";
import { RiMenuUnfold3Fill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import {
  Sheet, SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import { Category, Subcategory } from '@/payload-types'

const MobileMenu = ({ categories }: { categories: Partial<Category>[] }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xl">
          <RiMenuUnfold3Fill />
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>
            <div className="w-full flex justify-center items-center my-5">
              <SheetClose asChild>
              <Link href="/">
                <Image
                  src={"/logo.png"}
                  alt="logo-small.png"
                  width={100}
                  height={100}
                  priority
                />
              </Link>
              </SheetClose>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="w-full flex flex-col">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-between w-full bg-primary-foreground h-10 items-center border-0 border-y-2 border-solid border-[#0f172a]/5 px-5 shadow-sm"
            >
              <Link
                href={`/${category.slug}`}
                className="text-accent hover:text-accent-foreground"
              >
                <SheetClose>
                {category.title}
                </SheetClose>
              </Link>
              {category.subcategories?.docs?.length ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className='text-accent'>
                      <FaChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60">
                    {category.subcategories?.docs?.map((subcategory) => (
                      <DropdownMenuItem
                        key={(subcategory as Subcategory).id}
                        className="w-full "
                      >
                        <Link
                          href={`/${category.slug}/${(subcategory as Subcategory).slug}`}
                          className="text-accent hover:text-accent-foreground"
                        >
                          <SheetClose>
                          {(subcategory as Subcategory).title}
                          </SheetClose>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
