import { IonButton, IonSpinner, IonText } from "@ionic/react";

import { BlogCard } from "@/components/Blog";

import "@/styles/blog-section.css";
import { getAllBlog } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

export const BlogSection: React.FC = () => {
  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: getAllBlog,
  });

  return (
    <main className="blog-section">
      <h1 className="blog-section__title">Hot News</h1>
      {isLoadingBlogs ? (
        <div className="empty-container">
          <IonSpinner
            name="crescent"
            color="primary"
            style={{ transform: "scale(1.4)" }}
          />
        </div>
      ) : isErrorBlogs ? (
        <div className="empty-container">
          <IonText>
            <p
              className="ion-text-center"
              style={{ fontSize: "1.5em", fontWeight: 600 }}
            >
              Something went wrong!
            </p>
          </IonText>
        </div>
      ) : blogs && blogs.length > 0 ? (
        <main className="blog__container ion-padding">
          {blogs.slice(0, 4).map((blog) => (
            <BlogCard
              key={blog.id}
              slug={blog.id}
              title={blog.title}
              content={blog.content}
              image={blog.thumbnail}
              tags={blog.tags}
              author={blog.author}
              createdAt={blog.createdAt}
            />
          ))}
        </main>
      ) : (
        <div className="empty-container">
          <IonText className="ion-text-center">
            <p style={{ fontSize: "1.5em", fontWeight: 600 }}>
              No Blogs found!
            </p>
          </IonText>
        </div>
      )}
      <section>
        <IonButton
          href="/blog"
          fill="solid"
          color="primary"
          className="blog-section__button"
        >
          Explore Blog
        </IonButton>
      </section>
    </main>
  );
};
