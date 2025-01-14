import { fetchPosts } from "@/lib/Actions/post.action";
import Post from "./Post";

async function Posts() {
  const posts = await fetchPosts();
  // console.log(posts);
  

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default Posts;
