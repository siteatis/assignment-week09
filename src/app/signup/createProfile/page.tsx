import "server-only";
// TODO: Check - why does this have to be a descendant of signup page??

// TODO: redirects are your best friend to set up a convenient user flow
// TODO: clerk redirects are in .env.local
// TODO: Find out how to get Clerk to redirect to a dynamic page

import { auth } from "@clerk/nextjs/server";
import { dbqry, dbpost } from "@u/dataLayer";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function CreateProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/signup");
  const user = await currentUser();

  async function handleSubmit(formData: FormData) {
    "use server";
    const data = {
      username: formData.get("username"),
      bio: formData.get("bio"),
    };
    // TODO: No - clerk may have already chosen a username, so we can't change it ourselves
    // TODO: Reject duplicate usernames (not needed now?)
    dbpost(dbqry.addProfile, [data.username, userId, data.bio]);
    redirect("/user/" + data.username);
  }

  return (
    <>
      <h1>Please complete your profile information here:</h1>
      <form action={handleSubmit}>
        <fieldset>
          <legend>User Information</legend>
          <label htmlFor="username">Choose a username:</label>
          <input
            name="username"
            placeholder="Between 4 and 40 characters"
            min={4}
            max={40}
            defaultValue={user!.username as string}
            disabled
            required
          />
          <label htmlFor="bio">Tell other users about yourself:</label>
          <textarea
            className="darker"
            rows={12}
            name="bio"
            placeholder="Tell other users whatever you want them to know about you."
          />
        </fieldset>
        <button type="submit" className="link1">
          Save your details
        </button>
      </form>
    </>
  );
}
