import { IonButton, IonChip, IonIcon, IonText } from "@ionic/react";

import { MainLayout } from "../layouts";
import { BlogCard } from "../components/Blog";

import { blogs } from "../data/fakeBlogData";

import "../styles/blog.css";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { paperPlane } from "ionicons/icons";

export const Blog: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
            <input placeholder="Enter your email address" />
            <IonButton
              shape="round"
              size="small"
              fill={isMobile ? "clear" : "solid"}
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
        <main className="blog__container ion-padding">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              slug={blog.slug}
              title={blog.title}
              tags={blog.tags}
              content={blog.content}
              image={blog.image}
            />
          ))}
        </main>
      </section>
    </MainLayout>
  );
};
