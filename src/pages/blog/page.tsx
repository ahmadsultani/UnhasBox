import { IonButton, IonChip, IonIcon, IonSpinner, IonText } from "@ionic/react";

import { MainLayout } from "@/layouts/MainLayout";
import { BlogCard } from "@/components/Blog";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { paperPlane } from "ionicons/icons";

import "@/styles/blog.css";
import { getAllBlog } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export const Blog: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
  } = useQuery({
    queryKey: ["product"],
    queryFn: getAllBlog,
  });

  const [email, setEmail] = useState("");
  const message = useMemo(
    () =>
      `Hello, I would like to subscribe to your newsletter. My email is ${email}`,
    [email],
  );

  return (
    <MainLayout>
      <section className="blog">
        <header className="blog__header ion-padding">
          <section>
            <IonText color="dark">
              <h1 className="ion-text-center blog__title">
                UnhasBox: This is where we tell stories
              </h1>
            </IonText>
            <IonText color="dark">
              <h5 className="ion-text-center ">
                Subscribe to our newsletter to recieve updates about our new
                products and many more.
              </h5>
            </IonText>
          </section>
          <section className="blog__email-input">
            <input
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IonButton
              shape="round"
              size="small"
              fill={isMobile ? "clear" : "solid"}
              href={`mailto:${email}?subject=Subscribe%20to%20UnhasBox%20Newsletter&body=${message}`}
            >
              {isMobile ? (
                <IonIcon slot="icon-only" icon={paperPlane} />
              ) : (
                <IonText className="blog__subscribe-btn">Subscribe</IonText>
              )}
            </IonButton>
          </section>
          <section className="blog__chip-container">
            <IonChip color="primary" className="ion-padding">
              All Blog
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              News
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              Chocolates
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              Akuadin
            </IonChip>
            <IonChip color="primary" className="ion-padding">
              Galdan
            </IonChip>
          </section>
        </header>
        {isLoadingBlogs ? (
          <div className="empty-container">
            <IonSpinner
              name="crescent"
              color="primary"
              style={{ marginTop: "-48px", transform: "scale(1.4)" }}
            />
          </div>
        ) : isErrorBlogs ? (
          <IonText>
            <p
              className="ion-text-center"
              style={{ marginTop: "3em", fontSize: "1.5em", fontWeight: 600 }}
            >
              Something went wrong!
            </p>
          </IonText>
        ) : blogs && blogs.length > 0 ? (
          <main className="blog__container ion-padding">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                slug={blog.id}
                title={blog.title}
                content={blog.content}
                image={blog.thumbnail}
                tags={blog.tags}
              />
            ))}
          </main>
        ) : (
          <IonText className="ion-text-center">
            <p style={{ marginTop: "3em", fontSize: "1.5em", fontWeight: 600 }}>
              No Blogs found!
            </p>
          </IonText>
        )}
      </section>
    </MainLayout>
  );
};
