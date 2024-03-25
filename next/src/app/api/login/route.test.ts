/**
 * @jest-environment node
 */
import { loginValidator, costumeResponse } from "./route";
import { afterEach } from "node:test";

async function readableStreamToString(readableStream: ReadableStream) {
    const reader = readableStream.getReader();
    let result = '';
    let done = false;
  
    while (!done) {
      const { value, done: readDone } = await reader.read();
      if (readDone) {
        done = true;
      } else {
        result += new TextDecoder().decode(value);
      }
    }
  
    return JSON.parse(result);
  }

describe("testing login method helper", ()=>{
    let mockLoginValidator: jest.Mock;
    let mockCostumeResponse: jest.Mock;
    beforeEach(()=>{
        mockLoginValidator = jest.fn(loginValidator);
        mockCostumeResponse = jest.fn(costumeResponse);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });

    //login validator test
    it("login validator for muser1", async()=>{
        
        mockLoginValidator("muser1", "mpassword1");
        expect(mockLoginValidator).toHaveBeenCalledWith("muser1", "mpassword1");
        expect(mockLoginValidator.mock.results[0].value).toBe(1);
    });
    it("login validator for muser2", async()=>{
        mockLoginValidator("muser2", "mpassword2");
        expect(mockLoginValidator).toHaveBeenCalledWith("muser2", "mpassword2");
        expect(mockLoginValidator.mock.results[0].value).toBe(1);
    });
    it("login validator for muser3", async()=>{
        mockLoginValidator("muser3", "mpassword3");
        expect(mockLoginValidator).toHaveBeenCalledWith("muser3", "mpassword3");
        expect(mockLoginValidator.mock.results[0].value).toBe(2);
    });
    it("login validator for non existant user or wrong password", async()=>{
        mockLoginValidator("muser1", "mpassword3");
        expect(mockLoginValidator).toHaveBeenCalledWith("muser1", "mpassword3");
        expect(mockLoginValidator.mock.results[0].value).toBe(3);
    });

    //costume response test

    it("response for valid user", async()=>{
        mockCostumeResponse(1, "token", 200);
        expect(mockCostumeResponse).toHaveBeenCalledWith(1, "token", 200);
        const {status, body} = mockCostumeResponse.mock.results[0].value;
        expect(status).toBe(200);
        expect((await readableStreamToString(body)).token).toBe("token");
    });
    it("response for blocked user", async()=>{
        mockCostumeResponse(2, "message", 403);
        expect(mockCostumeResponse).toHaveBeenCalledWith(2, "message", 403);
        const {status, body} = mockCostumeResponse.mock.results[0].value;
        expect(status).toBe(403);
        expect((await readableStreamToString(body)).message).toBe("message");
    });
    it("response for bad credientls", async()=>{
        mockCostumeResponse(2, "message", 404);
        expect(mockCostumeResponse).toHaveBeenCalledWith(2, "message", 404);
        const {status, body} = mockCostumeResponse.mock.results[0].value;
        expect(status).toBe(404);
        expect((await readableStreamToString(body)).message).toBe("message");
    });
});