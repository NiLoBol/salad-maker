"use client";
import React, { useContext, useEffect, useState } from "react";
import { Ingredient } from "../Type";
import axios from "axios";
import IncreaseIcon from "./Icon/IncreaseIcon";
import ReduceIcon from "./Icon/ReduceIcon";
import { useCategoryContext } from "./CategoryProvider";
const Item = () => {
  return <div>TEST</div>;
};
export default function SaladList() {
  const {
    ingredients,
    setIngredients,
    Repect,
    setRepect,
    checkVegetables,
    checkFruit,
    checkToppings,
    checkProtein,
    checkDressing,
  } = useCategoryContext();
  return (
    <div className="grid grid-cols-4  gap-6 pe-12" key={"LIST"}>
      {ingredients.map((ingredient, index) => {
        if(
          (checkVegetables==false&&checkFruit==false&&checkToppings==false&&checkProtein==false&&checkDressing==false)||
          (ingredient.category==="dressing"&&checkDressing)||
          (ingredient.category==="protein"&&checkProtein)||
          (ingredient.category==="toppings"&&checkToppings)||
          (ingredient.category==="fruit"&&checkFruit)||
          (ingredient.category==="vegetable"&&checkVegetables)
        ){
          return (
            <div className="bg-white px-6 pt-8 pb-5 rounded-2xl" key={"LIST-"+index}>
              <img
                className="w-full"
                src={ingredient.image}
                alt={ingredient.ingredient}
              />
              <div className="text-normal mt-6 mb-2 font-medium">
                {ingredient.ingredient}
              </div>
              <div className="flex text-2xl font-bold">
                <div className="me-2 "> {ingredient.calories} </div>
                <div className="text-Primary "> Cal</div>
              </div>
              <div className="flex flex-row-reverse items-center gap-4">
                <div
                  onClick={() => {
                    setRepect(() => {
                      const data = JSON.parse(JSON.stringify(Repect));
                      data[index] = data[index] + 1;
                      return data;
                    });
                  }}
                  className="hover:cursor-pointer"
                >
                  <IncreaseIcon />
                </div>
  
                <div
                  className={
                    Repect[index] === 0
                      ? "hidden"
                      : "text-center text-2xl font-bold"
                  }
                >
                  {Repect[index]}
                </div>
                <div
                  onClick={() => {
                    setRepect(() => {
                      const data = JSON.parse(JSON.stringify(Repect));
                      if (data[index] >= 1) data[index] = data[index] - 1;
                      return data;
                    });
                  }}
                  className={
                    Repect[index] === 0 ? "hidden" : "hover:cursor-pointer"
                  }
                >
                  <ReduceIcon />
                </div>
              </div>
            </div>
          );
        }
        else {
          return(<></>)
        }
        
      })}
    </div>
  );
}
