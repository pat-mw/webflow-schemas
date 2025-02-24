import { WebflowClient } from "webflow-api";
import { type Collection, type Site, type CollectionItem, type Field } from 'webflow-api/api';

const createClient = async (accessToken: string) => {
    const webflow = new WebflowClient({
        accessToken,
    });
    return webflow;
};

export { createClient, type WebflowClient, type Collection, type Site, type CollectionItem, type Field };