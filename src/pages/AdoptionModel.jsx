import React, { useEffect, useRef } from 'react'

export default function AdoptionModel() {
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
  --green:#2D7A4F;--green-bg:#E8F5EE;--green2:#1A5C38;
}
body{font-family:'Poppins',system-ui,sans-serif;background:var(--cream);color:var(--ink);font-size:13px;}
.shell{width:100%;background:var(--cream);}
.top-bar{background:var(--navy);padding:14px 28px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid var(--gold);}
.tb-title{font-size:16px;font-weight:500;color:#fff;letter-spacing:-.01em;}
.tb-sub{font-size:10px;color:var(--gold2);margin-top:2px;}
.badge{background:var(--navy2);border:0.5px solid var(--gold2);color:var(--gold2);font-size:9px;padding:3px 9px;letter-spacing:.08em;text-transform:uppercase;}
.layout{display:grid;grid-template-columns:268px 1fr;}
.sidebar{background:var(--navy);padding:18px;display:flex;flex-direction:column;gap:0;border-right:1px solid var(--navy2);}
.sb-sec{margin-bottom:18px;}
.sb-sec-label{font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:10px;padding-bottom:5px;border-bottom:0.5px solid var(--navy2);}
.field{margin-bottom:10px;}
.fl{font-size:9.5px;color:var(--subtle);margin-bottom:3px;letter-spacing:0;}
.fr{display:flex;align-items:center;gap:8px;}
.fv{font-size:12px;font-weight:500;color:#fff;min-width:50px;text-align:right;}
.fv.gold{color:var(--gold);}
.fv.grn{color:#6BCF95;}
input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:3px;background:var(--navy2);outline:none;cursor:pointer;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;background:var(--gold);border-radius:50%;cursor:pointer;}
input[type=range]::-moz-range-thumb{width:13px;height:13px;background:var(--gold);border-radius:50%;border:none;cursor:pointer;}
.adoption-section{background:var(--navy3);border:0.5px solid #2A3F5C;margin-bottom:18px;overflow:hidden;}
.adopt-head{padding:10px 14px 8px;border-bottom:0.5px solid #2A3F5C;}
.adopt-head-title{font-size:8.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);font-weight:500;}
.adopt-head-sub{font-size:8.5px;color:var(--subtle);margin-top:2px;}
.adopt-body{padding:12px 14px;}
.adopt-field{margin-bottom:10px;}
.adopt-label-row{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px;}
.adopt-name{font-size:10px;color:#fff;font-weight:500;}
.adopt-pct{font-size:14px;font-weight:300;color:var(--gold);min-width:38px;text-align:right;}
.adopt-pct.grn{color:#6BCF95;}
.adopt-track{height:4px;background:var(--navy2);width:100%;margin-bottom:2px;}
.adopt-fill{height:4px;transition:width .3s ease;}
.adopt-context{font-size:9px;color:var(--subtle);margin-top:1px;}
.reset-btn{width:100%;margin-top:2px;padding:7px;background:transparent;border:0.5px solid var(--navy2);color:var(--subtle);font-size:9px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;font-family:inherit;}
.reset-btn:hover{border-color:var(--gold2);color:var(--gold2);}
.main{padding:18px 22px;display:flex;flex-direction:column;gap:16px;}
.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
.kpi{background:#fff;border:0.5px solid var(--border);padding:12px 14px;}
.kpi-lbl{font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:5px;}
.kpi-val{font-size:20px;font-weight:300;color:var(--navy);line-height:1;letter-spacing:-.02em;}
.kpi-val.gold{color:var(--gold);}
.kpi-val.grn{color:var(--green);}
.kpi-sub{font-size:9.5px;color:var(--muted);margin-top:2px;}
.adoption-visual{background:#fff;border:0.5px solid var(--border);padding:14px 16px;}
.av-title{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:14px;padding-bottom:7px;border-bottom:0.5px solid var(--border);}
.funnel-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);}
.funnel-col{background:#fff;padding:12px 10px;text-align:center;}
.funnel-num{font-size:18px;font-weight:300;color:var(--navy);line-height:1;margin-bottom:3px;}
.funnel-num.gold{color:var(--gold);}
.funnel-num.grn{color:var(--green);}
.funnel-label{font-size:8.5px;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;line-height:1.3;}
.funnel-sub{font-size:9px;color:var(--subtle);margin-top:3px;}
.funnel-bar-row{display:flex;align-items:flex-end;gap:6px;height:60px;margin-top:14px;padding-top:14px;border-top:0.5px solid var(--border);}
.f-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;}
.f-bar{width:100%;transition:height .4s ease;}
.f-bar-label{font-size:8px;color:var(--muted);text-align:center;white-space:nowrap;}
.panels{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.panel{background:#fff;border:0.5px solid var(--border);padding:14px;}
.panel-title{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;padding-bottom:7px;border-bottom:0.5px solid var(--border);}
.chart-wrap{position:relative;width:100%;height:170px;}
.scenario-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;}
.scenario-card{border:0.5px solid var(--border);padding:12px 14px;cursor:pointer;transition:border-color .2s;}
.scenario-card:hover{border-color:var(--gold2);}
.scenario-card.active{border-color:var(--gold);background:var(--gold3);}
.sc-name{font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:4px;}
.sc-name.active{color:var(--gold);}
.sc-prem{font-size:10px;color:var(--ink);margin-bottom:1px;}
.sc-vas{font-size:10px;color:var(--muted);}
.sc-net{font-size:14px;font-weight:500;color:var(--green);margin-top:6px;}
.verdict{background:var(--navy);padding:14px 18px;display:flex;gap:18px;align-items:flex-start;}
.vl{font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);white-space:nowrap;padding-top:1px;}
.vt{font-size:10.5px;color:#C8D4E0;line-height:1.65;}
.vt strong{color:#fff;font-weight:500;}
.bottom-rule{height:3px;background:var(--gold);}
.legend-row{display:flex;gap:14px;margin-bottom:8px;flex-wrap:wrap;}
.leg-item{display:flex;align-items:center;gap:5px;font-size:10px;color:var(--muted);}
.leg-dot{width:9px;height:9px;border-radius:1px;}`
    const body = `<div class="shell">

<div class="top-bar">
  <div>
    <div class="tb-title">SILVA × Discovery — Commercial Model</div>
    <div class="tb-sub">Adjust assumptions and adoption rates. Every number updates instantly.</div>
  </div>
  <div style="display:flex;gap:6px;">
    <div class="badge">Confidential</div>
    <div class="badge">March 2026</div>
  </div>
</div>

<div class="layout">

<div class="sidebar">
  <div class="sb-sec">
    <div class="sb-sec-label">Portfolio</div>
    <div class="field"><div class="fl">Total items in book</div><div class="fr"><input type="range" id="s-items" min="10000" max="300000" step="1000" value="160000"><div class="fv gold" id="d-items">160,000</div></div></div>
    <div class="field"><div class="fl">Avg premium per item / mo (R)</div><div class="fr"><input type="range" id="s-premium" min="50" max="500" step="5" value="100"><div class="fv" id="d-premium">R100</div></div></div>
    <div class="field"><div class="fl">Avg declared item value (R)</div><div class="fr"><input type="range" id="s-itemval" min="1000" max="30000" step="500" value="5000"><div class="fv" id="d-itemval">R5,000</div></div></div>
    <div class="field"><div class="fl">Underinsurance gap</div><div class="fr"><input type="range" id="s-gap" min="10" max="70" step="5" value="50"><div class="fv" id="d-gap">50%</div></div></div>
    <div class="field"><div class="fl">Insurance rate (premium / value)</div><div class="fr"><input type="range" id="s-rate" min="1" max="5" step="0.1" value="2"><div class="fv" id="d-rate">2.0%</div></div></div>
  </div>

  <div class="sb-sec">
    <div class="sb-sec-label">SILVA Fees</div>
    <div class="field"><div class="fl">Platform fee / mo (R)</div><div class="fr"><input type="range" id="s-platform" min="20000" max="100000" step="5000" value="45000"><div class="fv" id="d-platform">R45,000</div></div></div>
    <div class="field"><div class="fl">Digitisation fee / item (R)</div><div class="fr"><input type="range" id="s-dig" min="15" max="50" step="1" value="30"><div class="fv" id="d-dig">R30</div></div></div>
    <div class="field"><div class="fl">SILVA share / item / mo (R)</div><div class="fr"><input type="range" id="s-silva" min="1" max="8" step="0.5" value="3"><div class="fv gold" id="d-silva">R3.00</div></div></div>
    <div class="field"><div class="fl">Gross VAS fee charged to customer (R)</div><div class="fr"><input type="range" id="s-vas" min="3" max="15" step="0.5" value="7.5"><div class="fv" id="d-vas">R7.50</div></div></div>
    <div class="field"><div class="fl">Discovery VAS share</div><div class="fr"><input type="range" id="s-dsplit" min="50" max="80" step="5" value="60"><div class="fv" id="d-dsplit">60%</div></div></div>
  </div>

  <div class="adoption-section">
    <div class="adopt-head">
      <div class="adopt-head-title">Customer adoption rates</div>
      <div class="adopt-head-sub">What % of the digitised book opts in?</div>
    </div>
    <div class="adopt-body">
      <div class="adopt-field">
        <div class="adopt-label-row">
          <div class="adopt-name">Premium update opt-in</div>
          <div class="adopt-pct gold" id="d-prem-adopt">30%</div>
        </div>
        <input type="range" id="s-prem-adopt" min="5" max="100" step="5" value="30">
        <div class="adopt-track"><div class="adopt-fill" id="fill-prem" style="width:30%;background:#C9973A;"></div></div>
        <div class="adopt-context" id="ctx-prem">48,000 items update their premium</div>
      </div>
      <div class="adopt-field">
        <div class="adopt-label-row">
          <div class="adopt-name">Always On VAS opt-in</div>
          <div class="adopt-pct grn" id="d-vas-adopt">25%</div>
        </div>
        <input type="range" id="s-vas-adopt" min="5" max="100" step="5" value="25">
        <div class="adopt-track"><div class="adopt-fill" id="fill-vas" style="width:25%;background:#6BCF95;"></div></div>
        <div class="adopt-context" id="ctx-vas">40,000 items on Always On VAS</div>
      </div>
    </div>
  </div>

  <button class="reset-btn" onclick="resetAll()">Reset to defaults</button>
</div>

<div class="main">

  <div class="kpi-row">
    <div class="kpi"><div class="kpi-lbl">SILVA annual cost</div><div class="kpi-val" id="k-cost">—</div><div class="kpi-sub">Platform + revaluation</div></div>
    <div class="kpi"><div class="kpi-lbl">Premium uplift / yr</div><div class="kpi-val grn" id="k-uplift">—</div><div class="kpi-sub" id="k-uplift-sub">At 30% adoption</div></div>
    <div class="kpi"><div class="kpi-lbl">VAS revenue to Discovery</div><div class="kpi-val gold" id="k-vas">—</div><div class="kpi-sub" id="k-vas-sub">At 25% VAS adoption</div></div>
    <div class="kpi"><div class="kpi-lbl">Net gain (year 2+)</div><div class="kpi-val grn" id="k-net">—</div><div class="kpi-sub">Uplift + VAS − cost</div></div>
  </div>

  <div class="adoption-visual">
    <div class="av-title">Adoption funnel — from digitised book to revenue</div>
    <div class="funnel-grid">
      <div class="funnel-col"><div class="funnel-num" id="f-total">160,000</div><div class="funnel-label">Total items</div><div class="funnel-sub">Full book</div></div>
      <div class="funnel-col"><div class="funnel-num" id="f-digitised">160,000</div><div class="funnel-label">Digitised</div><div class="funnel-sub">100% of book</div></div>
      <div class="funnel-col"><div class="funnel-num gold" id="f-prem-items">48,000</div><div class="funnel-label">Premium updated</div><div class="funnel-sub" id="f-prem-sub">30% opt-in</div></div>
      <div class="funnel-col"><div class="funnel-num grn" id="f-vas-items">40,000</div><div class="funnel-label">On Always On VAS</div><div class="funnel-sub" id="f-vas-sub">25% opt-in</div></div>
    </div>
    <div class="funnel-bar-row" id="funnel-bars"></div>
  </div>

  <div style="background:#fff;border:0.5px solid var(--border);padding:14px 16px;">
    <div class="panel-title" style="font-size:8.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:12px;padding-bottom:7px;border-bottom:0.5px solid var(--border);">Scenario comparison — what if adoption were different?</div>
    <div class="scenario-strip" id="scenario-strip"></div>
  </div>

  <div class="panels">
    <div class="panel">
      <div class="panel-title">Revenue breakdown — annual</div>
      <div class="legend-row">
        <div class="leg-item"><div class="leg-dot" style="background:#C9973A;"></div>Premium uplift</div>
        <div class="leg-item"><div class="leg-dot" style="background:#2D7A4F;"></div>VAS revenue</div>
        <div class="leg-item"><div class="leg-dot" style="background:#A8B4C0;"></div>SILVA cost</div>
      </div>
      <div class="chart-wrap"><canvas id="chart-breakdown"></canvas></div>
    </div>
    <div class="panel">
      <div class="panel-title">Net gain across adoption scenarios</div>
      <div class="legend-row">
        <div class="leg-item"><div class="leg-dot" style="background:#2D7A4F;"></div>Net gain (year 2+)</div>
        <div class="leg-item"><div class="leg-dot" style="background:#C9973A;"></div>Current scenario</div>
      </div>
      <div class="chart-wrap"><canvas id="chart-scenarios"></canvas></div>
    </div>
  </div>

  <div class="verdict">
    <div class="vl">Bottom line</div>
    <div class="vt" id="verdict"></div>
  </div>

</div>
</div>
<div class="bottom-rule"></div>
</div>`
    const js = `const R=n=>{const a=Math.abs(n),s=n<0?'-':'';if(a>=1e6)return s+'R'+(a/1e6).toFixed(1)+'M';if(a>=1e3)return s+'R'+Math.round(a/1000)+'k';return s+'R'+Math.round(a);};
const N=n=>Math.round(n).toLocaleString('en-ZA');
const P=n=>Math.round(n)+'%';
const D={items:160000,premium:100,itemval:5000,gap:50,rate:2,platform:45000,dig:30,silva:3,vas:7.5,dsplit:60,premAdopt:30,vasAdopt:25};
let chartBreak,chartScen;
function g(id){return parseFloat(document.getElementById(id).value);}
function calcNet(pA,vA,items,itemval,gap,rate,platform,silva,vas,dsplit){
  return itemval*gap*(items*pA)*rate+vas*dsplit*(items*vA)*12-(platform*12+silva*items*12);
}
function calc(){
  const items=g('s-items'),premium=g('s-premium'),itemval=g('s-itemval'),gap=g('s-gap')/100,rate=g('s-rate')/100;
  const platform=g('s-platform'),dig=g('s-dig'),silva=g('s-silva'),vas=g('s-vas'),dsplit=g('s-dsplit')/100;
  const premAdopt=g('s-prem-adopt')/100,vasAdopt=g('s-vas-adopt')/100;
  const premItems=Math.round(items*premAdopt),vasItems=Math.round(items*vasAdopt);
  const annualCost=platform*12+silva*items*12;
  const premUplift=itemval*gap*premItems*rate;
  const discVasRev=vas*dsplit*vasItems*12;
  const net=premUplift+discVasRev-annualCost;

  document.getElementById('k-cost').textContent=R(annualCost);
  document.getElementById('k-uplift').textContent=R(premUplift);
  document.getElementById('k-uplift-sub').textContent='At '+P(premAdopt*100)+' adoption';
  document.getElementById('k-vas').textContent=R(discVasRev);
  document.getElementById('k-vas-sub').textContent='At '+P(vasAdopt*100)+' VAS adoption';
  document.getElementById('k-net').textContent=R(net);
  document.getElementById('k-net').className='kpi-val '+(net>=0?'grn':'');
  document.getElementById('f-total').textContent=N(items);
  document.getElementById('f-digitised').textContent=N(items);
  document.getElementById('f-prem-items').textContent=N(premItems);
  document.getElementById('f-prem-sub').textContent=P(premAdopt*100)+' opt-in';
  document.getElementById('f-vas-items').textContent=N(vasItems);
  document.getElementById('f-vas-sub').textContent=P(vasAdopt*100)+' opt-in';
  document.getElementById('fill-prem').style.width=Math.min(premAdopt*100,100)+'%';
  document.getElementById('fill-vas').style.width=Math.min(vasAdopt*100,100)+'%';
  document.getElementById('ctx-prem').textContent=N(premItems)+' items update their premium';
  document.getElementById('ctx-vas').textContent=N(vasItems)+' items on Always On VAS';

  const maxFunnel=items;
  document.getElementById('funnel-bars').innerHTML=[
    {label:'Total book',val:items,color:'#A8B4C0'},
    {label:'Digitised',val:items,color:'#1A2E4A'},
    {label:'Premium updated',val:premItems,color:'#C9973A'},
    {label:'Always On VAS',val:vasItems,color:'#2D7A4F'},
  ].map(b=>{
    const h=Math.max(4,Math.round((b.val/maxFunnel)*52));
    return \`<div class="f-bar-wrap"><div style="font-size:9px;color:\${b.color};font-weight:500;text-align:center;">\${R(b.val)}<\\/div><div class="f-bar" style="height:\${h}px;background:\${b.color};"><\\/div><div class="f-bar-label">\${b.label}<\\/div><\\/div>\`;
  }).join('');

  const scensForCard=[{name:'Conservative',prem:10,vas:10},{name:'Optimistic',prem:50,vas:40},{name:'Full adoption',prem:100,vas:80}];
  document.getElementById('scenario-strip').innerHTML=scensForCard.map(s=>{
    const sNet=calcNet(s.prem/100,s.vas/100,items,itemval,gap,rate,platform,silva,vas,dsplit);
    const isActive=Math.round(premAdopt*100)===s.prem&&Math.round(vasAdopt*100)===s.vas;
    return \`<div class="scenario-card\${isActive?' active':''}"><div class="sc-name\${isActive?' active':''}">\${s.name}<\\/div><div class="sc-prem">Premium: <strong>\${s.prem}%<\\/strong> opt-in<\\/div><div class="sc-vas">VAS: <strong>\${s.vas}%<\\/strong> opt-in<\\/div><div class="sc-net" style="color:\${sNet>=0?'var(--green)':'#C0392B'}">\${sNet>=0?'+':''}\${R(sNet)} / yr<\\/div><\\/div>\`;
  }).join('');

  const scenarios=[{name:'Conservative',prem:10,vas:10},{name:'Moderate',prem:25,vas:20},{name:'Current',prem:Math.round(premAdopt*100),vas:Math.round(vasAdopt*100),isCurrent:true},{name:'Optimistic',prem:50,vas:40},{name:'Full adoption',prem:100,vas:80}];
  const scNets=scenarios.map(s=>calcNet(s.prem/100,s.vas/100,items,itemval,gap,rate,platform,silva,vas,dsplit));
  const scColors=scenarios.map(s=>s.isCurrent?'#C9973A':'#2D7A4F');

  if(chartBreak)chartBreak.destroy();
  chartBreak=new Chart(document.getElementById('chart-breakdown'),{type:'bar',data:{labels:['Premium uplift','VAS revenue','SILVA cost','Net gain'],datasets:[{data:[premUplift,discVasRev,-annualCost,net],backgroundColor:['#2D7A4F','#2D7A4F','#C9B98A',net>=0?'#2D7A4F':'#C0392B']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>' '+R(ctx.raw)}}},scales:{x:{grid:{display:false},ticks:{font:{size:9},color:'#6B7A8D'}},y:{grid:{color:'#F0EDE8'},ticks:{font:{size:9},color:'#6B7A8D',callback:v=>v>=1e6?'R'+(v/1e6).toFixed(1)+'M':v>=1e3?'R'+(v/1000)+'k':'R'+v}}}}});

  if(chartScen)chartScen.destroy();
  chartScen=new Chart(document.getElementById('chart-scenarios'),{type:'bar',data:{labels:scenarios.map(s=>s.name),datasets:[{data:scNets,backgroundColor:scColors}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>' Net: '+R(ctx.raw)}}},scales:{x:{grid:{display:false},ticks:{font:{size:9},color:'#6B7A8D'}},y:{grid:{color:'#F0EDE8'},ticks:{font:{size:9},color:'#6B7A8D',callback:v=>v>=1e6?'R'+(v/1e6).toFixed(1)+'M':v>=1e3?'R'+(v/1000)+'k':'R'+v}}}}});

  const coveredByVas=silva<=vas;
  document.getElementById('verdict').innerHTML=\`With <strong>\${P(premAdopt*100)}<\\/strong> of policyholders updating their premium, Discovery recovers <strong>\${R(premUplift)}<\\/strong> in additional premium annually. <strong>\${P(vasAdopt*100)}<\\/strong> VAS opt-in generates <strong>\${R(discVasRev)}<\\/strong> in Discovery's pocket each year. \${coveredByVas?\`The VAS fee <strong>covers SILVA's revaluation cost entirely<\\/strong> — net cost to Discovery is zero on the ongoing fee. \`:\`VAS partially offsets SILVA's fee. \`}After SILVA's full annual cost of <strong>\${R(annualCost)}<\\/strong>, the net position is <strong style="color:\${net>=0?'#6BCF95':'#FF8080'}">\${R(net)} per year<\\/strong>.\`;
}

const sliders=[['s-items','d-items',v=>N(v)],['s-premium','d-premium',v=>'R'+v],['s-itemval','d-itemval',v=>'R'+parseInt(v).toLocaleString('en-ZA')],['s-gap','d-gap',v=>v+'%'],['s-rate','d-rate',v=>parseFloat(v).toFixed(1)+'%'],['s-platform','d-platform',v=>'R'+parseInt(v).toLocaleString('en-ZA')],['s-dig','d-dig',v=>'R'+v],['s-silva','d-silva',v=>'R'+parseFloat(v).toFixed(2)],['s-vas','d-vas',v=>'R'+parseFloat(v).toFixed(2)],['s-dsplit','d-dsplit',v=>v+'%'],['s-prem-adopt','d-prem-adopt',v=>v+'%'],['s-vas-adopt','d-vas-adopt',v=>v+'%']];
sliders.forEach(([sid,did,fmt])=>{document.getElementById(sid).addEventListener('input',e=>{document.getElementById(did).textContent=fmt(e.target.value);calc();});});

function resetAll(){
  const vals={'items':D.items,'premium':D.premium,'itemval':D.itemval,'gap':D.gap,'rate':D.rate,'platform':D.platform,'dig':D.dig,'silva':D.silva,'vas':D.vas,'dsplit':D.dsplit,'prem-adopt':D.premAdopt,'vas-adopt':D.vasAdopt};
  Object.entries(vals).forEach(([k,v])=>{const s=document.getElementById('s-'+k);if(s)s.value=v;});
  sliders.forEach(([sid,did,fmt])=>{const s=document.getElementById(sid);if(s)document.getElementById(did).textContent=fmt(s.value);});
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
      title="AdoptionModel"
    />
  )
}
