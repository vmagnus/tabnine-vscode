import { promises as fs } from "fs";
import * as path from "path";

const EXECUTABLE_FLAG = 0o755;
export async function setDirectoryFilesAsExecutable(
  bundleDirectory: string
): Promise<void[]> {
  if (isWindows()) {
    return Promise.resolve([]);
  }
  const files = await fs.readdir(bundleDirectory);
  return Promise.all(
    files.map((file) =>
      fs.chmod(path.join(bundleDirectory, file), EXECUTABLE_FLAG)
    )
  );
}

export function isWindows(): boolean {
  return process.platform === "win32";
}
