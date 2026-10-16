import { useMemo } from 'react'
import { Box, Columns, Cypress, GEO, Hills, Instanced, Water, mat } from './kit.jsx'
import { PODIUM } from './wonder.js'

// The Mausoleum of Mausolus: a high podium wrapped in painted friezes, a ring of 36 Ionic
// columns, a stepped pyramid roof of 24 steps, and a marble four-horse chariot on top, inside a
// walled courtyard with stone lions, above the harbor of Halicarnassus.

const STONE = '#f4f0e8'
const FRIEZE = '#3a6a9a'
const cx = (PODIUM.x0 + PODIUM.x1) / 2
const cz = (PODIUM.z0 + PODIUM.z1) / 2
const W = PODIUM.x1 - PODIUM.x0
const D = PODIUM.z1 - PODIUM.z0
const COL_H = 7.5
const ENT = PODIUM.h + COL_H + 0.3 // top of the colonnade
const STEPS = 24
const RISE = 0.45
const INSET = 0.45

const lin = (a, b, n) => Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1))
const ringPoints = (xs, zs) => [...xs.flatMap((x) => [[x, zs[0]], [x, zs[zs.length - 1]]]), ...zs.slice(1, -1).flatMap((z) => [[xs[0], z], [xs[xs.length - 1], z]])]

// a marble horse: body, neck, head, four legs. Faces +z.
function Horse({ x, z, y }) {
  const m = mat('#efe9dd')
  return (
    <group position={[x, y, z]}>
      <Box p={[0, 1.6, 0]} s={[0.7, 0.8, 2]} m={m} />
      <Box p={[0, 2.25, 1.0]} r={[-0.6, 0, 0]} s={[0.4, 1.1, 0.45]} m={m} />
      <Box p={[0, 2.75, 1.45]} r={[0.3, 0, 0]} s={[0.35, 0.4, 0.75]} m={m} />
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => <Box key={`${sx}${sz}`} p={[sx * 0.22, 0.6, sz * 0.75]} s={[0.18, 1.2, 0.18]} m={m} />),
      )}
    </group>
  )
}

function Quadriga({ y }) {
  const m = mat('#efe9dd')
  return (
    <group position={[cx, y, cz + 0.6]}>
      <Box p={[0, 0.3, 0]} s={[4.2, 0.6, 5]} m={m} />
      {[-1.5, -0.5, 0.5, 1.5].map((x) => (
        <Horse key={x} x={x} z={0.8} y={0.6} />
      ))}
      {/* the chariot, its wheels, and the driver */}
      <Box p={[0, 1.4, -1.5]} s={[1.6, 1.2, 1]} m={m} />
      {[-1, 1].map((s) => (
        <mesh key={s} geometry={GEO.cyl} material={m} position={[s * 0.9, 1.1, -1.5]} rotation={[0, 0, Math.PI / 2]} scale={[0.6, 0.12, 0.6]} />
      ))}
      <mesh geometry={GEO.cyl} material={m} position={[0, 2.6, -1.6]} scale={[0.35, 1.6, 0.35]} />
      <mesh geometry={GEO.sph} material={m} position={[0, 3.6, -1.6]} scale={0.3} />
    </group>
  )
}

function Lion({ x, z, r }) {
  const m = mat('#e2d8c4')
  return (
    <group position={[x, 0, z]} rotation={[0, r, 0]}>
      <Box p={[0, 0.5, 0]} s={[1.6, 1, 2.4]} c="#cfc4ae" />
      <Box p={[0, 1.6, -0.2]} s={[0.9, 1.1, 1.8]} m={m} />
      <mesh geometry={GEO.sph} material={m} position={[0, 2.3, 0.7]} scale={[0.55, 0.6, 0.55]} />
      <Box p={[0, 2.2, 1.05]} s={[0.4, 0.35, 0.4]} m={m} />
    </group>
  )
}

export default function Scene() {
  const steps = useMemo(
    () => Array.from({ length: STEPS }, (_, i) => ({ p: [cx, ENT + 1.2 + RISE * (i + 0.5), cz], s: [W - 2 * INSET * i, RISE, D - 2 * INSET * i] })),
    [],
  )
  // painted relief figures along the friezes (Greeks and Amazons, in silhouette)
  const figures = useMemo(() => {
    const out = []
    for (let x = PODIUM.x0 + 1; x < PODIUM.x1; x += 1.4) for (const z of [PODIUM.z1 + 0.06, PODIUM.z0 - 0.06]) out.push({ p: [x, PODIUM.h - 1.4, z], s: [0.5, 1.3, 0.05] })
    for (let z = PODIUM.z0 + 1; z < PODIUM.z1; z += 1.4) for (const x of [PODIUM.x0 - 0.06, PODIUM.x1 + 0.06]) out.push({ p: [x, PODIUM.h - 1.4, z], s: [0.05, 1.3, 0.5] })
    return out
  }, [])
  const top = ENT + 1.2 + RISE * STEPS
  return (
    <>
      <Hills color="#a7a07a" r={360} h={50} />
      {/* the harbor of Halicarnassus to the north */}
      <Water x0={-400} x1={400} z0={-500} z1={-110} y={0.04} color="#2f86b0" />
      {/* the paved courtyard and its walls, with a gateway on the south side */}
      <Box p={[0, 0.03, -8]} s={[70, 0.06, 76]} c="#a9a293" />
      <Box p={[-35.5, 1.25, -8]} s={[1, 2.5, 76]} c="#b8ae98" />
      <Box p={[35.5, 1.25, -8]} s={[1, 2.5, 76]} c="#b8ae98" />
      <Box p={[0, 1.25, -46.5]} s={[72, 2.5, 1]} c="#b8ae98" />
      {[-1, 1].map((s) => (
        <Box key={s} p={[s * 20.5, 1.25, 30.5]} s={[31, 2.5, 1]} c="#b8ae98" />
      ))}
      {[-1, 1].map((s) => (
        <Box key={s} p={[s * 5, 2, 30.5]} s={[1.2, 4, 1.5]} c="#e2d8c4" />
      ))}
      {/* the podium with its blue frieze */}
      <Box p={[cx, PODIUM.h / 2, cz]} s={[W, PODIUM.h, D]} c={STONE} />
      <Box p={[cx, 0.6, cz]} s={[W + 1.2, 1.2, D + 1.2]} c="#ddd5c4" />
      <Box p={[cx, PODIUM.h - 1.4, cz]} s={[W + 0.08, 1.6, D + 0.08]} c={FRIEZE} />
      <Instanced items={figures} geometry={GEO.box} material={mat('#f1e7d0')} />
      <Box p={[cx, PODIUM.h + 0.2, cz]} s={[W + 0.6, 0.4, D + 0.6]} c="#e2dbcc" />
      {/* the colonnade of 36 Ionic columns around an inner chamber */}
      <Columns points={ringPoints(lin(PODIUM.x0 + 1.5, PODIUM.x1 - 1.5, 9), lin(PODIUM.z0 + 1.5, PODIUM.z1 - 1.5, 11))} y0={PODIUM.h + 0.4} h={COL_H} r={0.42} color="#f2ede3" order="ionic" />
      <Box p={[cx, PODIUM.h + 0.4 + COL_H / 2, cz]} s={[W - 6, COL_H, D - 6]} c="#e6dfd0" />
      <Box p={[cx, ENT + 0.6, cz]} s={[W + 0.4, 1.2, D + 0.4]} c={STONE} />
      <Box p={[cx, ENT + 0.5, cz]} s={[W + 0.45, 0.4, D + 0.45]} c={FRIEZE} />
      {/* the stepped pyramid roof, and the chariot on top */}
      <Instanced items={steps} geometry={GEO.box} material={mat('#e8e1d2')} />
      <Quadriga y={top} />
      {/* stone lions guarding the tomb */}
      {[-1, 1].flatMap((s) => [-16, -6, 4].map((z) => <Lion key={`${s}${z}`} x={s * 16.5} z={z - 4} r={s > 0 ? -Math.PI / 2 : Math.PI / 2} />))}
      {Array.from({ length: 10 }, (_, i) => (
        <Cypress key={i} x={(i % 2 ? 1 : -1) * (30 - (i % 3))} z={-40 + i * 7} h={8} />
      ))}
    </>
  )
}
