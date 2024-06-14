import { FC, useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { ArticleEditorProps } from "@/models/wiki";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const animatedComponents = makeAnimated();

const categoriesList = ["Help", "Tokopedia", "Guide", "FAQ"];

const ArticleEditor: FC<ArticleEditorProps> = ({
  article,
  onSave,
  onCancel,
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [title, setTitle] = useState(article?.title || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    article?.categories || []
  );
  const [newCategory, setNewCategory] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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
        id: article?.id || `${Date.now()}`,
        createdAt: article?.createdAt || new Date(),
        title,
        categories: selectedCategories,
        content: outputData.blocks.map((block) => block.data.text).join("\n"),
      });
    }
  };

  // TODO HANDLE NEW CATEGORY
  const handleCategoryChange = (selectedOptions: any) => {
    const newCategories = selectedOptions.map((option: any) => option.value);
    setSelectedCategories(newCategories);

    const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
    if (lastSelectedOption && lastSelectedOption.value === "add-new") {
      setIsPopoverOpen(true);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categoriesList.includes(newCategory)) {
      categoriesList.push(newCategory);
      setSelectedCategories([...selectedCategories, newCategory]);
      setNewCategory("");
      setIsPopoverOpen(false);
    }
  };

  return (
    <div className="p-4 w-2/3">
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
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Categories</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={[
            ...categoriesList.map((category) => ({
              label: category,
              value: category,
            })),
            { label: "Add a new category", value: "add-new" },
          ]}
          value={selectedCategories.map((category) => ({
            label: category,
            value: category,
          }))}
          onChange={handleCategoryChange}
          className="w-full mb-2"
        />
        <Popover>
          <PopoverTrigger>
            <button style={{ display: "none" }}>Trigger</button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col p-4">
              <input
                type="text"
                placeholder="New category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full mb-2 p-2 border rounded"
              />
              <button
                onClick={handleAddCategory}
                className="bg-gray-500 text-white py-1 px-2 rounded"
              >
                Add
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* <div
        id="editorjs"
        className="border p-2 mb-4"
        style={{ minHeight: "300px", overflow: "auto" }}
      ></div> */}
      <div className="flex justify-end gap-4">
        <Button onClick={onCancel} variant="destructive">
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
};

export default ArticleEditor;
