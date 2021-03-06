import { GeneratorOptions, IGeneratorSettings, Resolvable } from "@manuth/extended-yo-generator";
import { ScriptMapping } from "./ScriptMapping";
import { ScriptProcessor } from "./ScriptProcessor";

/**
 * Represents a script-mapping.
 */
export interface IScriptMapping<TSettings extends IGeneratorSettings, TOptions extends GeneratorOptions>
{
    /**
     * The source-script.
     */
    Source: Resolvable<ScriptMapping<TSettings, TOptions>, TSettings, TOptions, string>;

    /**
     * The name of the destination-script.
     */
    Destination: Resolvable<ScriptMapping<TSettings, TOptions>, TSettings, TOptions, string>;

    /**
     * A component for manipulating the script.
     */
    Processor?: ScriptProcessor<TSettings, TOptions>;
}
