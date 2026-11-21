import { CASES } from '@/data/cases'
import { CaseIllustration } from './CaseIllustration'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function Work() {
  return (
    <section className="band" id="work" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHeader lead="Selected" accent="work">
          Most of my work sits inside proprietary products, so each case covers the problem, what I built and what
          changed.
        </SectionHeader>
        <div className="bento">
          {CASES.map((c, index) => (
            <Reveal as="article" key={c.kind} className={`case ${c.span} c-${c.kind}`} delay={index % 2 ? 1 : undefined}>
              <CaseIllustration kind={c.kind} />
              <div className="in-c">
                <div className="when">{c.when}</div>
                <h3>{c.title}</h3>
                <p>
                  <b>Problem.</b> {c.problem}
                </p>
                <p>
                  <b>Built.</b> {c.built}
                </p>
                <div className="out">
                  {c.outcomes.map((outcome) => (
                    <b key={outcome.label}>
                      <em>{outcome.value}</em> {outcome.label}
                    </b>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
