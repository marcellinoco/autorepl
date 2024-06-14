// components/wiki/ArticleEditor.tsx

import { FC, useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { ArticleEditorProps } from "@/models/wiki";

const ArticleEditor: FC<ArticleEditorProps> = ({
  article,
  onSave,
  onCancel,
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [title, setTitle] = useState(article?.title || "");
  const [url, setUrl] = useState(article?.url || "");
  const [content, setContent] = useState(article?.content || "");

  useEffect(() => {
    if (editorRef.current) return;

    editorRef.current = new EditorJS({
      holder: "editorjs",
      data: {
        blocks: content ? [{ type: "paragraph", data: { text: content } }] : [],
      },
    });

    return () => {
      if (editorRef.current) {
        // editorRef.current.destroy();
        // editorRef.current = null;
      }
    };
  }, [content]);

  const handleSubmit = async () => {
    const outputData = await editorRef.current?.save();
    if (outputData) {
      onSave({
        title,
        url,
        content: outputData.blocks.map((block) => block.data.text).join("\n"),
        sections: article?.sections || [],
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {article ? "Edit Article" : "New Article"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      />
      <div id="editorjs" className="border p-2 mb-4"></div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ArticleEditor;
