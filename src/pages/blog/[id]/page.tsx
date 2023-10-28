import { IonButton, IonIcon, IonImg, IonText } from "@ionic/react";

import { MainLayout } from "@/layouts/MainLayout";
import { BlogCard } from "@/components/Blog";

import { blogs } from "@/data/fakeBlogData";

import { arrowBack } from "ionicons/icons";

import "@/styles/blog-detail.css";

export const BlogDetail: React.FC = () => {
  return (
    <MainLayout>
      <main className="blog-detail ">
        <section className="blog-detail__container">
          <section className="blog-detail__back-container">
            <IonButton
              shape="round"
              fill="clear"
              color="dark"
              className="ion-no-padding"
              href="/blog"
            >
              <IonIcon icon={arrowBack} slot="start" />
              <p className="ion-padding-start">Back to Blogs</p>
            </IonButton>
          </section>
          <IonText color="dark">
            <h1 className="blog-detail__title ">
              Informatics Engineering Strengthen It's Student Far and Beyond
            </h1>
          </IonText>
          <IonImg
            alt="Silhouette of mountains"
            src={
              "https://www.adorama.com/alc/wp-content/uploads/2021/06/mountain-photography-tips-tricks-feature.jpg"
            }
            className="blog-detail__thumbnail"
          />
          <main className="blog-detail__content">
            <header className="blog-detail__content-header">
              <IonText color="medium">
                <p className="blog-detail__content-header-text">
                  Ahmad Sultani Dayanullah
                </p>
              </IonText>
              <IonText color="medium">
                <p className="blog-detail__content-header-text">|</p>
              </IonText>
              <IonText color="medium">
                <p className="blog-detail__content-header-text">
                  16 December 2003
                </p>
              </IonText>
            </header>
            <h3 className="blog-detail__content-title">
              UnhasBox: This is where we tell stories
            </h3>
            <p className="blog-detail__content-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              facere, pariatur culpa eveniet hic suscipit reiciendis minus quas
              iusto, exercitationem maxime iste nulla ducimus aliquam placeat
              illo ipsum. Quia tempore ex impedit necessitatibus culpa
              inventore. A sequi sed itaque dolorem doloremque! Molestiae quam,
              eveniet rerum cumque, eligendi culpa perspiciatis placeat expedita
              neque quasi sint et officia non eos! Fuga perspiciatis dolorem
              voluptatum alias velit praesentium accusamus animi repudiandae
              non, excepturi totam officiis laborum vitae ut quia iste, aliquid
              adipisci pariatur, quasi aliquam modi iusto. Quod cum voluptas
              quas ad animi tenetur quae voluptatum blanditiis accusantium, nisi
              ullam quam eum excepturi!
            </p>
            <code className="blog-detail__content-code">
              <p className="blog-detail__content-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                aspernatur expedita suscipit dolores accusamus excepturi earum
                eveniet facilis, nesciunt placeat, temporibus repellat!
                Molestiae perferendis qui esse quidem dolorum, dicta ipsa.
              </p>
            </code>
            <p className="blog-detail__content-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
              facere, pariatur culpa eveniet hic suscipit reiciendis minus quas
              iusto, exercitationem maxime iste nulla ducimus aliquam placeat
              illo ipsum. Quia tempore ex impedit necessitatibus culpa
              inventore. A sequi sed itaque dolorem doloremque! Molestiae quam,
              eveniet rerum cumque, eligendi culpa perspiciatis placeat expedita
              neque quasi sint et officia non eos! Fuga perspiciatis dolorem
              voluptatum alias velit praesentium accusamus animi repudiandae
              non, excepturi totam officiis laborum vitae ut quia iste, aliquid
              adipisci pariatur, quasi aliquam modi iusto. Quod cum voluptas
              quas ad animi tenetur quae voluptatum blanditiis accusantium, nisi
              ullam quam eum excepturi!
            </p>
          </main>
          <footer className="blog-detail__footer">
            <h3 className="blog-detail__footer-title">Related Content</h3>
            <main className="blog-detail__footer-content">
              {blogs.slice(0, 3).map((blog) => (
                <BlogCard
                  key={blog.id}
                  slug={blog.slug}
                  title={blog.title}
                  image="https://www.adorama.com/alc/wp-content/uploads/2021/06/mountain-photography-tips-tricks-feature.jpg"
                  content={blog.content}
                  tags={blog.tags}
                />
              ))}
            </main>
          </footer>
        </section>
      </main>
    </MainLayout>
  );
};
