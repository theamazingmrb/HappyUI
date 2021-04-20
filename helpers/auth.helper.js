import { retrieveData } from "./localStorage.helper";

export default async function authHeader() {
  // grabbing the user from the local storage
  const user = await retrieveData("@user");
  console.log("User HEre", user);
  // check if user and if user has accessToken
  if (user.accessToken) {
    console.log("returned data", user.accessToken);
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
