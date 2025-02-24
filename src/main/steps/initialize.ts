import { createClient } from "@/main/webflow/client";
import { Step, StepContext } from "./base";

export class InitializeStep implements Step {
    async execute(context: StepContext): Promise<void> {
        context.webflow = await createClient(context.env.WEBFLOW_ACCESS_TOKEN);
    }
} 