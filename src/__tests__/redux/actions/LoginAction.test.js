import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import http from "../../../services/httpServices";
import history from "../../../services/history";
import { LOGIN, SET_TOKEN } from "../../../redux/actions/actionType";
import * as loginActions from "../../../redux/actions/loginAction";
import { loginPayload } from "../../../__mocks__/fixtures";

let store;
const mockedStore = configureMockStore([thunk]);
const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

const { token, user } = loginPayload;

describe("Login Actions", () => {
  test("should create the login success action", () => {
    const expectedAction = { type: LOGIN, response: loginPayload };
    expect(loginActions.loginSuccess(loginPayload)).toEqual(expectedAction);
  });

  test("should create the set token action", () => {
    const expectedAction = { type: SET_TOKEN, token };
    expect(loginActions.setToken(token)).toEqual(expectedAction);
  });
});

describe("Async Login Actions", () => {
  beforeEach(() => {
    store = mockedStore({});
    moxios.install(http.dbCall);
  });

  afterEach(() => {
    moxios.uninstall(http.dbCall);
  });

  test("should dispatch login user", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 200,
          message: "Login Successful",
          data: {
            token,
          },
        },
      });
    });
    const expectedActions = [
      { type: "SET_TOKEN", token: "test token" },
      {
        type: "LOGIN",
        response: { status: 200, message: "Login Successful", data: { Object } },
      },
    ];

    const spyPush = jest.spyOn(history, "push");

    await store.dispatch(loginActions.loginUser(loginPayload));
    expect(store.getActions().length).toEqual(2);
    expect(spyPush).toHaveBeenCalled();
  });

  test("test login fails", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 403,
        message: "Network Error",
      });
    });
    await store.dispatch(loginActions.loginUser(loginPayload));
  });
});
