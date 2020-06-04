import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Button from "./Button";

Enzyme.configure({ adapter: new Adapter() });

describe("<Button/>", () => {
  it("should return a button component", () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find("button"));
  });
});
