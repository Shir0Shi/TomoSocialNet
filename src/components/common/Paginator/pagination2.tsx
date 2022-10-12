import React, {useMemo, useState} from "react";
import style from "./pagination.module.css";
import { DOTS, usePagination } from "./usePagination";
import classnames from "classnames";

export type PaginationProps = {
    totalItemsCount: number, 
    pageSize: number, 
    currentPage: number, 
    onPageChanged: (pageNumber: number)=>void, 
    portionSize?:number,
    siblingCount?: number
}
export const Pagination: React.FC<PaginationProps> = ({
    totalItemsCount, 
    pageSize, 
    currentPage, 
    onPageChanged, 
    portionSize = 10,
    siblingCount = 1
})=>{
    const paginationRange = usePagination({
        currentPage,
        totalItemsCount,
        siblingCount,
        pageSize,
        onPageChanged
      });
      
      // If there are less than 2 times in pagination range we shall not render the component
      if(paginationRange)
      {
        if (currentPage === 0 || paginationRange.length < 2) {
          return null;
        }
      const onNext = () => {
        onPageChanged(currentPage + 1);
      };
    
      const onPrevious = () => {
        onPageChanged(currentPage - 1);
      };
    
      let lastPage = paginationRange[paginationRange.length - 1];      
    
     
    return(<ul
        className={classnames('')}
      >
         {/* Left navigation arrow */}
        <li
          className={classnames('', {
            disabled: currentPage === 1
          })}
          onClick={onPrevious}
        >
          <div className="" />
        </li>
        {paginationRange.map(pageNumber => {
           
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber == DOTS) {
            return <li className="">&#8230;</li>;
          }
          
          // Render our Page Pills
          return (
            <li
              className={classnames('', {[style.selectedPage] : currentPage === pageNumber ,
                [style.pageNumber] : style.pageNumber})}
              onClick={() => onPageChanged(+pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        <li
          className={classnames('', {
            disabled: currentPage === lastPage
          })}
          onClick={onNext}
          
        >
          <div className="" />
        </li>
      </ul>);
      } else return null;
}