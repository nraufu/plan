import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

configure({
  adapter: new Adapter(),
});

describe("<Navbar>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navbar tasks={[]} />);
  });

  it("should render none navigation links if non authenticated", () => {
    wrapper.setProps({ isAuthenticated: false });
    expect(wrapper.find(Link)).toHaveLength(0);
  });

  it("should render two navigation links if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find("button"));
  });
});
