---
title: 卢瑟福散射练习
description: 用三道题复习散射角、微分截面和实验计数。
prev: false
next: false
---

[返回原子物理第一章](../)

## 散射角与瞄准距离

设同种入射粒子以相同动能射向固定靶核，服从排斥库仑模型。分别观察到 $60^\circ$ 和 $120^\circ$ 的散射角。两次入射的瞄准距离之比是多少？

<details class="lecture-reader-outline">
<summary>查看解答</summary>

固定动能与电荷时，$b=\kappa\cot(\theta/2)/(2E)$。所以 $b_{60}/b_{120}=\cot30^\circ/\cot60^\circ=3$。角度越大，对应的瞄准距离越小。

[复习散射角关系](../section-03/#atomic.ch01.coulomb-deflection)

</details>

## 比较微分截面

同一束流和靶材下，比较 $60^\circ$ 与 $120^\circ$ 两处的微分散射截面。若两只探测器的接受立体角都足够小且相同，探测效率也相同，预期计数比是多少？

<details class="lecture-reader-outline">
<summary>查看解答</summary>

微分截面与 $\sin^{-4}(\theta/2)$ 成正比，所以截面比为 $[\sin60^\circ/\sin30^\circ]^4=9$。在接受角域内微分截面近似不变，且已扣除背景的条件下，预期计数比也是 $9:1$。

[复习微分散射截面](../section-03/#atomic.ch01.differential-cross-section)

</details>

## 从截面估算探测计数

有 $10^8$ 个粒子射入薄箔有效靶区，靶核面密度为 $2.0\times10^{22}\,\mathrm{m}^{-2}$。探测器接受立体角为 $0.010\,\mathrm{sr}$，该角域内的微分截面近似为 $5.0\times10^{-27}\,\mathrm{m^2\,sr^{-1}}$。探测效率为 $80\%$。忽略背景和多次散射，预期记录多少个粒子？

<details class="lecture-reader-outline">
<summary>查看解答</summary>

进入探测器的散射概率近似为靶核面密度、微分截面和接受立体角的乘积，即 $1.0\times10^{-6}$。乘以入射粒子数得到 $100$ 个，再乘探测效率，预期记录 **80 个**。

[复习薄箔概率与有限角域计数](../section-03/#atomic.ch01.detector-counts)

</details>
