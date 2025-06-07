import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
  description?: string;
  keywords?: string[];
}

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("API 응답 오류");
        return res.json();
      })
      .then(data => setArticle(data))
      .catch(err => {
        alert("게시글을 불러오지 못했습니다.");
        console.error(err);
      });
  }, [id]);

  if (!article) return <div>로딩중...</div>;

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <h1>{article.title}</h1>
      <div style={{ color: "#888", marginBottom: 12 }}>
        {article.category} | {article.date}
      </div>
      {article.imageUrl && (
        <Image
          width={900}
          height={400}
          src={article.imageUrl}
          alt="대표 이미지"
          style={{ width: "100%", maxHeight: 400, objectFit: "cover", marginBottom: 24 }}
        />
      )}
      <div
        style={{ margin: "32px 0", fontSize: 18, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      {article.description && (
        <div style={{ margin: "24px 0", color: "#666" }}>{article.description}</div>
      )}
      {article.keywords && article.keywords.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <b>키워드:</b>{" "}
          {article.keywords.map((kw, i) => (
            <span key={i} style={{ marginRight: 8, color: "#3D38F5" }}>#{kw}</span>
          ))}
        </div>
      )}
      <button style={{ marginTop: 40 }} onClick={() => router.back()}>목록으로</button>
    </div>
  );
}
