import { IonButton } from "@ionic/react";

import { BlogCard } from "@/components/Blog";

import { blogs } from "@/data/fakeBlogData";

import "@/styles/blog-section.css";

export const BlogSection: React.FC = () => {
  const firstFourBlogs = blogs.slice(0, 4);
  return (
    <main className="blog-section">
      <h1 className="blog-section__title">Hot News</h1>
      <section className="blog-section__container">
        {firstFourBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              slug={blog.slug}
              title={blog.title}
              tags={blog.tags}
              content={blog.content}
              image={blog.image}
            />
        ))}
      </section>
      <section>
        <IonButton href="/blog" fill="solid" color='primary' className="blog-section__button">Explore Blog</IonButton>
      </section>
    </main>
  );
};
