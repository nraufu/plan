import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import InputBar from "./InputBar";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("<InputBar/>", () => {
  it("should return an inputBar components", () => {
    const wrapper = shallow(<InputBar />);
    expect(wrapper.find("div")).toHaveLength(2);
  });
});
