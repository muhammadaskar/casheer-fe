/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn, numericValue, rupiahFormat } from '@/lib/utils';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { useOrderStore } from '@/store/useOrderStore';
import { Invoice, Product } from '@/types/product-type';

import { Check, ChevronsUpDown } from 'lucide-react';
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { shallow } from 'zustand/shallow';

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
  const [disable, setDisable] = useState(true);

  const { orderForm, setOrderForm, isClicked, setClick } = useOrderStore(
    (state) => ({
      orderForm: state.orderForm,
      setOrderForm: state.setOrderForm,
      isClicked: state.isClicked,
      setClick: state.setClick,
    }),
    shallow
  );
  const { invoiceForm, setInvoiceForm } = useInvoiceStore(
    (state) => ({
      invoiceForm: state.invoiceForm,
      setInvoiceForm: state.setInvoiceForm,
    }),
    shallow
  );

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

  const saveToTable = useCallback(() => {
    const existingItem = invoiceForm?.find(
      (item: Invoice) => item.id === orderForm.id
    );
    const newData = [...invoiceForm, orderForm];
    const data: any = newData.filter((item) => item.id !== 0);

    if (existingItem) {
      const updateInvoiceItem: any = invoiceForm.map((item: Invoice) =>
        item.id === orderForm.id
          ? { ...item, quantity: item.quantity + orderForm.quantity }
          : item
      );
      setInvoiceForm(updateInvoiceItem);
    } else {
      setInvoiceForm(data);
    }

    setInput({ quantity: 0 });
  }, [invoiceForm, setInvoiceForm, orderForm]);

  useEffect(() => {
    if (isClicked) {
      setClick(false);
      saveToTable();
    }
  }, [
    isClicked,
    orderForm,
    invoiceForm,
    setClick,
    setInvoiceForm,
    saveToTable,
  ]);

  useEffect(() => {
    if (input.quantity === 0) {
      return setDisable(true);
    }
    return setDisable(false);
  }, [input.quantity]);

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
                  <ScrollArea className="h-52">
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
                  </ScrollArea>
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
                  <ScrollArea className="h-52">
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
                  </ScrollArea>
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
            value={rupiahFormat(input.price)}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="pcs">Jumlah</Label>
          <Input
            name="qty"
            type="text"
            placeholder="1 Pcs"
            value={input.quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInput({
                quantity: Number(numericValue(e.target.value)),
              });
            }}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="total">Total</Label>
          <Input
            name="total"
            type="text"
            placeholder="Rp.500,00-,"
            value={rupiahFormat(input.price * input.quantity)}
            readOnly
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={disable}
          onClick={() => {
            // dispatch({
            //   type: Types.Order,
            //   payload: {
            //     id: input.id,
            //     product_name: input.name,
            //     price: input.price,
            //     qty: input.quantity,
            //     total: input.price * input.quantity,
            //   },
            // });
            setOrderForm({
              id: input.id,
              name: input.name,
              price: input.price,
              quantity: input.quantity,
              total: input.price * input.quantity,
            });

            setClick(true);
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderForm;
