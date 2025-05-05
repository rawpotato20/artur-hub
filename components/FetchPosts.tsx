import ContentCard from "@/components/cards/ContentCard";
import { getContent } from "@/lib/utils/content";

interface User {
  _id: string;
  id: string;
  email: string;
  username: string;
  password: string;
  personName: string;
  image: string;
  posts: any[];
  comments: any[];
  provider: string;
  __v: number;
}

interface Post {
  _id: string;
  likes: number;
  dislikes: number;
  comments: any[];
  views: number;
  title: string;
  content: string;
  contentType: string;
  thumbnail: string;
  tags: string[];
  user: User;
  __v: number;
}

export default async function FetchPosts() {
  const res = await getContent();

  if (!res.ok) throw new Error("Failed to fetch posts");

  const data = await res.json();
  const posts: Post[] = data.posts;

  return (
    <>
      {posts.map((post) => (
        <div key={post._id}>
          <ContentCard CONTENT={post} />
        </div>
      ))}
    </>
  );
}
