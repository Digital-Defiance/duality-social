# The Lifecycle of a Post
1) Create Post entry
2) Create PostViewpoint entry
3) Update Post entry with PostViewpoint ID -- this seems redundant, but we'll have to update either the post or the viewpoint with the ID of the other. * option b: pre-generate an ID for the post, create the viewpoint and then create the post
4) Queue worker polls for posts with no ai viewpoint id
5) Queue worker grabs a post, updates the id to an empty (0 ID) to prevent other workers from grabbing it
6) Viewpoint is submitted to OpenAI/ChatGPT/Azure, and a response is generated
7) Viewpoint is created in the database
8) Post is updated with the response viewpoint ID
9) requests for views of any viewpoint in a language other than the original language are queued for translation