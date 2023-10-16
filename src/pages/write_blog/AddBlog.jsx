import React, { useRef, useState } from "react";
import Layout from "../../components/Layout";
import Heading from "../../components/texts/Headings";
import FormInput from "../../components/form/FormInput";
import JoditEditor from "jodit-react";
import { ImagePlusIcon, UploadIcon, X } from "lucide-react";
import BlogCategoryDropdown from "../../components/blogs/BlogCategoryDropdown";
import Button from "../../components/Button";
import { storage } from "../../utils/firebase";
import postAPIData from "../../hooks/postAPIData";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { notifySuccess } from "../../utils/toastsPopup";
import { resetServerContext } from "react-beautiful-dnd";

const blogCategories = [
  "Engineering",
  "Programming",
  "Technology",
  "Travel",
  "Food",
  "Health and Fitness",
  "Fashion",
  "Lifestyle",
  "Entertainment",
  "Education",
  "Business",
  "Finance",
  "Science",
  "Art and Design",
  "Sports",
  "Music",
  "Books",
  "Personal Development",
  "Parenting",
  "DIY and Crafts",
  "Home Improvement",
  "Gaming",
];

const AddBlog = () => {
  const { user } = useSelector((store) => store.user);

  const richTextAreaRef = useRef(null);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");

  const [fileLoading, setFileLoading] = useState(false);

  // custom post data hook
  const { loading, error, sendData } = postAPIData();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("previewImage").src = e.target.result;
        document.getElementById("previewImage").classList.remove("hidden");
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      document.getElementById("previewImage").src = "";
      document.getElementById("previewImage").classList.add("hidden");
    }
  };

  const handleUploadImage = async () => {
    setFileLoading(true);

    const time = user._id + Date.now();

    const imageReference = ref(storage, "blogs/" + time);

    try {
      const snapshot = await uploadBytesResumable(imageReference, file);
      const url = await getDownloadURL(snapshot.ref);

      const res = await sendData(
        `${import.meta.env.VITE_NODE_API}/blog`,
        {
          Authorization: `Bearer ${user._id}`,
        },
        {
          title: title,
          description: description,
          banner: url,
          bannerRef: time,
          bannerType: snapshot.metadata.contentType?.split("/")[1],
          categories: tags,
        },
      );

      console.log(res);

      notifySuccess("Blog added.");
    } catch (error) {
      console.log(error);
    } finally {
      setFileLoading(false);
    }
  };

  return (
    <Layout>
      <div>
        <div className="mb-8 flex items-center justify-between">
          <Heading level={3}>Add Blog</Heading>
          <Button
            label={loading | fileLoading ? "Publishing" : "Publish"}
            radius={"lg"}
            leftIcon={
              loading | fileLoading ? (
                <FaSpinner className="h-4 w-4 animate-spin" />
              ) : (
                <UploadIcon className="h-4 w-4" />
              )
            }
            classes={"px-5"}
            disable={loading | fileLoading}
            onclick={handleUploadImage}
          />
        </div>

        <div>
          <FormInput
            label="Title"
            type="text"
            required={true}
            placeholder={"Title"}
            value={title}
            onChange={(text) => setTitle(text)}
          />

          <div className="relative mb-12">
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Choose Banner Image
            </label>

            <div className="relative">
              {file && (
                <X
                  className="absolute left-0 top-0 h-4 w-4 cursor-pointer rounded-full bg-red-700 p-[2px] text-white"
                  onClick={() => {
                    setFile(null);
                    document.getElementById("previewImage").src = "";
                    document
                      .getElementById("previewImage")
                      .classList.add("hidden");
                  }}
                />
              )}
              <img
                id="previewImage"
                className={
                  file &&
                  "mb-2 h-20 w-40 rounded-md border object-cover dark:border-gray-700"
                }
              />
            </div>

            <label
              htmlFor="fileInput"
              className="absolute left-0 right-0 flex items-center gap-3 rounded-lg border  border-gray-400 p-2 text-sm dark:bg-gray-700 dark:text-gray-300"
            >
              Choose image{" "}
              <ImagePlusIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </label>
            <input
              type="file"
              name="fileInput"
              id="fileInput"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          <div className="relative mb-3">
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Select Tags
            </label>
            <BlogCategoryDropdown
              blogCategories={blogCategories}
              tags={tags}
              setTags={setTags}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-900 dark:font-medium dark:text-gray-100">
              Description
            </label>
            <JoditEditor
              ref={richTextAreaRef}
              value={description}
              tabIndex={1}
              onBlur={(newDescription) => {
                console.log(newDescription);
                setDescription(newDescription);
              }}
              onChange={(newDescription) => {}}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddBlog;
