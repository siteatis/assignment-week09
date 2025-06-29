// For consistent date/time formatting across the app
export function asDateTime(sqlTimestamp: string) {
  // TODO: TypeScript - figure out why sqlTimestamp (which is required to be a string and which I am passing a string into) is an 'object' and not a string, causing .replace() to fail at runtime until I added the String() call. I assumed it was like C# in that if the parameter and argument are both something then they are both that thing, but maybe not? Or maybe I've just missed something silly.
  // TODO: Just insta-solved this by discovering that timestamps no longer behave they way they did just 2 weeks ago! The problem resolves now by simply not bothering to do the conversion! It doesn't solve the mystery, but I can just remove this function and park it as yet another mystery to solve at a later date.
  // TODO: Actually I'll return it in a tidy string format, as I'm low on time now and since "we're here anyway"...
  return new Date(sqlTimestamp).toLocaleString();

  console.log(sqlTimestamp);
  console.log(new Date(sqlTimestamp));
  console.log(String(sqlTimestamp.toString()));
  console.log(String(sqlTimestamp).replace(" ", "T"));
  console.log(new Date(String(sqlTimestamp).replace(" ", "T")));
  //return new Date(String(sqlTimestamp).replace(" ", "T"));
}
