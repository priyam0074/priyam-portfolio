import { EXPERIENCE, SKILL_GROUPS } from '@/data/experience'
import { Reveal } from './Reveal'

export function Experience() {
  return (
    <section className="band" id="experience">
      <div className="wrap">
        <div className="xp">
          <Reveal>
            <h2>Experience</h2>
            <ol className="tl">
              {EXPERIENCE.map((role) => (
                <li key={role.period}>
                  <time>{role.period}</time>
                  <div>
                    <b>{role.title}</b>
                    <p>{role.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={1}>
            <h2>Toolkit</h2>
            <div className="sk">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title}>
                  <b>{group.title}</b>
                  <div>
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="edu">
              <b>B.Tech, Information Technology</b>
              <br />
              Vellore Institute of Technology, 2011–2015
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
