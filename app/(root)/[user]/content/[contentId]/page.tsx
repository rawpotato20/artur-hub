import CommentCard from "@/components/cards/CommentCard";
import ContentCardBelt from "@/components/ContentCardBelt";
import Tags from "@/components/Tags";
import WriteCommentCard from "@/components/cards/WriteCommentCard";
import Image from "next/image";
import { getContent } from "@/lib/utils/content";
import { cookies } from "next/headers";
import { getUserServer } from "@/lib/utils/users";
import { getRefreshTokenServer } from "@/lib/utils/tokens";

interface USER {
  personName: string;
  image: string;
}

interface COMMENT {
  comments?: COMMENT[];
  content: string;
  likes: number;
  dislikes: number;
  user: USER;
  _id: string;
}

const Content = async ({ params }: { params: { contentId: string } }) => {
  let isLoggedIn = false;

  //Get the specific Post
  const { contentId } = await params;
  const res = await getContent(contentId);
  const data = await res.json();

  //Get Access and Refresh Tokens
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken || !token)
    return console.log("No Refresh or Access Tokens found.");

  //Get User from said Tokens
  const awaitUser = await getUserServer({
    token: token,
    refreshToken: refreshToken,
  });

  if (awaitUser.status == 403) {
    console.log("Token expired, trying to refresh...");
    const refresh = await getRefreshTokenServer(refreshToken);
    if (!refresh) return console.log("No Refresh Token");
  }

  const user = {
    personName: awaitUser.data.personName,
    image: awaitUser.data.image,
    _id: awaitUser.data._id,
  };

  isLoggedIn = true;

  return (
    <>
      {data.post.contentType == "Video" ? (
        <div className="mx-[12%] mt-10 h-[648px] w-[auto] flex justify-center items-center text-3xl">
          <video
            controls
            className="w-full h-full object-cover rounded-[20px] "
          >
            <source src={data.post.content} />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="mx-[12%] mt-10 rounded-[20px] overflow-hidden bg-black w-fit">
          <Image
            src={data.post.content}
            alt="content"
            height={648}
            width={9999}
            className="rounded-[20px]"
          />
        </div>
      )}

      <div className="mx-[12%] mt-3">
        <ContentCardBelt CONTENT={data.post} />

        <p className="text-primary line-clamp-6 my-2">{data.post.title}</p>

        <Tags tags={data.post.tags} className="mb-5" />

        <hr className="mb-5"></hr>

        <h1 className="text-accent font-bold text-3xl">Komentarai:</h1>

        {data.post.comments.length == 0 ? (
          <p className="flex justify-center items-center font-bold text-lg my-20">
            Čia labai tuščia...
          </p>
        ) : (
          data.post.comments.map((comment: COMMENT) => (
            <CommentCard
              key={comment._id}
              comment={comment}
              className="my-10"
            />
          ))
        )}
        {isLoggedIn && (
          <WriteCommentCard user={user} key={data.post.key} className="mb-10" />
        )}
      </div>
    </>
  );
};

export default Content;
