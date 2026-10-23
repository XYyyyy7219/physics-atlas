---
title: "卢瑟福散射公式"
description: "计算一次偏转，必须先知道哪些入射条件？ 怎样不先求完整轨道，就计算一次相遇造成的偏转？ 靶核也会运动，刚得到的库仑偏转关系还能使用吗？ 实验通常不能逐粒子选定$b$，如何由$b(\\theta)$预测角分布？ 知道微分截面，如何预测实际收集到的粒子数？ 反冲修正后，为什么不能只换入$E_C$就把结果当作实验室角分布？"
lecture: {"id":"atomic-ch01-section03","chapter":"atomic-ch01","order":3,"nodes":[{"id":"atomic.ch01.scattering-geometry","code":"N07","title":"库仑散射模型与散射几何","label":"物理模型与几何概念","kind":"concept","summary":"计算一次偏转，必须先知道哪些入射条件？","requires":["atomic.ch01.nuclear-evidence"],"quickReview":"- **核心关系**：$U=\\kappa/r$，$\\mathbf F=\\kappa\\mathbf e_r/r^2$；固定核正碰有$r_{\\min}=\\kappa/E$。\n- **适用条件**：非相对论、弹性、有效点电荷库仑作用；先采用固定核及忽略电子的模型。\n- **常见误区**：把$b$当作实际最近距离；把大角散射画成撞击硬核；把非正碰最近点的速度也取零。"},{"id":"atomic.ch01.coulomb-deflection","code":"N08","title":"从库仑力到瞄准距离—散射角关系","label":"理论推导与物理解释","kind":"method","summary":"怎样不先求完整轨道，就计算一次相遇造成的偏转？","requires":["atomic.ch01.scattering-geometry"],"quickReview":"- **核心关系**：$L=mvb$，$|\\Delta\\mathbf v|=2v\\sin(\\theta/2)$，$b=\\kappa\\cot(\\theta/2)/(2E)$。\n- **适用条件**：固定核的排斥库仑模型；完整半角关系不要求小角，但小角展开另有条件。\n- **常见误区**：把$\\varphi$与$\\theta$混同；把径向单位矢量当常量积分；把两端等速误解为全程恒速；漏掉$a/2$。"},{"id":"atomic.ch01.center-of-mass-scattering","code":"N09","title":"靶核反冲与质心系能量","label":"模型修正与力学方法","kind":"method","summary":"靶核也会运动，刚得到的库仑偏转关系还能使用吗？","requires":["atomic.ch01.coulomb-deflection"],"quickReview":"- **核心关系**：$\\mu=mM/(m+M)$，$E_C=ME_L/(m+M)$，$b=\\kappa\\cot(\\theta_C/2)/(2E_C)$。\n- **适用条件**：非相对论两体弹性库仑模型，靶核初始在实验室静止；固定核近似还需要$m/M\\ll1$。\n- **常见误区**：初始静止等于始终不动；把$E_C$当作入射粒子单独的质心动能；反冲时仍把正碰最近点的实验室总动能取零。"},{"id":"atomic.ch01.differential-cross-section","code":"N10","title":"从入射环带到卢瑟福微分散射截面","label":"几何方法与理论推导","kind":"method","summary":"实验通常不能逐粒子选定$b$，如何由$b(\\theta)$预测角分布？","requires":["atomic.ch01.coulomb-deflection"],"quickReview":"- **核心关系**：$d\\sigma=2\\pi b|db|$，$d\\Omega=2\\pi\\sin\\theta\\,d\\theta$，$d\\sigma/d\\Omega=(\\kappa/4E)^2\\csc^4(\\theta/2)$。\n- **适用条件**：轴对称的单次中心力散射、均匀入射轨迹采样；此处角度与能量属于固定核模型。\n- **常见误区**：漏掉复合求导的$1/2$；漏取$|db/d\\theta|$；把微分截面等同于无量纲概率；额外重复乘入一个$2\\pi$。"},{"id":"atomic.ch01.detector-counts","code":"N11","title":"从单核截面到薄箔概率与有限角域计数","label":"实验接口与计算方法","kind":"method","summary":"知道微分截面，如何预测实际收集到的粒子数？","requires":["atomic.ch01.differential-cross-section"],"quickReview":"- **核心关系**：$dP=nt\\,d\\sigma$，$dN_{\\rm sc}=N_{\\rm in}nt(d\\sigma/d\\Omega)d\\Omega$；有限角域需要积分。\n- **适用条件**：均匀照射、已知有效靶区、正入射厚度；单次散射占主导且相关概率足够小；计数需处理效率和背景。\n- **常见误区**：截面就是概率；把某一角度的微分截面当作“所有大于该角度”的截面；比较不同靶材时只固定厚度而不检查$nt$；忽略接受立体角变化。"},{"id":"atomic.ch01.recoil-cross-section","code":"N12","title":"质心系截面怎样变成实验室系截面","label":"坐标系转换与进阶方法","kind":"method","summary":"反冲修正后，为什么不能只换入$E_C$就把结果当作实验室角分布？","requires":["atomic.ch01.center-of-mass-scattering","atomic.ch01.differential-cross-section"],"quickReview":"- **核心关系**：质心系使用$E_C,\\theta_C,d\\Omega_C$；实验室截面还须乘$|d\\Omega_C/d\\Omega_L|$。\n- **适用条件**：非相对论弹性两体散射、靶核初始静止；本节点显式闭式限定为$m<M$的单值分支。\n- **常见误区**：只把$E_L$换成$E_C$便当作实验室截面；用正切值忽略背散射象限；把重核近似理解为严格无反冲。"}]}
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 2
prev: false
next: false
editUrl: false
---

[上一节](../section-02/#atomic.ch01.nuclear-evidence)提出了核式结构：正电荷集中在很小的区域，少数充分接近中心的α粒子可能发生大角偏转。但“可能偏转很大”还不是定量理论。本节要回答：**一个给定入射轨迹会偏转多少？许多轨迹又怎样形成可测的散射角分布？**

**阅读建议：** 建议先学习散射模型、单次偏转、微分散射截面与实验计数的关系。若希望进一步理解靶核反冲及实验室系角分布的修正，可继续学习 N09 和 N12。

**本节对应教材**：杨福家《原子物理学》第五版第一章§3《卢瑟福散射公式》，印刷页12～19中§3的部分（PDF第24～31页）；第一章课件P42～68。教材先用角动量守恒和速度矢量积分推导库仑偏转关系，再说明反冲修正，随后从入射环带推导散射截面，最后给出实验室系表达式。下一节实际标题为§4《卢瑟福公式的实验验证》。

**阅读主线**：[模型与几何](#atomic.ch01.scattering-geometry) → [单次偏转关系](#atomic.ch01.coulomb-deflection) → [反冲与质心系](#atomic.ch01.center-of-mass-scattering) → [微分截面](#atomic.ch01.differential-cross-section) → [概率与计数](#atomic.ch01.detector-counts) → [截面的坐标系转换](#atomic.ch01.recoil-cross-section)。

**学习目标**：从库仑中心力建立单次散射的定量关系；区分瞄准距离与最近接距离；完成从入射面积到出射立体角的转换；区分截面、概率与计数；说明固定靶核近似和质心系修正的作用。

**先修知识**：[核式假说](../section-02/#atomic.ch01.nuclear-evidence)、[冲量与近似模型的边界](../section-02/#atomic.ch01.weak-scattering)、牛顿第二定律、能量与角动量守恒、矢量分量、微分和积分。

**符号约定**：

| 符号 | 含义与约定 |
|---|---|
| $Z_1e,\ Z_2e$ | 入射粒子和靶核的电荷；本节取同号正电荷，α粒子有$Z_1=2$ |
| $m,\ M$ | 入射粒子质量、靶核质量；$e>0$为基本电荷大小 |
| $\kappa=Z_1Z_2e^2/(4\pi\varepsilon_0)>0$ | 排斥库仑相互作用的系数，量纲为能量乘长度 |
| $E,\ v$ | 固定靶核模型中，远离靶核时的入射动能与速率，$E=mv^2/2$ |
| $a=\kappa/E$ | 沿用教材的库仑散射因子，具有长度量纲；后文反冲修正使用$a_C=\kappa/E_C$ |
| $b,\ r_{\min}$ | 瞄准距离、实际轨迹的最近接距离，二者一般不同 |
| $\theta$ | 固定靶核模型中的入射、出射速度夹角，范围为$0\leq\theta\leq\pi$ |
| $\theta_C,\theta_L;\ E_C,E_L$ | 分别为质心系和实验室系的散射角、入射能量；$E_C$是两粒子相对运动动能 |
| $n,\ t,\ N_{\rm in}$ | 靶核数密度、正入射时靶厚度、射到有效靶区的入射粒子数 |

本节只讨论非相对论、弹性、经典库仑散射。每个公式都以其所在模型为前提；这里建立的经典轨迹不能无条件推广到量子散射或所有原子尺度过程。

<section class="lecture-node" data-knowledge-content="atomic.ch01.scattering-geometry">

<a id="atomic.ch01.scattering-geometry"></a>

## N07｜库仑散射模型与散射几何

**类型**：物理模型与几何概念  
**核心问题**：计算一次偏转，必须先知道哪些入射条件？

**学习目标**：明确相互作用和近似，区分瞄准距离、瞬时距离、最近接距离和散射角。  
**前置知识**：[核式结构](../section-02/#atomic.ch01.nuclear-evidence)、动量、中心力、非相对论动能。  
**关键词**：碰撞参量、瞄准距离、最近接距离、中心力、单次散射。

### 把“核附近的强作用”写成可计算的模型

先把靶核放在原点，并在整个碰撞过程中视为固定。令$\mathbf r$从靶核指向入射粒子，$r=|\mathbf r|$，$\mathbf e_r=\mathbf r/r$。在有效点电荷近似下，

$$
U(r)=\frac{\kappa}{r},\qquad
\mathbf F(r)=-\frac{dU}{dr}\mathbf e_r
=\frac{\kappa}{r^2}\mathbf e_r.
$$

势能在无穷远取零。力沿远离核的方向，符合两正电荷排斥；$\kappa/r$具有能量量纲，$\kappa/r^2$具有力的量纲。

教材首先采用四个假定：一次显著的单核散射；只有库仑相互作用；忽略核外电子作用；靶核在相互作用中不动。前三项规定本次计算所保留的机制，第四项先把两体问题化为单粒子问题，稍后在[质心系节点](#atomic.ch01.center-of-mass-scattering)放宽。

对真实实验，还应检查入射速度是否非相对论、能量损失是否足够小、所取角区是否受多次散射明显影响，以及最接近核时是否仍可忽略核尺寸和其他相互作用。薄箔并不意味着粒子只经过一个原子，而是要使所研究的显著偏转主要由一次相遇决定。

### 哪个距离控制入射轨迹

设粒子从很远处射来，初始速率为$v$。把其尚未被偏转的入射直线无限延长，核到这条直线的垂直距离定义为**瞄准距离**$b$，也称碰撞参量。这个定义使用入射渐近直线，不要求粒子真的沿直线走到核旁。

与之不同，$r$是运动过程中核与粒子的瞬时距离，$r_{\min}$是实际弯曲轨迹上最小的$r$。斥力会使粒子避开中心，所以不能把$b$直接称为实际最近接距离。

散射角$\theta$由远处的速度方向定义：

$$
\cos\theta=\frac{\mathbf v_i\cdot\mathbf v_f}
{|\mathbf v_i|\,|\mathbf v_f|}.
$$

它比较的是入射与出射方向，不是某一时刻位置矢量的极角。背散射对应$\theta>\pi/2$，正碰的完全返回对应$\theta=\pi$。

> **配图需求｜散射几何图，待绘制**
>
> 参考教材图3.1的布局：核在原点，粒子从右上方沿水平线向左入射。画出入射直线及其延长线、弯曲轨迹和出射渐近线。用垂线标$b$，从核到轨迹最近点标$r_{\min}$，另画瞬时$\mathbf r$。散射角$\theta$须由“入射速度方向的平移线”与出射方向夹出；不要误标为两条位置射线间的夹角。图注明“示意，非按比例绘制”，不画成粒子碰撞硬球表面。

### 先用正碰检查模型的含义

当$b=0$时，粒子沿径向接近固定核，角动量为零。在最近点，粒子的全部速度瞬时为零，能量守恒给出

$$
E=\frac{\kappa}{r_{\min}},
\qquad r_{\min}=\frac{\kappa}{E}=a.
$$

返回可以由排斥势使粒子减速、停止、反向来实现，不需要碰到核的实体表面。但“最近点速度为零”限于这一固定核正碰；非正碰在最近点仍有切向速度。

> **补充推导｜非正碰时，为什么$r_{\min}\ne b$**
>
> 中心力保持角动量大小$L=mvb$。在最近点只有径向速度为零，切向动能为$L^2/(2mr_{\min}^2)$，所以
>
> $$
> E=\frac{L^2}{2mr_{\min}^2}+\frac{\kappa}{r_{\min}}
> =\frac{Eb^2}{r_{\min}^2}+\frac{\kappa}{r_{\min}}.
> $$
>
> 整理成$r_{\min}^2-ar_{\min}-b^2=0$，取正根：
>
> $$
> r_{\min}=\frac{a+\sqrt{a^2+4b^2}}{2}.
> $$
>
> 对排斥作用，它大于$b$；$b=0$时回到$r_{\min}=a$。这是为辨析教材图中距离所展开的教学推导，不是教材另列的编号公式。

### 快速回顾

- **核心关系**：$U=\kappa/r$，$\mathbf F=\kappa\mathbf e_r/r^2$；固定核正碰有$r_{\min}=\kappa/E$。
- **适用条件**：非相对论、弹性、有效点电荷库仑作用；先采用固定核及忽略电子的模型。
- **常见误区**：把$b$当作实际最近距离；把大角散射画成撞击硬核；把非正碰最近点的速度也取零。
- **检验理解**：为什么即使粒子始终没有碰到核表面，也能返回入射侧？
- **相关知识**：[上一节的弥散模型检验](../section-02/#atomic.ch01.weak-scattering)、[偏转关系](#atomic.ch01.coulomb-deflection)、[反冲修正](#atomic.ch01.center-of-mass-scattering)。`atomic.ch01.rutherford-validity`为后续已规划节点，正文待建立。

**课程来源**：教材§3，印刷页12～13、图3.1及其四项假定；课件P42～43。正碰及非正碰最近距离由该模型的能量、角动量守恒展开。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="atomic.ch01.scattering-geometry">加入我的讲义</button><button type="button" data-action="master-node" data-id="atomic.ch01.scattering-geometry">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="atomic.ch01.coulomb-deflection">

<a id="atomic.ch01.coulomb-deflection"></a>

## N08｜从库仑力到瞄准距离—散射角关系

**类型**：理论推导与物理解释  
**核心问题**：怎样不先求完整轨道，就计算一次相遇造成的偏转？

**学习目标**：用角动量守恒消去时间，正确积分方向变化的径向单位矢量，得到并检验$b(\theta)$。  
**前置知识**：[散射几何](#atomic.ch01.scattering-geometry)、矢量分量、能量与角动量守恒、定积分。  
**关键词**：速度变化、中心力、单位矢量积分、散射因子、极限检验。

### 为什么同时使用角动量和能量

要求出最终方向，需要知道力沿途积累造成的速度变化。直接计算$\int\mathbf F\,dt$似乎要求预先知道$r(t)$；中心力提供了另一条路线：角动量把$r^2$与极角变化率联系起来，恰好可以消去库仑力中的$r^{-2}$。

以下取$b>0$，采用与教材轨迹图相同的入射布局：$x$轴向右，$y$轴向上，粒子在$y=b$附近从右向左射来。因此$\mathbf v_i=-v\mathbf i$。位置极角$\varphi$从正$x$轴逆时针计量，轨迹的角动量沿正$z$轴。

### 第一步：把时间积分换成极角积分

由中心力矩为零，

$$
\frac{d\mathbf L}{dt}=\mathbf r\times\mathbf F=0,
\qquad L=mr^2\dot\varphi=mvb.
$$

牛顿第二定律为

$$
m\frac{d\mathbf v}{dt}
=\frac{\kappa}{r^2}\mathbf e_r.
$$

代入$dt=mr^2\,d\varphi/L$，得到

$$
d\mathbf v=\frac{\kappa}{L}\mathbf e_r\,d\varphi,
\qquad
\Delta\mathbf v=\frac{\kappa}{L}
\int\mathbf e_r\,d\varphi.
$$

距离因子消掉了，但$\mathbf e_r$仍随位置改变方向，不能把它当作常矢量移出积分。

### 第二步：先确定积分边界和速度变化

远处势能同为零，机械能守恒使入射与出射速率相等：

$$
E=\frac12m|\mathbf v_i|^2
=\frac12m|\mathbf v_f|^2=\frac12mv^2.
$$

这只保证两端速率相等；接近排斥中心时粒子会减速，沿轨迹的速率并非处处等于$v$。

按上述坐标，出射方向为

$$
\mathbf v_f=-v\cos\theta\,\mathbf i
+v\sin\theta\,\mathbf j.
$$

所以

$$
\begin{aligned}
\Delta\mathbf v
&=v(1-\cos\theta)\mathbf i+v\sin\theta\,\mathbf j\\
&=2v\sin\frac\theta2
\left(\sin\frac\theta2\,\mathbf i+\cos\frac\theta2\,\mathbf j\right).
\end{aligned}
$$

由此可见，速度变化量的大小为$2v\sin(\theta/2)$。这个关系没有采用小角近似。

入射端的位置矢量在无穷远趋向正$x$方向，故$\varphi_i=0$；出射端位置矢量与出射速度渐近同向，故$\varphi_f=\pi-\theta$。**位置极角扫过$\pi-\theta$，速度方向偏转$\theta$**，两个角不能混用。

> **配图需求｜两个矢量图，待绘制**
>
> 一图在同一起点画等长的$\mathbf v_i,\mathbf v_f$，再从$\mathbf v_i$端点指向$\mathbf v_f$端点画$\Delta\mathbf v$，标明夹角$\theta$。另一图按本节点的坐标画$\mathbf e_r=\cos\varphi\,\mathbf i+\sin\varphi\,\mathbf j$及两个极限方向。两图必须使用相容的坐标方向，不能把不同图中的箭头投影直接拼接。

### 第三步：用固定基矢完成积分

将径向单位矢量写成

$$
\mathbf e_r=\cos\varphi\,\mathbf i+\sin\varphi\,\mathbf j.
$$

分别积分两个分量：

$$
\begin{aligned}
\int_0^{\pi-\theta}\mathbf e_r\,d\varphi
&=[\sin\varphi]_0^{\pi-\theta}\mathbf i
+[-\cos\varphi]_0^{\pi-\theta}\mathbf j\\
&=\sin\theta\,\mathbf i+(1+\cos\theta)\mathbf j\\
&=2\cos\frac\theta2
\left(\sin\frac\theta2\,\mathbf i+\cos\frac\theta2\,\mathbf j\right).
\end{aligned}
$$

这个积分与$\Delta\mathbf v$具有同一方向，正好满足矢量方程。对$0<\theta<\pi$，比较共同单位矢量前的系数：

$$
2v\sin\frac\theta2
=\frac{2\kappa}{L}\cos\frac\theta2.
$$

再用$L=mvb$、$mv^2=2E$，可得

$$
\tan\frac\theta2=\frac{\kappa}{mv^2b}
=\frac{\kappa}{2Eb},
\qquad
\boxed{b=\frac{\kappa}{2E}\cot\frac\theta2
=\frac a2\cot\frac\theta2}.
$$

这对应教材式（3-1）、（3-8），其中教材定义的$a=\kappa/E$。$a$不是角动量，也不是$\kappa/(2E)$；散射因子的定义必须连同公式里的$1/2$一起使用。

### 结果告诉我们什么

固定$E,\kappa$，越小的$b$对应越大的$\theta$。这使上一节“少数充分接近中心的粒子发生大偏转”变成了定量映射。固定$b$时，增大入射能量使粒子更难偏转，增大核电荷则使偏转增强。

量纲上，$\kappa/E$是长度，余切无量纲，右侧与$b$一致。极限上：

- $b\to\infty$时，$\theta\to0$；在小角区$\theta\simeq\kappa/(Eb)$。
- $b\to0$时，$\theta\to\pi$，与正碰返回相符。这是从非正碰公式取极限；前面的$1/L$推导不能直接令$L=0$。
- $\theta=\pi/2$时，$b=a/2$，可以用来检查是否漏掉系数2。

沿用教材印刷页16的α—金参数，取$E=7.68\ \mathrm{MeV}$、$Z_1=2$、$Z_2=79$，使用$e^2/(4\pi\varepsilon_0)\approx1.44\ \mathrm{MeV\,fm}$，得到

$$
\frac a2=\frac{2\times79\times1.44}{2\times7.68}
\ \mathrm{fm}\approx14.8\ \mathrm{fm}.
$$

因此$b=10,\ 100,\ 1000\ \mathrm{fm}$分别给出约$112^\circ,\ 16.9^\circ,\ 1.70^\circ$，与教材表格一致。课件P49的$150^\circ$情形对应

$$
b\approx14.8\cot75^\circ\ \mathrm{fm}
\approx3.97\ \mathrm{fm}.
$$

这个很小的$b$依旧不是最近接距离；由前一节点的公式，后一情形的$r_{\min}$约为$30.1\ \mathrm{fm}$。这些是固定核模型的计算值，不是实验测得的每条入射轨迹。

> **课程材料辨析｜例题放射源名称**
>
> 教材印刷页16标注$^{214}\mathrm{Po}$（RaC′），课件P49写“镭C”；两处所用能量均为7.68 MeV。本稿的散射计算采用这一已核对的能量，不把课件名称差异当作已解决的历史同义关系。课件放射源名称待向授课资料核实。

### 快速回顾

- **核心关系**：$L=mvb$，$|\Delta\mathbf v|=2v\sin(\theta/2)$，$b=\kappa\cot(\theta/2)/(2E)$。
- **适用条件**：固定核的排斥库仑模型；完整半角关系不要求小角，但小角展开另有条件。
- **常见误区**：把$\varphi$与$\theta$混同；把径向单位矢量当常量积分；把两端等速误解为全程恒速；漏掉$a/2$。
- **检验理解**：保持瞄准距离不变，将入射能量加倍，$\tan(\theta/2)$怎样变化？
- **相关知识**：[模型与距离](#atomic.ch01.scattering-geometry)、[反冲与质心系](#atomic.ch01.center-of-mass-scattering)、[微分截面](#atomic.ch01.differential-cross-section)。

**课程来源**：教材§3，印刷页13～16、图3.1～3.2、式（3-1）～（3-9）及数值表；课件P44～49。分量积分和半角化简按教材路线展开，最近距离例值为教学计算。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="atomic.ch01.coulomb-deflection">加入我的讲义</button><button type="button" data-action="master-node" data-id="atomic.ch01.coulomb-deflection">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="atomic.ch01.center-of-mass-scattering">

<a id="atomic.ch01.center-of-mass-scattering"></a>

## N09｜靶核反冲与质心系能量

**类型**：模型修正与力学方法  
**核心问题**：靶核也会运动，刚得到的库仑偏转关系还能使用吗？

**学习目标**：建立折合质量与相对运动能量，分清初始静止、固定靶核和质心系的不同含义。  
**前置知识**：[单次偏转关系](#atomic.ch01.coulomb-deflection)、两粒子动量和动能、质心。  
**关键词**：反冲、折合质量、相对运动、质心系、实验室系。

### 先辨清“静止”是初始条件还是全过程假定

实验可以把靶核的初始热运动近似忽略，却不能因此认定它受力后仍不反冲。本节点把靶核当作可以自由反冲的质量$M$，初始时在实验室系静止，入射粒子初速度为$\mathbf v$。

记两粒子位置为$\mathbf r_1,\mathbf r_2$，相对位置$\mathbf r=\mathbf r_1-\mathbf r_2$。内力大小相等、方向相反，

$$
m\ddot{\mathbf r}_1=\mathbf F,\qquad
M\ddot{\mathbf r}_2=-\mathbf F.
$$

两式相减，并定义折合质量

$$
\mu=\frac{mM}{m+M},
$$

便有

$$
\ddot{\mathbf r}=\left(\frac1m+\frac1M\right)\mathbf F,
\qquad
\boxed{\mu\ddot{\mathbf r}=\frac{\kappa}{r^2}\mathbf e_r}.
$$

相对运动仍服从同一种中心力方程。因此不必重新推导全部积分，只需把单粒子质量换成$\mu$，并把角度和能量解释为相对运动所对应的质心系量。

### 哪一部分能量参与接近过程

质心速度为

$$
\mathbf V=\frac{m\mathbf v_1+M\mathbf v_2}{m+M}.
$$

把$\mathbf v_1=\mathbf V+M\dot{\mathbf r}/(m+M)$、$\mathbf v_2=\mathbf V-m\dot{\mathbf r}/(m+M)$代入总动能，交叉项相消：

$$
\frac12m v_1^2+\frac12M v_2^2
=\frac12(m+M)V^2+\frac12\mu|\dot{\mathbf r}|^2.
$$

无外力时，质心匀速运动，第一项不会转化为相互作用势能；改变的是相对运动部分。入射前靶核静止，故相对速率为$v$，

$$
E_L=\frac12mv^2,\qquad
E_C=\frac12\mu v^2
=\boxed{\frac{M}{m+M}E_L}.
$$

这里$E_C$是质心系中两粒子动能之和，不是只取入射粒子的质心动能。

库仑偏转关系据此成为

$$
\boxed{b=\frac{\kappa}{2E_C}\cot\frac{\theta_C}{2}},
\qquad a_C=\frac{\kappa}{E_C}.
$$

质心系中入射粒子的速度与相对速度平行，散射角也相同。这里的$b$是相对入射直线到相对坐标原点的距离，等于靶初始静止时定义的入射瞄准距离。

### 重核近似为什么好用，又不能用到哪里

当$m/M\ll1$时，$\mu\simeq m$、$E_C\simeq E_L$，质心运动缓慢，实验室散射角也接近质心散射角。用质量数作粗略质量比估算，α—金有$m/M\approx4/197$，因此$E_C/E_L\approx197/201\approx0.980$。这支持初步固定核计算，但不等于反冲严格为零。

尤其是正碰最近点：相对径向速度降为零时，两个粒子在实验室系仍共同以$\mathbf V$运动。可转化为势能的是$E_C$，故正碰的相对最近距离为$\kappa/E_C$，不是无条件采用$\kappa/E_L$。非正碰最近点还保留相对切向动能。

因此，涉及反冲的最近距离或能量转化问题，应先分离质心平动与相对运动，再使用能量守恒。

### 快速回顾

- **核心关系**：$\mu=mM/(m+M)$，$E_C=ME_L/(m+M)$，$b=\kappa\cot(\theta_C/2)/(2E_C)$。
- **适用条件**：非相对论两体弹性库仑模型，靶核初始在实验室静止；固定核近似还需要$m/M\ll1$。
- **常见误区**：初始静止等于始终不动；把$E_C$当作入射粒子单独的质心动能；反冲时仍把正碰最近点的实验室总动能取零。
- **检验理解**：若两粒子的相对速度为零，为什么它们在实验室系中的总动能仍可能不为零？
- **相关知识**：[固定核偏转](#atomic.ch01.coulomb-deflection)、[实验室系截面](#atomic.ch01.recoil-cross-section)。`atomic.ch01.light-target-deflection`为已规划、正文待建立的节点。

**课程来源**：教材§3，印刷页15～16，式（3-10）～（3-12）；相对运动方程与动能分解为对教材折合质量说明的展开。课件P42～48主要采用固定核推导，不将这里的完整反冲步骤冒称为课件原有推导。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="atomic.ch01.center-of-mass-scattering">加入我的讲义</button><button type="button" data-action="master-node" data-id="atomic.ch01.center-of-mass-scattering">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="atomic.ch01.differential-cross-section">

<a id="atomic.ch01.differential-cross-section"></a>

## N10｜从入射环带到卢瑟福微分散射截面

**类型**：几何方法与理论推导  
**核心问题**：实验通常不能逐粒子选定$b$，如何由$b(\theta)$预测角分布？

**学习目标**：建立环带面积与立体角的对应，正确求导并得到微分截面，区分有效面积与概率。  
**前置知识**：[瞄准距离—散射角关系](#atomic.ch01.coulomb-deflection)、球面面积、复合函数求导。  
**关键词**：环带、立体角、微分截面、角分布、正测度。

**模型切换说明：** 上一节点考虑了靶核反冲。本节点暂时回到 N08 的固定靶核近似，以突出散射几何与微分散射截面的核心推导；反冲对实验室系角分布的影响将在 N12 中讨论。

### 不追踪一条入射线，改数一组入射线

仍采用固定核模型。考虑垂直于入射方向的平面：瞄准距离在一个很窄范围内的入射轨迹，组成以核的投影为中心的环带。轴对称性使同一$b$的粒子具有相同的极散射角，但它们可沿不同的方位角射出。

若$\theta$增大，$b$减小。为统一符号，令出射区间为$[\theta,\theta+d\theta]$，其中$d\theta>0$；对应入射环带从$b(\theta+d\theta)$延伸至$b(\theta)$。其正面积为

$$
d\sigma=2\pi b\,|db|.
$$

这里将这一组入射轨迹对应的面积记为$d\sigma$。它是使粒子进入指定出射角域的**有效入射面积**，不是原子核的几何表面积。

### 出射方向的“宽度”怎样度量

方向是球面上的二维量，需要立体角。以核为球心作任意半径$s$的球面，极角$\theta$到$\theta+d\theta$之间、遍及全部方位的球面带面积为

$$
dS=(2\pi s\sin\theta)(s\,d\theta).
$$

因此

$$
d\Omega=\frac{dS}{s^2}
=2\pi\sin\theta\,d\theta.
$$

若只取一小段方位角$d\psi$，则为$d\Omega=\sin\theta\,d\theta\,d\psi$。这里$\psi$是绕入射轴的方位角，不是上一推导轨道平面内的位置极角$\varphi$。立体角的常用单位为球面度$\mathrm{sr}$。

> **配图需求｜环带与空心锥，待绘制**
>
> 左图画入射平面中半径为$b$、宽度为$|db|$的环带；右图画对应的散射空心锥和球面带，标出$\theta,d\theta,\psi$。在两图之间标“$b$增大时$\theta$减小”，并区分球面辅助半径$s$与粒子瞬时距离$r$。该图不能把全方位的球面带误当成一个小探测器的面积。

### 面积怎样分配给每单位立体角

微分散射截面定义为有效面积对出射立体角的密度：

$$
\frac{d\sigma}{d\Omega}
=\frac{b}{\sin\theta}\left|\frac{db}{d\theta}\right|.
$$

代入$b=(a/2)\cot(\theta/2)$。求导时要保留半角产生的因子：

$$
\frac{db}{d\theta}
=\frac a2\left(-\csc^2\frac\theta2\right)\frac12
=-\frac a4\csc^2\frac\theta2.
$$

绝对值保证截面为正。于是

$$
\frac{d\sigma}{d\Omega}
=\frac{a^2}{8}
\frac{\cot(\theta/2)\csc^2(\theta/2)}{\sin\theta}.
$$

利用$\sin\theta=2\sin(\theta/2)\cos(\theta/2)$，其中一个余弦因子相消，得到

$$
\boxed{\frac{d\sigma}{d\Omega}
=\frac{a^2}{16\sin^4(\theta/2)}
=\left(\frac{\kappa}{4E}\right)^2
\frac{1}{\sin^4(\theta/2)}}.
$$

这就是教材式（3-16）的卢瑟福微分散射截面。它把一次相遇的动力学映射，转成了均匀入射束中不同出射方向的相对权重。这里的推导先给单核的几何截面；教材式（3-13）～（3-15）中的薄箔面积和粒子计数，在下一节点接上。

### 公式的单位和边界

$\kappa/E$是长度，平方后是面积。微分截面常写为$\mathrm{m^2/sr}$，虽球面度在SI中量纲为一，保留$\mathrm{sr^{-1}}$仍有助于表明它是每单位立体角的量。教材还使用截面单位靶恩：

$$
1\ \mathrm{b}=10^{-28}\ \mathrm{m^2},
\qquad 1\ \mathrm{mb}=10^{-31}\ \mathrm{m^2}.
$$

单位符号$\mathrm b$与变量$b$（瞄准距离）必须结合上下文区分。

公式在$\theta\to\pi$时趋向有限的$(\kappa/4E)^2$，这不表示恰好一个方向上的有限概率；概率还须乘一个非零角域。在理想未屏蔽库仑模型中，$\theta\to0$时截面强烈增大，对整个前向区域的积分发散。不能把这个形式直接归一化为“所有散射的概率”；真实原子的屏蔽与小角、多次散射条件需要另行考虑。

### 快速回顾

- **核心关系**：$d\sigma=2\pi b|db|$，$d\Omega=2\pi\sin\theta\,d\theta$，$d\sigma/d\Omega=(\kappa/4E)^2\csc^4(\theta/2)$。
- **适用条件**：轴对称的单次中心力散射、均匀入射轨迹采样；此处角度与能量属于固定核模型。
- **常见误区**：漏掉复合求导的$1/2$；漏取$|db/d\theta|$；把微分截面等同于无量纲概率；额外重复乘入一个$2\pi$。
- **检验理解**：为何“一个角度上的微分截面有限”不等于“恰好散到这个方向的概率有限”？
- **相关知识**：[偏转关系](#atomic.ch01.coulomb-deflection)、[薄箔计数](#atomic.ch01.detector-counts)、[实验室系截面](#atomic.ch01.recoil-cross-section)。

**课程来源**：教材§3，印刷页17～19中§3的部分，图3.4、式（3-13）～（3-16）及截面单位；课件P51～57。本文用正的$d\theta$和$|db|$明确区间方向，避免把课件环带区间的简写误作$db/d\theta>0$。前向积分边界的说明是对理想模型的补充解释。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="atomic.ch01.differential-cross-section">加入我的讲义</button><button type="button" data-action="master-node" data-id="atomic.ch01.differential-cross-section">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="atomic.ch01.detector-counts">

<a id="atomic.ch01.detector-counts"></a>

## N11｜从单核截面到薄箔概率与有限角域计数

**类型**：实验接口与计算方法  
**核心问题**：知道微分截面，如何预测实际收集到的粒子数？

**学习目标**：引入靶核面密度和入射粒子数，对探测角域正确积分，区分截面、散射概率与计数。  
**前置知识**：[微分截面](#atomic.ch01.differential-cross-section)、体积与数密度、定积分。  
**关键词**：薄箔、面密度、入射注量、探测立体角、积分截面。

### 多个靶核怎样贡献计数

设束流均匀照射靶上有效面积$A$，薄箔厚度$t$，靶核数密度$n$，束流正入射。有效靶区中核的数目为$nAt$。对一个核，通向所选$d\Omega$的有效面积为$d\sigma$，相应几何概率为$d\sigma/A$。

当重复显著散射及这些有效面积的重叠可以忽略时，各核贡献相加：

$$
dP=(nAt)\frac{d\sigma}{A}
=nt\,d\sigma
=nt\frac{d\sigma}{d\Omega}\,d\Omega.
$$

面积$A$消去，留下靶核面密度$nt$，单位为$\mathrm{m^{-2}}$。因此，$dP$才是无量纲概率；微分截面本身有面积单位。

若同一测量时段内有$N_{\rm in}$个粒子照到有效靶区，理想散射计数为

$$
\boxed{dN_{\rm sc}=N_{\rm in}\,nt
\frac{d\sigma}{d\Omega}\,d\Omega}.
$$

反过来，校正实验计数并除以$N_{\rm in}$、$nt$及所接受的立体角，便可与理论微分截面比较。这正是教材式（3-15）、（3-16）的实验含义。

也可定义入射注量$\mathcal F=N_{\rm in}/A$，即该时段每单位面积通过的粒子数；于是$dN_{\rm sc}=\mathcal F(nAt)d\sigma$。注量不是每秒的流率，使用计数率时才把粒子数统一换成单位时间的数目。

### 探测器接受的是有限角域

探测器覆盖一个方向区域$\Delta\Omega$，而不是数学上的一个角度。若其效率为$\epsilon(\Omega)$，期望记录数为

$$
N_{\rm det}
=N_{\rm in}\,nt
\int_{\Delta\Omega}\epsilon(\Omega)
\left(\frac{d\sigma}{d\Omega}\right)_{\!L}d\Omega.
$$

其中下标$L$强调实际装置接受实验室方向；固定重核近似下可以直接使用上一节点的表达式。忽略背景且探测区很小、截面和效率在其中变化不显著时，

$$
N_{\rm det}\simeq N_{\rm in}\,nt\,
\epsilon\,\frac{d\sigma}{d\Omega}(\theta_0)\,\Delta\Omega.
$$

小探测面到散射点距离为$s$、面积为$S_{\rm det}$、法线与视线夹角为$\gamma$时，几何上$\Delta\Omega\simeq S_{\rm det}|\cos\gamma|/s^2$。保持这个接受立体角不变，需要相应保持或校正面积、距离和朝向，不能只由“探测器换到另一个角度”推出。

### 大于某个角度的粒子，为什么必须积分

对固定核模型，若收集全部方位、极角从$\theta_1$到$\theta_2$，其中$0<\theta_1<\theta_2\leq\pi$，积分截面为

$$
\sigma_{[\theta_1,\theta_2]}
=2\pi\left(\frac{\kappa}{4E}\right)^2
\int_{\theta_1}^{\theta_2}
\frac{\sin\theta}{\sin^4(\theta/2)}\,d\theta.
$$

令$u=\theta/2$，则$\sin\theta\,d\theta=4\sin u\cos u\,du$，而

$$
\int\frac{\sin\theta}{\sin^4(\theta/2)}\,d\theta
=4\int\frac{\cos u}{\sin^3u}\,du
=-2\csc^2u.
$$

故

$$
\boxed{\sigma_{[\theta_1,\theta_2]}
=\pi\left(\frac{\kappa}{2E}\right)^2
\left[\cot^2\frac{\theta_1}{2}
-\cot^2\frac{\theta_2}{2}\right]}.
$$

当$\theta_2=\pi$时，

$$
\sigma_{\theta\geq\theta_0}
=\pi\left(\frac{\kappa}{2E}\right)^2
\cot^2\frac{\theta_0}{2}
=\pi\,b(\theta_0)^2.
$$

最后一个等式提供了独立的几何检查：大于阈值的散射来自入射平面中$b\leq b(\theta_0)$的圆盘。所占入射粒子的比例才是$P_{\theta\geq\theta_0}\simeq nt\,\sigma_{\theta\geq\theta_0}$，需要它足够小才能保持当前单次、可加近似。

例如全部背散射对应$\theta_0=\pi/2$，得到的是$nt\,\pi(\kappa/2E)^2$，而不是把$90^\circ$代入微分截面后的一个数。若探测器只覆盖背半球中的一小片，便不能使用整个背半球的积分计数。上述积分回应课件P63～65的角域问题，不把某一历史反射比例当作所有材料的定值。

### 比例预言怎样使用

在其他条件相同、固定重核近似有效时，计数包含$\sin^{-4}(\theta/2)$、$E^{-2}$、核电荷平方和$nt$的依赖。它们是下一节实验验证的接口，本节不提前复述实验结果。

沿用课件P66～68的比例例题：能量为4.8 MeV时，$60^\circ$方向计数率为$2\times10^4\ \mathrm{s^{-1}}$。保持束流、靶、接受立体角和效率不变，

$$
\frac{\dot N_{90^\circ}}{\dot N_{60^\circ}}
=\frac{\sin^4 30^\circ}{\sin^4 45^\circ}
=\frac14,
\qquad
\dot N_{90^\circ}=5.0\times10^3\ \mathrm{s^{-1}}.
$$

若仍在$60^\circ$观测，将入射能量减半，并保持其他计数条件及近似成立，则计数率增至原来的4倍，即$8.0\times10^4\ \mathrm{s^{-1}}$。这是公式的条件性预测；实际能量改变后仍须检查能损、多次散射和探测效率。

### 快速回顾

- **核心关系**：$dP=nt\,d\sigma$，$dN_{\rm sc}=N_{\rm in}nt(d\sigma/d\Omega)d\Omega$；有限角域需要积分。
- **适用条件**：均匀照射、已知有效靶区、正入射厚度；单次散射占主导且相关概率足够小；计数需处理效率和背景。
- **常见误区**：截面就是概率；把某一角度的微分截面当作“所有大于该角度”的截面；比较不同靶材时只固定厚度而不检查$nt$；忽略接受立体角变化。
- **检验理解**：同样的微分截面和入射粒子数，靶核面密度加倍、探测立体角减半，理想计数怎样改变？
- **相关知识**：[单核截面](#atomic.ch01.differential-cross-section)、[反冲后的实验室截面](#atomic.ch01.recoil-cross-section)、[原子数与宏观量的联系](../section-01/#atomic.ch01.atomic-scale)。`atomic.ch01.experimental-tests`为下一节已规划、正文待建立的节点。

**课程来源**：教材§3，印刷页17～18、式（3-13）～（3-16）；课件P53～68。角域积分按课件P63～65的任务展开，比例例题数值核对P66中的图像公式；注量、效率和探测面投影是连接实际计数的补充解释。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="atomic.ch01.detector-counts">加入我的讲义</button><button type="button" data-action="master-node" data-id="atomic.ch01.detector-counts">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="atomic.ch01.recoil-cross-section">

<a id="atomic.ch01.recoil-cross-section"></a>

## N12｜质心系截面怎样变成实验室系截面

**类型**：坐标系转换与进阶方法  
**核心问题**：反冲修正后，为什么不能只换入$E_C$就把结果当作实验室角分布？

**学习目标**：区分两种角度和立体角，理解截面变换，并核对教材的实验室表达式及重核极限。  
**前置知识**：[质心系能量](#atomic.ch01.center-of-mass-scattering)、[微分截面](#atomic.ch01.differential-cross-section)、速度合成、复合函数求导。  
**关键词**：实验室系、质心系、角度变换、立体角变换、质量比。

### 先把公式放在正确的坐标系中

相对运动给出的截面为

$$
\left(\frac{d\sigma}{d\Omega}\right)_{\!C}
=\left(\frac{\kappa}{4E_C}\right)^2
\frac{1}{\sin^4(\theta_C/2)}.
$$

教材指出：放宽固定核假定后，这个形式仍成立，但其中的能量、散射角和立体角都属于质心系。实验室探测器的一个小角窗，对应的质心系角窗一般大小不同；单位立体角内的粒子数密度必须随之变换。

本节点只展开教材α粒子散射于重核所需的$m<M$分支。令$\beta=m/M<1$，并简记$\chi=\theta_C$。若$m\geq M$，实验室角与质心角的映射可能涉及不同的角域或分支，不能把这里的最终单分支式无条件套用。

### 角度差异来自速度的相加

靶初始静止。入射方向上质心速度大小为$V=mv/(m+M)$，入射粒子的质心系速率为$u=Mv/(m+M)$，故$V/u=\beta$。弹性碰撞后，入射粒子的质心速率仍为$u$；在实验室系，其平行、垂直于入射轴的速度分量为

$$
v_{\parallel,L}=u(\cos\chi+\beta),
\qquad
v_{\perp,L}=u\sin\chi.
$$

定义$D=\sqrt{1+\beta^2+2\beta\cos\chi}$，便有

$$
\cos\theta_L=\frac{\cos\chi+\beta}{D},
\qquad
\sin\theta_L=\frac{\sin\chi}{D}.
$$

也可由两个分量确定$\theta_L$，但只写$\tan\theta_L=\sin\chi/(\cos\chi+\beta)$会丢失象限信息；背散射必须同时检查平行分量的正负。

### 同一组事件，除以的立体角不同

同一组轨迹对应同一个有效入射面积，因此

$$
\left(\frac{d\sigma}{d\Omega}\right)_{\!L}d\Omega_L
=\left(\frac{d\sigma}{d\Omega}\right)_{\!C}d\Omega_C.
$$

两系使用同一方位角。对轴对称角带，利用$d\Omega=2\pi|d(\cos\theta)|$，可得

$$
\left(\frac{d\sigma}{d\Omega}\right)_{\!L}
=\left(\frac{d\sigma}{d\Omega}\right)_{\!C}
\left|\frac{d\cos\chi}{d\cos\theta_L}\right|.
$$

令$x=\cos\chi$，有$D=\sqrt{1+\beta^2+2\beta x}$及$dD/dx=\beta/D$。对$\cos\theta_L=(x+\beta)/D$求导，

$$
\frac{d\cos\theta_L}{d\cos\chi}
=\frac1D-\frac{\beta(\cos\chi+\beta)}{D^3}
=\frac{1+\beta\cos\chi}{D^3}.
$$

故本分支的截面变换为

$$
\boxed{\left(\frac{d\sigma}{d\Omega}\right)_{\!L}
=\left(\frac{d\sigma}{d\Omega}\right)_{\!C}
\frac{D^3}{1+\beta\cos\chi}}.
$$

对$\beta<1$，分母为正，映射单值。这个无量纲因子是角窗大小变化的修正，不是额外的相互作用。

> **可选推导｜消去质心角，得到教材式（3-17）**
>
> 记
> $$
> q=\sqrt{1-\beta^2\sin^2\theta_L}.
> $$
> 由$\cos\chi=D\cos\theta_L-\beta$、$\sin\chi=D\sin\theta_L$及两者平方和为1，
> $$
> D^2-2\beta D\cos\theta_L+\beta^2-1=0.
> $$
> 在$\beta<1$时取正根$D=q+\beta\cos\theta_L$，进一步得到
> $$
> 1+\beta\cos\chi=qD,
> \qquad
> 1-\cos\chi
> =\frac{(1+\beta)D\sin^2\theta_L}
> {\cos\theta_L+q}.
> $$
> 用$E_C=E_L/(1+\beta)$、$\sin^2(\chi/2)=(1-\cos\chi)/2$代入上式，约去$D^2$，得到
> $$
> \boxed{
> \left(\frac{d\sigma}{d\Omega}\right)_{\!L}
> =\left(\frac{\kappa}{2E_L\sin^2\theta_L}\right)^2
> \frac{\left[\cos\theta_L+
> \sqrt{1-\beta^2\sin^2\theta_L}\right]^2}
> {\sqrt{1-\beta^2\sin^2\theta_L}}
> }.
> $$
> 这是教材式（3-17）在$m<M$、$0<\theta_L<\pi$的表达式，教材的$m_1/m_2$对应这里的$\beta$。端点应取极限，不能把$\theta_L=\pi$直接代入含$\sin^{-4}\theta_L$的形式再按$0/0$运算。以上代数是根据速度和立体角变换展开，教材正文只列出最终式。

### 回到固定重核极限

当$\beta\to0$时，$D\to1$，$\theta_L\to\chi$，$E_C\to E_L$，截面的立体角修正因子趋于1。闭式中的$q\to1$，利用

$$
\frac{(1+\cos\theta_L)^2}{\sin^4\theta_L}
=\frac{1}{4\sin^4(\theta_L/2)},
$$

便回到$(\kappa/4E_L)^2\csc^4(\theta_L/2)$。这同时检查了质量比极限和公式中的系数。

本节点的作用是给后续精确计数提供正确的实验室截面；对初步的α—重核估算，可以按精度要求采用固定核近似。它不要求每位读者先记住较长的闭式，关键是知道**反冲会同时改变有效能量、角度以及每单位立体角的分配**。

### 快速回顾

- **核心关系**：质心系使用$E_C,\theta_C,d\Omega_C$；实验室截面还须乘$|d\Omega_C/d\Omega_L|$。
- **适用条件**：非相对论弹性两体散射、靶核初始静止；本节点显式闭式限定为$m<M$的单值分支。
- **常见误区**：只把$E_L$换成$E_C$便当作实验室截面；用正切值忽略背散射象限；把重核近似理解为严格无反冲。
- **检验理解**：为什么同一组散射粒子，在两个坐标系中对应的“每单位立体角计数”可以不同？
- **相关知识**：[折合质量与能量](#atomic.ch01.center-of-mass-scattering)、[微分截面的几何定义](#atomic.ch01.differential-cross-section)、[探测器计数](#atomic.ch01.detector-counts)。`atomic.ch01.light-target-deflection`、`atomic.ch01.experimental-tests`为已规划、正文待建立的节点。

**课程来源**：教材§3，印刷页19中§3的部分、式（3-17），并衔接印刷页15～16的反冲讨论。速度合成、立体角导数及分支条件是为核对正文公式所作的教学展开；不声称已读取教材脚注所指的第三版附录1C。课件P42～68主要使用固定核形式。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="atomic.ch01.recoil-cross-section">加入我的讲义</button><button type="button" data-action="master-node" data-id="atomic.ch01.recoil-cross-section">标记已掌握</button></div>

</section>


## 本节的证据关系与知识接口

| 层次 | 本节建立的内容 | 它能回答什么 |
|---|---|---|
| 结构假说 | 小中心集中正电荷，核外电子作用在所取角区近似忽略 | 为什么采用强中心库仑场 |
| 单次动力学 | $b=\kappa\cot(\theta/2)/(2E)$ | 给定入射条件时偏转多少 |
| 几何转换 | 入射环带面积对应出射立体角 | 为什么出现$\sin^{-4}(\theta/2)$角分布 |
| 实验接口 | 截面乘靶核面密度、入射数并对接受角域积分 | 一个探测器应收到多少粒子 |
| 反冲修正 | 折合质量、质心能量和实验室立体角变换 | 固定核近似何时需要修正 |

上一节通过旧模型的困难提出集中电荷。本节进一步表明：这一模型可以给出可计算的角分布，而非仅仅解释“大角事件有可能发生”。但公式的建立不等于实验验证已经完成，还必须检查靶厚度、束流能量、角度接受、效率以及各项近似。

教材下一节是§4《卢瑟福公式的实验验证》。本节已经提供比较角分布和计数规律的工具；下一节再讨论实验怎样检验这些预言及何时出现偏离，不在这里提前把核式模型的全部假设宣布为已证实。

## 来源与阅读说明

- **主教材**：杨福家《原子物理学》第五版，第一章§3《卢瑟福散射公式》，印刷页12～19中§3的部分（PDF第24～31页）。图3.1～3.4及式（3-1）～（3-17）已结合原页面核对。§4从同一印刷页19开始，本稿只用其标题确定衔接。
- **课程课件**：项目第一章课件《Atomic Physics-Chap1-背景格式修订-大字体版》，P42～68。P编号为幻灯片序号；P69起进入第四节。P49、P66中作为图像保存的例题数值已单独读取。
- **编写说明**：动力学主线沿用教材的单位矢量积分法，不另开轨道微分方程路线。最近距离、动能分解、角域积分、效率和实验室系转换的展开均已在对应节点标为教学推导或补充解释。没有加入未核实的外部文献页码、历史实验数据或完整量子散射结论。
- **待核实的课程标注**：P49的“镭C”与教材印刷页16的$^{214}\mathrm{Po}$（RaC′）名称不一致，暂不视为同义标注；所采用的7.68 MeV及计算条件已核对。配图均为需求说明，尚未制作成图。
