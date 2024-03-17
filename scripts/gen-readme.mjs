import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const root = path.join(path.dirname(__filename), '../');
const source = path.join(root, 'src');

let content = '# 算法练习\n';

[
  'easy',
  'medium',
  'hard',
].map((difficulty) => {
  const dir = path.join(source, difficulty);
  // 遍历dir下的第一层文件夹
  const problems = fs.readdirSync(dir);

  content += `\n## ${difficulty}（${problems.length}）\n`;

  return problems.map((problem) => {
    const problemDir = path.join(dir, problem);
    // 拿到README.md的路径
    const readme = path.join(problemDir, 'README.md');
    if (fs.existsSync(readme)) {
      // 拿到第一行的标题
      const title = fs
        .readFileSync(readme, 'utf-8')
        .split('\n')[0]
        .replace(/(#|\s)/, '');
      // 拿到相对root的路径
      const relativePath = path.relative(root, readme);

      content += `- [x] [${title}](./${relativePath})\n`;
    }
  });
});

fs.writeFileSync(path.join(root, 'README.md'), content);
