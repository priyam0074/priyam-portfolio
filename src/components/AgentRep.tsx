'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { DISCOVERY_STEP_MS, FLOW_STEPS, PROVIDERS } from '@/data/agentrep'
import { PROFILE } from '@/data/profile'
import { useOnceInView } from '@/hooks/useOnceInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ProviderIcon } from './ProviderIcon'
import { Reveal } from './Reveal'

const ALL_FOUND = PROVIDERS.length
const APPROVE_STEP = 3
const EXECUTE_STEP = 4

const STATUS = {
  discovering: 'Discovering sites that can do part of the goal…',
  ready: 'Plan ready. Waiting for your approval.',
  approved: 'You approved it, so the sites can now book.',
} as const

function statusText(found: number, approved: boolean): string {
  if (approved) return STATUS.approved
  return found < ALL_FOUND ? STATUS.discovering : STATUS.ready
}

function activeFlowStep(found: number, approved: boolean): number {
  if (approved) return EXECUTE_STEP
  return found >= ALL_FOUND ? APPROVE_STEP : Math.min(found, 2)
}

export function AgentRep() {
  const reduced = useReducedMotion()
  const [found, setFound] = useState(ALL_FOUND)
  const [approved, setApproved] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const replay = useCallback(() => {
    clearTimers()
    setApproved(false)
    if (reduced) {
      setFound(ALL_FOUND)
      return
    }
    setFound(0)
    PROVIDERS.forEach((_, index) => {
      timers.current.push(setTimeout(() => setFound(index + 1), (index + 1) * DISCOVERY_STEP_MS))
    })
  }, [clearTimers, reduced])

  useEffect(() => clearTimers, [clearTimers])

  const ref = useOnceInView<HTMLElement>(replay, { threshold: 0.35, disabled: reduced })
  const flowStep = activeFlowStep(found, approved)

  return (
    <section className="band ar-band" id="agentrep" ref={ref}>
      <div className="wrap">
        <div className="ar">
          <Reveal>
            <span className="tag">WebMCP Challenge · Sep 2026</span>
            <h2>AgentRep: your agent represents you on the web</h2>
            <p className="lede mute">
              Agents act on one site at a time, with no standard way to find out what a site can do. AgentRep
              discovers the sites that can actually do part of a goal, composes a plan from their WebMCP tools, and
              waits for you to approve anything irreversible.
            </p>
            <div className="flow">
              {FLOW_STEPS.map((step, index) => (
                <span key={step} className={index === flowStep ? 'on' : undefined}>
                  {step}
                </span>
              ))}
            </div>
            <p className="mute">
              AgentRep never plans and never books: the agent plans, the sites book. Five Next.js apps share one
              TypeScript contract, so a breaking change fails at compile time, not mid-run.
            </p>
            <div className="cta">
              <a className="btn pri" href="https://www.youtube.com/watch?v=GRTXz-Z_GM4">
                ▶ Watch the demo
              </a>
              <a className="btn" href="https://agentrep-app.vercel.app/">
                Try it live
              </a>
              <a className="btn" href={`${PROFILE.githubUrl}/agentrep`}>
                Code
              </a>
            </div>
            <p className="mute" style={{ fontSize: 14, marginTop: 12 }}>
              The live demo needs Chrome with WebMCP testing enabled.
            </p>
          </Reveal>
          <Reveal className="board" delay={2} role="group" aria-label="AgentRep plan board">
            <div className="lab">Goal: plan a children&apos;s birthday party</div>
            <div className="provs">
              {PROVIDERS.map((provider, index) => {
                const isFound = index < found
                return (
                  <div key={provider.name} className={`prov${isFound ? ' found' : ''}`}>
                    <ProviderIcon kind={provider.kind} />
                    <div>
                      <b>{provider.name}</b>
                      <code>{isFound ? `${provider.tool}()` : 'undiscovered'}</code>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="slots">
              {PROVIDERS.map((provider, index) => {
                const isFound = index < found
                return (
                  <div key={provider.name} className={`slot${isFound ? ' fill' : ''}`}>
                    <b>{provider.kind}</b>
                    <span className="who">{isFound ? provider.name : 'Waiting for a provider'}</span>
                    <span className="st">{isFound ? 'FILLED' : 'SLOT_EMPTY'}</span>
                  </div>
                )
              })}
              <div className="slot gap">
                <b>Entertainment</b>
                <span className="who">No site offers this yet</span>
                <span className="st">GAP</span>
              </div>
            </div>
            <div className="gate">
              <span aria-live="polite">{statusText(found, approved)}</span>
              <button type="button" disabled={approved} onClick={() => setApproved(true)}>
                {approved ? 'Approved ✓' : 'Approve booking'}
              </button>
            </div>
            <button className="replay" type="button" onClick={replay}>
              Replay discovery
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
