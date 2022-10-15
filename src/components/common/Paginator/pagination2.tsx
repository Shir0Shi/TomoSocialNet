import React, {useMemo, useState} from "react";
import style from "./pagination2.module.css";
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
    
      let lastPage = paginationRange[paginationRange.length-1];      
    
     
    return(<ul
        className={classnames(style.pagination)}
      >
         {/* Left navigation arrow */}
         { currentPage != 1 &&
        <li
          className={classnames(style.leftArrow, style.pageItem)}
          onClick={onPrevious}
        >
          &#10094;
        </li>
        }
        {paginationRange.map(pageNumber => {
           
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber == DOTS) {
            return <li className={style.pageItem}>&#8230;</li>;
          }
          
          // Render our Page Pills
          return (
            <li
              className={classnames(style.pageItem, {[style.selectedPage] : currentPage === pageNumber ,
                [style.pageNumber] : style.pageNumber})}
              onClick={() => onPageChanged(+pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </li>
          );
        })}
        {/*  Right Navigation arrow */}
        { currentPage != lastPage &&
        <li
          className={classnames(style.rightArrow, style.pageItem)}
          onClick={onNext}       
        >
            	
          &#10095;  
        </li>
        }
      </ul>);
      } else return null;
}