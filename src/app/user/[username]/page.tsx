import { notFound } from "next/navigation";
import { dbqry, dbgetOnly, dbget, dbpost } from "@u/dataLayer";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { asDateTime } from "@u/utils";

// TODO: currentUser() --> firstName, lastName, emailAddresses[0].emailAddress

type UserRow = {
  username: string;
  clerk_id: string;
  stamp: string;
  bio: string;
};
type PostRow = {
  id: number;
  clerk_id: string;
  stamp: string;
  subject: string;
  content: string;
};

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { userId } = await auth();
  //    if (!userId) redirect("/signup"); // not needed, private page anyway
  const { username } = await params;
  const user: UserRow = await dbgetOnly(dbqry.getUserByName, [username]);
  if (!user) notFound();

  // WAS: If logged in but try to access page for a different user, must say not found
  // rather than not allowed, else we've leaked the fact that such a username exists.
  //if (userId !== user.clerk_id) notFound();
  // NOW: Going to use the username as the slug instead, so it's no longer relevant
  // to conceal which usernames exist; this means Clerk username and DB username will
  // always be the same, so that'll need enforcing; and it lets us have a list of users
  // on the homepage to click through from.
  const isOwner = userId === user.clerk_id;
  const posts: PostRow[] = await dbget(dbqry.getPostsByUID, [user.clerk_id]);

  async function handleEditBio(formData: FormData) {
    "use server";
    dbpost(dbqry.setUserBio, [username, formData.get("bio")]);
    revalidatePath("/user/" + userId);
  }

  async function handleNewPost(formData: FormData) {
    "use server";
    dbpost(dbqry.addPost, [
      userId,
      formData.get("newPostSubj"),
      formData.get("newPostContent"),
    ]);
    revalidatePath("/user/" + userId);
  }

  return (
    <>
      <h1
        style={{ textAlign: "center" }}
        className="font-sans text-2xl m-1 p-2"
      >{`This is ${username}'s profile.`}</h1>
      <div>
        {isOwner ? (
          <form action={handleEditBio}>
            <fieldset className="m-4 p-1 w-full">
              <legend>View or edit your biography:</legend>
              <textarea
                className="darker w-full"
                rows={6}
                name="bio"
                defaultValue={user.bio}
                placeholder="Don't leave us in suspense! Tell us about yourself!"
              />
            </fieldset>
            <button type="submit" className="link1 p-2 m-1">
              Save your new bio!
            </button>
          </form>
        ) : (
          <p className="p-1 m-2 border-3 border-lime-800 rounded-md color-black">{`About ${username}: ${user.bio}`}</p>
        )}
      </div>
      <div className="flex flex-col">
        {posts.map((x) => (
          <div
            key={x.id}
            className="p-1 m-2 border-1 border-lime-400 rounded-lg"
          >
            <h1>
              {x.subject} ({asDateTime(x.stamp)})
            </h1>
            <p>{x.content}</p>
          </div>
        ))}
      </div>
      {isOwner && (
        <form action={handleNewPost}>
          <fieldset className="m-4 p-1 w-full">
            <legend>Create a new post</legend>
            <label htmlFor="newPostSubj">
              Subject:
              <input
                name="newPostSubj"
                className="darker border-1 rounded-sm m-1"
                required
              ></input>
            </label>
            <textarea
              className="darker w-full border-1 rounded-sm m-1 p-1"
              rows={8}
              name="newPostContent"
              placeholder="Entertain us!"
            />
          </fieldset>
          <button type="submit" className="link1 p-2 m-1">
            Create your post!
          </button>
        </form>
      )}
    </>
  );
}
