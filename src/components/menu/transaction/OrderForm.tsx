/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { MyContext } from '@/context';
import { cn } from '@/lib/utils';
import { Product } from '@/types/product-type';
import { Types } from '@/types/reducer-type';
import { Check, ChevronsUpDown } from 'lucide-react';
import { ChangeEvent, FC, useContext, useReducer, useState } from 'react';

type OrderProps = {
  product?: Product[];
};

type OrderFormType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

const OrderForm: FC<OrderProps> = ({ product }) => {
  const [openName, setOpenName] = useState(false);
  const [openId, setOpenId] = useState(false);

  // const [valueName, setValueName] = useState('');
  // const [valueId, setValueId] = useState(0);

  const [input, setInput] = useReducer(
    (current: OrderFormType, update: Partial<OrderFormType>) => ({
      ...current,
      ...update,
    }),
    {
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      total: 0,
    }
  );

  const { dispatch } = useContext(MyContext);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl lg:text-2xl pb-3">Pemesanan</CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-2">
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="productName">Nama produk</Label>
            <Popover open={openName} onOpenChange={setOpenName}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openName}
                  className="w-full justify-between "
                >
                  {input.name
                    ? product?.find((item) => item.id === input.id)?.name
                    : 'Cari produk...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-36 md:w-72 lg:w-72 p-0">
                <Command>
                  <CommandInput placeholder="Cari produk..." />
                  <CommandEmpty>Produk tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {product?.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => {
                          setInput({
                            name: item.name,
                            price: item.price,
                            id: item.id,
                          });
                          setOpenName(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            input.id === item.id ? 'opacity-100' : 'opacity-0'
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
          <div className="flex flex-col space-y-2">
            <Label htmlFor="productId">ID</Label>
            <Popover open={openId} onOpenChange={setOpenId}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openId}
                  className="w-36 md:w-[12.5rem] justify-between "
                >
                  {input.id
                    ? product?.find((item) => item.id === input.id)?.id
                    : 'Cari ID...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-32 md:w-60 lg:w-[12.5rem] p-0">
                <Command>
                  <CommandInput placeholder="Cari ID..." />
                  <CommandEmpty>ID tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {product?.map((item) => (
                      <CommandItem
                        key={item.id}
                        onSelect={() => {
                          // setValueId(item.id);
                          setInput({
                            name: item.name,
                            price: item.price,
                            id: item.id,
                          });
                          setOpenId(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            input.id === item.id ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {item.id}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="price">Harga</Label>
          <Input
            name="price"
            type="text"
            placeholder="Rp.500,00-,"
            value={input.price}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="pcs">Jumlah</Label>
          <Input
            name="qty"
            type="text"
            placeholder="1 Pcs"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput({
                quantity: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="total">Total</Label>
          <Input
            name="total"
            type="text"
            placeholder="Rp.500,00-,"
            value={input.price * input.quantity}
            readOnly
            // onChange={(e: ChangeEvent<HTMLInputElement>) =>
            //   setInput({
            //     total: Number(e.target.value),
            //   })
            // }
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() =>
            dispatch({
              type: Types.Order,
              payload: {
                id: input.id,
                product_name: input.name,
                price: input.price,
                qty: input.quantity,
                total: input.price * input.quantity,
              },
            })
          }
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderForm;
