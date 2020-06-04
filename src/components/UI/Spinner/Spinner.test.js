import React from "react";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Spinner from "./Spinner";

Enzyme.configure({ adapter: new Adapter() });

describe("<Spinner />", () => {
  it("should return a loading spinner", () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.contains(<div className="loader">Loading...</div>)).toEqual(
      true
    );
  });
});
