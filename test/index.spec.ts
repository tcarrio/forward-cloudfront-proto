import { forwardCloudfrontProto } from "../src"
import defaultForwardCloudfrontProto from "../src";

import type { Request, Response } from "express";

function generateRequest(headers: Record<string, string>): Request {
  return { headers } as unknown as Request;
}

function generateResponse(): Response {
  return {} as Response;
}

const xFowardedProtoHeader = "x-forwarded-proto";

describe("forward-cloudfront-proto", () => {
  it("should be a default and named export", () => {
    expect(forwardCloudfrontProto).toEqual(defaultForwardCloudfrontProto);
  });
  
  it("should add the x-forwarded-proto header when a match is found", () => {
    const mw = forwardCloudfrontProto;
    const [key, value] = ["cloudfront-forwarded-proto", "https"];
    const req = generateRequest({ [key]: value });
    const res = generateResponse();
    const testValidator = { call: () => {}};
    const spy = jest.spyOn(testValidator, "call")

    mw(req, res, () => {
      expect(req.headers[xFowardedProtoHeader]).toBeDefined();
      expect(req.headers[xFowardedProtoHeader]).toEqual("https");
      expect(Object.keys(req.headers)).toHaveLength(2);
      
      testValidator.call();
    });
    
    expect(spy).toHaveBeenCalled();
  });

  it("should not remove any headers when no match is found", () => {
    const mw = forwardCloudfrontProto;
    const [key, value] = ["user-agent", "fake-user-agent-whatever"];
    const req = generateRequest({ [key]: value });
    const res = generateResponse();
    const testValidator = { call: () => {}};
    const spy = jest.spyOn(testValidator, "call")

    mw(req, res, () => {
      expect(req.headers[xFowardedProtoHeader]).toBeUndefined();
      expect(req.headers[key]).toEqual(value);
      expect(Object.keys(req.headers)).toHaveLength(1);

      testValidator.call();
    });
    
    expect(spy).toHaveBeenCalled();
  });
})