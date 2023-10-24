/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useCategoryQuery } from '@/hooks/use-order';
import { useUpdateProductMutation } from '@/hooks/use-product';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ChangeEvent, FC, useReducer, useState } from 'react';

type Props = {
  id: number;
  category_id: number;
  product_code: string;
  category: string;
  name: string;
  price: number;
  qty: number;
  desc: string;
};

type InputType = {
  category_id: number;
  product_code: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
};

const UpdateSheet: FC<Props> = ({
  id,
  category_id,
  product_code,
  name,
  price,
  qty,
  desc,
}) => {
  const { data: category } = useCategoryQuery();
  const [input, setInput] = useReducer(
    (current: InputType, update: Partial<InputType>) => ({
      ...current,
      ...update,
    }),
    {
      category_id: category_id,
      product_code: product_code,
      name: name,
      price: price,
      quantity: qty,
      description: desc,
    }
  );
  const [valueCategory, setValueCategory] = useState(category_id);
  const [openCategory, setOpenCategory] = useState(false);

  const updateProductMutation = useUpdateProductMutation(id);

  return (
    <SheetContent side={'bottom'}>
      <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
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
                {category_id
                  ? category?.data?.find(
                      (item: any) => item.id === valueCategory
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
                      onSelect={() => {
                        setValueCategory(
                          item.id === valueCategory ? '' : item.id
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
                          valueCategory === item.id
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

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="product-code" className="text-right">
            Kode Produk
          </Label>
          <Input
            id="product-code"
            name="product-code"
            defaultValue={input.product_code}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput({
                product_code: e.target.value,
              })
            }
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={input.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput({
                name: e.target.value,
              })
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price
          </Label>
          <Input
            id="price"
            name="price"
            defaultValue={input.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput({
                price: Number(e.target.value),
              })
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Qty
          </Label>
          <Input
            id="quantity"
            name="quantity"
            defaultValue={input.quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput({
                quantity: Number(e.target.value),
              })
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            name="description"
            defaultValue={input.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput({
                description: e.target.value,
              })
            }
            className="col-span-3"
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button
            onClick={() =>
              updateProductMutation.mutate(input, {
                onSuccess: () => {
                  toast({
                    variant: 'default',
                    description: 'Berhasil mengubah produk',
                  });
                },
                onError: (error: any) => {
                  const message = JSON.parse(error?.response?.request.response);

                  toast({
                    variant: 'destructive',
                    description: message?.data.errors,
                    action: (
                      <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                  });
                },
              })
            }
          >
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpdateSheet;
