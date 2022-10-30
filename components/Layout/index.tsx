import Navbar from "../Navbar";

interface Props {
  children: any;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}