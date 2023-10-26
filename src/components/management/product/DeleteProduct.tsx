/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useDeleteProductMutation } from '@/hooks/use-product';
import React, { FC } from 'react';

type Props = {
  children: React.ReactNode;
  id: number;
};

const DeleteProduct: FC<Props> = ({ children, id }) => {
  const deleteProduct = useDeleteProductMutation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deleteProduct.mutate(id, {
                onSuccess: () => {
                  toast({
                    variant: 'default',
                    description: 'Berhasil menghapus produk',
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
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProduct;
