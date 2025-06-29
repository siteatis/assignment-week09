import { Suspense } from "react";
import { dbqry, dbget } from "@u/dataLayer";
import { asDateTime } from "@u/utils";
import Link from "next/link";

export default async function HomePage() {
  const users = await dbget(dbqry.getUsers);

  return (
    <>
      {/* TODO: Intro &  animation component */}
      <Suspense fallback={"Please wait, loading user list..."}>
        <ul>
          {users.map((x) => (
            <Link key={x.clerk_id} href={`/user/${x.username}`} className="p-4">
              <p>
                Member {x.username} joined {asDateTime(x.stamp)}
              </p>
              <p>Click to view this user!</p>
            </Link>
          ))}
        </ul>
      </Suspense>
    </>
  );
}
