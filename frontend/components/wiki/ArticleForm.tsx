// components/wiki/ArticleForm.tsx

import { FC, useState } from "react";
import { ArticleFormProps } from "@/models/wiki";

const ArticleForm: FC<ArticleFormProps> = ({
  title,
  content,
  setTitle,
  setContent,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          rows={10}
        />
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ArticleForm;
