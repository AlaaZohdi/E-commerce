import CheckOutForm from "../CheckOutForm";

interface PageProps {
  params: Promise<{ cartId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { cartId } = await params;

  console.log("CART ID FROM URL:", cartId);

  return <CheckOutForm cartId={cartId} />;
}