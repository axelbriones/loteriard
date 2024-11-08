interface PostCardProps {
    title: string;
    excerpt: string;
  }
  
  export default function PostCard({ title, excerpt }: PostCardProps) {
    return (
      <article>
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      </article>
    );
  }
  