"use server";
// app/wiki/upload/page.tsx

import { useRouter } from "next/router";
import ArticleEditor from "@/components/wiki/ArticleEditor";
import { ArticleSection } from "@/models/wiki";

const UploadPage = () => {
  const router = useRouter();

  const handleSave = (article: ArticleSection) => {
    // Handle save logic here, e.g., make an API call to save the article
    console.log("Article saved", article);
    // Redirect to the wiki main page or any other page
    router.push("/wiki");
  };

  const handleCancel = () => {
    // Handle cancel logic here, e.g., navigate back to the articles list
    router.push("/wiki");
  };

  return <ArticleEditor onSave={handleSave} onCancel={handleCancel} />;
};

export default UploadPage;
