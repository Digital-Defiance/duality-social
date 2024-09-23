### User Authentication

References: `/apps/duality-social-node/src/controllers/api/user.ts`, `/apps/duality-social-node/src/models/tokenPayload.interface.ts`, `/apps/duality-social-node/src/services/user.ts`

The [`UserController`](/apps/duality-social-node/src/controllers/api/user.ts#L4) class is responsible for handling user-related API endpoints in the [`duality-social-node`](/apps/duality-social-node-e2e/src/duality-social-node/duality-social-node.spec.ts#L0) application. It defines routes for user registration and login, and delegates the implementation of these functionalities to the [`UserService`](/apps/duality-social-node/src/services/user.ts#L16) class.

The [`register()`](/apps/duality-social-node/src/controllers/api/user.ts#L17) method in the [`UserController`](/apps/duality-social-node/src/controllers/api/user.ts#L4) class extracts the [`email`](/apps/duality-social-node/src/controllers/api/user.ts#L18), [`username`](/apps/duality-social-node/src/controllers/api/user.ts#L18), and [`password`](/apps/duality-social-node/src/controllers/api/user.ts#L18) from the request body, and calls the [`register()`](/apps/duality-social-node/src/controllers/api/user.ts#L17) method of the [`UserService`](/apps/duality-social-node/src/services/user.ts#L16) class to create a new user. If the registration is successful, it returns a JSON response with a success message, the user's email, and username. If an error occurs, it returns a 400 Bad Request response with the error.

The [`login()`](/apps/duality-social-node/src/controllers/api/user.ts#L31) method in the [`UserController`](/apps/duality-social-node/src/controllers/api/user.ts#L4) class extracts the [`email`](/apps/duality-social-node/src/controllers/api/user.ts#L18) and [`password`](/apps/duality-social-node/src/controllers/api/user.ts#L18) from the request body, and calls the [`login()`](/apps/duality-social-node/src/controllers/api/user.ts#L31) method of the [`UserService`](/apps/duality-social-node/src/services/user.ts#L16) class to authenticate the user. If the login is successful, it returns a JSON response with a success message, the user object, and an [`Authorization`](/apps/duality-social-node/src/fetch.ts#L17) header containing a Bearer token. If the login fails (e.g., invalid credentials), it returns a 401 Unauthorized response with an error message.

The [`UserService`](/apps/duality-social-node/src/services/user.ts#L16) class is responsible for the core user authentication functionality. The [`register()`](/apps/duality-social-node/src/controllers/api/user.ts#L17) method in this class validates the email and password, checks for existing email and username, hashes the password, and creates a new user document in the MongoDB database. It also creates an email change document for email verification.

The [`login()`](/apps/duality-social-node/src/controllers/api/user.ts#L31) method in the [`UserService`](/apps/duality-social-node/src/services/user.ts#L16) class validates the email, finds the user by email, compares the provided password with the stored hash, and generates a JWT token if the login is successful. The [`generateToken()`](/apps/duality-social-node/src/services/user.ts#L104) and [`verifyToken()`](/apps/duality-social-react/src/utils/auth.ts#L7) methods are used for token management, while the [`findById()`](/apps/duality-social-node/src/services/feed.ts#L508) method retrieves a user document by its ID.

The [`ITokenPayload`](/apps/duality-social-node/src/models/tokenPayload.interface.ts#L1) interface defines the structure of the token payload, which includes information such as the user's object ID, subject, name, roles, and expiration time. This payload is used when generating and verifying the JWT tokens.