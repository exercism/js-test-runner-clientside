type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function readConfig<Custom extends object = {}>(
  solutionFiles: Record<string, string>,
) {
  const configJson = solutionFiles[".meta/config.json"];
  if (!configJson) {
    throw new Error(
      `Expected '.meta/config.json' to exist. Actual: ${Object.keys(solutionFiles)}`,
    );
  }

  const { files, ...parsed } = JSON.parse(configJson) as Omit<
    ExerciseConfig<Custom>,
    "files"
  > & { files: { [P in keyof ExerciseConfig["files"]]: readonly string[] } };
  const config = { ...parsed, files: {} as Writeable<ExerciseConfig["files"]> };

  (Object.keys(files) as Array<keyof typeof files>).forEach((key) => {
    config.files[key] = files[key]!.map(globToMatcher);
  });

  // Old exercise support
  if (!("custom" in config)) {
    (config as any).custom = {};
  }

  return config as ExerciseConfig<Custom>;
}

function globToMatcher(glob: string): RegExp {
  // TODO escape entire glob? Unlikely to have regex characters in file names
  // because of Windows restrictions, but probably need to do it anyway...
  return new RegExp(
    glob
      .replaceAll(".", "\\.")
      .replaceAll(/(?<!\*)\*(?!\*)/g, "[^/]*")
      .replaceAll("**", ".*?")
      .concat("$"),
  );
}

export function findUserCode(
  config: ExerciseConfig,
  files: Record<string, string>,
  userPaths: string[],
): Record<string, string> {
  userPaths = userPaths.filter((path) =>
    config.files.solution.some((pattern) => pattern.test(path)),
  );

  if (userPaths.length === 0) {
    throw new Error(
      `Expected at least one solution file to be submitted (${config.files.solution}). Actual: ${Object.keys(files)}`,
    );
  }

  return userPaths.reduce<Record<string, string>>((result, path) => {
    if (Object.prototype.hasOwnProperty.call(files, path)) {
      result[path] = files[path];
    }
    return result;
  }, {});
}

export function findLibCode(
  config: ExerciseConfig,
  files: Record<string, string>,
  userPaths: string[],
): Record<string, string> {
  if (!config.files.extra && !config.files.editor) {
    return {};
  }

  let libPaths = Object.keys(files).filter((path) =>
    (config.files.extra || []).some((pattern) => pattern.test(path)),
  );

  let editorPaths = Object.keys(files).filter((path) =>
    (config.files.editor || []).some((pattern) => pattern.test(path)),
  );

  if (userPaths && editorPaths.some((path) => userPaths.includes(path))) {
    throw new Error(
      `Expected the provided non-solution files to not have changed. The user provided files (${userPaths.join(", ")}) overlaps with the configured read-only files (${editorPaths.join(", ")}).`,
    );
  }

  return libPaths
    .concat(editorPaths)
    .reduce<Record<string, string>>((result, path) => {
      if (Object.prototype.hasOwnProperty.call(files, path)) {
        result[path] = files[path];
      }
      return result;
    }, {});
}

export function findTestCode(
  config: ExerciseConfig,
  files: Record<string, string>,
  userPaths?: string[],
): Record<string, string> {
  let testPaths = Object.keys(files).filter((path) =>
    config.files.test.some((pattern) => pattern.test(path)),
  );

  if (userPaths && testPaths.some((path) => userPaths.includes(path))) {
    throw new Error(
      `Expected the provided non-solution files to not have changed. The user provided files (${userPaths.join(", ")}) overlaps with the configured test files (${testPaths.join(", ")}).`,
    );
  }

  if (testPaths.length === 0) {
    throw new Error(
      `Expected at least one test file to be included (${config.files.test}). Actual: ${Object.keys(files)}`,
    );
  }

  return testPaths.reduce<Record<string, string>>((result, path) => {
    if (Object.prototype.hasOwnProperty.call(files, path)) {
      result[path] = files[path];
    }
    return result;
  }, {});
}

export type ExerciseConfig<Custom extends object = {}> = Readonly<{
  authors: readonly string[];
  contributors: readonly string[];
  files: Readonly<{
    solution: readonly RegExp[];
    test: readonly RegExp[];
    exemplar: readonly RegExp[];
    editor?: readonly RegExp[];
    extra?: readonly RegExp[];
  }>;
  blurb: string;
  custom: Custom;
}>;

export type CustomJavaScriptConfig = {
  "version.tests.compatibility": "jest-27" | "jest-29";
  "flag.tests.task-per-describe": boolean;
  "flag.tests.may-run-long": boolean;
  "flag.tests.includes-optional": boolean;
};
