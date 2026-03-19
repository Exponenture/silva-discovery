import React, { useEffect, useRef, useMemo } from 'react'
import Chart from 'chart.js/auto'
import { useModel } from '../context/ModelContext'

const C = {
  navy: '#0F1D35', navy2: '#1A2E4A', navy3: '#162440',
  gold: '#C9973A', gold2: '#C9B98A', gold3: '#F0E6CC',
  cream: '#FAFAF6', border: '#D8D0BA',
  ink: '#0F1D35', muted: '#6B7A8D', subtle: '#A8B4C0',
  green: '#2D7A4F', greenBg: '#E8F5EE', green2: '#6BCF95',
}

const R = n => {
  const abs = Math.abs(n), s = n < 0 ? '-' : ''
  if (abs >= 1e6) return s + 'R' + (abs / 1e6).toFixed(1) + 'M'
  if (abs >= 1e3) return s + 'R' + Math.round(abs / 1000) + 'k'
  return s + 'R' + Math.round(abs)
}
const N = n => Math.round(n).toLocaleString('en-ZA')

function Slider({ label, valueKey, min, max, step, display }) {
  const { values, set } = useModel()
  const v = values[valueKey]
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 9.5, color: C.subtle, marginBottom: 3 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="range" min={min} max={max} step={step} value={v}
          onChange={e => set(valueKey, parseFloat(e.target.value))}
          style={{ flex: 1, height: 3, accentColor: C.gold, cursor: 'pointer' }}
        />
        <div style={{ fontSize: 12, fontWeight: 500, color: '#fff', minWidth: 50, textAlign: 'right' }}>
          {display(v)}
        </div>
      </div>
    </div>
  )
}

function calcNet(pA, vA, items, itemval, gap, rate, platform, silva, vas, dsplit) {
  return itemval * gap * (items * pA) * rate + vas * dsplit * (items * vA) * 12 - (platform * 12 + silva * items * 12)
}

export default function AdoptionModel() {
  const { values, set, reset } = useModel()
  const chartBreakRef = useRef(null)
  const chartScenRef = useRef(null)
  const chartBreakInst = useRef(null)
  const chartScenInst = useRef(null)

  const calc = useMemo(() => {
    const { items, itemval, gap, platform, silva, vas, dsplit, rate, premAdopt, vasAdopt } = values
    const gapF = gap / 100, dsplitF = dsplit / 100, rateF = rate / 100
    const premAdoptF = premAdopt / 100, vasAdoptF = vasAdopt / 100
    const premItems = Math.round(items * premAdoptF)
    const vasItems = Math.round(items * vasAdoptF)
    const annualCost = platform * 12 + silva * items * 12
    const premUplift = itemval * gapF * premItems * rateF
    const discVasRev = vas * dsplitF * vasItems * 12
    const net = premUplift + discVasRev - annualCost
    const coveredByVas = silva <= vas

    const scenarios = [
      { name: 'Conservative', prem: 10, vas: 10 },
      { name: 'Moderate', prem: 25, vas: 20 },
      { name: 'Current', prem: Math.round(premAdoptF * 100), vas: Math.round(vasAdoptF * 100), isCurrent: true },
      { name: 'Optimistic', prem: 50, vas: 40 },
      { name: 'Full adoption', prem: 100, vas: 80 },
    ]
    const scNets = scenarios.map(s => calcNet(s.prem / 100, s.vas / 100, items, itemval, gapF, rateF, platform, silva, vas, dsplitF))

    return { premItems, vasItems, annualCost, premUplift, discVasRev, net, coveredByVas, premAdoptF, vasAdoptF, scenarios, scNets }
  }, [values])

  useEffect(() => {
    if (!chartBreakRef.current || !chartScenRef.current) return
    const { annualCost, premUplift, discVasRev, net, scenarios, scNets } = calc

    if (chartBreakInst.current) chartBreakInst.current.destroy()
    chartBreakInst.current = new Chart(chartBreakRef.current, {
      type: 'bar',
      data: {
        labels: ['Premium uplift', 'VAS revenue', 'SILVA cost', 'Net gain'],
        datasets: [{ data: [premUplift, discVasRev, -annualCost, net], backgroundColor: ['#2D7A4F', '#2D7A4F', '#C9B98A', net >= 0 ? '#2D7A4F' : '#C0392B'] }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' ' + R(ctx.raw) } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 }, color: C.muted } },
          y: { grid: { color: '#F0EDE8' }, ticks: { font: { size: 9 }, color: C.muted, callback: v => v >= 1e6 ? 'R' + (v / 1e6).toFixed(1) + 'M' : v >= 1e3 ? 'R' + (v / 1000) + 'k' : 'R' + v } }
        }
      }
    })

    if (chartScenInst.current) chartScenInst.current.destroy()
    chartScenInst.current = new Chart(chartScenRef.current, {
      type: 'bar',
      data: {
        labels: scenarios.map(s => s.name),
        datasets: [{ data: scNets, backgroundColor: scenarios.map(s => s.isCurrent ? C.gold : C.green) }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ' Net: ' + R(ctx.raw) } } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 9 }, color: C.muted } },
          y: { grid: { color: '#F0EDE8' }, ticks: { font: { size: 9 }, color: C.muted, callback: v => v >= 1e6 ? 'R' + (v / 1e6).toFixed(1) + 'M' : v >= 1e3 ? 'R' + (v / 1000) + 'k' : 'R' + v } }
        }
      }
    })

    return () => { chartBreakInst.current?.destroy(); chartScenInst.current?.destroy() }
  }, [values])

  const { premItems, vasItems, annualCost, premUplift, discVasRev, net, coveredByVas, premAdoptF, vasAdoptF, scenarios, scNets } = calc
  const maxFunnel = values.items

  const sbLabel = txt => (
    <div style={{ fontSize: 8.5, letterSpacing: '.22em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 10, paddingBottom: 5, borderBottom: `0.5px solid ${C.navy2}` }}>{txt}</div>
  )

  return (
    <div style={{ width: '100%', background: C.cream, fontFamily: "'Poppins', system-ui, sans-serif", fontSize: 13, color: C.ink, overflowY: 'auto', height: 'calc(100vh - 52px)' }}>

      {/* Top bar */}
      <div style={{ background: C.navy, padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${C.gold}` }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: '#fff', letterSpacing: '-.01em' }}>SILVA × Discovery — Commercial Model</div>
          <div style={{ fontSize: 10, color: C.gold2, marginTop: 2 }}>Adjust assumptions and adoption rates. Every number updates instantly.</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Confidential', 'March 2026'].map(t => (
            <div key={t} style={{ background: C.navy2, border: `0.5px solid ${C.gold2}`, color: C.gold2, fontSize: 9, padding: '3px 9px', letterSpacing: '.08em', textTransform: 'uppercase' }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '268px 1fr' }}>

        {/* Sidebar */}
        <div style={{ background: C.navy, padding: 18, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${C.navy2}` }}>

          <div style={{ marginBottom: 18 }}>
            {sbLabel('Portfolio')}
            <Slider label="Total items in book" valueKey="items" min={10000} max={300000} step={1000} display={v => N(v)} />
            <Slider label="Avg premium per item / mo (R)" valueKey="premium" min={50} max={500} step={5} display={v => 'R' + v} />
            <Slider label="Avg declared item value (R)" valueKey="itemval" min={1000} max={30000} step={500} display={v => 'R' + parseInt(v).toLocaleString('en-ZA')} />
            <Slider label="Underinsurance gap" valueKey="gap" min={10} max={70} step={5} display={v => v + '%'} />
            <Slider label="Insurance rate (premium / value)" valueKey="rate" min={1} max={5} step={0.1} display={v => parseFloat(v).toFixed(1) + '%'} />
          </div>

          <div style={{ marginBottom: 18 }}>
            {sbLabel('SILVA Fees')}
            <Slider label="Platform fee / mo (R)" valueKey="platform" min={20000} max={100000} step={5000} display={v => 'R' + parseInt(v).toLocaleString('en-ZA')} />
            <Slider label="Digitisation fee / item (R)" valueKey="dig" min={15} max={50} step={1} display={v => 'R' + v} />
            <Slider label="SILVA share / item / mo (R)" valueKey="silva" min={1} max={8} step={0.5} display={v => 'R' + parseFloat(v).toFixed(2)} />
            <Slider label="Gross VAS fee charged to customer (R)" valueKey="vas" min={3} max={15} step={0.5} display={v => 'R' + parseFloat(v).toFixed(2)} />
            <Slider label="Discovery VAS share" valueKey="dsplit" min={50} max={80} step={5} display={v => v + '%'} />
          </div>

          {/* Adoption sliders */}
          <div style={{ background: C.navy3, border: `0.5px solid #2A3F5C`, marginBottom: 18, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px 8px', borderBottom: `0.5px solid #2A3F5C` }}>
              <div style={{ fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>Customer adoption rates</div>
              <div style={{ fontSize: 8.5, color: C.subtle, marginTop: 2 }}>What % of the digitised book opts in?</div>
            </div>
            <div style={{ padding: '12px 14px' }}>
              {[
                { key: 'premAdopt', name: 'Premium update opt-in', color: C.gold, fillColor: C.gold },
                { key: 'vasAdopt', name: 'Always On VAS opt-in', color: C.green2, fillColor: C.green2 },
              ].map(({ key, name, color, fillColor }) => (
                <div key={key} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <div style={{ fontSize: 10, color: '#fff', fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: 14, fontWeight: 300, color }}>{values[key]}%</div>
                  </div>
                  <input
                    type="range" min={5} max={100} step={5} value={values[key]}
                    onChange={e => set(key, parseFloat(e.target.value))}
                    style={{ width: '100%', height: 3, accentColor: fillColor, cursor: 'pointer', display: 'block', marginBottom: 4 }}
                  />
                  <div style={{ height: 4, background: C.navy2 }}>
                    <div style={{ height: 4, width: Math.min(values[key], 100) + '%', background: fillColor, transition: 'width .3s ease' }} />
                  </div>
                  <div style={{ fontSize: 9, color: C.subtle, marginTop: 1 }}>
                    {key === 'premAdopt' ? N(premItems) + ' items update their premium' : N(vasItems) + ' items on Always On VAS'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={reset}
            style={{ width: '100%', marginTop: 2, padding: 7, background: 'transparent', border: `0.5px solid ${C.navy2}`, color: C.subtle, fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseOver={e => { e.target.style.borderColor = C.gold2; e.target.style.color = C.gold2 }}
            onMouseOut={e => { e.target.style.borderColor = C.navy2; e.target.style.color = C.subtle }}
          >
            Reset to defaults
          </button>
        </div>

        {/* Main */}
        <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
            {[
              { label: 'SILVA annual cost', val: R(annualCost), color: C.ink, sub: 'Platform + revaluation' },
              { label: 'Premium uplift / yr', val: R(premUplift), color: C.green, sub: `At ${values.premAdopt}% adoption` },
              { label: 'VAS revenue to Discovery', val: R(discVasRev), color: C.gold, sub: `At ${values.vasAdopt}% VAS adoption` },
              { label: 'Net gain (year 2+)', val: R(net), color: net >= 0 ? C.green : '#C0392B', sub: 'Uplift + VAS − cost' },
            ].map(k => (
              <div key={k.label} style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: '12px 14px' }}>
                <div style={{ fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 5 }}>{k.label}</div>
                <div style={{ fontSize: 20, fontWeight: 300, color: k.color, lineHeight: 1, letterSpacing: '-.02em' }}>{k.val}</div>
                <div style={{ fontSize: 9.5, color: C.muted, marginTop: 2 }}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Adoption funnel */}
          <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: '14px 16px' }}>
            <div style={{ fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 14, paddingBottom: 7, borderBottom: `0.5px solid ${C.border}` }}>Adoption funnel — from digitised book to revenue</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: C.border }}>
              {[
                { val: N(values.items), label: 'Total items', sub: 'Full book', color: C.ink },
                { val: N(values.items), label: 'Digitised', sub: '100% of book', color: C.ink },
                { val: N(premItems), label: 'Premium updated', sub: values.premAdopt + '% opt-in', color: C.gold },
                { val: N(vasItems), label: 'On Always On VAS', sub: values.vasAdopt + '% opt-in', color: C.green },
              ].map((f, i) => (
                <div key={i} style={{ background: '#fff', padding: '12px 10px', textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 300, color: f.color, lineHeight: 1, marginBottom: 3 }}>{f.val}</div>
                  <div style={{ fontSize: 8.5, color: C.muted, textTransform: 'uppercase', letterSpacing: '.1em', lineHeight: 1.3 }}>{f.label}</div>
                  <div style={{ fontSize: 9, color: C.subtle, marginTop: 3 }}>{f.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60, marginTop: 14, paddingTop: 14, borderTop: `0.5px solid ${C.border}` }}>
              {[
                { label: 'Total book', val: values.items, color: C.subtle },
                { label: 'Digitised', val: values.items, color: C.navy2 },
                { label: 'Premium updated', val: premItems, color: C.gold },
                { label: 'Always On VAS', val: vasItems, color: C.green },
              ].map(b => {
                const h = Math.max(4, Math.round((b.val / maxFunnel) * 52))
                return (
                  <div key={b.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <div style={{ fontSize: 9, color: b.color, fontWeight: 500, textAlign: 'center' }}>{R(b.val)}</div>
                    <div style={{ width: '100%', height: h, background: b.color }} />
                    <div style={{ fontSize: 8, color: C.muted, textAlign: 'center', whiteSpace: 'nowrap' }}>{b.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Scenario cards */}
          <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: '14px 16px' }}>
            <div style={{ fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 12, paddingBottom: 7, borderBottom: `0.5px solid ${C.border}` }}>Scenario comparison — what if adoption were different?</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[{ name: 'Conservative', prem: 10, vas: 10 }, { name: 'Optimistic', prem: 50, vas: 40 }, { name: 'Full adoption', prem: 100, vas: 80 }].map(s => {
                const sNet = calcNet(s.prem / 100, s.vas / 100, values.items, values.itemval, values.gap / 100, values.rate / 100, values.platform, values.silva, values.vas, values.dsplit / 100)
                const isActive = Math.round(premAdoptF * 100) === s.prem && Math.round(vasAdoptF * 100) === s.vas
                return (
                  <div key={s.name} style={{ border: `0.5px solid ${isActive ? C.gold : C.border}`, background: isActive ? C.gold3 : '#fff', padding: '12px 14px', cursor: 'pointer', transition: 'border-color .2s' }}>
                    <div style={{ fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: isActive ? C.gold : C.muted, marginBottom: 4 }}>{s.name}</div>
                    <div style={{ fontSize: 10, color: C.ink, marginBottom: 1 }}>Premium: <strong>{s.prem}%</strong> opt-in</div>
                    <div style={{ fontSize: 10, color: C.muted }}>VAS: <strong>{s.vas}%</strong> opt-in</div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: sNet >= 0 ? C.green : '#C0392B', marginTop: 6 }}>{sNet >= 0 ? '+' : ''}{R(sNet)} / yr</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: 14 }}>
              <div style={{ fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 12, paddingBottom: 7, borderBottom: `0.5px solid ${C.border}` }}>Revenue breakdown — annual</div>
              <div style={{ display: 'flex', gap: 14, marginBottom: 8, flexWrap: 'wrap' }}>
                {[{ color: C.gold, label: 'Premium uplift' }, { color: C.green, label: 'VAS revenue' }, { color: C.subtle, label: 'SILVA cost' }].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: C.muted }}>
                    <div style={{ width: 9, height: 9, borderRadius: 1, background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>
              <div style={{ position: 'relative', width: '100%', height: 170 }}><canvas ref={chartBreakRef} /></div>
            </div>
            <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: 14 }}>
              <div style={{ fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 12, paddingBottom: 7, borderBottom: `0.5px solid ${C.border}` }}>Net gain across adoption scenarios</div>
              <div style={{ display: 'flex', gap: 14, marginBottom: 8, flexWrap: 'wrap' }}>
                {[{ color: C.green, label: 'Net gain (year 2+)' }, { color: C.gold, label: 'Current scenario' }].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: C.muted }}>
                    <div style={{ width: 9, height: 9, borderRadius: 1, background: l.color }} />
                    {l.label}
                  </div>
                ))}
              </div>
              <div style={{ position: 'relative', width: '100%', height: 170 }}><canvas ref={chartScenRef} /></div>
            </div>
          </div>

          {/* Verdict */}
          <div style={{ background: C.navy, padding: '14px 18px', display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 8.5, letterSpacing: '.18em', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap', paddingTop: 1 }}>Bottom line</div>
            <div style={{ fontSize: 10.5, color: '#C8D4E0', lineHeight: 1.65 }}>
              With <strong style={{ color: '#fff' }}>{values.premAdopt}%</strong> of policyholders updating their premium, Discovery recovers <strong style={{ color: '#fff' }}>{R(premUplift)}</strong> in additional premium annually.{' '}
              <strong style={{ color: '#fff' }}>{values.vasAdopt}%</strong> VAS opt-in generates <strong style={{ color: '#fff' }}>{R(discVasRev)}</strong> in Discovery's pocket each year.{' '}
              {coveredByVas ? <>The VAS fee <strong style={{ color: '#fff' }}>covers SILVA's revaluation cost entirely</strong> — net cost to Discovery is zero on the ongoing fee. </> : 'VAS partially offsets SILVA\'s fee. '}
              After SILVA's full annual cost of <strong style={{ color: '#fff' }}>{R(annualCost)}</strong>, the net position is <strong style={{ color: net >= 0 ? C.green2 : '#FF8080' }}>{R(net)} per year</strong>.
            </div>
          </div>

        </div>
      </div>
      <div style={{ height: 3, background: C.gold }} />
    </div>
  )
}
