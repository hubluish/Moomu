"use client";
import ArticleTab from "@/components/section/article/bigCard/big";
import ArticleTabs from "@/components/section/article/smallCard/small";
import styles from "@/components/section/article/homeRecommend/home.module.css";


export default function Articlehome() {

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.text1Container}>
        <div className={styles.title}>디자인 용어 사전 ✒️</div> 
        <button className={styles.button}> 
          <div className={styles.buttonText}>더보기 </div></button>
        </div>
        <h2 className={styles.sub}>Browse through a collection of trending design resources.</h2>
      </div>
          <div className={styles.Container} style={{ flexDirection: "column", justifyContent: "space-between" }}>
      {/* 왼쪽 */}
      <h1 className={styles.title}>추천 뉴스</h1> 
          {/* 오른쪽 */}
          <div className={styles.row}>
            <ArticleTab
              imageUrl="https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg"
              title="테스트 뉴스 제목22"
              description="이것은 테스트용 설명입니다.22"
              category="카드뉴스"
              date="2024.05.28"
            />
            <div className={styles.col}>
              <ArticleTabs
                imageUrl="https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg"
                title="테스트 뉴스 제목"
                description="이것은 테스트용 설명입니다."
                category="카드뉴스"
                date="2024.05.28"
              />
              <ArticleTabs
                imageUrl="https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg"
                title="테스트 뉴스 제목"
                description="이것은 테스트용 설명입니다."
                category="카드뉴스"
                date="2024.05.28"
              />
              <ArticleTabs
                imageUrl="https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg"
                title="테스트 뉴스 제목"
                description="이것은 테스트용 설명입니다."
                category="카드뉴스"
                date="2024.05.28"
              />
            </div>
            </div>
            </div>
            </div>
  );
}