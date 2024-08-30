import supertest from "supertest";
import { AppModule } from "../app.module";
import expres, { Application } from "express";

const app: Application = expres();
app.use(expres.json());
app.use(expres.urlencoded({ extended: false }));
const appModule = new AppModule();

beforeAll(() => {
  appModule.configure(app);
});

describe("getBooks()", () => {
  it("should return an object with status code, message and data", async () => {
    const res = await supertest(app).get("/books");
    const {body} = res;
    expect(res.statusCode).toBe(200);
    expect(body.statusCode).toBe(200);
    expect(body).toHaveProperty('statusCode');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('data');
  });
});

describe("getBookByid()", ()=>{
    it('should return an user if exists', async()=>{
        const res = await supertest(app).get('/books/ae21be00-9598-4fb3-802c-9e24c9013fb7');
        const {body} = res;
        expect(body.statusCode).toBe(200);
        expect(body).toHaveProperty('statusCode');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('data');
    })

    it('should return a 404 status code if user does not exists', async()=>{
        const res = await supertest(app).get("/books/2860");
        const {body} = res;
        console.log(body)
        expect(res.statusCode).toBe(404);
    })
})