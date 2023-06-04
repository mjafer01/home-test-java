import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import RestPut from "./RestPut";
import RestPost from "~/api-services/rest-api/base-clients/RestPost";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Tests for api-services base-client RestPut function", () => {
  it("Test for Success 200", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{output:output}",
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 200, body: mockedResponse.data });
  });
  it("Test for Success 500", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{}",
      status: 500,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 500 });
  });
  it("Test for Success 401", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{}",
      status: 401,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 401 });
  });
  it("Test for Success 400", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{}",
      status: 400,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 400 });
  });
  it("Test for Success 403", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{}",
      status: 403,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 403 });
  });
  it("Test for Success 404", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{}",
      status: 404,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 404 });
  });
  it("Test for Success 406", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{}",
      status: 406,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 406 });
  });

  it("Test for Success 0", async () => {
    const mockedResponse: AxiosResponse = {
      data: "{}",
      status: 0,
      statusText: "OK",
      headers: {},
      config: {},
    };
    mockedAxios.put.mockResolvedValueOnce(mockedResponse);

    const data = await RestPut("", {}, {});

    expect(data).toEqual({ status: 0 });
  });
});
