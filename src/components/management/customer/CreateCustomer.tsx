import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useMemberMutation } from '@/hooks/use-member';
import React, { ChangeEvent, FC, useEffect, useReducer, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type InputCustomerType = {
  name: string;
  phone: string;
};

const CreateCustomer: FC<Props> = ({ children }) => {
  const [input, setInput] = useReducer(
    (current: InputCustomerType, update: Partial<InputCustomerType>) => ({
      ...current,
      ...update,
    }),
    {
      name: '',
      phone: '',
    }
  );
  const [disable, setDisable] = useState(true);

  const customerMutation = useMemberMutation();

  useEffect(() => {
    if (input.name === '' && input.phone === '') {
      return setDisable(true);
    }
    return setDisable(false);
  }, [input]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={'bottom'}>
        <SheetHeader className="mb-4">
          <SheetTitle>Tambah Customer</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              No. Hp
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="0852xxxxxxxx"
              maxLength={12}
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  phone: e.target.value,
                })
              }
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="submit"
              disabled={disable}
              onClick={() => customerMutation.mutate(input)}
            >
              Save
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default CreateCustomer;
