import React, { useEffect, useRef } from 'react'

export default function ROIModel() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const doc = ref.current.contentDocument || ref.current.contentWindow.document
    const css = `*{margin:0;padding:0;box-sizing:border-box;}
:root{
  --navy:#0F1D35;--navy2:#1A2E4A;--navy3:#162440;
  --gold:#C9973A;--gold2:#C9B98A;--gold3:#F0E6CC;
  --cream:#FAFAF6;--border:#D8D0BA;
  --ink:#0F1D35;--muted:#6B7A8D;--subtle:#A8B4C0;
  --green:#2D7A4F;--green-bg:#E8F5EE;
}
body{font-family:'Poppins',system-ui,sans-serif;background:var(--cream);color:var(--ink);font-size:13px;}
.shell{width:100%;background:var(--cream);}
.top-bar{background:var(--navy);padding:16px 28px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid var(--gold);}
.top-bar-left{display:flex;flex-direction:column;gap:2px;}
.top-bar-title{font-size:17px;font-weight:500;color:#fff;letter-spacing:-.01em;}
.top-bar-sub{font-size:11px;font-weight:400;color:var(--gold2);letter-spacing:0;}
.top-bar-right{display:flex;gap:6px;align-items:center;}
.badge{background:var(--navy2);border:0.5px solid var(--gold2);color:var(--gold2);font-size:10px;padding:4px 10px;letter-spacing:.08em;text-transform:uppercase;}
.layout{display:grid;grid-template-columns:280px 1fr;min-height:600px;}
.sidebar{background:var(--navy);padding:20px;display:flex;flex-direction:column;gap:0;border-right:1px solid var(--navy2);}
.sb-section{margin-bottom:20px;}
.sb-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;padding-bottom:6px;border-bottom:0.5px solid var(--navy2);}
.field{margin-bottom:12px;}
.field-label{font-size:10px;color:var(--subtle);font-weight:400;margin-bottom:4px;letter-spacing:0;}
.field-row{display:flex;align-items:center;gap:8px;}
.field-val{font-size:13px;font-weight:500;color:#fff;min-width:52px;text-align:right;}
.field-val.gold{color:var(--gold);}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:3px;background:var(--navy2);outline:none;cursor:pointer;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;background:var(--gold);border-radius:50%;cursor:pointer;}
input[type=range]::-moz-range-thumb{width:14px;height:14px;background:var(--gold);border-radius:50%;cursor:pointer;border:none;}
.reset-btn{width:100%;margin-top:4px;padding:8px;background:transparent;border:0.5px solid var(--navy2);color:var(--subtle);font-size:10px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-family:inherit;}
.reset-btn:hover{border-color:var(--gold2);color:var(--gold2);}
.main{padding:20px 24px;display:flex;flex-direction:column;gap:20px;}
.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;}
.kpi{background:#fff;border:0.5px solid var(--border);padding:14px 16px;}
.kpi-label{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:6px;}
.kpi-val{font-size:22px;font-weight:300;color:var(--navy);line-height:1;letter-spacing:-.02em;}
.kpi-val.gold{color:var(--gold);}
.kpi-val.green{color:var(--green);}
.kpi-sub{font-size:10px;color:var(--muted);margin-top:3px;letter-spacing:0;}
.panels{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.panel{background:#fff;border:0.5px solid var(--border);padding:16px;}
.panel-title{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:14px;padding-bottom:8px;border-bottom:0.5px solid var(--border);}
.chart-wrap{position:relative;width:100%;height:180px;}
.roi-bar-row{display:flex;flex-direction:column;gap:8px;margin-top:4px;}
.roi-bar-item{display:flex;flex-direction:column;gap:3px;}
.roi-bar-header{display:flex;justify-content:space-between;align-items:baseline;}
.roi-bar-name{font-size:10px;color:var(--muted);letter-spacing:0;}
.roi-bar-val{font-size:11px;font-weight:500;color:var(--navy);}
.roi-bar-track{height:6px;background:#F0EDE8;width:100%;}
.roi-bar-fill{height:6px;background:var(--gold);transition:width .4s ease;}
.roi-bar-fill.green{background:var(--green);}
.flow-grid{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;align-items:center;gap:0;margin-top:4px;}
.flow-node{text-align:center;padding:10px 4px;}
.flow-node-val{font-size:18px;font-weight:300;color:var(--navy);line-height:1;margin-bottom:2px;}
.flow-node-val.gold{color:var(--gold);}
.flow-node-val.muted{color:var(--subtle);}
.flow-node-label{font-size:9px;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;}
.flow-arrow{font-size:16px;color:var(--gold2);text-align:center;padding:0 2px;}
.mtable{width:100%;border-collapse:collapse;}
.mtable thead th{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--subtle);font-weight:400;padding:6px 10px;text-align:left;border-bottom:0.5px solid var(--border);}
.mtable thead th:not(:first-child){text-align:right;}
.mtable tbody td{padding:8px 10px;font-size:11px;color:var(--ink);border-bottom:0.5px solid #F0EDE8;}
.mtable tbody td:not(:first-child){text-align:right;font-weight:500;}
.mtable tbody tr:last-child td{border-bottom:none;font-weight:500;color:var(--navy);background:#FAFAF6;}
.mtable .highlight{color:var(--green);font-weight:500;}
.mtable .gold{color:var(--gold);}
.verdict{background:var(--navy);padding:16px 20px;display:flex;gap:20px;align-items:center;}
.verdict-label{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);white-space:nowrap;}
.verdict-text{font-size:11px;color:#C8D4E0;line-height:1.6;letter-spacing:0;}
.verdict-text strong{color:#fff;font-weight:500;}
.bottom-rule{height:3px;background:var(--gold);}`
    const body = `<div class="shell">
<div class="top-bar">
  <div class="top-bar-left">
    <div class="top-bar-title">SILVA × Discovery — ROI Model</div>
    <div class="top-bar-sub">Adjust assumptions. See the business case update in real time.</div>
  </div>
  <div class="top-bar-right">
    <div class="badge">Confidential</div>
    <div class="badge">March 2026</div>
  </div>
</div>

<div class="layout">
  <div class="sidebar">
    <div class="sb-section">
      <div class="sb-label">Portfolio</div>
      <div class="field">
        <div class="field-label">Total items in book</div>
        <div class="field-row">
          <input type="range" id="s-items" min="10000" max="300000" step="1000" value="160000">
          <div class="field-val gold" id="d-items">160,000</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Avg premium per item / mo (R)</div>
        <div class="field-row">
          <input type="range" id="s-premium" min="50" max="500" step="5" value="100">
          <div class="field-val" id="d-premium">R100</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Avg declared item value (R)</div>
        <div class="field-row">
          <input type="range" id="s-itemval" min="1000" max="30000" step="500" value="5000">
          <div class="field-val" id="d-itemval">R5,000</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Underinsurance gap</div>
        <div class="field-row">
          <input type="range" id="s-gap" min="10" max="70" step="5" value="50">
          <div class="field-val" id="d-gap">50%</div>
        </div>
      </div>
    </div>

    <div class="sb-section">
      <div class="sb-label">SILVA Fees</div>
      <div class="field">
        <div class="field-label">Platform fee / mo (R)</div>
        <div class="field-row">
          <input type="range" id="s-platform" min="20000" max="100000" step="5000" value="45000">
          <div class="field-val" id="d-platform">R45,000</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Digitisation fee / item (R)</div>
        <div class="field-row">
          <input type="range" id="s-dig" min="15" max="50" step="1" value="30">
          <div class="field-val" id="d-dig">R30</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">SILVA revaluation share / item / mo (R)</div>
        <div class="field-row">
          <input type="range" id="s-silva" min="1" max="8" step="0.5" value="3">
          <div class="field-val gold" id="d-silva">R3.00</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Items digitised / month</div>
        <div class="field-row">
          <input type="range" id="s-monthly" min="1000" max="30000" step="1000" value="10000">
          <div class="field-val" id="d-monthly">10,000</div>
        </div>
      </div>
    </div>

    <div class="sb-section">
      <div class="sb-label">VAS Pass-through</div>
      <div class="field">
        <div class="field-label">Gross VAS fee Discovery charges (R)</div>
        <div class="field-row">
          <input type="range" id="s-vas" min="3" max="15" step="0.5" value="7.50">
          <div class="field-val" id="d-vas">R7.50</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Discovery's share of VAS</div>
        <div class="field-row">
          <input type="range" id="s-dsplit" min="50" max="80" step="5" value="60">
          <div class="field-val" id="d-dsplit">60%</div>
        </div>
      </div>
      <div class="field">
        <div class="field-label">Insurance rate (premium / value)</div>
        <div class="field-row">
          <input type="range" id="s-rate" min="1" max="5" step="0.1" value="2">
          <div class="field-val" id="d-rate">2.0%</div>
        </div>
      </div>
    </div>

    <button class="reset-btn" onclick="resetAll()">Reset to defaults</button>
  </div>

  <div class="main">
    <div class="kpi-row">
      <div class="kpi">
        <div class="kpi-label">SILVA annual cost</div>
        <div class="kpi-val" id="k-cost">—</div>
        <div class="kpi-sub">Platform + revaluation</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Premium uplift / yr</div>
        <div class="kpi-val green" id="k-uplift">—</div>
        <div class="kpi-sub">From corrected values</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">VAS revenue to Discovery</div>
        <div class="kpi-val gold" id="k-vas">—</div>
        <div class="kpi-sub">Full book, annual</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Net ROI (year 2+)</div>
        <div class="kpi-val green" id="k-roi">—</div>
        <div class="kpi-sub">Uplift + VAS − cost</div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panel-title">Monthly revenue build — first 24 months</div>
        <div class="chart-wrap"><canvas id="chart-monthly"></canvas></div>
      </div>
      <div class="panel">
        <div class="panel-title">Where the value comes from</div>
        <div class="roi-bar-row" id="roi-bars"></div>
      </div>
    </div>

    <div class="panels">
      <div class="panel">
        <div class="panel-title">VAS pass-through — how it flows</div>
        <div class="flow-grid">
          <div class="flow-node">
            <div class="flow-node-val" id="f-premium">R100</div>
            <div class="flow-node-label">Customer premium</div>
          </div>
          <div class="flow-arrow">›</div>
          <div class="flow-node">
            <div class="flow-node-val" id="f-vas">R7.50</div>
            <div class="flow-node-label">VAS charged</div>
          </div>
          <div class="flow-arrow">›</div>
          <div class="flow-node">
            <div class="flow-node-val gold" id="f-silva">R3.00</div>
            <div class="flow-node-label">SILVA receives</div>
          </div>
          <div class="flow-arrow">›</div>
          <div class="flow-node">
            <div class="flow-node-val muted" id="f-disco">R4.50</div>
            <div class="flow-node-label">Discovery retains</div>
          </div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:0.5px solid var(--border);">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div style="background:var(--green-bg);padding:10px 12px;">
              <div style="font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--green);margin-bottom:3px;">Discovery VAS margin</div>
              <div style="font-size:18px;font-weight:300;color:var(--green);" id="f-margin">R4.50</div>
              <div style="font-size:10px;color:var(--muted);" id="f-margin-pct">60% of gross</div>
            </div>
            <div style="background:var(--gold3);padding:10px 12px;">
              <div style="font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#8A5A10;margin-bottom:3px;">SILVA fully covered by VAS</div>
              <div style="font-size:18px;font-weight:300;color:var(--gold);" id="f-covered">Yes</div>
              <div style="font-size:10px;color:var(--muted);" id="f-covered-sub">Net cost to Discovery: R0</div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-title">Year-by-year summary</div>
        <table class="mtable">
          <thead>
            <tr><th>Year</th><th>SILVA cost</th><th>Premium uplift</th><th>VAS revenue</th><th>Net gain</th></tr>
          </thead>
          <tbody id="yr-table"></tbody>
        </table>
      </div>
    </div>

    <div class="verdict">
      <div class="verdict-label">Bottom line</div>
      <div class="verdict-text" id="verdict-text">Loading...</div>
    </div>
  </div>
</div>
<div class="bottom-rule"></div>
</div>`
    const js = `const fmt = (n) => 'R' + Math.round(n).toLocaleString('en-ZA');
const fmtM = (n) => {
  const abs = Math.abs(n);
  if(abs >= 1e6) return 'R' + (n/1e6).toFixed(1) + 'M';
  if(abs >= 1e3) return 'R' + Math.round(n/1000) + 'k';
  return 'R' + Math.round(n);
};

const defaults = {
  items:160000, premium:100, itemval:5000, gap:50,
  platform:45000, dig:30, silva:3, monthly:10000,
  vas:7.5, dsplit:60, rate:2
};

let chart;

function g(id){return parseFloat(document.getElementById(id).value);}

function calc(){
  const items    = g('s-items');
  const premium  = g('s-premium');
  const itemval  = g('s-itemval');
  const gap      = g('s-gap') / 100;
  const platform = g('s-platform');
  const dig      = g('s-dig');
  const silva    = g('s-silva');
  const monthly  = g('s-monthly');
  const vas      = g('s-vas');
  const dsplit   = g('s-dsplit') / 100;
  const rate     = g('s-rate') / 100;

  const discShare    = vas * dsplit;
  const silvaCovered = silva <= vas;
  const annualCost   = platform * 12 + silva * items * 12;
  const premiumUplift= itemval * gap * items * rate;
  const annualVasDisc= discShare * items * 12;
  const netRoi       = premiumUplift + annualVasDisc - annualCost;

  document.getElementById('k-cost').textContent   = fmtM(annualCost);
  document.getElementById('k-uplift').textContent = fmtM(premiumUplift);
  document.getElementById('k-vas').textContent    = fmtM(annualVasDisc);
  document.getElementById('k-roi').textContent    = fmtM(netRoi);

  document.getElementById('f-premium').textContent    = fmt(premium);
  document.getElementById('f-vas').textContent        = 'R' + vas.toFixed(2);
  document.getElementById('f-silva').textContent      = 'R' + silva.toFixed(2);
  document.getElementById('f-disco').textContent      = 'R' + (vas * dsplit).toFixed(2);
  document.getElementById('f-margin').textContent     = 'R' + (vas * dsplit).toFixed(2);
  document.getElementById('f-margin-pct').textContent = Math.round(dsplit*100) + '% of gross';
  document.getElementById('f-covered').textContent    = silvaCovered ? 'Yes' : 'Partial';
  document.getElementById('f-covered-sub').textContent= silvaCovered
    ? 'Net cost to Discovery: R0'
    : 'Discovery absorbs R' + (silva - vas).toFixed(2) + '/item';

  const maxBar = Math.max(premiumUplift, annualVasDisc, platform*12, silva*items*12);
  document.getElementById('roi-bars').innerHTML = [
    {name:'Premium uplift (annual)',         val:premiumUplift,      color:'green'},
    {name:'VAS revenue — Discovery share',   val:annualVasDisc,      color:'green'},
    {name:'SILVA platform fee (annual)',      val:-(platform*12),     color:'gold'},
    {name:'SILVA revaluation fee (annual)',   val:-(silva*items*12),  color:'gold'},
  ].map(b=>\`
    <div class="roi-bar-item">
      <div class="roi-bar-header">
        <span class="roi-bar-name">\${b.name}<\\/span>
        <span class="roi-bar-val" style="color:\${b.val>0?'var(--green)':'var(--gold)'}">\${b.val>0?'+':''}\${fmtM(b.val)}<\\/span>
      <\\/div>
      <div class="roi-bar-track">
        <div class="roi-bar-fill \${b.color}" style="width:\${Math.round(Math.abs(b.val)/maxBar*100)}%"><\\/div>
      <\\/div>
    <\\/div>\`).join('');

  document.getElementById('yr-table').innerHTML = [1,2,3].map(yr=>{
    const digCost = yr===1 ? items*dig : 0;
    const yrCost  = annualCost + digCost;
    const yrNet   = premiumUplift + annualVasDisc - yrCost;
    return \`<tr>
      <td>Year \${yr}<\\/td>
      <td class="gold">\${fmtM(yrCost)}<\\/td>
      <td class="highlight">\${fmtM(premiumUplift)}<\\/td>
      <td class="highlight">\${fmtM(annualVasDisc)}<\\/td>
      <td style="color:\${yrNet>0?'var(--green)':'#C0392B'};font-weight:500">\${yrNet>0?'+':''}\${fmtM(yrNet)}<\\/td>
    <\\/tr>\`;
  }).join('');

  const months = Array.from({length:24},(_,i)=>i+1);
  const digArr    = months.map(m=>(Math.min(m*monthly,items)-Math.min((m-1)*monthly,items))*dig);
  const revalArr  = months.map(m=>Math.min(m*monthly,items)*silva);
  const platArr   = months.map(()=>platform);

  if(chart) chart.destroy();
  chart = new Chart(document.getElementById('chart-monthly'),{
    type:'bar',
    data:{
      labels:months.map(m=>'M'+m),
      datasets:[
        {label:'Digitisation',data:digArr,backgroundColor:'#C9973A',stack:'s'},
        {label:'Revaluation',data:revalArr,backgroundColor:'#1A2E4A',stack:'s'},
        {label:'Platform',data:platArr,backgroundColor:'#A8B4C0',stack:'s'},
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>' '+ctx.dataset.label+': R'+Math.round(ctx.raw).toLocaleString('en-ZA')}}},
      scales:{
        x:{stacked:true,grid:{display:false},ticks:{font:{size:9},color:'#6B7A8D',maxRotation:0,autoSkip:true,maxTicksLimit:12}},
        y:{stacked:true,grid:{color:'#F0EDE8'},ticks:{font:{size:9},color:'#6B7A8D',callback:v=>v>=1e6?'R'+(v/1e6).toFixed(1)+'M':v>=1e3?'R'+(v/1000)+'k':'R'+v}}
      }
    }
  });

  const roi1 = premiumUplift + annualVasDisc - (annualCost + items*dig);
  const roi2 = premiumUplift + annualVasDisc - annualCost;
  document.getElementById('verdict-text').innerHTML =
    \`Discovery spends <strong>\${fmtM(annualCost + items*dig)}<\\/strong> in year one (including digitisation). \` +
    \`Premium correction recovers <strong>\${fmtM(premiumUplift)}<\\/strong> annually. \` +
    \`VAS pass-through adds <strong>\${fmtM(annualVasDisc)}<\\/strong> to Discovery per year — \` +
    (silvaCovered ? \`covering SILVA's revaluation fee entirely. \` : \`partially offsetting SILVA's fee. \`) +
    \`Year-two net gain: <strong>\${fmtM(roi2)}<\\/strong>.\`;
}

const sliders = [
  ['s-items',   'd-items',   v=>Math.round(v).toLocaleString('en-ZA')],
  ['s-premium', 'd-premium', v=>'R'+v],
  ['s-itemval', 'd-itemval', v=>'R'+parseInt(v).toLocaleString('en-ZA')],
  ['s-gap',     'd-gap',     v=>v+'%'],
  ['s-platform','d-platform',v=>'R'+parseInt(v).toLocaleString('en-ZA')],
  ['s-dig',     'd-dig',     v=>'R'+v],
  ['s-silva',   'd-silva',   v=>'R'+parseFloat(v).toFixed(2)],
  ['s-monthly', 'd-monthly', v=>parseInt(v).toLocaleString('en-ZA')],
  ['s-vas',     'd-vas',     v=>'R'+parseFloat(v).toFixed(2)],
  ['s-dsplit',  'd-dsplit',  v=>v+'%'],
  ['s-rate',    'd-rate',    v=>parseFloat(v).toFixed(1)+'%'],
];
sliders.forEach(([sid,did,fmt])=>{
  document.getElementById(sid).addEventListener('input',e=>{
    document.getElementById(did).textContent=fmt(e.target.value);
    calc();
  });
});

function resetAll(){
  const d=defaults;
  [['s-items',d.items,'d-items',v=>Math.round(v).toLocaleString('en-ZA')],
   ['s-premium',d.premium,'d-premium',v=>'R'+v],
   ['s-itemval',d.itemval,'d-itemval',v=>'R'+v.toLocaleString('en-ZA')],
   ['s-gap',d.gap,'d-gap',v=>v+'%'],
   ['s-platform',d.platform,'d-platform',v=>'R'+v.toLocaleString('en-ZA')],
   ['s-dig',d.dig,'d-dig',v=>'R'+v],
   ['s-silva',d.silva,'d-silva',v=>'R'+v.toFixed(2)],
   ['s-monthly',d.monthly,'d-monthly',v=>v.toLocaleString('en-ZA')],
   ['s-vas',d.vas,'d-vas',v=>'R'+v.toFixed(2)],
   ['s-dsplit',d.dsplit,'d-dsplit',v=>v+'%'],
   ['s-rate',d.rate,'d-rate',v=>v.toFixed(1)+'%'],
  ].forEach(([sid,val,did,fmt])=>{
    document.getElementById(sid).value=val;
    document.getElementById(did).textContent=fmt(val);
  });
  calc();
}

calc();`
    doc.open()
    doc.write('<!DOCTYPE html><html><head>' +
      '<meta charset="UTF-8">' +
      '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">' +
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"><\/script>' +
      '<style>' + css + '<\/style>' +
      '<\/head><body>' + body +
      '<script>' + js + '<\/script>' +
      '<\/body><\/html>')
    doc.close()
  }, [])

  return (
    <iframe
      ref={ref}
      style={{ width: '100%', height: 'calc(100vh - 52px)', border: 'none', display: 'block' }}
      title="ROIModel"
    />
  )
}
