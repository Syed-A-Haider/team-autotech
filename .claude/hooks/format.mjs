// PostToolUse hook: run prettier on the file Claude just wrote or edited.
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

let input = '';
for await (const chunk of process.stdin) input += chunk;

const data = JSON.parse(input);
const file = data.tool_response?.filePath ?? data.tool_input?.file_path;

if (file) {
  const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  const require = createRequire(path.join(root, 'package.json'));
  try {
    execFileSync(
      process.execPath,
      [require.resolve('prettier/bin/prettier.cjs'), '--write', '--ignore-unknown', file],
      { cwd: root, stdio: 'ignore' },
    );
  } catch {
    // Formatting is best-effort; never block an edit.
  }
}
