import { environment } from "./environments/environment";
import { PostCache, IPost } from "@digital-defiance/duality-social-lib";
console.log("environment: ", environment.production ? "production" : "development");
// select all documents from posts where aiViewpointId is null
console.log("selecting all documents from posts where aiViewpointId is null");
const query = PostCache.Model.find({ aiViewpointId: null });
query.exec().then((posts: Array<IPost>) => {
    console.log("posts: ", posts);
    posts.forEach((post: IPost) => {
        console.log("post: ", post);
    });
});