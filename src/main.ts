import express from "express";
import { AppModule } from "./app.module";

async function Bootstrap() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const appModule = new AppModule();
  appModule.configure(app);

  app.listen(process.env.PORT || 4000, () =>
    console.log("server running " + process.env.PORT || 4000)
  );
}

Bootstrap();
