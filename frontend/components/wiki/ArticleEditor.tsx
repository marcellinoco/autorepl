import { FC, useState } from "react";
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
  const [title, setTitle] = useState(article?.title || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    article?.categories || []
  );
  const [newCategory, setNewCategory] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [content, setContent] = useState(article?.content || "");

  const handleSubmit = () => {
    onSave({
      id: article?.id || `${Date.now()}`,
      createdAt: article?.createdAt || new Date(),
      title,
      categories: selectedCategories,
      content,
    });
  };

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
    <div>
      <h1 className="text-xl font-bold">
        {article ? "Edit Article" : "New Article"}
      </h1>
      <div className="p-4 w-2/3">
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
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-4 mb-2"
          rows={20}
      />
        <div className="flex justify-end gap-4">
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-custom-secondary hover:bg-custom-primary">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
