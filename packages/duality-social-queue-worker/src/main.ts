import { environment } from "./environments/environment";
import { PostSchema } from "@duality-social/duality-social-lib";

console.log("environment: ", environment.production ? "production" : "development");
// select all documents from posts where aiViewpointId is null
console.log("selecting all documents from posts where aiViewpointId is null");
