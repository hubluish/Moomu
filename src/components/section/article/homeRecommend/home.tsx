"use client";
import ArticleTab from "@/components/section/article/bigCard/big";
import ArticleTabs from "@/components/section/article/smallCard/small";
import styles from "@/components/section/article/homeRecommend/home.module.css";

function Section({ title, imageUrl, bigCard, smallCards, onMoreClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.text1Container}>
          <div className={styles.title}>{title}</div>
          <button className={styles.button} onClick={onMoreClick}>
            <div className={styles.buttonText}>더보기</div>
          </button>
        </div>
        <h2 className={styles.sub}>
          Browse through a collection of trending design resources.
        </h2>
      </div>
      <div className={styles.container2}>
        <img
          src={imageUrl}
          alt="추천 이미지"
          style={{
            maxWidth: "510px",
            height: "410px",
            marginRight: "8px",
            verticalAlign: "middle",
          }}
        />
        <div className={styles.row}>
          <ArticleTab {...bigCard} />
          <div className={styles.col}>
            {smallCards.map((card, idx) => (
              <ArticleTabs key={idx} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Articlehome({ setActiveTab }) {
  return (
    <div className={styles.container}>
      <Section
        title="디자인 용어 사전 ✒️"
        imageUrl="https://i.pinimg.com/736x/5b/ae/c4/5baec48bdac5e5f23a3f91aeaab1166b.jpg"
        bigCard={{
          imageUrl:
            "https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg",
          title: "테스트 뉴스 제목22",
          description: "이것은 테스트용 설명입니다.22",
          category: "카드뉴스",
          date: "2024.05.28",
        }}
        smallCards={[
          {
            imageUrl:
              "https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg",
            title: "테스트 뉴스 제목",
            description: "이것은 테스트용 설명입니다.",
            category: "카드뉴스",
            date: "2024.05.28",
          },
          {
            imageUrl:
              "https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg",
            title: "테스트 뉴스 제목2",
            description: "이것은 테스트용 설명입니다.2",
            category: "카드뉴스",
            date: "2024.05.29",
          },
          {
            imageUrl:
              "https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg",
            title: "테스트 뉴스 제목3",
            description: "이것은 테스트용 설명입니다.3",
            category: "카드뉴스",
            date: "2024.05.30",
          },
        ]}
        onMoreClick={() => setActiveTab(4)} // 용어사전 탭(4번)
      />
    <div className={styles.line} />
      <Section
        title="트렌드 탐험대 🔍 "
        imageUrl="https://i.pinimg.com/736x/9c/19/d1/9c19d1cc03ca1ebfd8507afdb483b272.jpg"
        bigCard={{
          imageUrl: "https://i.pinimg.com/736x/e3/0c/71/e30c7143f557f7ae91ffc2d34cafa8c2.jpg",
          title: "최신 트렌드",
          description: "2024년 트렌드 총정리",
          category: "트렌드",
          date: "2024.06.01",
        }}
        smallCards={[
          {
            imageUrl: "https://i.pinimg.com/736x/b6/0e/aa/b60eaaea090376ace0c03fb5ed9d9f38.jpg",
            title: "UI 트렌드 카드1",
            description: "UI 트렌드 카드 설명1",
            category: "UI",
            date: "2024.06.01",
          },
          {
            imageUrl: "https://i.pinimg.com/736x/16/0e/3b/160e3b540112a0426aed76aa9691c278.jpg",
            title: "UI 트렌드 카드2",
            description: "UI 트렌드 카드 설명2",
            category: "UI",
            date: "2024.06.02",
          },
          {
            imageUrl: "https://i.pinimg.com/736x/e5/52/8f/e5528f043dea28180e593bd28e703b2c.jpg",
            title: "UI 트렌드 카드3",
            description: "UI 트렌드 카드 설명3",
            category: "UI",
            date: "2024.06.03",
          },
        ]}
        onMoreClick={() => setActiveTab(5)} // 트렌드 탭(5번)
      />
    </div>
  );
}