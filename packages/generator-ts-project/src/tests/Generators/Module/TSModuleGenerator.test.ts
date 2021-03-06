import { doesNotThrow, strictEqual } from "assert";
import { spawnSync } from "child_process";
import { IRunContext } from "@manuth/extended-yo-generator-test";
import npmWhich = require("npm-which");
import { TSModuleGenerator } from "../../../generators/module/TSModuleGenerator";
import { TestContext } from "../../TestContext";

/**
 * Registers tests for the `TSModuleGenerator`.
 *
 * @param context
 * The test-context.
 */
export function TSModuleGeneratorTests(context: TestContext<TSModuleGenerator>): void
{
    suite(
        "TSModuleGenerator",
        () =>
        {
            let runContext: IRunContext<TSModuleGenerator>;

            suiteSetup(
                async function()
                {
                    this.timeout(0);
                    runContext = context.ExecuteGenerator();
                    await runContext.toPromise();
                });

            suiteTeardown(
                function()
                {
                    this.timeout(0);
                    runContext.cleanTestDirectory();
                });

            test(
                "Checking whether the generated project can be installed…",
                function()
                {
                    this.timeout(0);
                    this.slow(2 * 60 * 1000);

                    let installationResult = spawnSync(
                        npmWhich(__dirname).sync("npm"),
                        [
                            "install",
                            "--silent"
                        ],
                        {
                            cwd: runContext.generator.destinationPath()
                        });

                    let buildResult = spawnSync(
                        npmWhich(__dirname).sync("npm"),
                        [
                            "run",
                            "build"
                        ],
                        {
                            cwd: runContext.generator.destinationPath()
                        });

                    strictEqual(installationResult.status, 0);
                    strictEqual(buildResult.status, 0);
                });

            test(
                "Checking whether the generated module can be loaded…",
                () =>
                {
                    doesNotThrow(
                        () =>
                        {
                            require(runContext.generator.destinationPath());
                        });
                });

            test(
                "Checking whether the mocha-tests can be executed…",
                function()
                {
                    this.timeout(8 * 1000);
                    this.slow(4 * 1000);

                    let result = spawnSync(
                        npmWhich(runContext.generator.destinationPath()).sync("mocha"),
                        {
                            cwd: runContext.generator.destinationPath()
                        });

                    strictEqual(result.status, 0);
                });
        });
}
