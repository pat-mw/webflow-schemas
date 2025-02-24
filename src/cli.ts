/*
This CLI tool is used to fetch dynamic schemas from Webflows Data API.
*/

import { Env } from "./env";
import { createClient, type WebflowClient } from "./webflow/client";

export class Cli {
    constructor(private env: Env) {
      this.env = env;
    }

    run(this: Cli) {
        console.log('Hello World');
        console.log(this.env);
    }
}

