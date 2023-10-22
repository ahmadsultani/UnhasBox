import { IonButton, IonChip, IonIcon, IonImg, IonText } from "@ionic/react";
import { arrowForward } from "ionicons/icons";

interface BlogCardProps {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  image: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  tags,
  content,
  image,
}) => {

  return (
    <section className="blog__card">
      <IonImg
        alt="Silhouette of mountains"
        src={
          image ?? "https://ionicframework.com/docs/img/demos/card-media.png"
        }
        className="blog__card-img"
      />

      <main className="blog__card-content">
        <section className="blog__card-content-info">
          <IonText>
            <p>Sultani</p>
          </IonText>
          <IonText>
            <p>&#x2022;</p>
          </IonText>
          <IonText>
            <p>1 day ago</p>
          </IonText>
        </section>

        <header className="blog__card-content-header">
          <IonText>
            <h3 className="blog__card-content-title">{title}</h3>
          </IonText>

          <IonButton size="small" fill="clear" color="dark" shape="round" href={`blog/${slug}`}>
            <IonIcon slot="icon-only" icon={arrowForward} />
          </IonButton>
        </header>

        <IonText>
          <p>{content}</p>
        </IonText>

        <section className="blog__card-tags-container">
          {tags.map((tag) => (
            <IonChip color="dark" className="blog__card-chip">
              <IonText className="ion-text-center">{tag}</IonText>
            </IonChip>
          ))}
        </section>
      </main>
    </section>
  );
};
