---
title: "解析函数"
description: "在一个点复可导，怎样加强为在该点解析？"
lecture: {"id":"mmp-ch01-section04","chapter":"mmp-ch01","order":4,"nodes":[{"id":"mmp-01-04-01","code":"MMP-01-04-01","title":"点上可导与邻域解析","label":"解析性","kind":"concept","summary":"在一个点复可导，怎样加强为在该点解析？","requires":["mmp-01-02-02","mmp-01-03-03"],"quickReview":"解析要求某个开邻域内处处复可导。$|z|^2$ 只在原点复可导，原点的任何邻域内都有复不可导点。"},{"id":"mmp-01-04-02","code":"MMP-01-04-02","title":"调和函数和正交等值线","label":"调和性与正交性","kind":"concept","summary":"解析函数的两个分量怎样受到拉普拉斯方程约束？","requires":["mmp-01-04-01","mmp-01-03-02"],"quickReview":"实、虚部均调和，且 $\\nabla v=(-u_y,u_x)$。梯度非零时，两族等值线正交。"},{"id":"mmp-01-04-03","code":"MMP-01-04-03","title":"由一个分量求共轭调和函数","label":"重建共轭","kind":"method","summary":"已知一个调和分量，怎样求与它对应的共轭？","requires":["mmp-01-04-02","mmp-01-03-04"],"quickReview":"积分 $dv=-u_y\\,dx+u_x\\,dy$。单连通是该闭式全局路径无关的充分条件。"},{"id":"mmp-01-04-04","code":"MMP-01-04-04","title":"雅可比矩阵、局部伸缩与保角","label":"局部保角","kind":"concept","summary":"解析映射在什么条件下保持两条曲线的交角？","requires":["mmp-01-01-02","mmp-01-03-03","mmp-01-04-01"],"quickReview":"$f^\\prime(z_0)\\ne0$ 时，切向量由同一个非零复数相乘，夹角保持。临界点需要另行分析。"}]}
prev: false
next: false
editUrl: false
tableOfContents: false
---

一个函数即使在某点有复导数，也可能在该点周围处处失去这一性质。解析函数要求复可导性在开邻域内成立。本节考察这种邻域条件如何约束实部和虚部，以及它在平面几何上的含义。

<section class="lecture-node" data-knowledge-content="mmp-01-04-01">

<a id="mmp-01-04-01"></a>

## MMP-01-04-01　点上可导与邻域解析

若存在 $z_0$ 的一个开邻域，$f$ 在其中处处复可导，就称 $f$ 在 $z_0$ **解析**。若 $f$ 在区域 $D$ 中每一点都解析，就称 $f$ 在 $D$ 解析，亦称在 $D$ **全纯**。因为 $D$ 是开集，在 $D$ 全纯等价于在 $D$ 处处复可导。若 $D=\mathbb C$，称 $f$ 为整函数。多项式、指数函数以及复三角函数都是整函数。有理函数在其分母非零处解析。

**例。** $f(z)=|z|^2$ 的实、虚部分别为 $x^2+y^2$ 和 $0$。柯西–黎曼方程要求 $2x=2y=0$，因此唯一的复可导点是原点。此处 $|h|^2/h=\bar h\to0$，故导数为零。原点的每个邻域都包含复不可导点，所以 $f$ 处处不解析。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-04-01">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-04-01">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-04-02">

<a id="mmp-01-04-02"></a>

## MMP-01-04-02　调和函数和正交等值线

若实值函数 $u$ 在 $D$ 有连续二阶偏导数，且

$$
\Delta u=u_{xx}+u_{yy}=0,
$$

则称 $u$ 在 $D$ 上**调和**。设 $f=u+iv$ 在 $D$ 解析。第 2 章将由柯西积分公式推出解析函数具有各阶导数，因而这里可使用 $u,v$ 的连续二阶偏导数。对式 (1.1) 的两式求导，利用混合偏导可交换，得到

$$
\Delta u=v_{yx}-v_{xy}=0,\qquad
\Delta v=-u_{yx}+u_{xy}=0.
$$

这样获得的 $v$ 称为 $u$ 的**共轭调和函数**。柯西–黎曼方程还给出 $\nabla v=(-u_y,u_x)$，即 $\nabla v$ 由 $\nabla u$ 逆时针旋转 $\pi/2$ 得到。当 $f'(z)\ne0$ 时，两个梯度都非零。过该点的两条等值线分别以这两个梯度为法向，由隐函数定理可知，它们是局部光滑曲线且相互正交。在临界点 $f'(z)=0$，等值线可能分叉，需要另外分析。

**例。** $f(z)=z^2$ 给出 $u=x^2-y^2$、$v=2xy$。当 $(x,y)\ne(0,0)$ 时，梯度 $(2x,-2y)$ 与 $(2y,2x)$ 都非零且点积为零。在原点，两条直线 $y=\pm x$ 都属于 $u=0$，两条坐标轴都属于 $v=0$。这里每个零等值集都由相交的两条直线组成。§1.5 将用同一对函数构造满足导体边界的电势。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-04-02">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-04-02">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-04-03">

<a id="mmp-01-04-03"></a>

## MMP-01-04-03　由一个分量求共轭调和函数

已知一个调和函数 $u$，可将寻找 $v$ 化为求微分式的势函数。由柯西–黎曼方程，所求的 $v$ 应满足

$$
dv=-u_y\,dx+u_x\,dy. \tag{1.3}
$$

设右端记为 $P\,dx+Q\,dy$。因为 $Q_x-P_y=u_{xx}+u_{yy}=0$，这个微分式是闭的。二元微积分中的路径无关定理表明，在小圆盘上，或更一般地在单连通区域上，闭式的曲线积分只依赖端点。单连通在这里要求区域中的任意闭路都能在区域内连续收缩到一点。固定基点并对式 (1.3) 积分，可得 $v$，且 $v_x=P$、$v_y=Q$。实、虚部具有连续一阶偏导并满足柯西–黎曼方程，因此 $u+iv$ 解析。若两个共轭都定义在同一连通区域，它们的差的梯度为零，所以相差一个实常数。

**例一。** 取 $u=x^2-y^2$。此时 $dv=2y\,dx+2x\,dy$，可用以下三种计算。

1. **曲线积分。** 从 $(0,0)$ 沿横线到 $(x,0)$，第一段 $y=0$、$dy=0$，积分为零。再沿竖线到 $(x,y)$，第二段积分为 $\int_0^y 2x\,d\eta=2xy$。
2. **辨认全微分。** 乘积求微分给出 $d(2xy)=2y\,dx+2x\,dy$，故 $v=2xy+C$。
3. **逐变量积分。** 先由 $v_y=2x$ 得 $v(x,y)=2xy+g(x)$，再由 $v_x=2y$ 得 $g'(x)=0$。

三种方法均给出 $f(z)=z^2+iC$，其中 $C\in\mathbb R$。

**例二。** 若给定虚部 $v=\sqrt{r-x}$，在区域 $D_+=\mathbb C\setminus[0,\infty)$ 上取 $0<\theta<2\pi$，其中 $r=|z|$。由于 $r-x=r(1-\cos\theta)=2r\sin^2(\theta/2)$，且 $\sin(\theta/2)>0$，有 $v=\sqrt{2r}\sin(\theta/2)$。由极坐标柯西–黎曼方程求实部的微分，得到

$$
\begin{aligned}
du&=\frac{v_\theta}{r}\,dr-rv_r\,d\theta\\
  &=\frac{\cos(\theta/2)}{\sqrt{2r}}\,dr
    -\frac{\sqrt{2r}}2\sin(\theta/2)\,d\theta\\
  &=d\bigl[\sqrt{2r}\cos(\theta/2)\bigr].
\end{aligned}
$$

所以 $f=\sqrt{2r}\,e^{i\theta/2}+C$，其去掉实常数后的平方为 $2z$。实部的余弦在上半平面为正，在下半平面为负，在负实轴上为零。**教材核对。** 改编本第 16–17 页例 2 的极坐标结果适用于上述取角范围。第 17 页将余弦项改写为非负根式 $\sqrt{r+x}$，这一步只适用于余弦非负的部分。由 $u-C=\sqrt{2r}\cos(\theta/2)$ 可直接读出各处的符号。

**补充推导。** 局部共轭可能无法在整个区域中选成单值。例如 $u=\ln|z|$ 在穿孔平面 $\mathbb C\setminus\{0\}$ 调和，而对应的式 (1.3) 为

$$
-\frac{y}{x^2+y^2}\,dx+\frac{x}{x^2+y^2}\,dy.
$$

沿逆时针单位圆 $x=\cos t$、$y=\sin t$，右端等于 $dt$，一周积分是 $2\pi$。若它等于某个全局单值函数的 $dv$，任何闭路积分都应为零。因此 $\ln|z|$ 在穿孔平面上无法取得全局单值共轭。改编本第 14–15 页利用了曲线积分的路径无关性，应用时须检验定义域或闭路积分条件。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-04-03">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-04-03">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-04-04">

<a id="mmp-01-04-04"></a>

## MMP-01-04-04　雅可比矩阵、局部伸缩与保角

设 $f$ 在 $z_0$ 解析，$a=f'(z_0)=\alpha+i\beta$。由 [MMP-01-03-03](../section-03/#mmp-01-03-03)，映射 $(x,y)\mapsto(u,v)$ 在 $z_0$ 的雅可比矩阵为

$$
J_f(z_0)=\begin{pmatrix}\alpha&-\beta\\\beta&\alpha\end{pmatrix},
\qquad \det J_f(z_0)=|a|^2.
$$

若 $a\ne0$，矩阵等于一个旋转矩阵乘以正数 $|a|$。取两条经过 $z_0$ 的可微曲线 $\gamma_1(t)$、$\gamma_2(t)$，参数在交点处取 $t=0$，两条切向量均非零。链式法则给出像曲线的切向量 $(f\circ\gamma_j)'(0)=a\gamma_j'(0)$。两个向量同时旋转同一角度，并以相同比例伸缩，所以有向夹角保持不变。由此可见，解析函数在 $f'(z_0)\ne0$ 处局部保角。由非零雅可比行列式也可知它在该点附近局部可逆。

例如 $z^2$ 在 $z_0\ne0$ 处的局部伸缩比为 $2|z_0|$，旋转角为 $2z_0$ 的任一辐角。在原点，实轴正向射线与辐角为 $\pi/4$ 的射线分别映到实轴正向与虚轴正向，夹角由 $\pi/4$ 变为 $\pi/2$。改编本第 17–18 页式 (1.4.9)–(1.4.11) 所用的矩阵关系是全微分的关系。对有限增量，$\Delta f=f'(z_0)\Delta z+o(|\Delta z|)$ 给出它的精确含义。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-04-04">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-04-04">标记已掌握</button></div>

</section>
