import { executeShellFile } from "./shell-runner.js";

const main = async () => {
    const ctx = {
        entry: './automake',
    };
    await executeShellFile(ctx);
};

main();
