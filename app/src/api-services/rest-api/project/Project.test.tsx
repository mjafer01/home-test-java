import React from "react";
import axios, { AxiosResponse } from "axios";
import Project from "./Project";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Tests for api-services base-client RestPost function", () => {
  it("Test for Success 200", async () => {
    const loginResponse = {
      isException: false,
      response: {
        accessToken: "accessToken",
        username: "username",
        firstName: "firstName",
        lastName: "lastName",
        sessionExpiryTime: new Date(),
      },
    };

    const mockedResponse: AxiosResponse = {
      data: loginResponse.response,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);

    const data = await Project("", "");

    expect(data).toEqual(loginResponse);
  });
  it("Test for Success 401", async () => {
    const loginResponse = {
      isException: true,
      exception: {
        status: 401,
        message: "",
      },
    };

    const mockedResponse: AxiosResponse = {
      data: {},
      status: 401,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);

    const data = await Project("", "");

    expect(data).toEqual(loginResponse);
  });
  it("Test for Success 500", async () => {
    const loginResponse = {
      isException: true,
      exception: {
        status: 500,
        message: "Server Exception",
      },
    };

    const mockedResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.post.mockResolvedValueOnce(mockedResponse);

    const data = await Project("", "");

    expect(data).toEqual(loginResponse);
  });
});
