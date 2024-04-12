export { default } from "next-auth/middleware";

// configuration object on which route the middleware funtion should be applied

export const config = {
  matcher: [
    "/issues/new",
    "/issues/edit/:id+", // ad '+' to specify we need one or more parameters
  ],
};
