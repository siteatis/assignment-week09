# intermediate push, very bare-bones, not quite MVP yet and a few things not working properly, but need to make sure it deploys OK in good time

So far:

# Notes

1. CLERK

- Sign up (username) & log in securely and edit profile, log out

2. NOTFOUND

- Error/not found page if visit nonexistent page

3. MOTION

- modern UI components, eg Radix UI primitive or similar, for nicer interface
- See notepad & https://techeducators.moodlecloud.com/mod/assign/view.php?id=6242

A) USER PROFILE PAGE

- Check user logged in and allow to edit their profile (username fixed, change password & bio, S: show user stats)
- Route such as user/[userId]
- Create new post
- S: prompt on login if bio left blank

B) HOME PAGE

- Logged in state (always shows in header) and option to log out or sign up

C) NOTFOUND PAGE

- With suitable settings and link back to homepage (S: or user profile if logged in)
- TODO: See if I need a separate one for the leaf pages or if it falls upwards
- See Notepad & Moodle: https://techeducators.moodlecloud.com/mod/assign/view.php?id=6240

D) PROFILE PAGE

- Based on which user is logged in, else no access.
- Shows bio and the user's posts.
- S: User can edit/delete own post (edit on dynamic route (“/posts/[id]/edit”) or by creating a modal).

E) S: GLOBAL TIMELINE

- S: show all posts so anyone can view and click thru to that user's profile
- SS: let posts be public/users

F) PLUMBING

- Customise clerk with imported route matcher?

X) STYLES

- use 1+ radix ui cmpt or similar

# Assets (DB)

wk9profiles (username VARCHAR(40) PRIMARY KEY, clerk_id TEXT NOT NULL UNIQUE,
stamp TIMESTAMP NOT NULL DEFAULT now(), bio TEXT)
wk9posts (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, clerk_id TEXT NOT NULL,
stamp TIMESTAMP DEFAULT now(), subject VARCHAR(255) NOT NULL,
content TEXT,
FOREIGN KEY (clerk_id) REFERENCES wk9profiles(clerk_id))

INSERT INTO wk9posts (clerk_id,subject,content) VALUES (
(SELECT clerk_id FROM wk9profiles WHERE username='alice'), 'First Post', 'Content of First Post');
INSERT INTO wk9posts (clerk_id,subject,content) VALUES (
(SELECT clerk_id FROM wk9profiles WHERE username='alice'), 'My Second Post, by Alice', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis nulla magna, dignissim laoreet ante elementum in. Nam malesuada arcu quis odio viverra porttitor. Suspendisse eu pretium diam. Duis aliquam nisl a quam aliquam congue. Etiam consectetur nibh nec ex sodales feugiat. Nullam malesuada enim quis est tincidunt dictum. Ut.');
INSERT INTO wk9posts (clerk_id,subject,content) VALUES (
(SELECT clerk_id FROM wk9profiles WHERE username='barry'), 'I didn''t copy this post off Alice', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis nulla magna, dignissim laoreet ante elementum in. Nam malesuada arcu quis odio viverra porttitor. Suspendisse eu pretium diam. Duis aliquam nisl a quam aliquam congue. Etiam consectetur nibh nec ex sodales feugiat. Nullam malesuada enim quis est tincidunt dictum. Ut.');

# Assets (text)

What is there to say about Alice? Well, no description would be complete without mentioning that lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis nulla magna, dignissim laoreet ante elementum in. Nam malesuada arcu quis odio viverra porttitor. Suspendisse eu pretium diam. Duis aliquam nisl a quam aliquam congue. Etiam consectetur nibh nec ex sodales feugiat. Nullam malesuada enim quis est tincidunt dictum. Ut. And that's really as much as we can tell you about Alice without, just, like, totally blowing your mind.

Barry's biography. Barry has a biography full of biographical information. Barry's biography full of biographical information, is full of biographical information from his biography. His biography, full of biographical information, also is full of biographical information from his biography.

Barry likes posting so much that he's decided to do it again, and this time directly, instead of through the SQL editor on Supabase.

Barry is pleased that his post worked first time with no bugs and immediately appeared on the page. He's going to go and snoop at other users' profiles now.

# Reflection

Please also provide an assignment reflection in your project README.md file.

Required
🎯 What requirements did you achieve?
🎯 Were there any requirements or goals that you were unable to achieve?
🎯 If so, what was it that you found difficult about these tasks?
Optional
🏹 Feel free to add any other reflections you would like to share about your submission, for example:

Requesting feedback about a specific part of your submission.
What useful external sources helped you complete the assignment (e.g Youtube tutorials)?
What errors or bugs did you encounter while completing your assignment? How did you solve them?
What went really well and what could have gone better?
