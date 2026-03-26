'use strict';
/**
 * 将采集好的 GRAPH_DATA 写入 er-diagram.js 并触发发布
 *
 * 用法：
 *   node skills/yida-er-diagram/scripts/update-er-diagram.js <appType> <pageFormUuid>
 *
 * 示例：
 *   node skills/yida-er-diagram/scripts/update-er-diagram.js APP_HTZ06OGDO4XKFP3LL55J FORM-40CAB834ADA645578A53BD87A15ABBB5O7UV
 *
 * 前置条件：
 *   - 已执行 fetch-forms.js，生成了 .cache/new-er-graph-data.json
 *   - skills/yida-er-diagram/scripts/er-diagram.js 存在
 */

const fs = require('fs');
const { execSync } = require('child_process');

const appType = process.argv[2];
const pageFormUuid = process.argv[3];

if (!appType || !pageFormUuid) {
  console.error('用法: node update-er-diagram.js <appType> <pageFormUuid>');
  console.error('示例: node update-er-diagram.js APP_HTZ06OGDO4XKFP3LL55J FORM-40CAB834ADA645578A53BD87A15ABBB5O7UV');
  process.exit(1);
}

const graphDataPath = '.cache/new-er-graph-data.json';
const sourceFilePath = 'skills/yida-er-diagram/scripts/er-diagram.js';

if (!fs.existsSync(graphDataPath)) {
  console.error('❌ 找不到', graphDataPath, '，请先执行 fetch-forms.js');
  process.exit(1);
}

if (!fs.existsSync(sourceFilePath)) {
  console.error('❌ 找不到', sourceFilePath);
  process.exit(1);
}

// 读取 GRAPH_DATA，并注入生成时间戳
const graphData = JSON.parse(fs.readFileSync(graphDataPath, 'utf8'));
graphData.generatedAt = new Date().toLocaleString('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit',
});
const graphDataJs = 'var GRAPH_DATA = ' + JSON.stringify(graphData) + ';';

// 读取源文件
let content = fs.readFileSync(sourceFilePath, 'utf8');

// 替换 __erAppType__
content = content.replace(
  /window\.__erAppType__ = '[^']*';/,
  "window.__erAppType__ = '" + appType + "';"
);

// 替换 GRAPH_DATA（整行替换）
content = content.replace(
  /^var GRAPH_DATA = \{.*\};$/m,
  graphDataJs
);

fs.writeFileSync(sourceFilePath, content);
console.log('✅ er-diagram.js 已更新');
console.log('   appType:', appType);
console.log('   节点数:', graphData.nodes.length, '  边数:', graphData.edges.length);

// 发布
console.log('\n📤 开始发布...');
try {
  const output = execSync(
    'openyida publish ' + sourceFilePath + ' ' + appType + ' ' + pageFormUuid,
    { encoding: 'utf8' }
  );
  console.log(output);
} catch (err) {
  console.error('❌ 发布失败:', err.message);
  process.exit(1);
}
