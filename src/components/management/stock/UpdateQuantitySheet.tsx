/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useUpdateQuantityMutation } from '@/hooks/use-product';
import { ChangeEvent, FC, useState } from 'react';

type Props = {
  id: number;
  quantity: number;
};

const UpdateQuantitySheet: FC<Props> = ({ id, quantity }) => {
  const updateQuantity = useUpdateQuantityMutation(id);
  const [input, setInput] = useState(0);
  return (
    <SheetContent side={'bottom'}>
      <SheetHeader>
        <SheetTitle>Update Quantity</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantity
          </Label>
          <Input
            type="number"
            min={0}
            id="quantity"
            placeholder="2 Qty"
            defaultValue={quantity}
            className="col-span-3"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInput(Number(e.target.value))
            }
          />
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button
            type="submit"
            onClick={() =>
              updateQuantity.mutate(
                { quantity: input },
                {
                  onSuccess: () => {
                    toast({
                      variant: 'default',
                      description: 'Update quantity berhasil',
                    });
                  },

                  onError: (error: any) => {
                    const message = JSON.parse(
                      error?.response?.request.response
                    );

                    toast({
                      variant: 'destructive',
                      description: message?.data.errors,
                      action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                      ),
                    });
                  },
                }
              )
            }
          >
            Save
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpdateQuantitySheet;
