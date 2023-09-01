/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useCreateCategoryMutation } from '@/hooks/use-product';
import React, { ChangeEvent, FC, useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

const AddCategory: FC<Props> = ({ children }) => {
  const [input, setInput] = useState('');
  const createCategory = useCreateCategoryMutation();

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Kategori</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Kategori
            </Label>
            <Input
              id="name"
              value={input}
              className="col-span-3"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput(e.target.value)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() =>
              createCategory.mutate(
                { name: input },
                {
                  onSuccess: () => {
                    toast({
                      variant: 'default',
                      description: 'Berhasil menambahkan kategori',
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
