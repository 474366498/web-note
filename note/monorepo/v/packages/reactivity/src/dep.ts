


type TrackedMarkers = {
  // wasTracked
  w: number,
  // newTracked
  n: number
}

export type Dep = Set<ReactiveEffect> & TrackedMarkers


export const createDep = (effects?: ReactvieEffect[]): Dep => {
  const dep = new Set<ReactiveEffect>(effects) as Dep
  dep.w = 0
  dep.n = 0
  return dep
}





