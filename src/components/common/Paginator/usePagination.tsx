import { range } from "lodash";
import { useMemo } from "react";
import { PaginationProps } from "./pagination2";


export const DOTS = '...';

export const usePagination = ({
    totalItemsCount,
    pageSize,
    siblingCount = 1,
    currentPage
  }:PaginationProps) => {
    const paginationRange = useMemo(() => {
        const totalPageCount = Math.ceil(totalItemsCount / pageSize);

        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
          return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
          currentPage + siblingCount+1,
          totalPageCount
        );
    
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    
        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;
    
        if (!shouldShowLeftDots && shouldShowRightDots) {
          let leftItemCount = 3 + 2 * siblingCount;
          let leftRange = range(1, leftItemCount);
    
          return [...leftRange, DOTS, totalPageCount];
        }
    
        if (shouldShowLeftDots && !shouldShowRightDots) {
          
          let rightItemCount = 3 + 2 * siblingCount;
          let rightRange = range(
            totalPageCount - rightItemCount,
            totalPageCount+1
          );
          return [firstPageIndex, DOTS, ...rightRange];
        }
         
        if (shouldShowLeftDots && shouldShowRightDots) {
          let middleRange = range(leftSiblingIndex, rightSiblingIndex);
          return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }
      }, [totalItemsCount, pageSize, siblingCount, currentPage]);
    return paginationRange;
};
