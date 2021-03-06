/* eslint-disable prefer-const */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { mount } from "enzyme";
import { render, fireEvent, cleanup, act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import HomeNav from "../../../components/home-nav/HomeNav";

const mockStore = configureStore([thunk]);
const state = {
  type: "type",
  message: "messge",
  seen: false,
  notificationCounter: 1,
  key: 1,
  requestId: 2,
  notId: 3,
  markThisRead: jest.fn(),
  toggleNotDisplay: jest.fn(),
  displayNots: jest.fn(),
  notPaneDisplay: false,
  loginState: {
    isAuthenticated: false
  },
  notifications: {
    displayNots: jest.fn(),
    notifications: [
      {
        createdAt: "2019-11-13T10:07:21.401Z",
        id: 8,
        message: "visit nairobi",
        request_id: 12,
        seen: "false",
        type: "ReturnTrip",
        updatedAt: "2019-11-15T13:13:44.347Z",
        user_id: 49,
        notPaneDisplay: false
      },
      {
        createdAt: "2019-11-13T10:07:21.401Z",
        id: 9,
        message: "visit nairobi again",
        request_id: 12,
        seen: "false",
        type: "ReturnTrip",
        updatedAt: "2019-11-15T13:13:44.347Z",
        user_id: 49,
        notPaneDisplay: false
      }
    ]
  },
  profile: {
    user: {
      id: 5,
      user_role: 7
    }
  },
  messages: {
    messages: []
  }
};

describe("HomeNav component tests", () => {
  const store = mockStore(state);
  state.notificationCounter = 10;
  const store1 = mockStore(state);
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <HomeNav />
      </MemoryRouter>
    </Provider>
  );

  const wrapper = mount(
    <Provider store={store1}>
      <MemoryRouter>
        <HomeNav props={state}/>
      </MemoryRouter>
    </Provider>
  );

  test("Should render the different component", () => {
    fireEvent.click(container.querySelector("#message-btn"));
    fireEvent.click(container.querySelector(".profile-action"));
    // fireEvent.click(container.querySelector(".logout-bt"));
    const button = wrapper.find(`[data-test="logout-btn"]`);
    expect(wrapper.length).toBe(1);
  });
});
