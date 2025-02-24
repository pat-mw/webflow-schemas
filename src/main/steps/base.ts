import { WebflowClient } from "../webflow/client";
import { Env } from "../env";

export interface StepContext {
    webflow: WebflowClient;
    env: Env;
    siteId?: string;
    selectedCollections?: string[];
}

export interface Step {
    execute(context: StepContext): Promise<void>;
} 