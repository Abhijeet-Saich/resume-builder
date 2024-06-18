import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getTemplateDetails,
  saveToCollections,
  saveToFavourites,
} from "../api/index";
import { MainSpinner } from "../components/index";
import { Link } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import useUser from "../hooks/useUser";
import {
  BiSolidFolderPlus,
  BiSolidFolder,
  BiFolder,
  BiHeart,
  BiSolidHeart,
} from "react-icons/bi";
import useTemplates from "../hooks/useTemplates";
import {TemplateDesignPin} from "../components/index";
import { AnimatePresence } from "framer-motion";


const TemplateDesignPinDetail = () => {
  const { templateID } = useParams();
  const { data: user, refetch: userRefetch } = useUser();
  const {
    data: templates,
    refetch: temp_refetch,
    isLoading: temp_isLoading,
  } = useTemplates();

  const { data, isError, isLoading, refetch } = useQuery(
    ["template", templateID],
    () => getTemplateDetails(templateID)
  );

  const addToCollection = async (e) => {
    e.stopPropagation();
    await saveToCollections(user, data);
    userRefetch();
  };

  const addToFavourites = async (e) => {
    e.stopPropagation();
    await saveToFavourites(user, data);
    temp_refetch();
    refetch();
  };

  if (isLoading) {
    return <MainSpinner />;
  }

  if (isError) {
    <div className="flex flex-col justify-center items-center w-[60vh] w-full">
      <p className="text-lg text-textPrimary font-semibold">
        Error while fetching the data please try again...
      </p>
    </div>;
  }

  console.log(data);
  return (
    <div className="px-4 py-12 w-full flex flex-col items-center justify-start">
      {/* Bread Crumb */}
      <div className="w-full flex items-center pb-8 gap-2">
        <Link
          to={"/"}
          className="gap-2 text-textPrimary flex items-center justify-center"
        >
          <FaHouse />
          Home
        </Link>
        <p>/</p>
        <p>{data?.name}</p>
      </div>

      {/* Design Main section */}
      <div className="w-full grid  grid-cols-1 lg:grid-cols-12">
        {/* Left Section */}
        <div className="col-span-1 lg:col-span-8 flex flex-col items-start justify-start gap-4">
          {/* load the template image */}
          <img
            className="w-full h-auto object-contain rounded-md"
            src={data?.imageURL}
            alt=""
          />
          {/* title and other options */}
          <div className="w-full flex flex-col items-start justify-start gap-2">
            {/* title section */}
            <div className="w-full flex items-center justify-between">
              {/* title */}
              <p className="text-base text-txtPrimary font-semibold">
                {data?.title}
              </p>
              {/* likes */}
              {data?.favourites?.length > 0 && (
                <div className="flex items-center justify-center gap-1">
                  <BiSolidHeart className="text-base text-red-500" />
                  <p className="text-base text-txtPrimary font-semibold">
                    {data?.favourites?.length} likes
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* collection favourite options */}
          {user && (
            <div className="gap-3 flex flex items-center justify-center">
              {user?.collections?.includes(data?._id) ? (
                <React.Fragment>
                  <div
                    onClick={addToCollection}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiFolder className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Remove From Collections
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div
                    onClick={addToCollection}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiSolidFolderPlus className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Add to Collections
                    </p>
                  </div>
                </React.Fragment>
              )}
            </div>
          )}

          {user && (
            <div className="gap-3 flex flex items-center justify-center">
              {data?.favourites?.includes(user?.uid) ? (
                <React.Fragment>
                  <div
                    onClick={addToFavourites}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiHeart className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Remove From Favourites
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div
                    onClick={addToFavourites}
                    className="flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 gap-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <BiSolidHeart className="text-base text-txtPrimary" />
                    <p className="text-sm text-txtPrimary whitespace-nowrap">
                      Add to Favourites
                    </p>
                  </div>
                </React.Fragment>
              )}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="w-full col-span-1 lg:col-span-4 px-3 gap-6 flex flex-col items-center justify-start">
          {/* discover more */}
          <div
            className="w-full h-72 bg-blue-200 rounded-md overflow-hidden relative"
            style={{
              background:
                "url(https://cdn.pixabay.com/photo/2023/10/04/03/04/ai-generated-8292699_1280.jpg)",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
              <Link
                to={"/"}
                className="px-4 py-2 rounded-md border-2 border-gray-50 text-white"
              >
                Discover More
              </Link>
            </div>
          </div>

          {/* edit this template */}
          {user && (
            <Link
              className="w-full px-4 py-3 rounded-md flex items-center justify-center bg-emerald-500 cursor-pointer"
              to={`/resume/${data?.name}?templateId=${templateID}`}
            >
              <p className="text-white font-semibold text-lg">
                Edit this Template
              </p>
            </Link>
          )}

          {/* tags */}
          <div className="w-full flex gap-2 flex-wrap items-center justify-start">
            {data?.tags.map((tag,index)=>(
                <p key={index} className="px-2 py-1 border-gray-300 text-xs border rounded-md whitespace-nowrap"> 
                    {tag}
                </p>
            )
            )}
          </div>
          
        </div>

      </div>
      {/* Similar Template */}
      {templates?.filter((temp) => temp._id !== data?._id)?.length > 0 && (
        <div className="w-full py-8 flex flex-col items-start justify-start gap-4">
          <p className="text-lg font-semibold text-txtDark">
            You might also like
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <React.Fragment>
              <AnimatePresence>
                {templates
                  ?.filter((temp) => temp._id !== data?._id)
                  .map((template, index) => (
                    <TemplateDesignPin
                      key={template?._id}
                      data={template}
                      index={index}
                    />
                  ))}
              </AnimatePresence>
            </React.Fragment>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateDesignPinDetail;
