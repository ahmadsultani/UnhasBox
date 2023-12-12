import { formatToDayAgo } from "@/utils/formatter";
import { IonChip, IonImg, IonItem, IonText } from "@ionic/react";

interface BlogCardProps {
  slug: string;
  title: string;
  tags: string[];
  content: string;
  image: string;
  author: string;
  createdAt: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  tags,
  content,
  image,
  author,
  createdAt,
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

      <IonItem
        routerLink={`/blog/${slug}`}
        lines="none"
        className="blog__card-content"
      >
        <section className="blog__card-content-info">
          <IonText>
            <p>{author}</p>
          </IonText>
          <IonText>
            <p>&#x2022;</p>
          </IonText>
          <IonText>
            <p>{formatToDayAgo(createdAt)}</p>
          </IonText>
        </section>

        <header className="blog__card-content-header">
          <IonText>
            <h3 className="blog__card-content-title">{title}</h3>
          </IonText>
        </header>

        <IonText>
          <p>{content}</p>
        </IonText>

        <section className="blog__card-tags-container">
          {tags.map((tag, index) => (
            <IonChip key={index} color="dark" className="blog__card-chip">
              <IonText className="ion-text-center">{tag}</IonText>
            </IonChip>
          ))}
        </section>
      </IonItem>
    </section>
  );
};
