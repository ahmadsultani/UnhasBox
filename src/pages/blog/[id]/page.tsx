import { IonButton, IonIcon, IonImg, IonSpinner, IonText } from "@ionic/react";

import { MainLayout } from "@/layouts/MainLayout";
import { BlogCard } from "@/components/Blog";

import { arrowBack } from "ionicons/icons";

import "@/styles/blog-detail.css";
import { useHistory } from "react-router";
import { getAllBlog } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

export const BlogDetail: React.FC = () => {
  const history = useHistory();

  const {
    data: blogs,
    isLoading: isLoadingBlogs,
    isError: isErrorBlogs,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: getAllBlog,
  });

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
              onClick={() => history.goBack()}
            >
              <IonIcon icon={arrowBack} slot="start" />
              <p className="ion-padding-start">Back to Blogs</p>
            </IonButton>
          </section>
          <IonText color="dark">
            <h1 className="blog-detail__title ">
              Informatics Engineering Strengthen It&apos;s Student Far and
              Beyond
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
            {isLoadingBlogs ? (
              <div className="empty-container">
                <IonSpinner
                  name="crescent"
                  color="primary"
                  style={{ marginTop: "-48px", transform: "scale(1.4)" }}
                />
              </div>
            ) : isErrorBlogs ? (
              <div className="empty-container">
                <IonText>
                  <p
                    className="ion-text-center"
                    style={{
                      marginTop: "3em",
                      fontSize: "1.5em",
                      fontWeight: 600,
                    }}
                  >
                    Something went wrong!
                  </p>
                </IonText>
              </div>
            ) : blogs && blogs.length > 0 ? (
              <main className="blog-detail__footer-content">
                {blogs.map((blog) => (
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
                  <p
                    style={{
                      fontSize: "1.5em",
                      fontWeight: 600,
                    }}
                  >
                    No Blogs found!
                  </p>
                </IonText>
              </div>
            )}
          </footer>
        </section>
      </main>
    </MainLayout>
  );
};
