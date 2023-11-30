
/**
 * Endpoint to the Tenbeo Auth Instance.
 * No trailing slash, with protocol and port if needed
 * Ex :
 * - http://localhost:3000 if testing with a local instance running in dev mode.
 * - https://tenbeo-auth.my-corp.com if testing with a deployed instance.
 */
export const tenbeoAuthInstanceLocation = "http://localhost:3000"

/**
 * Slug of the Tenbeo Auth Application to use for login.
 * Created through Tenbeo Auth Admin panel.
 */
export const tenbeoAuthInstanceApplicationSlug = "react-application-example"