---
title: "导数"
description: "什么样的增量能用一个复数乘法近似？"
lecture: {"id":"mmp-ch01-section03","chapter":"mmp-ch01","order":3,"nodes":[{"id":"mmp-01-03-01","code":"MMP-01-03-01","title":"复差商与求导规则","label":"复差商","kind":"method","summary":"什么样的增量能用一个复数乘法近似？","requires":["mmp-01-02-03"],"quickReview":"复可导等价于 $f(z+h)-f(z)=f^\\prime(z)h+o(|h|)$。差商的极限要对平面上的任意趋近方式成立。"},{"id":"mmp-01-03-02","code":"MMP-01-03-02","title":"柯西–黎曼方程的必要性","label":"必要条件","kind":"concept","summary":"两条坐标轴方向的差商对复可导性施加什么约束？","requires":["mmp-01-03-01"],"quickReview":"比较实增量和纯虚增量，得到 $u_x=v_y$、$u_y=-v_x$。单点满足方程还需要检查实全微分。"},{"id":"mmp-01-03-03","code":"MMP-01-03-03","title":"实全微分与复可导的充要判据","label":"充要判据","kind":"method","summary":"怎样用实全微分给出复可导的完整判据？","requires":["mmp-01-03-02"],"quickReview":"实可微且满足柯西–黎曼方程等价于复可导。一阶误差除以 $h$ 后仍趋于零。"},{"id":"mmp-01-03-04","code":"MMP-01-03-04","title":"极坐标中的柯西–黎曼方程","label":"极坐标判据","kind":"method","summary":"怎样在局部极坐标中判断复可导性？","requires":["mmp-01-01-01","mmp-01-03-03"],"quickReview":"在 $r>0$ 的局部极坐标中，$u_r=v_\\theta/r$，$v_r=-u_\\theta/r$。实可微时这两式给出复可导性。"}]}
prev: false
next: false
editUrl: false
tableOfContents: false
---

实变量差商只涉及数轴上的增量。复变量可以从平面上任意方向趋近，差商的极限对所有这些增量须有同一个值。这一要求把两个实值分量的导数联系起来。

<section class="lecture-node" data-knowledge-content="mmp-01-03-01">

<a id="mmp-01-03-01"></a>

## MMP-01-03-01　复差商与求导规则

设 $f:D\to\mathbb C$，$D$ 是开集且 $z_0\in D$。若极限

$$
f'(z_0)=\lim_{h\to0}\frac{f(z_0+h)-f(z_0)}h
$$

存在且有限，则 $f$ 在 $z_0$ **复可导**。等价地，存在 $a\in\mathbb C$ 使

$$
f(z_0+h)=f(z_0)+ah+o(|h|),\qquad a=f'(z_0).
$$

这里 $o(|h|)$ 表示其模除以 $|h|$ 后趋于零的误差。从增量趋于零可知复可导蕴含连续。和、差、积、商与复合的求导公式沿用差商推导。以乘积为例，缩写 $F=f(z_0+h)$、$F_0=f(z_0)$、$G=g(z_0+h)$、$G_0=g(z_0)$，有

$$
\frac{FG-F_0G_0}{h}=G\frac{F-F_0}{h}+F_0\frac{G-G_0}{h}.
$$

利用 $G\to G_0$ 即得 $(fg)'=f'g+fg'$。差商的线性性给出 $(f\pm g)'=f'\pm g'$。若 $g(z_0)\ne0$，连续性保证 $g$ 在足够小的邻域内也非零。将 $1/g$ 的差商通分，即得 $(1/g)'=-g'/g^2$，再用乘积法则得到 $(f/g)'=(f'g-fg')/g^2$。整数幂的导数 $(z^n)'=nz^{n-1}$ 由乘积和倒数法则得到，其中 $n<0$ 时要求 $z\ne0$，$n=0$ 的常函数导数为零。

链式法则 $(F\circ g)'(z_0)=F'(g(z_0))g'(z_0)$ 可由两次代入一阶展开得到，因为 $g(z_0+h)-g(z_0)=O(|h|)$。若局部反函数在 $f(z_0)$ 处复可导，由链式法则得到 $(f^{-1})'(f(z_0))=1/f'(z_0)$。当 $f$ 在 $z_0$ 的邻域内实连续可微，且在 $z_0$ 处的复导数非零时，实反函数定理给出实连续可微的局部反函数。由 [MMP-01-03-03](#mmp-01-03-03) 的判据可验证该反函数在 $f(z_0)$ 处复可导。

**例。** $f(z)=z^2$ 的差商为 $2z_0+h$，故 $f'(z_0)=2z_0$。若 $f(z)=\bar z$，差商为 $\bar h/h$，沿实增量为 $1$，沿纯虚增量为 $-1$。因此共轭映射处处连续而处处复不可导。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-03-01">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-03-01">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-03-02">

<a id="mmp-01-03-02"></a>

## MMP-01-03-02　柯西–黎曼方程的必要性

写 $f=u+iv$，以下偏导数均在 $(x_0,y_0)$ 取值。若 $f'(z_0)$ 存在，取实增量 $h=\Delta x$，由差商得

$$
f'(z_0)=u_x+iv_x.
$$

取纯虚增量 $h=i\Delta y$，用 $1/i=-i$，得 $f'(z_0)=v_y-iu_y$。由于同一个导数同时等于这两个值，比较实部与虚部便有**柯西–黎曼方程**

$$
u_x=v_y,\qquad u_y=-v_x. \tag{1.1}
$$

单点的四个偏导数存在并满足式 (1.1)，只能保证上述两条坐标轴路径给出相同差商极限。取改编本 §1.3 的例子 $g(x+iy)=\sqrt{xy}$，约定被开方数非负时取非负实根，被开方数为负时取正虚根。沿两条坐标轴 $g=0$，因此四个偏导数在原点均为零。沿 $h=t(1+i)$、$t>0$，有 $g(h)=t$，差商等于 $1/(1+i)$。这条路径的结果与沿轴所得的零不同，所以 $g'(0)$ 不存在。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-03-02">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-03-02">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-03-03">

<a id="mmp-01-03-03"></a>

## MMP-01-03-03　实全微分与复可导的充要判据

**点态判据。** $f=u+iv$ 在 $z_0$ 复可导，当且仅当 $(u,v)$ 作为二元实映射在 $(x_0,y_0)$ 实可微，并且满足式 (1.1)。实可微在这里指存在一个实线性映射，能以 $o(|h|)$ 的误差近似函数的增量。

必要性来自复导数的一阶展开。若 $a=f'(z_0)=\alpha+i\beta$，乘以 $a$ 给出实线性变换

$$
\begin{pmatrix}\Delta x\\\Delta y\end{pmatrix}
\longmapsto
\begin{pmatrix}\alpha&-\beta\\\beta&\alpha\end{pmatrix}
\begin{pmatrix}\Delta x\\\Delta y\end{pmatrix}.
$$

因此实全微分存在，其矩阵分量满足式 (1.1)。反过来，若实全微分存在，令 $h=\Delta x+i\Delta y$，便有

$$
\begin{aligned}
f(z_0+h)-f(z_0)
&=(u_x+iv_x)\Delta x+(u_y+iv_y)\Delta y+o(|h|)\\
&=(u_x+iv_x)(\Delta x+i\Delta y)+o(|h|).
\end{aligned}
$$

第二行使用了 $u_y+iv_y=-v_x+iu_x=i(u_x+iv_x)$。除以 $h$ 后误差仍趋于零，足以控制所有趋近方式，故 $f'(z_0)=u_x+iv_x$。在一个开域内，若实、虚部具有连续一阶偏导数且处处满足式 (1.1)，便可逐点使用该判据。雅可比矩阵的逆若存在，对应乘以 $1/a$，这也给出了前一节点的逆映射求导公式。

**教材核对。** 改编本第 12–13 页把偏导连续性和柯西–黎曼方程合称为可导的充要条件。偏导在邻域内存在并在该点连续可保证该点实可微。点态的充要判据如上。作为检验，可取 $f(0)=0$，$f(z)=z^2\sin(1/|z|^2)$（$z\ne0$）。由 $|f(z)/z|\le|z|$，知 $f'(0)=0$。沿实轴，实部的 $x$ 偏导为 $2x\sin(1/x^2)-2\cos(1/x^2)/x$，在原点附近无界。

**例。** 由 $e^{x+iy}=e^x\cos y+i e^x\sin y$，可算出 $u_x=u=v_y$、$v_x=v=-u_y$，两分量均光滑，故 $(e^z)'=u_x+iv_x=e^z$。再用链式法则和 §1.2 的指数表示，得到 $(\sin z)'=\cos z$、$(\cos z)'=-\sin z$、$(\sinh z)'=\cosh z$、$(\cosh z)'=\sinh z$。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-03-03">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-03-03">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-03-04">

<a id="mmp-01-03-04"></a>

## MMP-01-03-04　极坐标中的柯西–黎曼方程

在 $r>0$ 的局部极坐标中，$z=re^{i\theta}$，有 $\partial_r z=e^{i\theta}$、$\partial_\theta z=ir e^{i\theta}$。若 $f$ 复可导，代入一阶展开得到 $\partial_r f=f'(z)e^{i\theta}$、$\partial_\theta f=ir\,\partial_r f$。比较实部与虚部，得

$$
u_r=\frac1r v_\theta,\qquad v_r=-\frac1r u_\theta. \tag{1.2}
$$

反过来，当 $u,v$ 在局部极坐标中实可微时，式 (1.2) 表明两个坐标方向的像以乘同一个复数的方式得到。因为 $e^{i\theta}$ 和 $ir e^{i\theta}$ 在 $r>0$ 时构成实平面的基，整个实全微分都是复乘法，故 $f$ 复可导。极坐标在原点退化，需要回到复差商或直角坐标取极限。

**教材核对。** 改编本第 13 页用增量符号表示沿角方向的变化。上面的 $ir e^{i\theta}$ 是偏导数。固定 $r$ 时，有限角增量满足 $\Delta z=ir e^{i\theta}\Delta\theta+o(|\Delta\theta|)$。

**例。** 在能够连续取 $\theta$ 的局部极坐标区域内，令 $f=\ln r+i\theta$。有 $u_r=1/r$、$v_\theta=1$、$u_\theta=v_r=0$，式 (1.2) 成立，故 $f'(z)=e^{-i\theta}\partial_r f=e^{-i\theta}/r=1/z$。§1.6 将说明这个公式对定义域的要求。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-03-04">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-03-04">标记已掌握</button></div>

</section>
