"use client";
import React, { useEffect, useState } from "react";
import { useCategoryContext } from "./CategoryProvider";
import DeleteIcon from "./Icon/DeleteIcon";
import EditIcon from "./Icon/EditIcon";
import axios from "axios";
import EditPage from "./EditPage";

export default function RecipePage() {
  const {
    Repect,
    ingredients,
    CreateRecipe,
    setCreateRecipe,
    setRepect,
    data,
    setdata,
    fetchData2,
  } = useCategoryContext();
  useEffect(() => {
    fetchData2();
  }, [])
  
  const [edit, setedit] = useState<number>(-1);

  console.log(data);
  const DeleteData = async (index: number) => {
    try {
      const response = await axios.delete("/api/Recipe", {
        data: { index },
      });
      fetchData2();
      console.log("Response from API:", response.data);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  return (
    <div>
      {edit == -1 ? (
        <>
          <div className="text-4xl font-bold mb-8">Recipe</div>
          <div className="flex flex-row flex-wrap w-full min-h-[700px] bg-white px-6 py-10 content-start ">
            <div className="basis-full text-2xl font-bold mb-10">
              Your Recipe
            </div>
            <div className="basis-full grid gap-6 grid-cols-4 ">
              {data.map((item, index) => {
                return (
                  <div
                    className="bg-Card bg-contain bg-no-repeat rounded-2xl"
                    key={"incipe:" + index}
                  >
                    <div className="m-6 bg-white h-36 rounded-2xl p-4">
                      <div className="mt-4 mb-2 text-normal">{item.name}</div>
                      <div className="text-3xl font-bold">
                        {item.calories}{" "}
                        <span className="text-Primary">Cal</span>
                      </div>
                    </div>
                    <div className="relative m-6 h-36 rounded-2xl p-4">
                      <div className="absolute bottom-0 left-0 w-full">
                        <div className="w-full flex flex-row gap-[10px]">
                          <div
                            onClick={() => {
                              DeleteData(index);
                            }}
                            className="basis-1/2 hover:cursor-pointer h-10 bg-white text-Red font-medium flex justify-center items-center rounded-full"
                          >
                            <DeleteIcon />{" "}
                            <span className="ms-1 ps-1.5">Delete</span>
                          </div>
                          <div
                            onClick={() => {
                              setedit(index);
                            }}
                            className="basis-1/2 h-10 bg-white  font-medium flex justify-center items-center rounded-full hover:cursor-pointer"
                          >
                            <EditIcon />{" "}
                            <span className="ms-1 ps-1.5">Edit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <EditPage edit={edit} gotoRecipe={setedit} DeleteData={DeleteData}/>
      )}
    </div>
  );
}
