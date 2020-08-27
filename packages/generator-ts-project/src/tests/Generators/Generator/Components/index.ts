import { TSGeneratorGenerator } from "../../../../generators/generator/TSGeneratorGenerator";
import { TestContext } from "../../../TestContext";
import { TSGeneratorCategoryTests } from "./TSGeneratorCategory.test";
import { TSGeneratorComponentCollectionTests } from "./TSGeneratorComponentCollection.test";

/**
 * Registers tests for the `Generator`-generator.
 *
 * @param context
 * The test-context.
 */
export function ComponentTests(context: TestContext<TSGeneratorGenerator>): void
{
    suite(
        "Components",
        () =>
        {
            TSGeneratorCategoryTests(context);
            TSGeneratorComponentCollectionTests(context);
        });
}
