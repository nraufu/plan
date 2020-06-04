import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Input from "./Input";

Enzyme.configure({
  adapter: new Adapter(),
});

describe("<Input/>", () => {
  it("should return an input tag with props", () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find("input"));
    expect(wrapper.props());
  });
});
