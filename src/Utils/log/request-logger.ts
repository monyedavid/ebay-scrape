import morgan from "morgan";
import * as bp from "body-parser";
import { default as moment } from "moment";
import { v4 } from "uuid";
import {
  Request,
  NextFunction,
  Response,
  Express,
} from "express-serve-static-core";

export default function (app: Express) {
  /**
   * @description  Body Parser fo GraphQl Query Logs
   */
  app.use(bp.urlencoded({ extended: false }));
  app.use(bp.json());

  /**
   * @description  Body Parser fo GraphQl Query Logs
   */
  app.use(bp.urlencoded({ extended: false }));
  app.use(bp.json());

  // log only 4xx and 5xx responses to console
  app.use(
    morgan("dev", {
      skip(req, res) {
        return res.statusCode < 400;
      },
    }) as any
  );

  /**
   * @description  Log incoming server request
   */

  app.use((req: Request, _, next: NextFunction) => {
    if (process.env.GQL_LOG == "TRUE" && req.originalUrl == "/graphql")
      if (req.method == "POST") {
        const glh = v4();
        // only perform rigorous logs in testing(development) environment
        // remove all introspection query logs
        if (req.body.operationName != "IntrospectionQuery") {
          console.log("query and variables \n");

          console.log("[req.body]", req.body);

          console.log(
            `received glh@${glh}:`,
            moment().format("MMMM Do YYYY, h:mm:ss a")
          );
          // assign glh in request for identification
          (req as any).glh = glh;
        }
      }

    // carry on
    next();
  });

  /**
   * @description  Log server response
   */

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (process.env.GQL_LOG == "TRUE" && req.originalUrl == "/graphql")
      if (req.method == "POST" && (req as any).glh) {
        console.log(`responded to glh@${(req as any).glh}`);
      }

    // carry on
    next();
  });
}
