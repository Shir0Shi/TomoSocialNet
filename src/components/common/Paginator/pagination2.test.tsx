import React from "react";
import { create } from "react-test-renderer";
import {Pagination} from "./pagination2";

describe("Pagination component", () => {
    test("pages count should be 10", () => {
      const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} currentPage = {1} onPageChanged={()=>{}} />);
      const root = component.root;
      let li = root.findAllByType("li")
      expect(li.length).toBe(8);
    });
    test("li count should be 9", () => {
        const component = create(<Pagination totalItemsCount={9} pageSize={1} portionSize={10} currentPage = {2} onPageChanged={()=>{}} />);
        const root = component.root;
        let li = root.findAllByType("li")
        expect(li.length).toBe(8);
      });
    //   test("if pagecount more then 1 and we are not at first page should be both of buttons", () => {
    //     const component = create(<Pagination totalItemsCount={11} pageSize={1} portionSize={10} currentPage={2}/>);
    //     const root = component.root;
    //     let button = root.findByType("button");
    //     button.props.onClick();
    //     let buttons = root.findAllByType("button");
    //     expect(buttons.length).toBe(2);
    //   });
});
