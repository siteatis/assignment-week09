import Link from "next/link";

export default function NOTFOUND() {
  return (
    <>
      <h1>Sorry, we can't find that page!</h1>
      <hr />
      <Link className="hover:border-2" href="/">
        Click here to return to the homepage
      </Link>
    </>
  );
}
