import { useProductQuery } from '@/hooks/use-product';

const Customer = () => {
  const { data } = useProductQuery();
  console.log(data);

  return <div>Customer</div>;
};

export default Customer;
