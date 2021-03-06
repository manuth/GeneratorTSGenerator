import { TSModuleGenerator } from "../../../generators/module/TSModuleGenerator";
import { TestContext } from "../../TestContext";
import { FileMappingTests } from "./FileMappings";
import { TSModuleGeneratorTests } from "./TSModuleGenerator.test";

/**
 * Registers tests for the `TSModuleGenerator`.
 *
 * @param context
 * The test-context.
 */
export function ModuleTests(context: TestContext<TSModuleGenerator>): void
{
    suite(
        "Module",
        () =>
        {
            FileMappingTests(context);
            TSModuleGeneratorTests(context);
        });
}
