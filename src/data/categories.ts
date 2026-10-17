export const categories = [
  { id:'mechanics', n:'01', title:'力学', en:'MECHANICS', formula:'F = ma', text:'从运动的描述，到运动的原因。理解力、能量与动量。', tags:'运动学 / 动力学 / 守恒定律' },
  { id:'electromagnetism', n:'02', title:'电磁学', en:'ELECTROMAGNETISM', formula:'∇ · E = ρ/ε₀', text:'看不见的场，连接电荷与电流，揭示电与磁的统一。', tags:'电场 / 磁场 / 电磁感应' },
  { id:'thermodynamics', n:'03', title:'热学', en:'THERMODYNAMICS', formula:'ΔU = Q − W', text:'在宏观规律与微观运动之间，认识温度、热与熵。', tags:'热力学 / 气体 / 统计观点' },
  { id:'optics', n:'04', title:'光学', en:'OPTICS', formula:'n₁ sin θ₁ = n₂ sin θ₂', text:'沿着光的路径，探索成像规律与波动的精巧结构。', tags:'几何光学 / 波动光学' },
  { id:'atomic-physics', n:'05', title:'原子物理学', en:'ATOMIC PHYSICS', formula:'ΔE = hν', text:'从原子的结构与光谱出发，探索微观世界的量子规律。', tags:'原子结构 / 原子光谱 / 量子规律' },
] as const;
