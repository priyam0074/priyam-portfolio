import Image from 'next/image'
import { PROFILE } from '@/data/profile'
import type { PaperSize } from '@/lib/cvFiles'
import { DownloadCv } from './DownloadCv'
import { Reveal } from './Reveal'

type ContactProps = {
  heading: string
  lede: string
  paper: PaperSize
}

export function Contact({ heading, lede, paper }: ContactProps) {
  return (
    <div className="foot-band" id="contact">
      <Reveal as="footer">
        <div className="foot">
          <div>
            <h2>{heading}</h2>
            <p className="lede">{lede}</p>
            <div className="cta">
              <a className="btn sun" href={`mailto:${PROFILE.email}`}>
                Email me
              </a>
              <DownloadCv paper={paper} className="btn ghost" openUp />
            </div>
          </div>
          <ul className="contact">
            <li className="who">
              <Image src={PROFILE.avatar} alt="" width={128} height={128} />
              <div>
                <b>{PROFILE.name}</b>
                <em>{PROFILE.role}</em>
              </div>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
            </li>
            <li>
              <span>LinkedIn</span>
              <a href={PROFILE.linkedinUrl}>{PROFILE.linkedinHandle}</a>
            </li>
            <li>
              <span>GitHub</span>
              <a href={PROFILE.githubUrl}>{PROFILE.githubHandle}</a>
            </li>
            <li>
              <span>Phone</span>
              {PROFILE.phone}
            </li>
          </ul>
        </div>
      </Reveal>
    </div>
  )
}
