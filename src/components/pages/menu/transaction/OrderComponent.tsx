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
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

const frameworks = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const OrderComponent = () => {
  const [openName, setOpenName] = useState(false);
  const [openId, setOpenId] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [valueName, setValueName] = useState('');
  const [valueId, setValueId] = useState('');
  const [valueCategory, setValueCategory] = useState('');

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl pb-3">Pemesanan</CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-2">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="productName">Nama produk</Label>
            <Popover open={openName} onOpenChange={setOpenName}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openName}
                  className="w-56 justify-between"
                >
                  {valueName
                    ? frameworks.find(
                        (framework) => framework.value === valueName
                      )?.label
                    : 'Cari produk...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0">
                <Command>
                  <CommandInput placeholder="Cari produk..." />
                  <CommandEmpty>Produk tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        onSelect={(currentValue: any) => {
                          setValueName(
                            currentValue === valueName ? '' : currentValue
                          );
                          setOpenName(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            valueName === framework.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {framework.label}
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
                  className="w-[150px] justify-between"
                >
                  {valueId
                    ? frameworks.find(
                        (framework) => framework.value === valueId
                      )?.label
                    : 'Cari ID...'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[150px] p-0">
                <Command>
                  <CommandInput placeholder="Cari ID..." />
                  <CommandEmpty>ID tidak ditemukan.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        onSelect={(currentValue: any) => {
                          setValueId(
                            currentValue === valueId ? '' : currentValue
                          );
                          setOpenId(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            valueId === framework.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="productCategory">Kategori</Label>
          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCategory}
                className="w-full justify-between"
              >
                {valueCategory
                  ? frameworks.find(
                      (framework) => framework.value === valueCategory
                    )?.label
                  : 'Kategori'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Kategori" />
                <CommandEmpty>Kategori tidak ditemukan.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                      onSelect={(currentValue: any) => {
                        setValueCategory(
                          currentValue === valueCategory ? '' : currentValue
                        );
                        setOpenCategory(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          valueCategory === framework.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {framework.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="price">Harga</Label>
          <Input type="text" placeholder="Rp.500,00-," />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="pcs">Jumlah</Label>
          <Input type="text" placeholder="1 Pcs" />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="total">Total</Label>
          <Input type="text" placeholder="Rp.500,00-," />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save</Button>
      </CardFooter>
    </Card>
  );
};

export default OrderComponent;
