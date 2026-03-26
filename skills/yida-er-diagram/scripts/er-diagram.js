export function didMount() {
  window.__erAppType__ = 'APP_Z483SQTRMG1XRQWV8FFB';

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
    <button onClick={(e) => { exportAsCSV(); }} style={TOOLBAR_BTN_STYLE}>📋 导出表格</button>
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
var GRAPH_DATA = {"nodes":[{"formUuid":"FORM-76AD2D18FE284FFC955FA98815ACFBB85ACR","name":"库存计算表","formType":"virtualView","fields":[{"label":"仓库名称","componentName":"TextField"},{"label":"仓库编号","componentName":"TextField"},{"label":"产品名称","componentName":"TextField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"当前库存数量","componentName":"NumberField"},{"label":"库存冻结数量","componentName":"NumberField"},{"label":"当前可用库存数量","componentName":"NumberField"},{"label":"计划出库数量","componentName":"NumberField"},{"label":"采购入库数量","componentName":"NumberField"},{"label":"其他入库数量","componentName":"NumberField"},{"label":"总入库数量","componentName":"NumberField"},{"label":"销售出库数量","componentName":"NumberField"},{"label":"其他出库数量","componentName":"NumberField"},{"label":"总出库数量","componentName":"NumberField"},{"label":"采购入库-产品成本总额/元","componentName":"NumberField"},{"label":"其他入库-产品成本总额/元","componentName":"NumberField"},{"label":"其他出库-产品销售总额/元","componentName":"NumberField"},{"label":"其他出库-产品成本总额/元","componentName":"NumberField"},{"label":"销售出库-产品销售总额/元","componentName":"NumberField"},{"label":"销售出库-产品成本总额/元","componentName":"NumberField"}]},{"formUuid":"FORM-B15624BEE32F49C1832004C589054A84S5AU","name":"通知规则配置","formType":"receipt","fields":[{"label":"基础信息","componentName":"PageSection"},{"label":"库存预警值","componentName":"NumberField"},{"label":"订单交货日期之前X天","componentName":"NumberField"},{"label":"分组","componentName":"PageSection"},{"label":"统一值","componentName":"TextField"},{"label":"通知开始日期","componentName":"DateField"}]},{"formUuid":"FORM-085E2E7BB49D492E881EC7EAC3EE2C48VR64","name":"单位信息","formType":"receipt","fields":[{"label":"基础信息","componentName":"PageSection"},{"label":"单位编号","componentName":"SerialNumberField"},{"label":"单位名称","componentName":"TextField"},{"label":"描述","componentName":"TextareaField"}]},{"formUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","name":"产品信息","formType":"receipt","fields":[{"label":"产品信息","componentName":"PageSection"},{"label":"产品名称","componentName":"TextField"},{"label":"规格","componentName":"TextField"},{"label":"供应商","componentName":"SelectField"},{"label":"销售价格","componentName":"NumberField"},{"label":"成本单价","componentName":"NumberField"},{"label":"产品编号","componentName":"SerialNumberField"},{"label":"分类","componentName":"SelectField"},{"label":"单位","componentName":"SelectField"},{"label":"库存预警值","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"图片","componentName":"ImageField"},{"label":"系统分组","componentName":"PageSection"},{"label":"触发日期","componentName":"DateField"}]},{"formUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","name":"仓库","formType":"receipt","fields":[{"label":"仓库编号","componentName":"SerialNumberField"},{"label":"仓库名称","componentName":"TextField"},{"label":"仓库管理员","componentName":"EmployeeField"},{"label":"国家/地区","componentName":"CountrySelectField"},{"label":"仓库地址","componentName":"AddressField"},{"label":"定位","componentName":"LocationField"}]},{"formUuid":"FORM-8937D0D1FC65430A96A5EF14B5220A4BOHGJ","name":"产品分类","formType":"receipt","fields":[{"label":"分类名称","componentName":"TextField"}]},{"formUuid":"FORM-AEB5459EE63B46B5944B851368C8B2E0ROZJ","name":"供应商等级","formType":"receipt","fields":[{"label":"供应商名称","componentName":"AssociationFormField"},{"label":"供应商编码","componentName":"TextField"},{"label":"供应商等级","componentName":"RadioField"},{"label":"隐藏字段","componentName":"PageSection"},{"label":"供应商名称","componentName":"TextField"}]},{"formUuid":"FORM-B6CB37426582486097158DE16262CACFK442","name":"客户等级","formType":"receipt","fields":[{"label":"客户名称","componentName":"AssociationFormField"},{"label":"客户编码","componentName":"TextField"},{"label":"客户等级","componentName":"RadioField"},{"label":"隐藏分组","componentName":"PageSection"},{"label":"客户名称","componentName":"TextField"}]},{"formUuid":"FORM-343A185552CE4375806A4E5C594CA5FA30TV","name":"客户信息","formType":"receipt","fields":[{"label":"客户基本信息","componentName":"PageSection"},{"label":"客户名称","componentName":"TextField"},{"label":"负责人","componentName":"EmployeeField"},{"label":"客户等级","componentName":"RadioField"},{"label":"客户编号","componentName":"SerialNumberField"},{"label":"联系人","componentName":"TextField"},{"label":"联系电话","componentName":"TextField"},{"label":"联系地址","componentName":"AddressField"},{"label":"开票资料","componentName":"PageSection"},{"label":"单位名称","componentName":"TextField"},{"label":"开户行","componentName":"TextField"},{"label":"开票地址","componentName":"TextField"},{"label":"纳税人识别号","componentName":"TextField"},{"label":"银行账号","componentName":"TextField"},{"label":"联系方式","componentName":"TextField"}]},{"formUuid":"FORM-05B4B2A2C13F4BB5853D4B44812C80DC8KU0","name":"报价单","formType":"process","fields":[{"label":"报价分组","componentName":"PageSection"},{"label":"选择客户","componentName":"AssociationFormField"},{"label":"报价日期","componentName":"DateField"},{"label":"报价单号","componentName":"SerialNumberField"},{"label":"产品明细","componentName":"TableField"},{"label":"产品名称","componentName":"AssociationFormField"},{"label":"产品编号","componentName":"TextField"},{"label":"数量","componentName":"NumberField"},{"label":"销售单价","componentName":"NumberField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"金额","componentName":"NumberField"},{"label":"成本单价","componentName":"NumberField"},{"label":"报价总数量","componentName":"NumberField"},{"label":"报价总金额","componentName":"NumberField"},{"label":"系统分组","componentName":"PageSection"},{"label":"客户编号/隐藏","componentName":"TextField"},{"label":"客户名称","componentName":"TextField"},{"label":"客户地址/隐藏","componentName":"AddressField"},{"label":"联系方式/隐藏","componentName":"TextField"},{"label":"关联状态","componentName":"RadioField"}]},{"formUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","name":"销售订单","formType":"process","fields":[{"label":"基本信息","componentName":"PageSection"},{"label":"是否关联报价单","componentName":"RadioField"},{"label":"业务员","componentName":"EmployeeField"},{"label":"客户名称","componentName":"TextField"},{"label":"关联报价单","componentName":"AssociationFormField"},{"label":"选择客户","componentName":"AssociationFormField"},{"label":"销售日期","componentName":"DateField"},{"label":"客户联系人","componentName":"TextField"},{"label":"订单编号","componentName":"SerialNumberField"},{"label":"交货日期","componentName":"DateField"},{"label":"联系方式","componentName":"TextField"},{"label":"备注","componentName":"TextareaField"},{"label":"客户地址","componentName":"AddressField"},{"label":"附件","componentName":"AttachmentField"},{"label":"AI录单","componentName":"ImageField"},{"label":"产品明细","componentName":"TableField"},{"label":"选择产品","componentName":"AssociationFormField"},{"label":"产品名称","componentName":"TextField"},{"label":"数量","componentName":"NumberField"},{"label":"销售单价","componentName":"NumberField"},{"label":"销售合计","componentName":"NumberField"},{"label":"成本单价","componentName":"NumberField"},{"label":"成本合计","componentName":"NumberField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"已出库数量","componentName":"NumberField"},{"label":"是否已完全出库","componentName":"RadioField"},{"label":"订单数量","componentName":"NumberField"},{"label":"销售订单金额","componentName":"NumberField"},{"label":"成本订单金额","componentName":"NumberField"},{"label":"状态信息","componentName":"PageSection"},{"label":"待收款金额","componentName":"NumberField"},{"label":"已收款金额","componentName":"NumberField"},{"label":"已开票金额","componentName":"NumberField"},{"label":"出库状态","componentName":"RadioField"},{"label":"收款状态","componentName":"RadioField"},{"label":"开票状态","componentName":"RadioField"},{"label":"订单状态","componentName":"RadioField"},{"label":"运输计划状态","componentName":"RadioField"},{"label":"系统分组","componentName":"PageSection"},{"label":"客户编号/隐藏","componentName":"TextField"},{"label":"AppType","componentName":"TextField"},{"label":"交付提醒日期","componentName":"DateField"},{"label":"统一值","componentName":"TextField"},{"label":"订单交货日期之前X天","componentName":"NumberField"},{"label":"图片上传","componentName":"ImageField"}]},{"formUuid":"FORM-24BB16BBD8354CF4AE91627EA511221DDIQ7","name":"销售出库","formType":"process","fields":[{"label":"出库信息","componentName":"PageSection"},{"label":"销售订单","componentName":"AssociationFormField"},{"label":"出库仓库","componentName":"AssociationFormField"},{"label":"出库日期","componentName":"DateField"},{"label":"产品出库标签","componentName":"RadioField"},{"label":"出库单号","componentName":"SerialNumberField"},{"label":"客户","componentName":"TextField"},{"label":"出库产品明细","componentName":"TableField"},{"label":"产品名称","componentName":"TextField"},{"label":"产品编号","componentName":"TextField"},{"label":"订单数量","componentName":"NumberField"},{"label":"待出库数量","componentName":"NumberField"},{"label":"出库数量","componentName":"NumberField"},{"label":"本次出库数量","componentName":"NumberField"},{"label":"库存冻结数量","componentName":"NumberField"},{"label":"计划出库数量","componentName":"NumberField"},{"label":"当前可用库存数","componentName":"NumberField"},{"label":"产品销售单价","componentName":"NumberField"},{"label":"产品销售合计","componentName":"NumberField"},{"label":"产品成本单价","componentName":"NumberField"},{"label":"产品成本合计","componentName":"NumberField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"已出库数量","componentName":"NumberField"},{"label":"已退货数量","componentName":"NumberField"},{"label":"订单编号子表/隐藏","componentName":"TextField"},{"label":"是否已完全退货","componentName":"RadioField"},{"label":"仓库编号/辅助","componentName":"TextField"},{"label":"仓库名称/辅助","componentName":"TextField"},{"label":"出库日期/辅助","componentName":"DateField"},{"label":"出库数量合计","componentName":"NumberField"},{"label":"出库销售金额合计","componentName":"NumberField"},{"label":"出库产品成本合计","componentName":"NumberField"},{"label":"系统分组","componentName":"PageSection"},{"label":"订单编号/隐藏","componentName":"TextField"},{"label":"客户联系人/隐藏","componentName":"TextField"},{"label":"审批状态","componentName":"SelectField"},{"label":"客户地址/隐藏","componentName":"AddressField"},{"label":"仓库编号（主）","componentName":"TextField"},{"label":"仓库名称（主）","componentName":"TextField"},{"label":"退货状态/隐藏","componentName":"RadioField"},{"label":"联系方式/隐藏","componentName":"TextField"}]},{"formUuid":"FORM-42CDFDCF9F2748E3A8AEB6FD48F6F958JP94","name":"销售退货","formType":"process","fields":[{"label":"退货信息","componentName":"PageSection"},{"label":"销售出库单","componentName":"AssociationFormField"},{"label":"退货日期","componentName":"DateField"},{"label":"退货单号","componentName":"SerialNumberField"},{"label":"客户信息","componentName":"TextField"},{"label":"退货产品明细","componentName":"TableField"},{"label":"产品名称","componentName":"TextField"},{"label":"产品编号","componentName":"TextField"},{"label":"退货数量","componentName":"NumberField"},{"label":"退货仓库","componentName":"AssociationFormField"},{"label":"已出库数量","componentName":"NumberField"},{"label":"已退货数量","componentName":"NumberField"},{"label":"可退数量","componentName":"NumberField"},{"label":"可用库存数","componentName":"NumberField"},{"label":"出货仓库","componentName":"TextField"},{"label":"退货金额","componentName":"NumberField"},{"label":"单价","componentName":"NumberField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"仓库管理员","componentName":"EmployeeField"},{"label":"仓库编号/辅助","componentName":"TextField"},{"label":"仓库名称/辅助","componentName":"TextField"},{"label":"退货日期/辅助","componentName":"DateField"},{"label":"订单编号子表/隐藏","componentName":"TextField"},{"label":"出库单号子表/隐藏","componentName":"TextField"},{"label":"退货总数量","componentName":"NumberField"},{"label":"退货总金额","componentName":"NumberField"},{"label":"操作员","componentName":"EmployeeField"},{"label":"所属部门","componentName":"DepartmentSelectField"},{"label":"备注","componentName":"TextareaField"},{"label":"系统分组","componentName":"PageSection"},{"label":"审批状态","componentName":"SelectField"},{"label":"订单编号/隐藏","componentName":"TextField"},{"label":"付款类型","componentName":"SelectField"},{"label":"出库单号/隐藏","componentName":"TextField"},{"label":"是否已退款","componentName":"RadioField"}]},{"formUuid":"FORM-7A71DAF2BE2A449EB067C828F46ED4B609H3","name":"供应商信息","formType":"receipt","fields":[{"label":"供应商信息","componentName":"PageSection"},{"label":"供应商名称","componentName":"TextField"},{"label":"供应商类别","componentName":"SelectField"},{"label":"供应商等级","componentName":"RadioField"},{"label":"联系人","componentName":"TextField"},{"label":"附件","componentName":"AttachmentField"},{"label":"供应商编码","componentName":"SerialNumberField"},{"label":"采购员","componentName":"EmployeeField"},{"label":"供应商状态","componentName":"RadioField"},{"label":"供应商地址","componentName":"AddressField"},{"label":"收款信息","componentName":"PageSection"},{"label":"对公户名","componentName":"TextField"},{"label":"对公账户","componentName":"TextField"},{"label":"开户行","componentName":"TextField"},{"label":"收款方式","componentName":"CheckboxField"}]},{"formUuid":"FORM-B11EDEC7119444E280906AE7B625C40D5SWQ","name":"采购订单","formType":"process","fields":[{"label":"订单信息","componentName":"PageSection"},{"label":"供应商","componentName":"AssociationFormField"},{"label":"采购订单号","componentName":"SerialNumberField"},{"label":"采购产品明细","componentName":"TableField"},{"label":"选择产品","componentName":"AssociationFormField"},{"label":"产品名称","componentName":"TextField"},{"label":"产品编号","componentName":"TextField"},{"label":"采购数量","componentName":"NumberField"},{"label":"采购单价","componentName":"NumberField"},{"label":"已入库数量","componentName":"NumberField"},{"label":"是否已全部入库","componentName":"RadioField"},{"label":"价格合计/隐藏","componentName":"NumberField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"单位","componentName":"TextField"},{"label":"确认采购数量","componentName":"NumberField"},{"label":"采购日期","componentName":"DateField"},{"label":"需到货日期","componentName":"DateField"},{"label":"采购价格合计","componentName":"NumberField"},{"label":"采购员","componentName":"EmployeeField"},{"label":"备注","componentName":"TextareaField"},{"label":"供应商收款信息","componentName":"PageSection"},{"label":"对公户名","componentName":"TextField"},{"label":"对公账户","componentName":"TextField"},{"label":"开户行","componentName":"TextField"},{"label":"收款方式","componentName":"CheckboxField"},{"label":"系统分组","componentName":"PageSection"},{"label":"已付款金额","componentName":"NumberField"},{"label":"已入库总数","componentName":"NumberField"},{"label":"供应商名称","componentName":"TextField"},{"label":"供应商编号","componentName":"TextField"},{"label":"是否已全部付款","componentName":"RadioField"},{"label":"入库状态","componentName":"RadioField"},{"label":"关联销售订单","componentName":"AssociationFormField"},{"label":"销售订单编号","componentName":"TextField"}]},{"formUuid":"FORM-B66B323E60154541B9BC4E61BBDFCB6D76KY","name":"采购入库","formType":"process","fields":[{"label":"入库信息","componentName":"PageSection"},{"label":"采购订单","componentName":"AssociationFormField"},{"label":"仓库名称","componentName":"AssociationFormField"},{"label":"入库单号","componentName":"SerialNumberField"},{"label":"供应商信息","componentName":"TextField"},{"label":"产品清单","componentName":"TableField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品名称","componentName":"TextField"},{"label":"采购数量","componentName":"NumberField"},{"label":"到货数","componentName":"NumberField"},{"label":"不合格数","componentName":"NumberField"},{"label":"本次入库数量","componentName":"NumberField"},{"label":"已入库数量","componentName":"NumberField"},{"label":"当前可用库存数","componentName":"NumberField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"单位","componentName":"TextField"},{"label":"采购单价","componentName":"NumberField"},{"label":"已退货数","componentName":"NumberField"},{"label":"是否已全部退货","componentName":"RadioField"},{"label":"合计/隐藏","componentName":"NumberField"},{"label":"仓库编码/辅助","componentName":"TextField"},{"label":"仓库名称/辅助","componentName":"TextField"},{"label":"入库日期/辅助","componentName":"DateField"},{"label":"不合格数","componentName":"NumberField"},{"label":"入库总金额","componentName":"NumberField"},{"label":"到货总数","componentName":"NumberField"},{"label":"本次入库总数量","componentName":"NumberField"},{"label":"入库日期","componentName":"DateField"},{"label":"隐藏分组","componentName":"PageSection"},{"label":"仓库名称/文本/隐藏","componentName":"TextField"},{"label":"仓库管理员","componentName":"EmployeeField"},{"label":"已入库总数","componentName":"NumberField"},{"label":"是否已全部退货","componentName":"RadioField"},{"label":"审批状态","componentName":"SelectField"},{"label":"订单总数","componentName":"NumberField"},{"label":"已退货总数","componentName":"NumberField"},{"label":"销售订单","componentName":"AssociationFormField"},{"label":"采购订单号/文本/隐藏","componentName":"TextField"},{"label":"仓库编码/文本/隐藏","componentName":"TextField"},{"label":"销售订单编码/隐藏","componentName":"TextField"}]},{"formUuid":"FORM-21346A62850E4C26829FA1C00E6936CDM7YZ","name":"采购退货","formType":"process","fields":[{"label":"退货信息","componentName":"PageSection"},{"label":"采购入库单","componentName":"AssociationFormField"},{"label":"出库仓库","componentName":"TextField"},{"label":"退货单号","componentName":"SerialNumberField"},{"label":"供应商信息","componentName":"TextField"},{"label":"产品清单","componentName":"TableField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品名称","componentName":"TextField"},{"label":"退货数量","componentName":"NumberField"},{"label":"可用库存数","componentName":"NumberField"},{"label":"入库数量","componentName":"NumberField"},{"label":"已退货数","componentName":"NumberField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"单价","componentName":"NumberField"},{"label":"合计","componentName":"NumberField"},{"label":"仓库编码/辅助","componentName":"TextField"},{"label":"仓库名称/辅助","componentName":"TextField"},{"label":"退货日期/辅助","componentName":"DateField"},{"label":"退货金额","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"退货日期","componentName":"DateField"},{"label":"确认本次退货数量","componentName":"NumberField"},{"label":"已退款金额","componentName":"NumberField"},{"label":"是否已退款","componentName":"RadioField"},{"label":"隐藏分组","componentName":"PageSection"},{"label":"采购入库订单号/隐藏","componentName":"TextField"},{"label":"已退货总数","componentName":"NumberField"},{"label":"收款类型","componentName":"SelectField"},{"label":"出库仓库编号（主）","componentName":"TextField"},{"label":"采购入库总数","componentName":"NumberField"},{"label":"审批状态","componentName":"SelectField"}]},{"formUuid":"FORM-1FEADE58417443359C4B86B787C908BEK4BN","name":"其他入库","formType":"process","fields":[{"label":"入库信息","componentName":"PageSection"},{"label":"入库类型","componentName":"SelectField"},{"label":"入库员","componentName":"EmployeeField"},{"label":"入库仓库","componentName":"AssociationFormField"},{"label":"入库日期","componentName":"DateField"},{"label":"入库单号","componentName":"SerialNumberField"},{"label":"入库明细","componentName":"TableField"},{"label":"产品","componentName":"AssociationFormField"},{"label":"产品名称","componentName":"TextField"},{"label":"当前可用库存数","componentName":"NumberField"},{"label":"数量","componentName":"NumberField"},{"label":"销售单价","componentName":"NumberField"},{"label":"成本单价","componentName":"NumberField"},{"label":"产品售价合计","componentName":"NumberField"},{"label":"产品成本合计","componentName":"NumberField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"仓库编号/辅助","componentName":"TextField"},{"label":"仓库名称/辅助","componentName":"TextField"},{"label":"入库日期/辅助","componentName":"DateField"},{"label":"入库销售品总金额","componentName":"NumberField"},{"label":"入库成品总金额","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"系统分组","componentName":"PageSection"},{"label":"仓库编号/隐藏","componentName":"TextField"},{"label":"入库仓库管理员/隐藏","componentName":"EmployeeField"},{"label":"调拨唯一值","componentName":"TextField"},{"label":"仓库名称/隐藏","componentName":"TextField"},{"label":"审批状态","componentName":"SelectField"}]},{"formUuid":"FORM-B634C1AFD0CE450EB45953E28B8A295FJMST","name":"其他出库","formType":"process","fields":[{"label":"出库信息","componentName":"PageSection"},{"label":"出库仓库","componentName":"AssociationFormField"},{"label":"出库员","componentName":"EmployeeField"},{"label":"出库类型","componentName":"SelectField"},{"label":"出库日期","componentName":"DateField"},{"label":"出库单号","componentName":"SerialNumberField"},{"label":"出库明细","componentName":"TableField"},{"label":"仓库选货","componentName":"AssociationFormField"},{"label":"产品名称","componentName":"TextField"},{"label":"当前可用库存数","componentName":"NumberField"},{"label":"出库数量","componentName":"NumberField"},{"label":"销售单价","componentName":"NumberField"},{"label":"销售合计","componentName":"NumberField"},{"label":"成本单价","componentName":"NumberField"},{"label":"成本合计","componentName":"NumberField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"仓库编号/辅助","componentName":"TextField"},{"label":"仓库名称/辅助","componentName":"TextField"},{"label":"出库日期/辅助","componentName":"DateField"},{"label":"出库总金额","componentName":"NumberField"},{"label":"出库成本金额","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"系统分组","componentName":"PageSection"},{"label":"仓库编号/隐藏","componentName":"TextField"},{"label":"审批状态","componentName":"SelectField"},{"label":"出库仓库名称","componentName":"TextField"},{"label":"调拨唯一值","componentName":"TextField"}]},{"formUuid":"FORM-356CA6FA5992460AB5961E90044F2742HFSQ","name":"库存调拨","formType":"process","fields":[{"label":"调拨信息","componentName":"PageSection"},{"label":"调出仓库","componentName":"AssociationFormField"},{"label":"调入仓库","componentName":"AssociationFormField"},{"label":"调拨单号","componentName":"SerialNumberField"},{"label":"调拨日期","componentName":"DateField"},{"label":"调拨员","componentName":"EmployeeField"},{"label":"调拨明细","componentName":"TableField"},{"label":"仓库选货","componentName":"AssociationFormField"},{"label":"产品名称","componentName":"TextField"},{"label":"调拨数量","componentName":"NumberField"},{"label":"调出仓可用库存","componentName":"NumberField"},{"label":"调入仓可用库存","componentName":"NumberField"},{"label":"销售单价","componentName":"NumberField"},{"label":"产品销售合计","componentName":"NumberField"},{"label":"成本单价","componentName":"NumberField"},{"label":"产品成本合计","componentName":"NumberField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"调拨销售总额","componentName":"NumberField"},{"label":"调拨成本总额","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"系统分组","componentName":"PageSection"},{"label":"调出仓库名称/隐藏","componentName":"TextField"},{"label":"调出仓库编号/隐藏","componentName":"TextField"},{"label":"调出仓库管理员/隐藏","componentName":"TextField"},{"label":"审批状态","componentName":"SelectField"},{"label":"调入仓库名称/隐藏","componentName":"TextField"},{"label":"调入仓库编号/隐藏","componentName":"TextField"},{"label":"调入仓库管理员/隐藏","componentName":"EmployeeField"},{"label":"唯一值","componentName":"TextField"}]},{"formUuid":"FORM-8E0534007788442E994F4417A1508283LDVD","name":"库存盘点","formType":"process","fields":[{"label":"盘点信息","componentName":"PageSection"},{"label":"盘点仓库","componentName":"AssociationFormField"},{"label":"盘点员","componentName":"EmployeeField"},{"label":"盘点单号","componentName":"SerialNumberField"},{"label":"盘点日期","componentName":"DateField"},{"label":"盘点明细","componentName":"TableField"},{"label":"仓库选货","componentName":"AssociationFormField"},{"label":"产品名称","componentName":"TextField"},{"label":"当前库存数量","componentName":"NumberField"},{"label":"盘点数量","componentName":"NumberField"},{"label":"盘亏/盘盈","componentName":"TextField"},{"label":"盘亏数量","componentName":"NumberField"},{"label":"盘盈数量","componentName":"NumberField"},{"label":"差值","componentName":"NumberField"},{"label":"销售单价","componentName":"NumberField"},{"label":"成本单价","componentName":"NumberField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"盘亏销售合计","componentName":"NumberField"},{"label":"盘亏成本合计","componentName":"NumberField"},{"label":"盘盈销售合计","componentName":"NumberField"},{"label":"盘盈成本合计","componentName":"NumberField"},{"label":"仓库名称/辅助","componentName":"TextField"},{"label":"仓库编号/辅助","componentName":"TextField"},{"label":"盘点日期/辅助","componentName":"DateField"},{"label":"盘亏售价总额","componentName":"NumberField"},{"label":"盘亏成本总额","componentName":"NumberField"},{"label":"盘盈售价总额","componentName":"NumberField"},{"label":"盘盈成本总额","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"隐藏分组","componentName":"PageSection"},{"label":"盘点仓库编号/隐藏","componentName":"TextField"},{"label":"盘点仓库名称/隐藏","componentName":"TextField"},{"label":"盘点唯一值","componentName":"TextField"}]},{"formUuid":"FORM-AF31D8B66F8D409E86AA251C19F76CB9HWV8","name":"资金账户","formType":"receipt","fields":[{"label":"账户信息","componentName":"PageSection"},{"label":"账户名称","componentName":"TextField"},{"label":"账户类型","componentName":"SelectField"},{"label":"账户余额","componentName":"NumberField"},{"label":"账户编号","componentName":"SerialNumberField"},{"label":"管理员","componentName":"EmployeeField"},{"label":"备注","componentName":"TextareaField"}]},{"formUuid":"FORM-A49031EC8EB6423BB137CF709774D00EFMX2","name":"开票申请","formType":"process","fields":[{"label":"开票信息","componentName":"PageSection"},{"label":"选择销售订单","componentName":"AssociationFormField"},{"label":"填写开票金额","componentName":"NumberField"},{"label":"开票日期","componentName":"DateField"},{"label":"开票员","componentName":"EmployeeField"},{"label":"合同金额","componentName":"NumberField"},{"label":"开票单号","componentName":"SerialNumberField"},{"label":"客户名称","componentName":"TextField"},{"label":"已开票金额","componentName":"NumberField"},{"label":"开票资料","componentName":"PageSection"},{"label":"单位名称","componentName":"TextField"},{"label":"开户行","componentName":"TextField"},{"label":"纳税人识别号","componentName":"TextField"},{"label":"银行账号","componentName":"TextField"},{"label":"开票地址","componentName":"TextField"},{"label":"联系方式","componentName":"TextField"},{"label":"作废","componentName":"PageSection"},{"label":"确认作废","componentName":"RadioField"},{"label":"发票状态","componentName":"TextField"},{"label":"系统分组","componentName":"PageSection"},{"label":"销售订单编码/隐藏","componentName":"TextField"},{"label":"客户编码/隐藏","componentName":"TextField"}]},{"formUuid":"FORM-F9191B4D22EF42C28831299FD11645A8W8JU","name":"收款单","formType":"process","fields":[{"label":"收款信息","componentName":"PageSection"},{"label":"收款类型","componentName":"SelectField"},{"label":"客户名称","componentName":"AssociationFormField"},{"label":"销售订单","componentName":"AssociationFormField"},{"label":"采购退货单","componentName":"AssociationFormField"},{"label":"资金账户","componentName":"AssociationFormField"},{"label":"收款金额","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"收款单号","componentName":"SerialNumberField"},{"label":"收款日期","componentName":"DateField"},{"label":"收款员","componentName":"EmployeeField"},{"label":"订单总金额","componentName":"NumberField"},{"label":"已收款金额","componentName":"NumberField"},{"label":"销项发票上传","componentName":"AttachmentField"},{"label":"发票","componentName":"CC_InvoiceField_Component_View"},{"label":"发票详情","componentName":"TableField"},{"label":"发票类型","componentName":"TextField"},{"label":"查验结果","componentName":"RadioField"},{"label":"发票金额","componentName":"TextField"},{"label":"发票号码","componentName":"TextField"},{"label":"发票代码","componentName":"TextField"},{"label":"发票校验码","componentName":"TextField"},{"label":"开票日期","componentName":"TextField"},{"label":"购方名称","componentName":"TextField"},{"label":"购方税号","componentName":"TextField"},{"label":"销方名称","componentName":"TextField"},{"label":"销方税号","componentName":"TextField"},{"label":"发票 id","componentName":"TextField"},{"label":"唯一标识","componentName":"TextField"},{"label":"系统分组","componentName":"PageSection"},{"label":"供应商/客户名称/隐藏","componentName":"TextField"},{"label":"销售订单编号/隐藏","componentName":"TextField"},{"label":"采购退货单编号/隐藏","componentName":"TextField"},{"label":"客户名称编号/隐藏","componentName":"TextField"},{"label":"资金账户编号/隐藏","componentName":"TextField"}]},{"formUuid":"FORM-65A69E2C743845FAAEBB299CAEDF485FEI4V","name":"付款单","formType":"process","fields":[{"label":"付款信息","componentName":"PageSection"},{"label":"付款类型","componentName":"SelectField"},{"label":"供应商名称","componentName":"AssociationFormField"},{"label":"销售退货单","componentName":"AssociationFormField"},{"label":"采购订单","componentName":"AssociationFormField"},{"label":"资金账户","componentName":"AssociationFormField"},{"label":"付款金额","componentName":"NumberField"},{"label":"备注","componentName":"TextareaField"},{"label":"付款单号","componentName":"SerialNumberField"},{"label":"供应商名称","componentName":"TextField"},{"label":"付款日期","componentName":"DateField"},{"label":"付款员","componentName":"EmployeeField"},{"label":"订单总金额","componentName":"NumberField"},{"label":"已付款金额","componentName":"NumberField"},{"label":"进项发票上传","componentName":"AttachmentField"},{"label":"供应商收款信息","componentName":"PageSection"},{"label":"对公户名","componentName":"TextField"},{"label":"对公账户","componentName":"TextField"},{"label":"开户行","componentName":"TextField"},{"label":"收款方式","componentName":"CheckboxField"},{"label":"隐藏分组","componentName":"PageSection"},{"label":"供应商名称编号/隐藏","componentName":"TextField"},{"label":"客户名称","componentName":"TextField"},{"label":"采购订单编号/隐藏","componentName":"TextField"},{"label":"资金账户编号/隐藏","componentName":"TextField"},{"label":"销售退货单编号/隐藏","componentName":"TextField"}]},{"formUuid":"FORM-34823FBB55754FC594DB3886DA9B6468AM6M","name":"供应商价格","formType":"receipt","fields":[{"label":"供应商信息","componentName":"PageSection"},{"label":"选择供应商","componentName":"AssociationFormField"},{"label":"供应商编码","componentName":"TextField"},{"label":"供应商名称","componentName":"TextField"},{"label":"联系人","componentName":"TextField"},{"label":"采购负责人","componentName":"EmployeeField"},{"label":"价格开始日期","componentName":"DateField"},{"label":"价格结束日期","componentName":"DateField"},{"label":"产品明细","componentName":"PageSection"},{"label":"供应产品","componentName":"AssociationFormField"},{"label":"产品分类","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"采购单价","componentName":"NumberField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品名称","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"}]},{"formUuid":"FORM-B97EAEA443594F088EFAC5728DF468D3VWLL","name":"运输路线表","formType":"receipt","fields":[{"label":"销售订单编号","componentName":"TextField"},{"label":"状态","componentName":"RadioField"},{"label":"运费","componentName":"NumberField"}]},{"formUuid":"FORM-0C0E20A0AD7D4D92AC1E070E2967F74ADE3F","name":"运输计划","formType":"process","fields":[{"label":"运输信息","componentName":"PageSection"},{"label":"运输编号","componentName":"SerialNumberField"},{"label":"运输路线","componentName":"TableField"},{"label":"运费","componentName":"NumberField"},{"label":"销售订单","componentName":"AssociationFormField"},{"label":"收货人","componentName":"TextField"},{"label":"收货人联系方式","componentName":"TextField"},{"label":"收货地址","componentName":"AddressField"},{"label":"期望到货时间","componentName":"DateField"},{"label":"订单编号","componentName":"TextField"},{"label":"总运费","componentName":"NumberField"},{"label":"运输单号","componentName":"TextField"},{"label":"确定发货时间","componentName":"DateField"},{"label":"联系方式","componentName":"TextField"},{"label":"承运人","componentName":"TextField"},{"label":"车牌号","componentName":"TextField"}]},{"formUuid":"FORM-508508D511C84614906E5D6C7DA023EE24LK","name":"供应商产品信息表","formType":"receipt","fields":[{"label":"基础信息","componentName":"PageSection"},{"label":"供应商编码","componentName":"TextField"},{"label":"采购单价","componentName":"NumberField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品名称","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"}]},{"formUuid":"FORM-5C018A7E7CEB45778044E9D1A9720B0DF2CH","name":"期初库存表","formType":"receipt","fields":[{"label":"仓库名称","componentName":"TextField"},{"label":"产品名称","componentName":"TextField"},{"label":"月份","componentName":"TextField"},{"label":"日期","componentName":"DateField"},{"label":"仓库编码","componentName":"TextField"},{"label":"产品编码","componentName":"TextField"},{"label":"期初值","componentName":"NumberField"},{"label":"期末值","componentName":"NumberField"}]},{"formUuid":"FORM-D4018CECCE5844A6B4B36392D3E548F6BPKI","name":"库存表","formType":"receipt","fields":[{"label":"产品名称","componentName":"TextField"},{"label":"产品规格","componentName":"TextField"},{"label":"产品分类","componentName":"TextField"},{"label":"仓库编号","componentName":"TextField"},{"label":"单价","componentName":"NumberField"},{"label":"仓库管理员","componentName":"EmployeeField"},{"label":"产品编号","componentName":"TextField"},{"label":"产品单位","componentName":"TextField"},{"label":"仓库","componentName":"TextField"},{"label":"库存数","componentName":"NumberField"},{"label":"库存金额","componentName":"NumberField"}]},{"formUuid":"FORM-CFB7A2C03BDB4D71A4E51AEEBB5EDF44QNDR","name":"未命名表单","formType":"receipt","fields":[{"label":"关联其他表单数据","componentName":"SelectField"},{"label":"下拉复选数据联动","componentName":"MultiSelectField"},{"label":"单行文本数据联动","componentName":"TextField"},{"label":"关联表单","componentName":"AssociationFormField"}]}],"edges":[{"sourceFormUuid":"FORM-76AD2D18FE284FFC955FA98815ACFBB85ACR","targetFormUuid":"FORM-B66B323E60154541B9BC4E61BBDFCB6D76KY","fieldLabel":"采购入库","relationType":"linkage"},{"sourceFormUuid":"FORM-76AD2D18FE284FFC955FA98815ACFBB85ACR","targetFormUuid":"FORM-1FEADE58417443359C4B86B787C908BEK4BN","fieldLabel":"其他入库","relationType":"linkage"},{"sourceFormUuid":"FORM-76AD2D18FE284FFC955FA98815ACFBB85ACR","targetFormUuid":"FORM-B634C1AFD0CE450EB45953E28B8A295FJMST","fieldLabel":"其他出库","relationType":"linkage"},{"sourceFormUuid":"FORM-76AD2D18FE284FFC955FA98815ACFBB85ACR","targetFormUuid":"FORM-24BB16BBD8354CF4AE91627EA511221DDIQ7","fieldLabel":"销售出库","relationType":"linkage"},{"sourceFormUuid":"FORM-76AD2D18FE284FFC955FA98815ACFBB85ACR","targetFormUuid":"FORM-42CDFDCF9F2748E3A8AEB6FD48F6F958JP94","fieldLabel":"销售退货","relationType":"linkage"},{"sourceFormUuid":"FORM-76AD2D18FE284FFC955FA98815ACFBB85ACR","targetFormUuid":"FORM-21346A62850E4C26829FA1C00E6936CDM7YZ","fieldLabel":"采购退货","relationType":"linkage"},{"sourceFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","targetFormUuid":"FORM-7A71DAF2BE2A449EB067C828F46ED4B609H3","fieldLabel":"供应商","relationType":"data-source"},{"sourceFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","targetFormUuid":"FORM-8937D0D1FC65430A96A5EF14B5220A4BOHGJ","fieldLabel":"分类","relationType":"data-source"},{"sourceFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","targetFormUuid":"FORM-085E2E7BB49D492E881EC7EAC3EE2C48VR64","fieldLabel":"单位","relationType":"data-source"},{"sourceFormUuid":"FORM-AEB5459EE63B46B5944B851368C8B2E0ROZJ","targetFormUuid":"FORM-7A71DAF2BE2A449EB067C828F46ED4B609H3","fieldLabel":"供应商名称","relationType":"association"},{"sourceFormUuid":"FORM-B6CB37426582486097158DE16262CACFK442","targetFormUuid":"FORM-343A185552CE4375806A4E5C594CA5FA30TV","fieldLabel":"客户名称","relationType":"association"},{"sourceFormUuid":"FORM-05B4B2A2C13F4BB5853D4B44812C80DC8KU0","targetFormUuid":"FORM-343A185552CE4375806A4E5C594CA5FA30TV","fieldLabel":"选择客户","relationType":"association"},{"sourceFormUuid":"FORM-05B4B2A2C13F4BB5853D4B44812C80DC8KU0","targetFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","fieldLabel":"产品名称","relationType":"association"},{"sourceFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","targetFormUuid":"FORM-05B4B2A2C13F4BB5853D4B44812C80DC8KU0","fieldLabel":"关联报价单","relationType":"association"},{"sourceFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","targetFormUuid":"FORM-343A185552CE4375806A4E5C594CA5FA30TV","fieldLabel":"选择客户","relationType":"association"},{"sourceFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","targetFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","fieldLabel":"选择产品","relationType":"association"},{"sourceFormUuid":"FORM-24BB16BBD8354CF4AE91627EA511221DDIQ7","targetFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","fieldLabel":"销售订单","relationType":"association"},{"sourceFormUuid":"FORM-24BB16BBD8354CF4AE91627EA511221DDIQ7","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"出库仓库","relationType":"association"},{"sourceFormUuid":"FORM-42CDFDCF9F2748E3A8AEB6FD48F6F958JP94","targetFormUuid":"FORM-24BB16BBD8354CF4AE91627EA511221DDIQ7","fieldLabel":"销售出库单","relationType":"association"},{"sourceFormUuid":"FORM-42CDFDCF9F2748E3A8AEB6FD48F6F958JP94","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"退货仓库","relationType":"association"},{"sourceFormUuid":"FORM-B11EDEC7119444E280906AE7B625C40D5SWQ","targetFormUuid":"FORM-7A71DAF2BE2A449EB067C828F46ED4B609H3","fieldLabel":"供应商","relationType":"association"},{"sourceFormUuid":"FORM-B11EDEC7119444E280906AE7B625C40D5SWQ","targetFormUuid":"FORM-34823FBB55754FC594DB3886DA9B6468AM6M","fieldLabel":"选择产品","relationType":"association"},{"sourceFormUuid":"FORM-B11EDEC7119444E280906AE7B625C40D5SWQ","targetFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","fieldLabel":"关联销售订单","relationType":"association"},{"sourceFormUuid":"FORM-B66B323E60154541B9BC4E61BBDFCB6D76KY","targetFormUuid":"FORM-B11EDEC7119444E280906AE7B625C40D5SWQ","fieldLabel":"采购订单","relationType":"association"},{"sourceFormUuid":"FORM-B66B323E60154541B9BC4E61BBDFCB6D76KY","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"仓库名称","relationType":"association"},{"sourceFormUuid":"FORM-B66B323E60154541B9BC4E61BBDFCB6D76KY","targetFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","fieldLabel":"销售订单","relationType":"association"},{"sourceFormUuid":"FORM-21346A62850E4C26829FA1C00E6936CDM7YZ","targetFormUuid":"FORM-B66B323E60154541B9BC4E61BBDFCB6D76KY","fieldLabel":"采购入库单","relationType":"association"},{"sourceFormUuid":"FORM-1FEADE58417443359C4B86B787C908BEK4BN","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"入库仓库","relationType":"association"},{"sourceFormUuid":"FORM-1FEADE58417443359C4B86B787C908BEK4BN","targetFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","fieldLabel":"产品","relationType":"association"},{"sourceFormUuid":"FORM-B634C1AFD0CE450EB45953E28B8A295FJMST","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"出库仓库","relationType":"association"},{"sourceFormUuid":"FORM-B634C1AFD0CE450EB45953E28B8A295FJMST","targetFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","fieldLabel":"仓库选货","relationType":"association"},{"sourceFormUuid":"FORM-356CA6FA5992460AB5961E90044F2742HFSQ","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"调出仓库","relationType":"association"},{"sourceFormUuid":"FORM-356CA6FA5992460AB5961E90044F2742HFSQ","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"调入仓库","relationType":"association"},{"sourceFormUuid":"FORM-356CA6FA5992460AB5961E90044F2742HFSQ","targetFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","fieldLabel":"仓库选货","relationType":"association"},{"sourceFormUuid":"FORM-8E0534007788442E994F4417A1508283LDVD","targetFormUuid":"FORM-9C0B3A43BDED4B3AAB56E7A341F8E49E83UW","fieldLabel":"盘点仓库","relationType":"association"},{"sourceFormUuid":"FORM-8E0534007788442E994F4417A1508283LDVD","targetFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","fieldLabel":"仓库选货","relationType":"association"},{"sourceFormUuid":"FORM-A49031EC8EB6423BB137CF709774D00EFMX2","targetFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","fieldLabel":"选择销售订单","relationType":"association"},{"sourceFormUuid":"FORM-F9191B4D22EF42C28831299FD11645A8W8JU","targetFormUuid":"FORM-343A185552CE4375806A4E5C594CA5FA30TV","fieldLabel":"客户名称","relationType":"association"},{"sourceFormUuid":"FORM-F9191B4D22EF42C28831299FD11645A8W8JU","targetFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","fieldLabel":"销售订单","relationType":"association"},{"sourceFormUuid":"FORM-F9191B4D22EF42C28831299FD11645A8W8JU","targetFormUuid":"FORM-21346A62850E4C26829FA1C00E6936CDM7YZ","fieldLabel":"采购退货单","relationType":"association"},{"sourceFormUuid":"FORM-F9191B4D22EF42C28831299FD11645A8W8JU","targetFormUuid":"FORM-AF31D8B66F8D409E86AA251C19F76CB9HWV8","fieldLabel":"资金账户","relationType":"association"},{"sourceFormUuid":"FORM-65A69E2C743845FAAEBB299CAEDF485FEI4V","targetFormUuid":"FORM-7A71DAF2BE2A449EB067C828F46ED4B609H3","fieldLabel":"供应商名称","relationType":"association"},{"sourceFormUuid":"FORM-65A69E2C743845FAAEBB299CAEDF485FEI4V","targetFormUuid":"FORM-42CDFDCF9F2748E3A8AEB6FD48F6F958JP94","fieldLabel":"销售退货单","relationType":"association"},{"sourceFormUuid":"FORM-65A69E2C743845FAAEBB299CAEDF485FEI4V","targetFormUuid":"FORM-B11EDEC7119444E280906AE7B625C40D5SWQ","fieldLabel":"采购订单","relationType":"association"},{"sourceFormUuid":"FORM-65A69E2C743845FAAEBB299CAEDF485FEI4V","targetFormUuid":"FORM-AF31D8B66F8D409E86AA251C19F76CB9HWV8","fieldLabel":"资金账户","relationType":"association"},{"sourceFormUuid":"FORM-34823FBB55754FC594DB3886DA9B6468AM6M","targetFormUuid":"FORM-7A71DAF2BE2A449EB067C828F46ED4B609H3","fieldLabel":"选择供应商","relationType":"association"},{"sourceFormUuid":"FORM-34823FBB55754FC594DB3886DA9B6468AM6M","targetFormUuid":"FORM-CD6E894B543947B08A5738F15AD9AB9920TW","fieldLabel":"供应产品","relationType":"association"},{"sourceFormUuid":"FORM-0C0E20A0AD7D4D92AC1E070E2967F74ADE3F","targetFormUuid":"FORM-87DCD2999FB64618B318EA9A2EF984A4G3HG","fieldLabel":"销售订单","relationType":"association"},{"sourceFormUuid":"FORM-CFB7A2C03BDB4D71A4E51AEEBB5EDF44QNDR","targetFormUuid":"FORM-085E2E7BB49D492E881EC7EAC3EE2C48VR64","fieldLabel":"关联其他表单数据","relationType":"data-source"},{"sourceFormUuid":"FORM-CFB7A2C03BDB4D71A4E51AEEBB5EDF44QNDR","targetFormUuid":"FORM-A49031EC8EB6423BB137CF709774D00EFMX2","fieldLabel":"下拉复选数据联动","relationType":"linkage"},{"sourceFormUuid":"FORM-CFB7A2C03BDB4D71A4E51AEEBB5EDF44QNDR","targetFormUuid":"FORM-A49031EC8EB6423BB137CF709774D00EFMX2","fieldLabel":"关联表单","relationType":"association"}],"generatedAt":"2026/03/26 13:34"};

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

  // 记录同一对节点之间已渲染的边数，用于计算垂直偏移量让重叠边错开
  var edgePairCount = {};
  var edgeSeen = {};
  graphData.edges.forEach(function(edge) {
    var srcId = uuidToId[edge.sourceFormUuid];
    var tgtId = uuidToId[edge.targetFormUuid];
    if (!srcId || !tgtId || srcId === tgtId) return;
    var key = srcId + '->' + tgtId + ':' + edge.relationType;
    if (edgeSeen[key]) return;
    edgeSeen[key] = true;

    // 统计同一对节点之间的边序号（0-based），用于错开偏移
    var pairKey = srcId + '->' + tgtId;
    var pairIndex = edgePairCount[pairKey] || 0;
    edgePairCount[pairKey] = pairIndex + 1;

    var style = EDGE_STYLES[edge.relationType] || EDGE_STYLES.association;

    // 当同一对节点有多条边时，通过 router offset 错开，避免完全重叠
    // 第 0 条偏移 0，第 1 条偏移 +20，第 2 条偏移 -20，依此类推
    var offsetStep = 20;
    var pairOffset = pairIndex === 0 ? 0 : (pairIndex % 2 === 1 ? pairIndex * offsetStep : -(pairIndex) * offsetStep);

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
      router: { name: 'er', args: { offset: 32 + pairOffset, direction: 'H' } },
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
    'data-source': { label: '关联其他表单', cls: 'dp-tag-ds' },
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

// ── 导出表格（CSV）────────────────────────────────────
// 将所有表的基本信息和字段信息导出为 CSV 文件，用 Excel 可直接打开
function exportAsCSV() {
  var nodes = GRAPH_DATA.nodes;
  if (!nodes || nodes.length === 0) {
    alert('暂无数据可导出');
    return;
  }

  // 表单类型中文映射
  var FORM_TYPE_LABELS = {
    'receipt': '普通表单',
    'process': '流程表单',
    'virtualView': '聚合表',
  };

  // CSV 单元格转义：含逗号、换行、双引号的内容需用双引号包裹，内部双引号转义为 ""
  function csvCell(value) {
    var str = String(value == null ? '' : value);
    if (str.indexOf(',') !== -1 || str.indexOf('"') !== -1 || str.indexOf('\n') !== -1) {
      return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
  }

  var rows = [];

  // 表头
  rows.push(['表名', '表类型', '表单UUID', '字段名', '字段组件类型'].map(csvCell).join(','));

  // 每张表的每个字段各占一行；无字段的表也输出一行（字段列为空）
  nodes.forEach(function(node) {
    var formName = node.name || '';
    var formType = FORM_TYPE_LABELS[node.formType] || node.formType || '';
    var formUuid = node.formUuid || '';
    var fields = node.fields || [];

    if (fields.length === 0) {
      rows.push([formName, formType, formUuid, '', ''].map(csvCell).join(','));
    } else {
      fields.forEach(function(field) {
        rows.push([
          formName,
          formType,
          formUuid,
          field.label || '',
          field.componentName || '',
        ].map(csvCell).join(','));
      });
    }
  });

  // 加 BOM（\uFEFF）让 Excel 正确识别 UTF-8 中文
  var csvContent = '\uFEFF' + rows.join('\r\n');
  var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);

  var now = new Date();
  var pad = function(n) { return n < 10 ? '0' + n : '' + n; };
  var timestamp = now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate())
    + '-' + pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
  var appType = window.__erAppType__ || 'APP';
  var fileName = 'er-fields_' + appType + '_' + timestamp + '.csv';

  var link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
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
