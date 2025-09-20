import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "./ArticleDetail.module.css";

interface Article {
  id: string | number;
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
  description?: string;
  keywords?: string[];
  slug: string;
}

export default function ArticleDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const safeSlug = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    if (!safeSlug) return;
    fetch(`/api/articles?slug=${safeSlug}`)
      .then((res) => {
        if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
        return res.json();
      })
      .then((data) => setArticle(data))
      .catch(() => setArticle(null));
  }, [safeSlug]);

  const handleCopyKeyword = (kw: string, idx: number) => {
    navigator.clipboard.writeText(kw);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  if (!article || !article.date) return <div>로딩중...</div>;

  const formattedDate = article.date.replace(/-/g, ".");

  return (
    <div className={styles.container}>
      {/* 대표 이미지 */}
      <div className={styles.imageWrap}>
        <Image
          src={article.imageUrl || "/assets/icons/placeholder.png"}
          alt="대표 이미지"
          width={1200}
          height={400}
          className={styles.mainImage}
        />
        <div className={styles.imageOverlay} />
        <Image
          width={24}
          height={24}
          src="/assets/icons/left.svg"
          alt="이전"
          className={styles.backIcon}
          onClick={() => router.back()}
        />
      </div>

      {/* 제목/카테고리/날짜 */}
      <div className={styles.titleSection}>
        <div className={styles.titleInner}>
          <div className={styles.titleRow}>
            <div className={styles.titleText}>{article.title}</div>
            <div className={styles.dateText}>{formattedDate}</div>
          </div>
          <div className={styles.categoryBox}>
            <span className={styles.categoryText}>{article.category}</span>
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className={styles.contentSection}>
        <div
          className={styles.contentHtml}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        {article.description && (
          <div className={styles.articleDesc}>{article.description}</div>
        )}
      </div>

      {/* 추천 키워드 */}
      {article.keywords && article.keywords.length > 0 && (
        <div className={styles.keywordSection}>
          <div className={styles.keywordBox}>
            <div className={styles.keywordTitle}>추천 키워드</div>
            <div className={styles.keywordDesc}>
              무드보드 제작시 활용해보세요!
            </div>
            <div className={styles.keywordList}>
              {article.keywords.map((kw, i) => (
                <div
                  key={i}
                  className={styles.keywordItem}
                  onClick={() => handleCopyKeyword(kw, i)}
                >
                  <span className={styles.keywordText}>#{kw}</span>
                  {copiedIdx === i && (
                    <span className={styles.copiedMsg}>복사됨!</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 목록으로 버튼 */}
      <div className={styles.backSection}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          목록으로
        </button>
      </div>
    </div>
  );
}
