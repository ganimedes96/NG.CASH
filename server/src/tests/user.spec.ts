// import * as sinon from "sinon";
// import * as chai from "chai";
// import * as request from "supertest";
// // @ts-ignore
// import chaiHttp = require("chai-http");
// import app from "../app";

// import { Response } from "superagent";
// import jwt from "../utils/jwt";
// import { PrismaClient } from "@prisma/client";

// chai.use(chaiHttp);

// const { user } = new PrismaClient();

// type resultType = {
//   statusCode: number;
//   body: {
//     message: string;
//   };
// };
// const login = {
//   username: "Hudson",
//   password: "Senha@123",
// };

// const correctUser = {
//   id: "clay1c2bs0000ux982s40jahp",
//   username: "Hudson",
//   password: "$2b$10$nxDE3pWecn6d11Rx9NlhFu1V2HLNZboKP2fRFh60ErO6yCeqZgTaS",
//   accountId: "clay1c2bt0001ux988uyyvftu",
// };

// describe("Section User and Login", () => {
//   let stub: sinon.SinonStub;
//   beforeEach((done) => {
//     stub = sinon.stub(user, "findUnique");
//     stub.resolves(correctUser as unknown as user);
//     done();
//   });

//   after((done) => {
//     (user.findUnique as sinon.SinonStub).restore();
//     done();
//   });

//   it("test if username or password are correct", async () => {
//     const result = (await chai
//       .request(app)
//       .post("/login")
//       .send(login)) as unknown as resultType;

//       expect(result.statusCode).toEqual(401)
//       expect(result.body).toEqual('username or password incorrect')
//   });
// });
