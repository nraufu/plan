import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tasks from "./Tasks";

configure({
  adapter: new Adapter(),
});

describe("<Tasks/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Tasks
        tasks={[{ id: "idKey", body: { taskToDo: "task", done: false } }]}
      />
    );
  });
  it("should return array of tasks passed as props", () => {
    expect(wrapper.props());
  });
});
