import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const Transaction = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="px-5 py-10">
      <div className=" flex flex-row space-x-5 ">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Pemesanan</CardTitle>
            <hr />
          </CardHeader>
          <CardContent className="flex flex-col space-y-3">
            <div className="flex flex-row space-x-2">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="productName">Nama produk</Label>
                <Input type="text" className="w-56" placeholder="sabun" />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="productId">ID</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[150px] justify-between"
                    >
                      {value
                        ? frameworks.find(
                            (framework) => framework.value === value
                          )?.label
                        : "Cari ID..."}
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
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework.value
                                  ? "opacity-100"
                                  : "opacity-0"
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
            <div className="flex flex-col space-y-1">
              <Label htmlFor="price">Harga</Label>
              <Input type="text" placeholder="Rp.500,00-," />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="pcs">Jumlah</Label>
              <Input type="text" placeholder="1 Pcs" />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="total">Total</Label>
              <Input type="text" placeholder="Rp.500,00-," />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save</Button>
          </CardFooter>
        </Card>
        {/* <Card>Tes</Card> */}
      </div>
    </div>
  );
};

export default Transaction;
