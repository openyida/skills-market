export function didMount() {
  window.__erAppType__ = 'APP_PLMDYVRQKUCTICZK3N5P';

  injectStyles();
  loadX6Script(function() { renderErDiagram(); });
}

export function renderJsx() {
  return (
    <div id="yida-er-container" style={{
      width: '100%', height: '100vh', background: '#f0f2f5',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: 'PingFangSC, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 20px', background: '#fff', borderBottom: '1px solid #e5e6e8',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '15px', fontWeight: '600', color: '#1f2329' }}>
          📊 应用数据模型 ER 图
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={(e) => { handleZoomIn(); }} style={TOOLBAR_BTN_STYLE}>🔍 放大</button>
          <button onClick={(e) => { handleZoomOut(); }} style={TOOLBAR_BTN_STYLE}>🔎 缩小</button>
          <button onClick={(e) => { handleFitView(); }} style={TOOLBAR_BTN_STYLE}>⊡ 适应</button>
          <button onClick={(e) => { exportAsPng(); }} style={TOOLBAR_BTN_STYLE}>⬇ 导出 PNG</button>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px',
        padding: '6px 20px', background: '#fff', borderBottom: '1px solid #e5e6e8',
        fontSize: '12px', color: '#646a73', flexShrink: 0 }}>
        <span style={{ fontWeight: 500, color: '#1f2329' }}>图例：</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '28px', height: '2px', background: '#1664ff' }}></span>关联表单字段
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '28px', height: '0', borderTop: '2px dashed #1664ff' }}></span>关联其他表单数据
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '28px', height: '0', borderTop: '2px dotted #ff7d00' }}></span>数据联动
        </span>
        <span style={{ color: '#8f959e' }}>| 点击节点查看详情</span>
        {GRAPH_DATA.generatedAt && (
          <span style={{ marginLeft: 'auto', color: '#8f959e', fontSize: '11px', whiteSpace: 'nowrap' }}>
            数据生成于 {GRAPH_DATA.generatedAt}
            <span style={{ marginLeft: '8px', color: '#ff7d00' }}>· 如需更新，请重新调用 yida-er-diagram 技能</span>
          </span>
        )}
      </div>
      <div id="er-x6-container" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <div id="er-loading" style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#8f959e', fontSize: '14px', background: '#f0f2f5', zIndex: 10,
        }}>⏳ 正在加载 ER 图...</div>
      </div>
    </div>
  );
}

var TOOLBAR_BTN_STYLE = {
  padding: '4px 12px', border: '1px solid #e5e6e8', borderRadius: '6px',
  background: '#fff', cursor: 'pointer', fontSize: '13px', color: '#1f2329',
};

// ── 静态图数据 ────────────────────────────────────────
var GRAPH_DATA = {"nodes":[{"formUuid":"FORM-4IA6689167OBCXLE896OL8PKOXLI26A2G84JL4A","name":"表单中使用","formType":"receipt","fields":[{"label":"上传图片","componentName":"ImageField"},{"label":"图片剪裁","componentName":"Dialog"}]},{"formUuid":"FORM-6L966171PUMBNZOMEEZ7X546A2082A3IZ15JL9","name":"未命名表单","formType":"receipt","fields":[{"label":"单行文本","componentName":"TextField"},{"label":"图片上传","componentName":"ImageField"}]},{"formUuid":"FORM-IS866C91282CYX22EXEMPDSC66B529CETLGJL0","name":"公开表单1","formType":"receipt","fields":[{"label":"参数1","componentName":"TextField"},{"label":"参数2","componentName":"NumberField"}]},{"formUuid":"FORM-4W8667D1152CIVPIBEPR7D73OMUX3F4WARGJL3","name":"未命名流程表单","formType":"process","fields":[]},{"formUuid":"FORM-8Y866XB18J8CGSNI7HC8G4FERLT03VNGYOPJL3","name":"未命名表单","formType":"receipt","fields":[{"label":"定位","componentName":"LocationField"}]},{"formUuid":"FORM-4V966N81XI0EE17Q9GZHD66NDB9M3Y11OY8MLF","name":"公开表单1_复制","formType":"receipt","fields":[{"label":"参数1","componentName":"TextField"},{"label":"参数2","componentName":"NumberField"}]},{"formUuid":"FORM-F8666NB1S91E0UDM73W46D9B740U3OSBVY8ML4","name":"表单中使用_复制","formType":"receipt","fields":[{"label":"上传图片","componentName":"ImageField"},{"label":"图片剪裁","componentName":"Dialog"}]},{"formUuid":"FORM-0A966I81EB0EBCW7F06SVDWMJAM22HXQPKAMLQ","name":"翻译测试表单","formType":"receipt","fields":[{"label":"学号","componentName":"SerialNumberField"},{"label":"姓名","componentName":"TextField"},{"label":"描述","componentName":"TextareaField"}]},{"formUuid":"FORM-GI666T81BH9EXZUYCQ9H69L5OHTV218RJDKML8","name":"二维码流程打印测试","formType":"process","fields":[{"label":"单行文本","componentName":"TextField"},{"label":"数值","componentName":"NumberField"},{"label":"二维码图片","componentName":"ImageField"},{"label":"单选","componentName":"RadioField"}]},{"formUuid":"FORM-EE28958F86544A72913CDB841F156E9CW4AY","name":"New PTW","formType":"process","fields":[{"label":"头部","componentName":"PageSection"},{"label":"PTW","componentName":"SelectField"},{"label":"Propert","componentName":"SelectField"},{"label":"Location","componentName":"TextareaField"},{"label":"Work Time","componentName":"PageSection"},{"label":"Start Time","componentName":"DateField"},{"label":"End Time","componentName":"DateField"},{"label":"Hot Work Time","componentName":"PageSection"},{"label":"Start Time","componentName":"DateField"},{"label":"End Time","componentName":"DateField"},{"label":"分组","componentName":"PageSection"},{"label":"Type of Work","componentName":"SelectField"},{"label":"Detailed Scope of Work","componentName":"TextareaField"},{"label":"Document Required","componentName":"AttachmentField"},{"label":"分组","componentName":"PageSection"},{"label":"施工方承诺/声明","componentName":"AttachmentField"}]}],"edges":[],"generatedAt":"2026/03/26 09:32"};

// ── 常量 ──────────────────────────────────────────────
var LINE_HEIGHT = 24;
var NODE_WIDTH = 200;
var MAX_FIELDS = 8;
var HEADER_H = 30;

function truncateText(str, maxLen) {
  str = String(str || '');
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}

// ── 样式注入 ──────────────────────────────────────────
function injectStyles() {
  if (document.getElementById('er-x6-styles')) return;
  var style = document.createElement('style');
  style.id = 'er-x6-styles';
  style.textContent = [
    'html, body { height: 100%; margin: 0; padding: 0; overflow: hidden; }',
    '#yida-er-container { height: 100vh !important; min-height: unset !important; border-radius: 0 !important; }',
    // 隐藏 port 连接点（不需要手动连线功能）
    '.x6-port-body { visibility: hidden !important; }',
    // 节点 hover 高亮
    '.x6-node:hover .er-node-body { filter: drop-shadow(0 4px 12px rgba(22,100,255,.25)); cursor: pointer; }',
    // 详情弹窗
    '#er-detail-panel { position: absolute; top: 12px; right: 12px; width: 320px; height: calc(100vh - 120px); max-height: 600px;',
    '  background: #fff; border-radius: 8px; box-shadow: 0 8px 32px rgba(0,0,0,.15);',
    '  border: 1px solid #e5e6e8; overflow: hidden; display: flex; flex-direction: column; z-index: 100; }',
    '#er-detail-panel .dp-header { padding: 12px 16px; background: #1664ff; color: #fff;',
    '  font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }',
    '#er-detail-panel .dp-close { cursor: pointer; font-size: 18px; line-height: 1; opacity: .8; }',
    '#er-detail-panel .dp-close:hover { opacity: 1; }',
    '#er-detail-panel .dp-body { overflow-y: auto; flex: 1; padding: 0; }',
    '#er-detail-panel .dp-section { padding: 10px 16px 4px; font-size: 12px; font-weight: 600; color: #8f959e; border-top: 1px solid #f0f1f3; }',
    '#er-detail-panel .dp-section:first-child { border-top: none; }',
    '#er-detail-panel .dp-row { padding: 6px 16px; font-size: 13px; color: #1f2329; border-bottom: 1px solid #f5f6f8; display: flex; align-items: center; gap: 8px; }',
    '#er-detail-panel .dp-row:last-child { border-bottom: none; }',
    '#er-detail-panel .dp-tag { font-size: 11px; padding: 1px 6px; border-radius: 3px; flex-shrink: 0; }',
    '#er-detail-panel .dp-tag-assoc { background: #e8f0ff; color: #1664ff; }',
    '#er-detail-panel .dp-tag-ds { background: #e8f0ff; color: #1664ff; border: 1px dashed #1664ff; }',
    '#er-detail-panel .dp-tag-link { background: #fff3e8; color: #ff7d00; }',
  ].join('\n');
  document.head.appendChild(style);
}

// ── X6 加载 ───────────────────────────────────────────
var x6Graph = null;
// formUuid -> node 数据的映射，供详情弹窗使用
var nodeDataMap = {};
// formUuid -> nodeId 映射
var uuidToIdMap = {};

function loadX6Script(callback) {
  if (window.X6) { callback(); return; }
  var script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/antv-x6/2.18.1/index.js';
  script.onload = function() { callback(); };
  script.onerror = function() { showError('X6 加载失败，请检查网络'); };
  document.head.appendChild(script);
}

// ── 注册 Port 布局 ────────────────────────────────────
function registerErPortLayout() {
  window.X6.Graph.registerPortLayout(
    'erPortPosition',
    function(portsPositionArgs) {
      return portsPositionArgs.map(function(_, index) {
        return {
          position: { x: 0, y: HEADER_H + index * LINE_HEIGHT },
          angle: 0,
        };
      });
    },
    true
  );
}

// ── 注册 ER 节点（透明占位，HTML 覆盖层负责渲染外观）────────────
function registerErNode() {
  window.X6.Graph.registerNode(
    'er-rect',
    {
      inherit: 'rect',
      attrs: {
        body: {
          refWidth: '100%',
          refHeight: '100%',
          fill: 'transparent',
          stroke: 'transparent',
          strokeWidth: 0,
        },
      },
      ports: {
        groups: {
          list: {
            markup: [{ tagName: 'rect', selector: 'portBody' }],
            attrs: {
              portBody: {
                width: NODE_WIDTH,
                height: LINE_HEIGHT,
                fill: 'transparent',
                stroke: 'transparent',
                magnet: false,
              },
            },
            position: 'erPortPosition',
          },
        },
      },
    },
    true
  );
}

// ── 构建节点和边数据 ──────────────────────────────────
function buildCells(graphData, uuidToId, positions) {
  var cells = [];
  var nodeMap = {};
  graphData.nodes.forEach(function(n) { nodeMap[n.formUuid] = n; });

  graphData.nodes.forEach(function(node) {
    var nodeId = uuidToId[node.formUuid];
    var fields = node.fields || [];
    var shownFields = fields.slice(0, MAX_FIELDS);
    var moreCount = fields.length - MAX_FIELDS;
    var pos = positions[nodeId] || { x: 0, y: 0 };

    var ports = shownFields.map(function(f, i) {
      return {
        id: nodeId + '_p' + i,
        group: 'list',
        attrs: { portBody: {} },
      };
    });

    if (moreCount > 0) {
      ports.push({
        id: nodeId + '_more',
        group: 'list',
        attrs: { portBody: {} },
      });
    }

    var nodeHeight = HEADER_H + ports.length * LINE_HEIGHT;

    // 按表单类型设置 header 颜色
    var FORM_TYPE_COLORS = {
      'receipt': '#1664ff',
      'process': '#00b42a',
      'virtualView': '#ff7d00',
    };
    var headerColor = FORM_TYPE_COLORS[node.formType] || '#86909c';

    cells.push({
      id: nodeId,
      shape: 'er-rect',
      x: pos.x,
      y: pos.y,
      width: NODE_WIDTH,
      height: nodeHeight,
      data: {
        formUuid: node.formUuid,
        nodeName: node.name,
        headerColor: headerColor,
        fields: node.fields || [],
        moreCount: moreCount,
      },
    });
  });

  // 边
  var EDGE_STYLES = {
    association:   { stroke: '#1664ff', strokeWidth: 1.5, strokeDasharray: '' },
    'data-source': { stroke: '#1664ff', strokeWidth: 1.5, strokeDasharray: '6 3' },
    linkage:       { stroke: '#ff7d00', strokeWidth: 1.5, strokeDasharray: '2 3' },
  };

  var edgeSeen = {};
  graphData.edges.forEach(function(edge) {
    var srcId = uuidToId[edge.sourceFormUuid];
    var tgtId = uuidToId[edge.targetFormUuid];
    if (!srcId || !tgtId || srcId === tgtId) return;
    var key = srcId + '->' + tgtId + ':' + edge.relationType;
    if (edgeSeen[key]) return;
    edgeSeen[key] = true;
    var style = EDGE_STYLES[edge.relationType] || EDGE_STYLES.association;
    cells.push({
      shape: 'edge',
      source: { cell: srcId },
      target: { cell: tgtId },
      attrs: {
        line: {
          stroke: style.stroke,
          strokeWidth: style.strokeWidth,
          strokeDasharray: style.strokeDasharray,
          targetMarker: { name: 'block', size: 6, fill: style.stroke },
        },
      },
      router: { name: 'er', args: { offset: 32, direction: 'H' } },
      connector: { name: 'rounded', args: { radius: 8 } },
      zIndex: 0,
    });
  });

  return cells;
}

// ── 拓扑分层布局 ──────────────────────────────────────
function computeLayerLayout(graphData, uuidToId) {
  var nodeIds = graphData.nodes.map(function(n) { return uuidToId[n.formUuid]; });
  var inDegree = {};
  var outEdges = {};
  nodeIds.forEach(function(id) { inDegree[id] = 0; outEdges[id] = []; });

  var edgeSeen = {};
  graphData.edges.forEach(function(edge) {
    var srcId = uuidToId[edge.sourceFormUuid];
    var tgtId = uuidToId[edge.targetFormUuid];
    if (!srcId || !tgtId || srcId === tgtId) return;
    var key = srcId + '->' + tgtId;
    if (edgeSeen[key]) return;
    edgeSeen[key] = true;
    if (outEdges[srcId]) outEdges[srcId].push(tgtId);
    if (inDegree[tgtId] !== undefined) inDegree[tgtId]++;
  });

  var layers = [];
  var visited = {};
  var queue = nodeIds.filter(function(id) { return inDegree[id] === 0; });
  while (queue.length > 0) {
    layers.push(queue.slice());
    var next = [];
    queue.forEach(function(id) {
      visited[id] = true;
      (outEdges[id] || []).forEach(function(tgt) {
        inDegree[tgt]--;
        if (inDegree[tgt] === 0 && !visited[tgt]) next.push(tgt);
      });
    });
    queue = next;
  }
  var unvisited = nodeIds.filter(function(id) { return !visited[id]; });
  if (unvisited.length > 0) layers.push(unvisited);

  var nodeMap = {};
  graphData.nodes.forEach(function(n) { nodeMap[uuidToId[n.formUuid]] = n; });

  var LAYER_GAP = 80;
  var NODE_GAP = 20;
  var positions = {};
  var currentX = 40;

  layers.forEach(function(layerIds) {
    var currentY = 40;
    layerIds.forEach(function(id) {
      positions[id] = { x: currentX, y: currentY };
      var node = nodeMap[id] || { fields: [] };
      var cnt = Math.min((node.fields || []).length, MAX_FIELDS);
      var hasMore = (node.fields || []).length > MAX_FIELDS;
      var nodeHeight = HEADER_H + (cnt + (hasMore ? 1 : 0)) * LINE_HEIGHT;
      currentY += nodeHeight + NODE_GAP;
    });
    currentX += NODE_WIDTH + LAYER_GAP;
  });

  return positions;
}

// ── 详情弹窗 ──────────────────────────────────────────
function showDetailPanel(formUuid) {
  var node = nodeDataMap[formUuid];
  if (!node) return;

  // 找出该表单的所有关联关系
  var outEdges = [];
  var inEdges = [];
  var nodeNameMap = {};
  GRAPH_DATA.nodes.forEach(function(n) { nodeNameMap[n.formUuid] = n.name; });

  GRAPH_DATA.edges.forEach(function(edge) {
    if (edge.sourceFormUuid === formUuid) {
      outEdges.push(edge);
    } else if (edge.targetFormUuid === formUuid) {
      inEdges.push(edge);
    }
  });

  var FORM_TYPE_LABELS = {
    'receipt': '普通表单',
    'process': '流程表单',
    'virtualView': '聚合表',
  };
  var formTypeLabel = FORM_TYPE_LABELS[node.formType] || node.formType || '表单';

  var RELATION_LABELS = {
    association: { label: '关联字段', cls: 'dp-tag-assoc' },
    'data-source': { label: '关联数据', cls: 'dp-tag-ds' },
    linkage: { label: '数据联动', cls: 'dp-tag-link' },
  };

  // 构建弹窗 HTML
  var html = '';

  // 全部字段
  html += '<div class="dp-section">📋 全部字段（' + (node.fields || []).length + ' 个）</div>';
  (node.fields || []).forEach(function(f, i) {
    html += '<div class="dp-row" style="background:' + (i % 2 === 0 ? '#fff' : '#f8f9fb') + ';">'
      + '<span>' + escapeHtml(f.label) + '</span>'
      + '</div>';
  });

  // 关联出去的表单
  if (outEdges.length > 0) {
    html += '<div class="dp-section">→ 关联其他表单</div>';
    // 去重（同一目标表单只显示一次，但列出所有关联字段）
    var outMap = {};
    outEdges.forEach(function(e) {
      if (!outMap[e.targetFormUuid]) outMap[e.targetFormUuid] = [];
      outMap[e.targetFormUuid].push(e);
    });
    Object.keys(outMap).forEach(function(tgtUuid) {
      var tgtName = nodeNameMap[tgtUuid] || tgtUuid;
      var edges = outMap[tgtUuid];
      edges.forEach(function(e) {
        var rel = RELATION_LABELS[e.relationType] || RELATION_LABELS.association;
        html += '<div class="dp-row">'
          + '<span class="dp-tag ' + rel.cls + '">' + rel.label + '</span>'
          + '<span style="color:#8f959e;font-size:11px;">' + escapeHtml(e.fieldLabel) + '</span>'
          + '<span>→ ' + escapeHtml(tgtName) + '</span>'
          + '</div>';
      });
    });
  }

  // 被哪些表单关联
  if (inEdges.length > 0) {
    html += '<div class="dp-section">← 被其他表单关联</div>';
    var inMap = {};
    inEdges.forEach(function(e) {
      if (!inMap[e.sourceFormUuid]) inMap[e.sourceFormUuid] = [];
      inMap[e.sourceFormUuid].push(e);
    });
    Object.keys(inMap).forEach(function(srcUuid) {
      var srcName = nodeNameMap[srcUuid] || srcUuid;
      var edges = inMap[srcUuid];
      edges.forEach(function(e) {
        var rel = RELATION_LABELS[e.relationType] || RELATION_LABELS.association;
        html += '<div class="dp-row">'
          + '<span class="dp-tag ' + rel.cls + '">' + rel.label + '</span>'
          + '<span style="color:#8f959e;font-size:11px;">' + escapeHtml(e.fieldLabel) + '</span>'
          + '<span>← ' + escapeHtml(srcName) + '</span>'
          + '</div>';
      });
    });
  }

  // 构建「编辑表单」跳转链接
  var appType = window.__erAppType__ || '';
  var editUrl = '';
  if (appType) {
    var baseUrl = 'https://www.aliwork.com/alibaba/web/' + appType + '/design/';
    if (node.formType === 'virtualView') {
      editUrl = baseUrl + 'virtualViewDesigner.html?formUuid=' + node.formUuid;
    } else {
      // receipt 和 process 都用 pageDesigner
      editUrl = baseUrl + 'pageDesigner?formUuid=' + node.formUuid;
    }
  }

  var container = document.getElementById('er-x6-container');
  if (!container) return;

  // 移除旧弹窗
  var old = document.getElementById('er-detail-panel');
  if (old) old.parentNode.removeChild(old);

  var editBtnHtml = editUrl
    ? '<a href="' + editUrl + '" target="_blank" id="er-edit-btn" style="'
      + 'display:inline-flex;align-items:center;gap:4px;'
      + 'padding:4px 10px;border-radius:4px;font-size:12px;'
      + 'background:transparent;color:#fff;text-decoration:none;'
      + 'cursor:pointer;border:1.5px solid rgba(255,255,255,0.8);white-space:nowrap;'
      + '">✏ 编辑表单</a>'
    : '';

  // 根据表单类型确定 header 颜色
  var HEADER_COLORS = {
    'receipt': '#1664ff',
    'process': '#00b42a',
    'virtualView': '#ff7d00',
  };
  var headerBgColor = HEADER_COLORS[node.formType] || '#86909c';

  var panel = document.createElement('div');
  panel.id = 'er-detail-panel';
  panel.innerHTML = '<div class="dp-header" style="background:' + headerBgColor + ';">'
    + '<div style="display:flex;flex-direction:column;gap:2px;">'
    + '<span>' + escapeHtml(node.name) + '</span>'
    + '<span style="font-size:11px;font-weight:400;opacity:0.85;">' + escapeHtml(formTypeLabel) + '</span>'
    + '</div>'
    + '<div style="display:flex;align-items:center;gap:8px;">'
    + editBtnHtml
    + '<span class="dp-close" id="er-detail-close">✕</span>'
    + '</div>'
    + '</div>'
    + '<div class="dp-body">' + html + '</div>';

  container.appendChild(panel);

  // 阻止弹窗内滚动事件冒泡到 X6 画布（避免变成画布缩放）
  panel.addEventListener('wheel', function(e) {
    e.stopPropagation();
  }, { passive: false });

  document.getElementById('er-detail-close').addEventListener('click', function() {
    panel.parentNode && panel.parentNode.removeChild(panel);
  });
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── 主渲染 ────────────────────────────────────────────
function renderErDiagram() {
  var container = document.getElementById('er-x6-container');
  if (!container || !window.X6) return;

  registerErPortLayout();
  registerErNode();

  var graph = new window.X6.Graph({
    container: container,
    width: container.clientWidth || window.innerWidth,
    height: container.clientHeight || (window.innerHeight - 90),
    background: { color: '#f0f2f5' },
    grid: false,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      factor: 1.1,
      minScale: 0.05,
      maxScale: 4,
    },
    // 直接拖动画布，无需修饰键
    panning: { enabled: true },
    // 节点可拖动，但禁止连线
    interacting: {
      nodeMovable: true,
      edgeMovable: false,
      magnetConnectable: false,
    },
    connecting: { enabled: false },
  });
  x6Graph = graph;

  var graphData = GRAPH_DATA;
  var uuidToId = {};
  graphData.nodes.forEach(function(node) {
    uuidToId[node.formUuid] = 'n_' + node.formUuid.replace(/[^a-zA-Z0-9]/g, '').slice(-10);
    nodeDataMap[node.formUuid] = node;
  });
  uuidToIdMap = uuidToId;

  var positions = computeLayerLayout(graphData, uuidToId);
  var cells = buildCells(graphData, uuidToId, positions);

  var nodeCells = cells.filter(function(c) { return c.shape !== 'edge'; });
  var edgeCells = cells.filter(function(c) { return c.shape === 'edge'; });
  nodeCells.forEach(function(d) { graph.addNode(d); });
  edgeCells.forEach(function(d) { graph.addEdge(d); });

  // ── HTML 覆盖层：在 X6 画布上方叠加 HTML div 渲染节点外观 ──
  var htmlLayer = document.createElement('div');
  htmlLayer.id = 'er-html-layer';
  htmlLayer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;';
  container.appendChild(htmlLayer);

  // 节点 id -> HTML div 映射
  var nodeHtmlMap = {};

  function buildNodeHtml(nodeModel) {
    var data = nodeModel.getData() || {};
    var pos = nodeModel.getPosition();
    var size = nodeModel.getSize();
    var fields = data.fields || [];
    var shownFields = fields.slice(0, MAX_FIELDS);
    var moreCount = data.moreCount || 0;
    var headerColor = data.headerColor || '#1664ff';

    var div = document.createElement('div');
    div.style.cssText = [
      'position:absolute',
      'left:' + pos.x + 'px',
      'top:' + pos.y + 'px',
      'width:' + size.width + 'px',
      'height:' + size.height + 'px',
      'border-radius:6px',
      'border:1.5px solid #d0d3d9',
      'background:#fff',
      'box-shadow:0 2px 8px rgba(0,0,0,.06)',
      'overflow:hidden',
      'pointer-events:all',
      'cursor:pointer',
      'box-sizing:border-box',
    ].join(';');

    // header
    var header = document.createElement('div');
    header.style.cssText = [
      'height:' + HEADER_H + 'px',
      'background:' + headerColor,
      'display:flex',
      'align-items:center',
      'padding:0 10px',
      'color:#fff',
      'font-size:13px',
      'font-weight:bold',
      'font-family:PingFangSC,-apple-system,sans-serif',
      'overflow:hidden',
      'white-space:nowrap',
      'text-overflow:ellipsis',
      'flex-shrink:0',
    ].join(';');
    header.textContent = data.nodeName || '';
    div.appendChild(header);

    // 字段行
    shownFields.forEach(function(f, i) {
      var row = document.createElement('div');
      row.style.cssText = [
        'height:' + LINE_HEIGHT + 'px',
        'line-height:' + LINE_HEIGHT + 'px',
        'padding:0 8px',
        'font-size:12px',
        'color:#4e5969',
        'font-family:PingFangSC,-apple-system,sans-serif',
        'background:' + (i % 2 === 0 ? '#fff' : '#f8f9fb'),
        'border-top:1px solid #f0f1f3',
        'overflow:hidden',
        'white-space:nowrap',
        'text-overflow:ellipsis',
      ].join(';');
      row.textContent = f.label || '';
      div.appendChild(row);
    });

    if (moreCount > 0) {
      var moreRow = document.createElement('div');
      moreRow.style.cssText = [
        'height:' + LINE_HEIGHT + 'px',
        'line-height:' + LINE_HEIGHT + 'px',
        'padding:0 8px',
        'font-size:11px',
        'color:#8f959e',
        'font-family:PingFangSC,-apple-system,sans-serif',
        'background:#f5f6f8',
        'border-top:1px solid #f0f1f3',
      ].join(';');
      moreRow.textContent = '…还有 ' + moreCount + ' 个字段，点击查看';
      div.appendChild(moreRow);
    }

    return div;
  }

  // 初始化所有节点的 HTML div
  graph.getNodes().forEach(function(nodeModel) {
    var div = buildNodeHtml(nodeModel);
    var data = nodeModel.getData() || {};
    // 手动拖动：mousedown 开始拖动，mousemove 同步位置，mouseup 结束
    (function(capturedDiv, capturedNodeModel, capturedData) {
      var isDragging = false;
      var dragStartX = 0;
      var dragStartY = 0;
      var nodeStartX = 0;
      var nodeStartY = 0;
      var hasMoved = false;

      capturedDiv.addEventListener('mousedown', function(e) {
        // 只响应左键
        if (e.button !== 0) return;
        e.stopPropagation();
        isDragging = true;
        hasMoved = false;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        var pos = capturedNodeModel.getPosition();
        nodeStartX = pos.x;
        nodeStartY = pos.y;
        capturedDiv.style.zIndex = '10';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      function onMouseMove(e) {
        if (!isDragging) return;
        var scale = (graph.matrix() && graph.matrix().a) || 1;
        var dx = (e.clientX - dragStartX) / scale;
        var dy = (e.clientY - dragStartY) / scale;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasMoved = true;
        var newX = nodeStartX + dx;
        var newY = nodeStartY + dy;
        // 同步 HTML div
        capturedDiv.style.left = newX + 'px';
        capturedDiv.style.top = newY + 'px';
        // 同步 X6 占位节点（用于边的连接点更新）
        capturedNodeModel.setPosition(newX, newY);
      }

      function onMouseUp(e) {
        if (!isDragging) return;
        isDragging = false;
        capturedDiv.style.zIndex = '';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        // 如果没有移动，触发点击（打开详情弹窗）
        if (!hasMoved && capturedData.formUuid) {
          showDetailPanel(capturedData.formUuid);
        }
      }
    })(div, nodeModel, data);

    htmlLayer.appendChild(div);
    nodeHtmlMap[nodeModel.id] = div;
  });

  // 同步 HTML 层的位置和缩放（跟随画布 transform）
  function syncHtmlLayer() {
    var transform = graph.matrix();
    if (!transform) return;
    var tx = transform.e || 0;
    var ty = transform.f || 0;
    var scale = transform.a || 1;
    htmlLayer.style.transform = 'matrix(' + scale + ',0,0,' + scale + ',' + tx + ',' + ty + ')';
    htmlLayer.style.transformOrigin = '0 0';
  }

  graph.on('translate', syncHtmlLayer);
  graph.on('scale', syncHtmlLayer);

  // 节点点击 → 详情弹窗
  graph.on('node:click', function(args) {
    var formUuid = args.node.getData() && args.node.getData().formUuid;
    if (formUuid) showDetailPanel(formUuid);
  });

  // 点击画布空白处关闭弹窗
  graph.on('blank:click', function() {
    var panel = document.getElementById('er-detail-panel');
    if (panel) panel.parentNode.removeChild(panel);
  });

  setTimeout(function() {
    graph.zoomToFit({ padding: 40, maxScale: 1 });
    showLoading(false);
  }, 150);
}

// ── 工具栏操作 ────────────────────────────────────────
function handleZoomIn() { if (x6Graph) x6Graph.zoom(0.2); }
function handleZoomOut() { if (x6Graph) x6Graph.zoom(-0.2); }
function handleFitView() { if (x6Graph) x6Graph.zoomToFit({ padding: 40, maxScale: 1 }); }
function exportAsPng() {
  console.log('[ER导出] 开始导出...');
  if (!x6Graph) {
    console.error('[ER导出] x6Graph 未初始化');
    return;
  }

  var PADDING = 40;
  var SCALE = 2; // 高清 2x

  // 收集所有节点的位置和数据
  var nodes = x6Graph.getNodes();
  var edges = x6Graph.getEdges();

  if (nodes.length === 0) {
    alert('暂无节点可导出');
    return;
  }

  // 计算画布边界
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  nodes.forEach(function(node) {
    var pos = node.getPosition();
    var size = node.getSize();
    if (pos.x < minX) minX = pos.x;
    if (pos.y < minY) minY = pos.y;
    if (pos.x + size.width > maxX) maxX = pos.x + size.width;
    if (pos.y + size.height > maxY) maxY = pos.y + size.height;
  });

  var canvasW = (maxX - minX + PADDING * 2) * SCALE;
  var canvasH = (maxY - minY + PADDING * 2) * SCALE;
  var offsetX = (minX - PADDING) * SCALE;
  var offsetY = (minY - PADDING) * SCALE;

  console.log('[ER导出] 画布尺寸:', canvasW, 'x', canvasH, '节点数:', nodes.length, '边数:', edges.length);

  var canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  var ctx = canvas.getContext('2d');

  // 背景
  ctx.fillStyle = '#f0f2f5';
  ctx.fillRect(0, 0, canvasW, canvasH);

  // ── 绘制边 ──
  edges.forEach(function(edge) {
    var vertices = edge.getVertices() || [];
    var sourceNode = edge.getSourceNode();
    var targetNode = edge.getTargetNode();
    if (!sourceNode || !targetNode) return;

    var sourcePos = sourceNode.getPosition();
    var sourceSize = sourceNode.getSize();
    var targetPos = targetNode.getPosition();
    var targetSize = targetNode.getSize();

    // 简单连线：从源节点右侧中点到目标节点左侧中点
    var sx = (sourcePos.x + sourceSize.width) * SCALE - offsetX;
    var sy = (sourcePos.y + sourceSize.height / 2) * SCALE - offsetY;
    var tx = targetPos.x * SCALE - offsetX;
    var ty = (targetPos.y + targetSize.height / 2) * SCALE - offsetY;

    var edgeData = edge.getData() || {};
    var relType = edgeData.relType || 'association';
    if (relType === 'data-source') {
      ctx.setLineDash([6 * SCALE, 4 * SCALE]);
      ctx.strokeStyle = '#1664ff';
    } else if (relType === 'linkage') {
      ctx.setLineDash([3 * SCALE, 4 * SCALE]);
      ctx.strokeStyle = '#ff7d00';
    } else {
      ctx.setLineDash([]);
      ctx.strokeStyle = '#1664ff';
    }
    ctx.lineWidth = 1.5 * SCALE;

    ctx.beginPath();
    ctx.moveTo(sx, sy);
    // 贝塞尔曲线
    var cpx = (sx + tx) / 2;
    ctx.bezierCurveTo(cpx, sy, cpx, ty, tx, ty);
    ctx.stroke();

    // 箭头
    ctx.setLineDash([]);
    var angle = Math.atan2(ty - sy, tx - sx);
    var arrowLen = 8 * SCALE;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx - arrowLen * Math.cos(angle - 0.4), ty - arrowLen * Math.sin(angle - 0.4));
    ctx.lineTo(tx - arrowLen * Math.cos(angle + 0.4), ty - arrowLen * Math.sin(angle + 0.4));
    ctx.closePath();
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
  });

  ctx.setLineDash([]);

  // ── 绘制节点 ──
  nodes.forEach(function(node) {
    var pos = node.getPosition();
    var size = node.getSize();
    var data = node.getData() || {};
    var fields = data.fields || [];
    var shownFields = fields.slice(0, MAX_FIELDS);
    var moreCount = data.moreCount || 0;
    var headerColor = data.headerColor || '#1664ff';

    var nx = pos.x * SCALE - offsetX;
    var ny = pos.y * SCALE - offsetY;
    var nw = size.width * SCALE;
    var nh = size.height * SCALE;
    var hh = HEADER_H * SCALE;
    var lh = LINE_HEIGHT * SCALE;
    var radius = 6 * SCALE;

    // 阴影
    ctx.shadowColor = 'rgba(0,0,0,0.08)';
    ctx.shadowBlur = 8 * SCALE;
    ctx.shadowOffsetY = 2 * SCALE;

    // 节点背景（圆角矩形）
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(nx + radius, ny);
    ctx.lineTo(nx + nw - radius, ny);
    ctx.quadraticCurveTo(nx + nw, ny, nx + nw, ny + radius);
    ctx.lineTo(nx + nw, ny + nh - radius);
    ctx.quadraticCurveTo(nx + nw, ny + nh, nx + nw - radius, ny + nh);
    ctx.lineTo(nx + radius, ny + nh);
    ctx.quadraticCurveTo(nx, ny + nh, nx, ny + nh - radius);
    ctx.lineTo(nx, ny + radius);
    ctx.quadraticCurveTo(nx, ny, nx + radius, ny);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 边框
    ctx.strokeStyle = '#d0d3d9';
    ctx.lineWidth = 1.5 * SCALE;
    ctx.stroke();

    // header 背景（圆角只在上方）
    ctx.fillStyle = headerColor;
    ctx.beginPath();
    ctx.moveTo(nx + radius, ny);
    ctx.lineTo(nx + nw - radius, ny);
    ctx.quadraticCurveTo(nx + nw, ny, nx + nw, ny + radius);
    ctx.lineTo(nx + nw, ny + hh);
    ctx.lineTo(nx, ny + hh);
    ctx.lineTo(nx, ny + radius);
    ctx.quadraticCurveTo(nx, ny, nx + radius, ny);
    ctx.closePath();
    ctx.fill();

    // header 文字
    ctx.fillStyle = '#fff';
    ctx.font = 'bold ' + (13 * SCALE) + 'px PingFangSC,Arial,sans-serif';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    var nodeName = data.nodeName || '';
    // 截断文字
    var maxTextW = nw - 20 * SCALE;
    while (nodeName.length > 1 && ctx.measureText(nodeName).width > maxTextW) {
      nodeName = nodeName.slice(0, -1);
    }
    if (nodeName !== (data.nodeName || '')) nodeName += '…';
    ctx.fillText(nodeName, nx + 10 * SCALE, ny + hh / 2);

    // 字段行
    shownFields.forEach(function(f, i) {
      var rowY = ny + hh + i * lh;
      ctx.fillStyle = i % 2 === 0 ? '#fff' : '#f8f9fb';
      ctx.fillRect(nx, rowY, nw, lh);

      // 分割线
      ctx.strokeStyle = '#f0f1f3';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(nx, rowY);
      ctx.lineTo(nx + nw, rowY);
      ctx.stroke();

      ctx.fillStyle = '#4e5969';
      ctx.font = (12 * SCALE) + 'px PingFangSC,Arial,sans-serif';
      ctx.textBaseline = 'middle';
      var fieldLabel = f.label || '';
      var maxFW = nw - 16 * SCALE;
      while (fieldLabel.length > 1 && ctx.measureText(fieldLabel).width > maxFW) {
        fieldLabel = fieldLabel.slice(0, -1);
      }
      if (fieldLabel !== (f.label || '')) fieldLabel += '…';
      ctx.fillText(fieldLabel, nx + 8 * SCALE, rowY + lh / 2);
    });

    // "还有 N 个字段" 行
    if (moreCount > 0) {
      var moreY = ny + hh + shownFields.length * lh;
      ctx.fillStyle = '#f5f6f8';
      ctx.fillRect(nx, moreY, nw, lh);
      ctx.strokeStyle = '#f0f1f3';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(nx, moreY);
      ctx.lineTo(nx + nw, moreY);
      ctx.stroke();
      ctx.fillStyle = '#8f959e';
      ctx.font = (11 * SCALE) + 'px PingFangSC,Arial,sans-serif';
      ctx.textBaseline = 'middle';
      ctx.fillText('…还有 ' + moreCount + ' 个字段，点击查看', nx + 8 * SCALE, moreY + lh / 2);
    }
  });

  // 下载
  try {
    var dataUrl = canvas.toDataURL('image/png');
    var now = new Date();
    var pad = function(n) { return n < 10 ? '0' + n : '' + n; };
    var timestamp = now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate())
      + '-' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
    var appType = (window.__erAppType__ || 'APP');
    var fileName = 'er-diagram_' + appType + '_' + timestamp + '.png';
    var link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    console.log('[ER导出] 导出成功：' + fileName);
  } catch (err) {
    console.error('[ER导出] toDataURL 失败:', err);
    alert('导出失败：' + err.message);
  }
}

// ── UI 状态 ───────────────────────────────────────────
function showLoading(visible) {
  var el = document.getElementById('er-loading');
  if (el) el.style.display = visible ? 'flex' : 'none';
}
function showError(message) {
  var el = document.getElementById('er-loading');
  if (el) { el.style.display = 'flex'; el.textContent = '❌ ' + message; }
}
