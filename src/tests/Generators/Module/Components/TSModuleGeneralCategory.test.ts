import Assert = require("assert");
import { TestContext } from "@manuth/extended-yo-generator-test";
import { ITSProjectSettings } from "../../../../Project/Settings/ITSProjectSettings";
import { TSModuleCodeWorkspace } from "../../../../generators/module/Components/TSModuleCodeWorkspace";
import { TSModuleGeneralCategory } from "../../../../generators/module/Components/TSModuleGeneralCategory";
import { TSModuleGenerator } from "../../../../generators/module/TSModuleGenerator";

/**
 * Registers tests for the `TSModuleGeneralCategory` class.
 *
 * @param context
 * The test-context.
 */
export function TSModuleGeneralCategoryTests(context: TestContext<TSModuleGenerator>): void
{
    suite(
        "TSModuleGeneralCategory",
        () =>
        {
            let category: TSModuleGeneralCategory<ITSProjectSettings>;

            suiteSetup(
                async function()
                {
                    this.timeout(0);
                    category = new TSModuleGeneralCategory(await context.Generator);
                });

            test(
                "Checking whether all necessary components are present…",
                () =>
                {
                    for (let componentType of [TSModuleCodeWorkspace])
                    {
                        Assert.ok(
                            category.Components.some(
                                (component) =>
                                {
                                    return component instanceof componentType;
                                }));
                    }
                });
        });
}