/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import SkeletonForm from '@/components/skeleton-loader/SkeletonForm';
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
  status: string;
};

type OrderFormType = {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
  code: string;
};

const OrderForm: FC<OrderProps> = ({ product, status }) => {
  const [openName, setOpenName] = useState(false);
  const [openId, setOpenId] = useState(false);
  const [disable, setDisable] = useState(true);
  const [qty, setQty] = useState(0);
  const [warn, setWarn] = useState('');

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
      product_name: '',
      price: 0,
      quantity: 0,
      total: 0,
      code: '',
    }
  );

  console.log(product);

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

  useEffect(() => {
    if (input.quantity >= qty) {
      setInput({
        quantity: qty,
      });
      setWarn(`Stok barang sisa ${qty}`);
    } else {
      setWarn('');
    }
  }, [input.quantity, qty]);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl lg:text-2xl pb-3">Pemesanan</CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        {status !== 'loading' ? (
          <>
            <div className="flex flex-row space-x-2">
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="productName">Nama produk</Label>
                <Popover open={openName} onOpenChange={setOpenName}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openName}
                      className="w-full justify-between text-xs sm:text-sm"
                    >
                      {input.product_name
                        ? product?.find((item) => item.code === input.code)
                            ?.name
                        : 'Cari produk...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-36 md:w-72 lg:w-72 p-0 ">
                    <Command>
                      <CommandInput placeholder="Cari produk..." />
                      <CommandEmpty>Produk tidak ditemukan.</CommandEmpty>
                      <ScrollArea className="h-52">
                        <CommandGroup>
                          {product
                            ?.filter((item) => item.quantity !== 0)
                            .map((item) => (
                              <CommandItem
                                key={item.id}
                                className="text-xs sm:text-sm"
                                onSelect={() => {
                                  setInput({
                                    product_name: item.name,
                                    price: item.price,
                                    id: item.id,
                                    code: item.code,
                                  });
                                  setQty(item.quantity);
                                  setOpenName(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    input.code === item.code
                                      ? 'opacity-100'
                                      : 'opacity-0'
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
                <Label htmlFor="productId">Kode Produk</Label>
                <Popover open={openId} onOpenChange={setOpenId}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openId}
                      className="w-36 md:w-[12.5rem] justify-between text-xs sm:text-sm"
                    >
                      {input.code
                        ? product?.find((item) => item.id === input.id)?.code
                        : 'Cari Kode Produk...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32 md:w-60 lg:w-[12.5rem] p-0">
                    <Command>
                      <CommandInput placeholder="Cari ID..." />
                      <CommandEmpty>ID tidak ditemukan.</CommandEmpty>
                      <ScrollArea className="h-52">
                        <CommandGroup>
                          {product
                            ?.filter((item) => item.quantity !== 0)
                            .map((item) => (
                              <CommandItem
                                key={item.id}
                                className="text-xs sm:text-sm"
                                onSelect={() => {
                                  setInput({
                                    product_name: item.name,
                                    price: item.price,
                                    id: item.id,
                                    code: item.code,
                                  });
                                  setQty(item.quantity);
                                  setOpenId(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    input.code === item.code
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {item.code}
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
                disabled={input.product_name === '' ? true : false}
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
                disabled={input.product_name === '' ? true : false}
                value={input.quantity}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setInput({
                    quantity: Number(numericValue(e.target.value)),
                  });
                }}
              />
              {warn === '' || input.product_name === '' ? (
                <></>
              ) : (
                <p className="text-sm text-red-500">{warn}</p>
              )}
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
          </>
        ) : (
          <SkeletonForm />
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={disable}
          onClick={() => {
            setOrderForm({
              id: input.id,
              product_name: input.product_name,
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
