---
title: "复数与复数运算"
description: "怎样用距离和方向唯一描述一个非零复数？"
lecture: {"id":"mmp-ch01-section01","chapter":"mmp-ch01","order":1,"nodes":[{"id":"mmp-01-01-01","code":"MMP-01-01-01","title":"复平面、模、辐角与共轭","label":"几何定义","kind":"concept","summary":"怎样用距离和方向唯一描述一个非零复数？","requires":[],"quickReview":"$z=re^{i\\theta}$，$r=|z|>0$。辐角以 $2\\pi$ 为周期，取代表值时须指定角度区间。共轭对应关于实轴的反射。"},{"id":"mmp-01-01-02","code":"MMP-01-01-02","title":"四则运算、旋转伸缩与开根","label":"代数与几何","kind":"method","summary":"复乘法怎样把旋转与伸缩合成一步？","requires":["mmp-01-01-01"],"quickReview":"复乘法让模相乘、辐角相加。$w^n=z\\ne0$ 的各根等距落在半径 $|z|^{1/n}$ 的圆周上。"},{"id":"mmp-01-01-03","code":"MMP-01-01-03","title":"点积、有向面积与复数表示","label":"有向面积","kind":"method","summary":"怎样用复数的共轭乘积计算平面面积？","requires":["mmp-01-01-02"],"quickReview":"$\\operatorname{Re}(\\bar z_1z_2)$ 是点积，$\\operatorname{Im}(\\bar z_1z_2)$ 是有向平行四边形面积。换序变号。"},{"id":"mmp-01-01-04","code":"MMP-01-01-04","title":"扩充复平面与球极投影","label":"扩充复平面","kind":"concept","summary":"怎样把趋于无穷远的各个方向对应到同一个点？","requires":["mmp-01-01-01"],"quickReview":"球极投影把平面与去掉北极的球面对应。北极对应 $\\infty$，局部坐标为 $\\zeta=1/z$。"}]}
prev: false
next: false
editUrl: false
tableOfContents: false
---

平面无电荷区域里的静电势满足拉普拉斯方程。若还想知道电场线的形状，可以在同一张图上再画一族曲线，使它们处处沿电场方向。两族曲线之间有怎样的关系？复变函数把这两个问题联系起来。一个复函数有实部和虚部，若它在复数意义下可导，这两个分量的变化便受到同一组方程约束。在适当条件下，一个分量可以表示电势，另一个分量的等值线恰好沿电场方向。

本章从复数乘法的几何意义出发，建立复极限与复导数，进而讨论解析函数的局部几何、平面场和多值函数的解析分支。所需的数学基础包括平面向量、二元函数的偏导数与全微分、梯度和曲线积分。正文页码定位以 2024 年“101 计划”改编本为准，见[本章资料](../section-06/#chapter-01-sources)。

把平面向量写成一对实数，已经足以完成加减。若希望用一次乘法同时表达旋转和伸缩，就需要给这对实数赋予进一步的运算结构。本节从这个角度建立复数的运算，并说明如何用同一套符号描述角度、距离与面积。

<section class="lecture-node" data-knowledge-content="mmp-01-01-01">

<a id="mmp-01-01-01"></a>

## MMP-01-01-01　复平面、模、辐角与共轭

复数 $z=x+iy$ 由两个实数 $x,y$ 确定，其中 $i^2=-1$。写作 $\operatorname{Re}z=x$、$\operatorname{Im}z=y$。在复平面上，$z$ 对应点 $(x,y)$，也可视为从原点指向该点的向量。横轴为实轴，纵轴为虚轴。点到原点的距离是**模** $|z|=\sqrt{x^2+y^2}$。对两点 $z,w$，距离为 $|z-w|$。

当 $z\ne0$ 时，若 $x=r\cos\theta$、$y=r\sin\theta$ 且 $r=|z|$，则 $\theta$ 是 $z$ 的一个**辐角**。满足这两个等式的角构成集合

$$
\arg z=\{\theta+2k\pi:k\in\mathbb Z\}.
$$

本章用 $\operatorname{Arg}_{[0,2\pi)}z$ 表示落在 $[0,2\pi)$ 中的唯一代表值。改编本在叙述中分别用 $\operatorname{Arg}z$、$\arg z$ 表示多值辐角和主值，本章在主值符号上显式标出取值区间。比如 $z=-1+i$ 位于第二象限，所选辐角为 $3\pi/4$。比值 $y/x$ 只能确定正切值。求辐角还要用 $x,y$ 的符号判断象限，$x=0$ 时直接按虚轴上的位置确定角度。原点没有辐角。

记 $e^{i\theta}=\cos\theta+i\sin\theta$，便有代数式、三角式与指数式

$$
z=x+iy=r(\cos\theta+i\sin\theta)=re^{i\theta}.
$$

$\bar z=x-iy$ 称为 $z$ 的**共轭**，在几何上把点关于实轴反射。由乘法展开可得 $z\bar z=x^2+y^2=|z|^2$。例如 $i^2=-1$，而 $|i|^2=1$。

**教材核对。** 改编本第 4 页式 (1.1.2) 的反正切写法需要补充象限与虚轴条件。上面的定义用正弦、余弦共同确定辐角，从而适用于所有非零复数。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-01-01">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-01-01">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-01-02">

<a id="mmp-01-01-02"></a>

## MMP-01-01-02　四则运算、旋转伸缩与开根

令 $z_j=x_j+iy_j$（$j=1,2$）。加减逐分量进行。乘法按分配律展开，再代入 $i^2=-1$，得到

$$
\begin{aligned}
z_1\pm z_2&=(x_1\pm x_2)+i(y_1\pm y_2),\\
z_1z_2&=(x_1x_2-y_1y_2)+i(x_1y_2+y_1x_2).
\end{aligned}
$$

当 $z_2\ne0$ 时，$z_2\bar z_2=|z_2|^2>0$，故 $z_2^{-1}=\bar z_2/|z_2|^2$，于是

$$
\frac{z_1}{z_2}=\frac{z_1\bar z_2}{|z_2|^2}
=\frac{x_1x_2+y_1y_2}{x_2^2+y_2^2}
+i\frac{x_2y_1-x_1y_2}{x_2^2+y_2^2}.
$$

加法对应向量叠加，因此 $|z_1+z_2|\le |z_1|+|z_2|$。把 $z_1$ 写成 $(z_1-z_2)+z_2$，可得 $|z_1|-|z_2|\le |z_1-z_2|$。交换两个点，再合并这两个估计，得到

$$
\bigl||z_1|-|z_2|\bigr|\le |z_1-z_2|.
$$

对非零的 $z_j=r_j e^{i\theta_j}$，三角函数加法公式给出 $e^{i\theta_1}e^{i\theta_2}=e^{i(\theta_1+\theta_2)}$，故

$$
z_1z_2=r_1r_2e^{i(\theta_1+\theta_2)},\qquad
\frac{z_1}{z_2}=\frac{r_1}{r_2}e^{i(\theta_1-\theta_2)}.
$$

因此乘以固定的 $a=\rho e^{i\alpha}\ne0$，会把每个向量的长度乘以 $\rho$，并沿逆时针方向旋转 $\alpha$。例如 $(1+i)\cdot 2=2+2i$，模从 $2$ 变为 $2\sqrt2$，角度增加 $\pi/4$。

对非零复数 $z=re^{i\theta}$ 与整数 $n$，反复使用乘法公式或取倒数便得到 $z^n=r^n e^{in\theta}$。现在取正整数 $n$，反过来解 $w^n=z$。写 $w=se^{i\phi}$，则 $s^n=r$ 且 $n\phi=\theta+2k\pi$。因此所有根为

$$
w_k=r^{1/n}\exp\!\left(i\frac{\theta+2k\pi}{n}\right),\qquad k=0,\dots,n-1.
$$

任意两个不同的列出角相差 $2\pi/n$ 的非零整数倍，且其差的绝对值小于 $2\pi$，所以这些根互异。其余整数 $k$ 只会重复这些根。几何上它们均匀分布在半径为 $r^{1/n}$ 的圆周上。当 $z=0$ 时，$w^n=0$ 只有 $w=0$ 一个取值。

**例。** 解 $w^3=-8$。取 $r=8$、$\theta=\pi$，三个根的模均为 $2$，辐角为 $\pi/3,\pi,5\pi/3$，因而根为 $1+i\sqrt3$、$-2$、$1-i\sqrt3$。

<img src="../../../lecture-assets/mathematical-physics/ch01-multiplication-and-roots.png" alt="左图平面向量乘以 1+i 后放大并旋转。右图是方程 w³=−8 的三个根" width="1180" height="510" loading="lazy" decoding="async">

*图 1.1　左图以 $z=2$ 展示乘以 $1+i$ 的效果。右图中三个根等距排列，相邻根的辐角相差 $2\pi/3$。*

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-01-02">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-01-02">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-01-03">

<a id="mmp-01-01-03"></a>

## MMP-01-01-03　点积、有向面积与复数表示

设 $\mathbf a=(x_1,y_1)$、$\mathbf b=(x_2,y_2)$ 对应 $z_1,z_2$。由乘法公式可得

$$
\bar z_1z_2=\mathbf a\cdot\mathbf b+i\det(\mathbf a,\mathbf b),\qquad
\det(\mathbf a,\mathbf b)=x_1y_2-y_1x_2.
$$

实部给出点积，虚部给出以 $\mathbf a,\mathbf b$ 为邻边的有向平行四边形面积。因此三角形 $(0,z_1,z_2)$ 的有向面积为 $\tfrac12\operatorname{Im}(\bar z_1z_2)$。交换顶点次序会改变符号，取绝对值才得到几何面积。例如 $z_1=2$、$z_2=1-i$ 给出有向面积 $-1$，几何面积为 $1$。

对依次连接顶点 $z_1,\dots,z_m$ 形成的简单多边形，令 $z_{m+1}=z_1$，有向面积为

$$
A_{\mathrm{or}}=\frac12\sum_{j=1}^m\operatorname{Im}(\bar z_j z_{j+1}).
$$

由平面格林公式，逆时针边界给出 $2A_{\mathrm{or}}=\oint(x\,dy-y\,dx)$。在一条从 $(x_j,y_j)$ 到 $(x_{j+1},y_{j+1})$ 的边上，令 $x=x_j+t(x_{j+1}-x_j)$、$y=y_j+t(y_{j+1}-y_j)$，$0\le t\le1$。代入后含 $t$ 的项相消，该边积分等于 $x_jy_{j+1}-y_jx_{j+1}$。把各边所得结果相加即得上式，原点取在多边形外时公式也成立。

**教材核对。** 改编本第 7 页式 (1.1.26) 和 (1.1.27) 的符号由顶点取向决定。取几何面积时应对有向结果取绝对值。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-01-03">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-01-03">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-01-04">

<a id="mmp-01-01-04"></a>

## MMP-01-01-04　扩充复平面与球极投影

若只关心 $z$ 是否远离原点，可以用一个新点 $\infty$ 表示所有满足 $|z|\to\infty$ 的趋近过程。集合 $\widehat{\mathbb C}=\mathbb C\cup\{\infty\}$ 称为**扩充复平面**，其几何模型是黎曼球面。

在三维坐标 $(X,Y,Z)$ 中，取球面 $X^2+Y^2+(Z-1)^2=1$，它在南极 $S=(0,0,0)$ 与平面 $Z=0$ 相切。由北极 $N=(0,0,2)$ 向平面上的点 $P=(x,y,0)$ 作直线。除北极之外，此直线与球面的交点 $P'$ 对应 $z=x+iy$。为求 $P'$，把直线写成 $(tx,ty,2(1-t))$。代入球面方程后得 $t[(r^2+4)t-4]=0$，其中 $r=|z|$。取非零解可得

$$
P'=\left(\frac{4x}{r^2+4},\frac{4y}{r^2+4},\frac{2r^2}{r^2+4}\right).
$$

反过来，从任一球面点 $P'\ne N$ 出发，过 $N$ 和 $P'$ 的直线与复平面有唯一交点。无论 $z$ 从哪个方向离开原点，只要 $r\to\infty$，上式的第一、二分量便趋于零，第三分量趋于 $2$。因此可把北极对应到 $\infty$。在它附近使用坐标 $\zeta=1/z$，则 $z\to\infty$ 等价于 $\zeta\to0$。§1.6 将用这个坐标研究平方根在无穷远的分支行为。

<img src="../../../lecture-assets/mathematical-physics/ch01-stereographic.png" alt="球极投影的截面。北极与平面点的连线在球面上得到对应点" width="970" height="490" loading="lazy" decoding="async">

*图 1.2　过北极 $N$ 和平面点 $P$ 的直线在球面上得到对应点 $P'$。图中平面仅画出该截面内的一条轴。*

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-01-04">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-01-04">标记已掌握</button></div>

</section>
