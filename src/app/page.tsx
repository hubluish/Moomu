
import Tab from "@/components/section/article/tab/tab";
import ArticleTab from "@/components/section/article/bigCard/big";
import ArticleTabs from "@/components/section/article/smallCard/small";
import ImageSlider from "@/components/section/article/pagenationCard/pagenationCard";



export default function Home() {
  return (  
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        gap: "24px",
        alignItems: "flex-start",
        flexDirection: "column"
      }}
    >
    <h1 style={{ fontSize: "30px", fontWeight: "bold", marginTop: "30px", color:" #3D38F5" }}>
      Article </h1>
    <Tab/>
    <ImageSlider />
    <div style={{ display: "flex", flexDirection: "row", gap: "24px",
        alignItems: "flex-start",}}>
    <ArticleTab
                  imageUrl="https://i.pinimg.com/736x/25/ac/3c/25ac3ccbc96fef8a03d95c64b039e3a0.jpg"
                  title="테스트 뉴스 제목22"
                  description="이것은 테스트용 설명입니다.22"
                  category="카드뉴스"
                  date="2024.05.28"
                />

    <div style={{ display: "flex", flexDirection: "column", gap: "28px", width:"370px" }}>
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
                
  );
}
