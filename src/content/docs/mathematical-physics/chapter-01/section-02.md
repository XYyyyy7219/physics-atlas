---
title: "复变函数"
description: "怎样把一个复变函数读成两个平面之间的映射？"
lecture: {"id":"mmp-ch01-section02","chapter":"mmp-ch01","order":2,"nodes":[{"id":"mmp-01-02-01","code":"MMP-01-02-01","title":"单值函数与平面映射","label":"函数与映射","kind":"concept","summary":"怎样把一个复变函数读成两个平面之间的映射？","requires":["mmp-01-01-01","mmp-01-01-02"],"quickReview":"$f(x+iy)=u+iv$ 对应 $(x,y)\\mapsto(u,v)$。平方映射使辐角加倍、模平方。"},{"id":"mmp-01-02-02","code":"MMP-01-02-02","title":"邻域、区域与边界","label":"邻域与区域","kind":"concept","summary":"哪些点集可作为复分析中的区域？","requires":["mmp-01-01-01"],"quickReview":"区域是非空、开且连通的集合。圆环的孔影响闭路积分与原函数的存在条件。"},{"id":"mmp-01-02-03","code":"MMP-01-02-03","title":"复极限与连续性","label":"极限与连续性","kind":"method","summary":"怎样验证复函数的极限对所有趋近方向都相同？","requires":["mmp-01-02-01","mmp-01-02-02"],"quickReview":"分别控制实部和虚部即可得到复极限。两条路径给出异值足以否定极限。"},{"id":"mmp-01-02-04","code":"MMP-01-02-04","title":"基本初等函数","label":"基本初等函数","kind":"concept","summary":"指数、三角与对数怎样从实数推广到复数？","requires":["mmp-01-01-02","mmp-01-02-01"],"quickReview":"$e^{x+iy}=e^x(\\cos y+i\\sin y)$。反解指数得到对数各值，虚部相差 $2\\pi$ 的整数倍。"}]}
prev: false
next: false
editUrl: false
tableOfContents: false
---

复数的模把平面上的接近程度写成一个实数。借助这个距离，可以精确定义复函数的极限，并判断由两个实值分量组成的映射何时连续。

<section class="lecture-node" data-knowledge-content="mmp-01-02-01">

<a id="mmp-01-02-01"></a>

## MMP-01-02-01　单值函数与平面映射

设 $E\subseteq\mathbb C$。对每个 $z\in E$ 指定唯一一个 $w\in\mathbb C$，便得到单值复变函数 $f:E\to\mathbb C$，写作 $w=f(z)$。若 $z=x+iy$，可写

$$
f(x+iy)=u(x,y)+iv(x,y).
$$

于是 $f$ 在几何上是从 $z$ 平面到 $w$ 平面的映射 $(x,y)\mapsto(u,v)$。例如 $f(z)=z^2$ 对应 $(u,v)=(x^2-y^2,2xy)$。在极坐标中，它把 $re^{i\theta}$ 送到 $r^2e^{2i\theta}$。角度加倍和半径平方共同解释了为什么 $z$ 与 $-z$ 在该映射下有相同的像。反求 $w$ 的平方根时，要记录所有原像。教材沿用“多值函数”这一术语，§1.6 将用**分支**把这种对应在适当区域内写成单值函数。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-02-01">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-02-01">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-02-02">

<a id="mmp-01-02-02"></a>

## MMP-01-02-02　邻域、区域与边界

以 $z_0$ 为中心、半径 $r>0$ 的开圆盘是 $D(z_0,r)=\{z:|z-z_0|<r\}$。去掉中心便得到去心圆盘。若某个 $D(z_0,r)$ 含于集合 $E$，$z_0$ 是 $E$ 的内点。若某个这样的圆盘含于补集，$z_0$ 是外点。若任意这样的圆盘同时遇到 $E$ 和其补集，$z_0$ 属于边界 $\partial E$。闭包 $\overline E=E\cup\partial E$。

复平面中的**区域**是非空、开且连通的集合。开集的每个点都有一个完全落在集合内的开圆盘。在复平面中的开集上，连通等价于任意两点可由集合内的折线连接。事实上，从一固定点出发能经折线到达的点形成相对开集，因为每到达一点，便可以在其邻域内加上一段直线。补集用同样理由也是相对开集，连通性使补集为空。

例如 $D(0,1)$ 和圆环 $\{z:1<|z|<2\}$ 都是区域。圆环有两条边界圆周，中间的孔会改变闭路积分与原函数的存在条件。第 2 章将用积分区分这种整体差别。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-02-02">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-02-02">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-02-03">

<a id="mmp-01-02-03"></a>

## MMP-01-02-03　复极限与连续性

设 $z_0$ 是 $E$ 的聚点，即每个去心圆盘都含有 $E$ 中的点。记 $\lim_{z\to z_0,\ z\in E}f(z)=L$，若对每个 $\varepsilon>0$ 都存在 $\delta>0$，使得 $z\in E$ 且 $0<|z-z_0|<\delta$ 时有 $|f(z)-L|<\varepsilon$。

若 $L=a+ib$，则复极限等价于 $(x,y)\to(x_0,y_0)$ 时同时有 $u\to a$、$v\to b$。一方面，$|u-a|$ 和 $|v-b|$ 各自不超过 $|f-L|$。另一方面，若两个分量的误差都小于 $\varepsilon/2$，由 $|f-L|\le|u-a|+|v-b|$ 便得到所需估计。当 $z_0\in E$ 时，$f$ 在 $z_0$ 连续的条件是，对任意 $\varepsilon>0$，$E$ 中所有充分接近 $z_0$ 的点都满足 $|f(z)-f(z_0)|<\varepsilon$。在聚点处，这等价于极限等于函数值。

**例。** 对 $f(z)=\bar z/z$（$z\ne0$），沿实轴到原点时 $f(z)=1$，沿虚轴到原点时 $f(z)=-1$，故极限不存在。若要证明某个复极限存在，需要对所有充分小的增量取得同一个估计。例如 $|z^2|=|z|^2$ 直接给出 $\lim_{z\to0}z^2=0$。若研究 $z\to\infty$，可用 §1.1 的 $\zeta=1/z$ 把问题转到原点。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-02-03">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-02-03">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-02-04">

<a id="mmp-01-02-04"></a>

## MMP-01-02-04　基本初等函数

多项式在整个复平面上有定义。有理函数 $P(z)/Q(z)$ 的自然定义域排除 $Q$ 的零点。把实指数函数与单位圆的参数式组合，定义

$$
e^{x+iy}=e^x(\cos y+i\sin y).
$$

由实指数的加法性质和复数乘法可得 $e^{z+w}=e^ze^w$。它的模为 $e^x$，故从不取零。如果 $e^{z+T}=e^z$，则 $e^T=1$。比较模和辐角可知，$T$ 的实部为零，虚部为 $2\pi$ 的整数倍。反之，这些平移都保持函数值，故其非零周期为 $2k\pi i$，其中 $k$ 是非零整数。

在复平面上定义

$$
\begin{aligned}
\cos z&=\frac{e^{iz}+e^{-iz}}2,& \sin z&=\frac{e^{iz}-e^{-iz}}{2i},\\
\cosh z&=\frac{e^z+e^{-z}}2,& \sinh z&=\frac{e^z-e^{-z}}2.
\end{aligned}
$$

$\sin z,\cos z$ 具有实周期 $2\pi$，$\sinh z,\cosh z$ 具有纯虚周期 $2\pi i$。将 $z=x+iy$ 代入指数定义，分别合并 $e^y,e^{-y}$ 的和与差，得到

$$
\sin(x+iy)=\sin x\cosh y+i\cos x\sinh y,\qquad
\cos(x+iy)=\cos x\cosh y-i\sin x\sinh y.
$$

于是 $|\sin(x+iy)|^2=\sin^2x+\sinh^2y$，$|\cos(x+iy)|^2=\cos^2x+\sinh^2y$。例如 $\cos(iy)=\cosh y$，其模随 $|y|$ 增大而增长。因此实轴上的界 $|\cos x|\le1$ 仅适用于实变量。

当 $z=re^{i\theta}\ne0$ 时，求解 $e^w=z$。若 $w=a+ib$，比较模得到 $e^a=r$，比较辐角得到 $b=\theta+2k\pi$。**复对数**的全部值为

$$
\log z=\{\ln r+i(\theta+2k\pi):k\in\mathbb Z\}.
$$

这里 $\ln r$ 是正实数的自然对数。例如 $\log(-1)=\{(2k+1)\pi i:k\in\mathbb Z\}$。给定 $s\in\mathbb C$，从每个对数值 $L\in\log z$ 形成 $e^{sL}$，便得到 $z^s$ 的各个可能取值。相邻两个对数值给出的幂相差一个乘因子 $e^{2\pi i s}$。当 $s$ 为整数时各值相同，当 $s=1/n$ 时重得 §1.1 的 $n$ 次根。要对对数或一般复幂求导，须先在相应开域上选定单值分支。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-02-04">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-02-04">标记已掌握</button></div>

</section>
