import React, { useEffect, useRef, useMemo } from 'react'
import Chart from 'chart.js/auto'
import { useModel, defaults } from '../context/ModelContext'

const C = {
  navy: '#0F1D35', navy2: '#1A2E4A', navy3: '#162440',
  gold: '#C9973A', gold2: '#C9B98A', gold3: '#F0E6CC',
  cream: '#FAFAF6', border: '#D8D0BA',
  ink: '#0F1D35', muted: '#6B7A8D', subtle: '#A8B4C0',
  green: '#2D7A4F', greenBg: '#E8F5EE',
}

const fmt = n => 'R' + Math.round(n).toLocaleString('en-ZA')
const fmtM = n => {
  const abs = Math.abs(n)
  const s = n < 0 ? '-' : ''
  if (abs >= 1e6) return s + 'R' + (abs / 1e6).toFixed(1) + 'M'
  if (abs >= 1e3) return s + 'R' + Math.round(abs / 1000) + 'k'
  return s + 'R' + Math.round(abs)
}

function Slider({ label, valueKey, min, max, step, display }) {
  const { values, set } = useModel()
  const v = values[valueKey]
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 10, color: C.subtle, marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="range" min={min} max={max} step={step} value={v}
          onChange={e => set(valueKey, parseFloat(e.target.value))}
          style={{ flex: 1, height: 3, accentColor: C.gold, cursor: 'pointer' }}
        />
        <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', minWidth: 58, textAlign: 'right' }}>
          {display(v)}
        </div>
      </div>
    </div>
  )
}

export default function ROIModel() {
  const { values, reset } = useModel()
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const calc = useMemo(() => {
    const { items, itemval, gap, platform, silva, monthly, vas, dsplit, rate } = values
    const gapF = gap / 100, dsplitF = dsplit / 100, rateF = rate / 100
    const discShare = vas * dsplitF
    const silvaCovered = silva <= vas
    const annualCost = platform * 12 + silva * items * 12
    const premiumUplift = itemval * gapF * items * rateF
    const annualVasDisc = discShare * items * 12
    const netRoi = premiumUplift + annualVasDisc - annualCost
    const roi1 = premiumUplift + annualVasDisc - (annualCost + items * values.dig)
    const months = Array.from({ length: 24 }, (_, i) => i + 1)
    const digArr = months.map(m => (Math.min(m * monthly, items) - Math.min((m - 1) * monthly, items)) * values.dig)
    const revalArr = months.map(m => Math.min(m * monthly, items) * silva)
    const platArr = months.map(() => platform)
    return { discShare, silvaCovered, annualCost, premiumUplift, annualVasDisc, netRoi, roi1, months, digArr, revalArr, platArr }
  }, [values])

  useEffect(() => {
    if (!chartRef.current) return
    if (chartInstance.current) chartInstance.current.destroy()
    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: calc.months.map(m => 'M' + m),
        datasets: [
          { label: 'Digitisation', data: calc.digArr, backgroundColor: C.gold, stack: 's' },
          { label: 'Revaluation', data: calc.revalArr, backgroundColor: C.navy2, stack: 's' },
          { label: 'Platform', data: calc.platArr, backgroundColor: C.subtle, stack: 's' },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ' ' + ctx.dataset.label + ': R' + Math.round(ctx.raw).toLocaleString('en-ZA') } }
        },
        scales: {
          x: { stacked: true, grid: { display: false }, ticks: { font: { size: 9 }, color: C.muted, maxRotation: 0, autoSkip: true, maxTicksLimit: 12 } },
          y: { stacked: true, grid: { color: '#F0EDE8' }, ticks: { font: { size: 9 }, color: C.muted, callback: v => v >= 1e6 ? 'R' + (v / 1e6).toFixed(1) + 'M' : v >= 1e3 ? 'R' + (v / 1000) + 'k' : 'R' + v } }
        }
      }
    })
    return () => { chartInstance.current?.destroy() }
  }, [values])

  const { annualCost, premiumUplift, annualVasDisc, netRoi, silvaCovered, discShare } = calc
  const maxBar = Math.max(premiumUplift, annualVasDisc, values.platform * 12, values.silva * values.items * 12)
  const bars = [
    { name: 'Premium uplift (annual)', val: premiumUplift },
    { name: 'VAS revenue — Discovery share', val: annualVasDisc },
    { name: 'SILVA platform fee (annual)', val: -(values.platform * 12) },
    { name: 'SILVA revaluation fee (annual)', val: -(values.silva * values.items * 12) },
  ]

  const sbLabel = txt => (
    <div style={{ fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 12, paddingBottom: 6, borderBottom: `0.5px solid ${C.navy2}` }}>{txt}</div>
  )

  return (
    <div style={{ width: '100%', background: C.cream, fontFamily: "'Poppins', system-ui, sans-serif", fontSize: 13, color: C.ink, overflowY: 'auto', height: 'calc(100vh - 52px)' }}>

      {/* Top bar */}
      <div style={{ background: C.navy, padding: '16px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${C.gold}` }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 500, color: '#fff', letterSpacing: '-.01em' }}>SILVA × Discovery — ROI Model</div>
          <div style={{ fontSize: 11, color: C.gold2 }}>Adjust assumptions. See the business case update in real time.</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Confidential', 'March 2026'].map(t => (
            <div key={t} style={{ background: C.navy2, border: `0.5px solid ${C.gold2}`, color: C.gold2, fontSize: 10, padding: '4px 10px', letterSpacing: '.08em', textTransform: 'uppercase' }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }}>

        {/* Sidebar */}
        <div style={{ background: C.navy, padding: 20, display: 'flex', flexDirection: 'column', borderRight: `1px solid ${C.navy2}` }}>

          <div style={{ marginBottom: 20 }}>
            {sbLabel('Portfolio')}
            <Slider label="Total items in book" valueKey="items" min={10000} max={300000} step={1000} display={v => Math.round(v).toLocaleString('en-ZA')} />
            <Slider label="Avg premium per item / mo (R)" valueKey="premium" min={50} max={500} step={5} display={v => 'R' + v} />
            <Slider label="Avg declared item value (R)" valueKey="itemval" min={1000} max={30000} step={500} display={v => 'R' + parseInt(v).toLocaleString('en-ZA')} />
            <Slider label="Underinsurance gap" valueKey="gap" min={10} max={70} step={5} display={v => v + '%'} />
          </div>

          <div style={{ marginBottom: 20 }}>
            {sbLabel('SILVA Fees')}
            <Slider label="Platform fee / mo (R)" valueKey="platform" min={20000} max={100000} step={5000} display={v => 'R' + parseInt(v).toLocaleString('en-ZA')} />
            <Slider label="Digitisation fee / item (R)" valueKey="dig" min={15} max={50} step={1} display={v => 'R' + v} />
            <Slider label="SILVA revaluation share / item / mo (R)" valueKey="silva" min={1} max={8} step={0.5} display={v => 'R' + parseFloat(v).toFixed(2)} />
            <Slider label="Items digitised / month" valueKey="monthly" min={1000} max={30000} step={1000} display={v => parseInt(v).toLocaleString('en-ZA')} />
          </div>

          <div style={{ marginBottom: 20 }}>
            {sbLabel('VAS Pass-through')}
            <Slider label="Gross VAS fee Discovery charges (R)" valueKey="vas" min={3} max={15} step={0.5} display={v => 'R' + parseFloat(v).toFixed(2)} />
            <Slider label="Discovery's share of VAS" valueKey="dsplit" min={50} max={80} step={5} display={v => v + '%'} />
            <Slider label="Insurance rate (premium / value)" valueKey="rate" min={1} max={5} step={0.1} display={v => parseFloat(v).toFixed(1) + '%'} />
          </div>

          <button
            onClick={reset}
            style={{ width: '100%', marginTop: 4, padding: 8, background: 'transparent', border: `0.5px solid ${C.navy2}`, color: C.subtle, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseOver={e => { e.target.style.borderColor = C.gold2; e.target.style.color = C.gold2 }}
            onMouseOut={e => { e.target.style.borderColor = C.navy2; e.target.style.color = C.subtle }}
          >
            Reset to defaults
          </button>
        </div>

        {/* Main */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {[
              { label: 'SILVA annual cost', val: fmtM(annualCost), color: C.ink, sub: 'Platform + revaluation' },
              { label: 'Premium uplift / yr', val: fmtM(premiumUplift), color: C.green, sub: 'From corrected values' },
              { label: 'VAS revenue to Discovery', val: fmtM(annualVasDisc), color: C.gold, sub: 'Full book, annual' },
              { label: 'Net ROI (year 2+)', val: fmtM(netRoi), color: netRoi >= 0 ? C.green : '#C0392B', sub: 'Uplift + VAS − cost' },
            ].map(k => (
              <div key={k.label} style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: '14px 16px' }}>
                <div style={{ fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: C.muted, marginBottom: 6 }}>{k.label}</div>
                <div style={{ fontSize: 22, fontWeight: 300, color: k.color, lineHeight: 1, letterSpacing: '-.02em' }}>{k.val}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 14, paddingBottom: 8, borderBottom: `0.5px solid ${C.border}` }}>Monthly revenue build — first 24 months</div>
              <div style={{ position: 'relative', width: '100%', height: 180 }}>
                <canvas ref={chartRef} />
              </div>
            </div>
            <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 14, paddingBottom: 8, borderBottom: `0.5px solid ${C.border}` }}>Where the value comes from</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                {bars.map(b => (
                  <div key={b.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                      <span style={{ fontSize: 10, color: C.muted }}>{b.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 500, color: b.val > 0 ? C.green : C.gold }}>{b.val > 0 ? '+' : ''}{fmtM(b.val)}</span>
                    </div>
                    <div style={{ height: 6, background: '#F0EDE8', width: '100%' }}>
                      <div style={{ height: 6, background: b.val > 0 ? C.green : C.gold, width: maxBar > 0 ? Math.round(Math.abs(b.val) / maxBar * 100) + '%' : '0%', transition: 'width .4s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VAS flow + year table */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 14, paddingBottom: 8, borderBottom: `0.5px solid ${C.border}` }}>VAS pass-through — how it flows</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', alignItems: 'center' }}>
                {[
                  { val: fmt(values.premium), label: 'Customer premium', color: C.ink },
                  null,
                  { val: 'R' + parseFloat(values.vas).toFixed(2), label: 'VAS charged', color: C.ink },
                  null,
                  { val: 'R' + parseFloat(values.silva).toFixed(2), label: 'SILVA receives', color: C.gold },
                  null,
                  { val: 'R' + (values.vas * (values.dsplit / 100)).toFixed(2), label: 'Discovery retains', color: C.subtle },
                ].map((n, i) => n === null
                  ? <div key={i} style={{ fontSize: 16, color: C.gold2, textAlign: 'center', padding: '0 2px' }}>›</div>
                  : <div key={i} style={{ textAlign: 'center', padding: '10px 4px' }}>
                      <div style={{ fontSize: 18, fontWeight: 300, color: n.color, lineHeight: 1, marginBottom: 2 }}>{n.val}</div>
                      <div style={{ fontSize: 9, color: C.muted, textTransform: 'uppercase', letterSpacing: '.1em' }}>{n.label}</div>
                    </div>
                )}
              </div>
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: `0.5px solid ${C.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: C.greenBg, padding: '10px 12px' }}>
                  <div style={{ fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: C.green, marginBottom: 3 }}>Discovery VAS margin</div>
                  <div style={{ fontSize: 18, fontWeight: 300, color: C.green }}>R{discShare.toFixed(2)}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{values.dsplit}% of gross</div>
                </div>
                <div style={{ background: C.gold3, padding: '10px 12px' }}>
                  <div style={{ fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: '#8A5A10', marginBottom: 3 }}>SILVA fully covered by VAS</div>
                  <div style={{ fontSize: 18, fontWeight: 300, color: C.gold }}>{silvaCovered ? 'Yes' : 'Partial'}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{silvaCovered ? 'Net cost to Discovery: R0' : `Discovery absorbs R${(values.silva - values.vas).toFixed(2)}/item`}</div>
                </div>
              </div>
            </div>

            <div style={{ background: '#fff', border: `0.5px solid ${C.border}`, padding: 16 }}>
              <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: C.gold, fontWeight: 500, marginBottom: 14, paddingBottom: 8, borderBottom: `0.5px solid ${C.border}` }}>Year-by-year summary</div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>{['Year', 'SILVA cost', 'Premium uplift', 'VAS revenue', 'Net gain'].map(h => (
                    <th key={h} style={{ fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: C.subtle, fontWeight: 400, padding: '6px 10px', textAlign: h === 'Year' ? 'left' : 'right', borderBottom: `0.5px solid ${C.border}` }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map(yr => {
                    const digCost = yr === 1 ? values.items * values.dig : 0
                    const yrCost = annualCost + digCost
                    const yrNet = premiumUplift + annualVasDisc - yrCost
                    return (
                      <tr key={yr}>
                        <td style={{ padding: '8px 10px', fontSize: 11, borderBottom: `0.5px solid #F0EDE8` }}>Year {yr}</td>
                        <td style={{ padding: '8px 10px', fontSize: 11, fontWeight: 500, textAlign: 'right', color: C.gold, borderBottom: `0.5px solid #F0EDE8` }}>{fmtM(yrCost)}</td>
                        <td style={{ padding: '8px 10px', fontSize: 11, fontWeight: 500, textAlign: 'right', color: C.green, borderBottom: `0.5px solid #F0EDE8` }}>{fmtM(premiumUplift)}</td>
                        <td style={{ padding: '8px 10px', fontSize: 11, fontWeight: 500, textAlign: 'right', color: C.green, borderBottom: `0.5px solid #F0EDE8` }}>{fmtM(annualVasDisc)}</td>
                        <td style={{ padding: '8px 10px', fontSize: 11, fontWeight: 500, textAlign: 'right', color: yrNet > 0 ? C.green : '#C0392B', borderBottom: `0.5px solid #F0EDE8` }}>{yrNet > 0 ? '+' : ''}{fmtM(yrNet)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verdict */}
          <div style={{ background: C.navy, padding: '16px 20px', display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: C.gold, whiteSpace: 'nowrap' }}>Bottom line</div>
            <div style={{ fontSize: 11, color: '#C8D4E0', lineHeight: 1.6 }}>
              Discovery spends <strong style={{ color: '#fff' }}>{fmtM(annualCost + values.items * values.dig)}</strong> in year one (including digitisation).{' '}
              Premium correction recovers <strong style={{ color: '#fff' }}>{fmtM(premiumUplift)}</strong> annually.{' '}
              VAS pass-through adds <strong style={{ color: '#fff' }}>{fmtM(annualVasDisc)}</strong> to Discovery per year —{' '}
              {silvaCovered ? 'covering SILVA\'s revaluation fee entirely.' : 'partially offsetting SILVA\'s fee.'}{' '}
              Year-two net gain: <strong style={{ color: '#fff' }}>{fmtM(netRoi)}</strong>.
            </div>
          </div>

        </div>
      </div>
      <div style={{ height: 3, background: C.gold }} />
    </div>
  )
}
