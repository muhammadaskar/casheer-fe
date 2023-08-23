/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCategoryQuery } from '@/hooks/use-order';
import { useCreateProductMutation } from '@/hooks/use-product';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { ChangeEvent, FC, useReducer, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type InputCreateProduct = {
  category_id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
};

const CreateProduct: FC<Props> = ({ children }) => {
  const [valueCategory, setValueCategory] = useState('');
  const [openCategory, setOpenCategory] = useState(false);

  const { data: category } = useCategoryQuery();
  const createProduct = useCreateProductMutation();

  const [input, setInput] = useReducer(
    (current: InputCreateProduct, update: Partial<InputCreateProduct>) => ({
      ...current,
      ...update,
    }),
    {
      category_id: 0,
      name: '',
      price: 0,
      quantity: 0,
      description: '',
    }
  );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={'bottom'}>
        <SheetHeader className="mb-4">
          <SheetTitle>Tambah Produk</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right" htmlFor="productCategory">
            Kategori
          </Label>
          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCategory}
                className="col-span-3 flex justify-start"
              >
                {valueCategory
                  ? category?.data?.find(
                      (item: any) => item.name === valueCategory
                    )?.name
                  : 'Kategori'}

                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="col-span-3">
              <Command>
                <CommandInput placeholder="Kategori" />
                <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {category?.data?.map((item: any) => (
                    <CommandItem
                      key={item.id}
                      onSelect={(currentValue: any) => {
                        setValueCategory(
                          currentValue === valueCategory ? '' : currentValue
                        );
                        setInput({
                          category_id: item.id,
                        });

                        setOpenCategory(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          valueCategory === item.name
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama Produk
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Indomie"
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Harga
            </Label>
            <Input
              id="price"
              name="price"
              placeholder="2000"
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  price: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Qty
            </Label>
            <Input
              id="quantity"
              name="quantity"
              placeholder="10"
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  quantity: Number(e.target.value),
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Indomie goreng original"
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={() => createProduct.mutate(input)}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProduct;
