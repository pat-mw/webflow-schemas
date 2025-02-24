import { WebflowClient } from "webflow-api";

const createClient = async (accessToken: string) => {
    const webflow = new WebflowClient({ accessToken });
    return webflow;
};


export { createClient, type WebflowClient };