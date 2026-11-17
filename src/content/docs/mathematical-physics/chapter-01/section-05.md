---
title: "平面标量场"
description: "为什么同一个解析函数能描述等势线与电场线？"
lecture: {"id":"mmp-ch01-section05","chapter":"mmp-ch01","order":5,"nodes":[{"id":"mmp-01-05-01","code":"MMP-01-05-01","title":"二维静电势与复势","label":"静电复势","kind":"method","summary":"为什么同一个解析函数能描述等势线与电场线？","requires":["mmp-01-04-02","mmp-01-04-03"],"quickReview":"均匀介质中的二维无源静电势 $\\Phi$ 调和。若 $W=\\Phi+i\\Psi$ 解析，$\\Psi$ 的正则等值线沿电场方向。"},{"id":"mmp-01-05-02","code":"MMP-01-05-02","title":"有向通量与共轭函数的端点差","label":"通量与法向","kind":"method","summary":"怎样从复势的端点值算出有向通量？","requires":["mmp-01-05-01"],"quickReview":"采用左法向且共轭单值时，电场通量等于 $\\Psi(B)-\\Psi(A)$。换用右法向时通量变号。"},{"id":"mmp-01-05-03","code":"MMP-01-05-03","title":"平面势流与稳态导热","label":"物理模型","kind":"example","summary":"势流、稳态导热和静电场可以共用哪些数学结果？","requires":["mmp-01-04-03","mmp-01-05-02"],"quickReview":"无源不可压无旋流的速度势和均匀各向同性介质的无热源稳态温度满足拉普拉斯方程。通量符号依梯度约定而定。"},{"id":"mmp-01-05-04","code":"MMP-01-05-04","title":"二次复势与抛物线网","label":"边界与复势","kind":"example","summary":"怎样用边界条件选择合适的二次或根式复势？","requires":["mmp-01-04-03","mmp-01-05-02"],"quickReview":"$W=-iaz^2$ 的实部在两条坐标轴上为零。导体半平面的两岸均取零势时，根式模型使用负实轴割线。"}]}
prev: false
next: false
editUrl: false
tableOfContents: false
---

电势、温度和速度势都是标量。若空间沿一个方向具有平移对称性，在其垂直截面上就能研究相应的平面场。几种不同物理过程之所以可以采用同一种复函数方法，是因为在适当的物理条件下，相应标量都满足二维拉普拉斯方程。

<section class="lecture-node" data-knowledge-content="mmp-01-05-01">

<a id="mmp-01-05-01"></a>

## MMP-01-05-01　二维静电势与复势

设均匀介质中有一平面静电区域 $D$，场量沿垂直截面的方向不变，且区域内无自由电荷。用 $\Phi(x,y)$ 表示静电势。静电关系 $\mathbf E=-\nabla\Phi$ 和高斯定律 $\nabla\cdot(\epsilon\mathbf E)=0$ 在介电常数 $\epsilon$ 恒定时给出 $\Delta\Phi=0$。由 §1.4，在小圆盘上或可取全局共轭的区域中，可以构造解析函数

$$
W(z)=\Phi(x,y)+i\Psi(x,y),
$$

称为**复势**。$\Phi=\text{常数}$ 描述等势线。因 $\nabla\Psi=(-\Phi_y,\Phi_x)$，有 $\nabla\Psi\cdot\mathbf E=0$。在场强非零处，$\Psi=\text{常数}$ 的曲线切向与 $\mathbf E$ 平行，因而它们给出电场线。箭头方向由 $\mathbf E=-\nabla\Phi$ 决定，沿箭头电势降低。导体边界的电势值来自物理边界条件，据此选取实际适用的复势与区域。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-05-01">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-05-01">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-05-02">

<a id="mmp-01-05-02"></a>

## MMP-01-05-02　有向通量与共轭函数的端点差

给定区域内从 $A$ 到 $B$ 的分段光滑曲线 $C$。在每个光滑段用弧长 $s$ 参数化，单位切向量为 $(dx/ds,dy/ds)$。取切向量逆时针旋转 $\pi/2$ 得到的**左法向** $\mathbf n=(-dy/ds,dx/ds)$。穿过该曲线的单位垂直长度电场通量为

$$
\begin{aligned}
\int_C \mathbf E\cdot\mathbf n\,ds
&=\int_C(-\Phi_y\,dx+\Phi_x\,dy)\\
&=\int_C(\Psi_x\,dx+\Psi_y\,dy)\\
&=\Psi(B)-\Psi(A).
\end{aligned} \tag{1.4}
$$

第一行来自电场与法向的点积，第二行使用柯西–黎曼方程。若把曲线方向反过来，左法向随之反向，通量变号。取右法向也会变号。在 SI 制下，$\mathbf E$ 的单位为 $\mathrm{V/m}$，乘上 $ds$ 得 $\mathrm V$，与端点处的 $\Psi$ 之差单位相同。式 (1.4) 用于整个区域时，$\Psi$ 须可在那里取成单值。穿孔区域可以按指定曲线连续延拓局部的 $\Psi$，所得端值可能依赖曲线的绕行。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-05-02">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-05-02">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-05-03">

<a id="mmp-01-05-03"></a>

## MMP-01-05-03　平面势流与稳态导热

**势流。** 对无源汇的二维不可压流动，速度 $\mathbf U$ 满足 $\nabla\cdot\mathbf U=0$。若流动无旋，在小圆盘上或单连通区域内可由 $\mathbf U=\nabla\phi$ 定义速度势，于是 $\Delta\phi=0$。取 $W=\phi+i\psi$，则 $\psi$ 等值线为流线。这里速度是梯度的正值，沿用式 (1.4) 的左法向时有 $\int_C\mathbf U\cdot\mathbf n\,ds=\psi(A)-\psi(B)$。这个符号来自速度势的定义。

**导热。** 在均匀各向同性、热导率 $k$ 为常数的介质中，傅里叶定律给出热流密度 $\mathbf q=-k\nabla T$。稳态且无体热源时，能量守恒给出 $\nabla\cdot\mathbf q=0$，所以 $\Delta T=0$。若 $T+i\psi_T$ 为对应的解析函数，$\psi_T$ 的等值线与热流方向相切，单位垂直长度的有向热流率是 $k[\psi_T(B)-\psi_T(A)]$。$k$ 的单位为 $\mathrm{W/(m\,K)}$，$\psi_T$ 的单位为 $\mathrm K$，故此热流率的单位为 $\mathrm{W/m}$。等温线和热流线构成的正交曲线网称为**等温网**，教材也用它称呼上述平面势场中相应的两族曲线。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-05-03">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-05-03">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-05-04">

<a id="mmp-01-05-04"></a>

## MMP-01-05-04　二次复势与抛物线网

**例一　接地的直角边界。** 在第一象限的四分之一圆盘 $0<r<R$、$0<\theta<\pi/2$ 中，设两条径向边接地，外圆弧施加电势 $aR^2\sin 2\theta$，其中 $a>0$。选取 $W(z)=-ia z^2$，则

$$
\Phi=2axy=ar^2\sin 2\theta,\qquad
\Psi=a(y^2-x^2),\qquad
\mathbf E=(-2ay,-2ax).
$$

两条径向边上 $xy=0$，外圆弧上 $r=R$，所以 $\Phi$ 满足给定边界条件。它在区域内调和，两轴交点是场强为零的临界点。在 SI 制下，$a$ 的单位为 $\mathrm{V/m^2}$。若曲线是从 $(x_0,y_1)$ 到 $(x_0,y_2)$ 的竖直线段，$0<y_1<y_2$ 且线段在区域内，左法向为 $(-1,0)$。直接积分得 $\int_{y_1}^{y_2}2ay\,dy=a(y_2^2-y_1^2)$。用 $\Psi$ 的端点差也得到同一结果。改编本第 20 页从 $z^2$ 的虚部取静电势。这里乘以 $-i$，使它成为 $W$ 的实部，与本节的记号统一。

**例二　由场线的形状找复势。** 改编本 §1.5 有一族满足 $y^2=c^2+2cx$（$c>0$）的抛物线。由 $r^2=x^2+y^2=(x+c)^2$，并注意该抛物线上 $x\ge-c/2$，可知 $r=x+c$，所以 $t=r-x=c$。要把这些曲线作为共轭函数的等值线，可设 $\Psi=F(t)$。在 $t>0$ 的区域内，由 $r=\sqrt{x^2+y^2}$ 得

$$
|\nabla t|^2=(x/r-1)^2+(y/r)^2=2t/r,
\qquad \Delta t=\Delta r=1/r.
$$

链式法则给出 $\Delta F(t)=F''(t)|\nabla t|^2+F'(t)\Delta t$。令它为零，得到 $2tF''+F'=0$，等价于 $(\sqrt t F')'=0$。因此 $F(t)=b\sqrt t+C$。要描画非平凡场线，取 $b\ne0$。在正实轴割开的区域，用 [MMP-01-04-03](../section-04/#mmp-01-04-03) 中的分支，去掉常数后可取

$$
\Phi=b\sqrt{2r}\cos(\theta/2),\qquad
\Psi=b\sqrt{2r}\sin(\theta/2),\qquad 0<\theta<2\pi.
$$

于是 $\Phi^2=b^2(r+x)$。令 $d=(\Phi/b)^2>0$，消去 $r$ 得 $y^2=d^2-2dx$。在这个分支上，一条给定的非零等势线只取相应符号的一半，须保留由 $\cos(\theta/2)$ 决定的实部符号。

若物理边界是两面同为零势的导体半平面，其截口为负实轴，则取区域 $D_-=\mathbb C\setminus(-\infty,0]$ 和辐角 $-\pi<\theta<\pi$。取 $b>0$ 时，$\Phi=b\sqrt{r+x}$，由上、下两岸趋近导体时均趋于零。此时 $\Psi=b\sqrt{2r}\sin(\theta/2)$，在上下半平面异号。图 1.3 右图采用这一分支。两套分支在上半平面一致，下半平面的取值须按各自的辐角约定计算。势函数的常数 $b$ 由远处施加的电势或模型的尺度条件确定，单位为 $\mathrm{V/m^{1/2}}$。由 $W^2=2b^2z$，得 $W'=b^2/W$。因此场强 $|\mathbf E|=|W'|=b/\sqrt{2r}$，随 $r\to0$ 增大，反映了理想尖锐边缘的奇异性。

<img src="../../../lecture-assets/mathematical-physics/ch01-equipotentials.png" alt="左图为直角区域中的等势线和电场线。右图为导体半平面边缘附近的抛物线网" width="1220" height="627" loading="lazy" decoding="async">

*图 1.3　蓝色实线是等势线，橙色虚线是电场线，橙色箭头指向电势降低的方向。左图黑色方形标出角点，圆弧限制解的示例区域。右图黑线为零势导体在截面中的位置，黑点标出其边缘。坐标按同一长度单位归一化。*

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-05-04">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-05-04">标记已掌握</button></div>

</section>
