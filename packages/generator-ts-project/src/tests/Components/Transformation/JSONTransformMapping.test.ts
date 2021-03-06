import { deepStrictEqual, ok } from "assert";
import { EOL } from "os";
import { GeneratorOptions } from "@manuth/extended-yo-generator";
import { FileMappingTester, ITestGeneratorOptions, ITestGeneratorSettings, ITestOptions, TestGenerator } from "@manuth/extended-yo-generator-test";
import { TempFile } from "@manuth/temp-files";
import { writeFile } from "fs-extra";
import { JSONTransformMapping } from "../../../Components/Transformation/JSONTransformMapping";
import { TestContext } from "../../TestContext";

/**
 * Registers tests for the `JSONTransformMapping` class.
 *
 * @param context
 * The test-context.
 */
export function JSONTransformMappingTests(context: TestContext<TestGenerator, ITestGeneratorOptions<ITestOptions>>): void
{
    suite(
        "JSONTransformMapping",
        () =>
        {
            let generator: TestGenerator;
            let sourceFile: TempFile;
            let destinationFile: TempFile;
            let fileMappingOptions: JSONTransformMapping<ITestGeneratorSettings, GeneratorOptions, any>;
            let tester: FileMappingTester<TestGenerator, ITestGeneratorSettings, GeneratorOptions, JSONTransformMapping<ITestGeneratorSettings, GeneratorOptions, any>>;
            let sourceData: any;
            let randomData: any;

            suiteSetup(
                async function()
                {
                    this.timeout(0);
                    generator = await context.Generator;
                    sourceFile = new TempFile();
                    destinationFile = new TempFile();

                    fileMappingOptions = new class extends JSONTransformMapping<ITestGeneratorSettings, GeneratorOptions, any>
                    {
                        /**
                         * @inheritdoc
                         */
                        public constructor()
                        {
                            super(generator);
                        }

                        /**
                         * @inheritdoc
                         */
                        public get Source(): string
                        {
                            return sourceFile.FullName;
                        }

                        /**
                         * @inheritdoc
                         */
                        public get Destination(): string
                        {
                            return destinationFile.FullName;
                        }

                        /**
                         * @inheritdoc
                         *
                         * @param data
                         * The data to process.
                         *
                         * @returns
                         * The processed data.
                         */
                        public async Transform(data: any): Promise<any>
                        {
                            return randomData;
                        }
                    }();

                    tester = new FileMappingTester(generator, fileMappingOptions);
                });

            setup(
                async () =>
                {
                    sourceData = context.RandomObject;
                    randomData = context.RandomObject;
                    await writeFile(sourceFile.FullName, JSON.stringify(sourceData));
                });

            test(
                "Checking whether the data is parsed correctly…",
                async () =>
                {
                    deepStrictEqual(await fileMappingOptions.Metadata, sourceData);
                });

            test(
                "Checking whether the data is transformed correctly…",
                async () =>
                {
                    await tester.Run();
                    deepStrictEqual(JSON.parse(await tester.Content), randomData);
                });

            test(
                "Checking whether a trailing new-line is added…",
                async () =>
                {
                    await tester.Run();
                    ok((await tester.Content).endsWith(EOL));
                });
        });
}
