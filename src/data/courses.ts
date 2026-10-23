export interface Course {
  /** Stable IDs are also the existing public route slugs. Do not rename for display changes. */
  id: string;
  order: number;
  title: string;
  en: string;
  description: string;
  formula: string;
  topics: string;
  goal: string;
}

export const courses: readonly Course[] = [
  { id: 'mechanics', order: 1, title: '力学', en: 'MECHANICS', description: '从运动的描述，到运动的原因。理解力、能量与动量。', formula: 'F = ma', topics: '运动学 / 动力学 / 守恒定律', goal: '从可观察的运动出发，学习选择参考系、建立力学模型，并用运动定律与守恒观点分析问题。' },
  { id: 'thermodynamics', order: 2, title: '热学', en: 'THERMODYNAMICS', description: '在宏观规律与微观运动之间，认识温度、热与熵。', formula: 'ΔU = Q − W', topics: '热力学 / 气体 / 统计观点', goal: '联系宏观热现象与微观运动，理解热力学系统、状态变化及能量传递的基本规律。' },
  { id: 'electromagnetism', order: 3, title: '电磁学', en: 'ELECTROMAGNETISM', description: '看不见的场，连接电荷与电流，揭示电与磁的统一。', formula: '∇ · E = ρ/ε₀', topics: '电场 / 磁场 / 电磁感应', goal: '从电荷与电流的相互作用认识场，建立电场、磁场与电磁感应之间的联系。' },
  { id: 'optics', order: 4, title: '光学', en: 'OPTICS', description: '沿着光的路径，探索成像规律与波动的精巧结构。', formula: 'n₁ sin θ₁ = n₂ sin θ₂', topics: '几何光学 / 波动光学', goal: '根据现象选择光线或波动模型，理解成像、干涉、衍射与偏振的基本问题。' },
  { id: 'atomic-physics', order: 5, title: '原子物理学', en: 'ATOMIC PHYSICS', description: '从原子的结构与光谱出发，探索微观世界的量子规律。', formula: 'ΔE = hν', topics: '原子结构 / 原子光谱 / 量子规律', goal: '以原子结构与光谱实验为线索，理解微观模型及其所揭示的量子规律。' },
];

export const orderedCourses = [...courses].sort((a, b) => a.order - b.order);
export const getCourse = (id?: string) => courses.find(course => course.id === id);
