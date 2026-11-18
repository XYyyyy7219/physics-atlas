---
title: "多值函数"
description: "在什么样的开域上可以连续且解析地选择一个平方根？"
lecture: {"id":"mmp-ch01-section06","chapter":"mmp-ch01","order":6,"nodes":[{"id":"mmp-01-06-01","code":"MMP-01-06-01","title":"主值、解析分支与割线","label":"主值与分支","kind":"concept","summary":"在什么样的开域上可以连续且解析地选择一个平方根？","requires":["mmp-01-02-04","mmp-01-03-04","mmp-01-04-01"],"quickReview":"去掉正实轴及原点，可连续取 $0<\\theta<2\\pi$，得到解析平方根 $\\sqrt{r}e^{i\\theta/2}$。"},{"id":"mmp-01-06-02","code":"MMP-01-06-02","title":"绕行、换值及无穷远点","label":"支点与绕行","kind":"concept","summary":"为什么平方根沿闭路走一圈后可能变号？","requires":["mmp-01-01-04","mmp-01-06-01"],"quickReview":"绕原点 $m$ 圈后，平方根乘以 $(-1)^m$。用 $\\zeta=1/z$ 可检验无穷远处也有平方根支点。"},{"id":"mmp-01-06-03","code":"MMP-01-06-03","title":"平方根的双叶黎曼面","label":"黎曼面","kind":"concept","summary":"怎样在两叶之间连续追踪平方根？","requires":["mmp-01-06-02"],"quickReview":"两份沿正实轴割开的平面按异叶的上下岸粘接。以 $w$ 为坐标时，投影为 $z=w^2$。"},{"id":"mmp-01-06-04","code":"MMP-01-06-04","title":"对数和一般复幂的分支","label":"对数与复幂","kind":"method","summary":"闭路绕行会怎样改变对数或一般复幂的取值？","requires":["mmp-01-02-04","mmp-01-06-01","mmp-01-06-02"],"quickReview":"对数增加 $2\\pi i m$，复幂相应乘以 $e^{2\\pi i s m}$。先指定分支，再使用求导和复幂公式。"}]}
prev: false
next: false
editUrl: false
tableOfContents: false
---

每个非零复数有两个平方根。在一个小圆盘内，可以选定其中一个并使它随 $z$ 连续变化。沿一条绕原点的闭路继续这种选择，回到原来的 $z$ 时，平方根却可能已经变号。这个现象决定了怎样选取分支，以及为什么需要割线。

<section class="lecture-node" data-knowledge-content="mmp-01-06-01">

<a id="mmp-01-06-01"></a>

## MMP-01-06-01　主值、解析分支与割线

在区域 $D\subset\mathbb C\setminus\{0\}$ 上，若解析函数 $g$ 满足 $g(z)^2=z$，则它是平方根在 $D$ 上的一个**解析分支**。同理，若解析函数 $L$ 满足 $e^{L(z)}=z$，则 $L$ 是复对数的一个解析分支。点态主值只规定每个点取哪个值。要得到解析分支，所取值还要在开域上一致地连续并可导。

例如 [MMP-01-01-01](../section-01/#mmp-01-01-01) 中 $[0,2\pi)$ 的取值约定在正实轴上的主辐角为零。在该轴上固定一点 $x>0$，从上方接近，辐角趋于 $0$，从下方接近，辐角趋于 $2\pi$。在 $D_+$ 中去掉这条射线和原点，连续采用 $0<\theta<2\pi$。于是

$$
L_+(z)=\ln r+i\theta,\qquad g_+(z)=e^{L_+(z)/2}=\sqrt r\,e^{i\theta/2}.
$$

由极坐标柯西–黎曼方程，$L_+$ 解析且 $L_+'=1/z$。因此 $g_+$ 解析，并满足 $g_+^2=z$。另一支为 $-g_+$。一般地，若 $D$ 连通且 $g^2=z$，则两个分支的比值只能取 $1$ 或 $-1$，连续性使该比值在 $D$ 上为常数。这条被移去的射线称为**割线**。将割线旋转到其他方向也能定义分支，但应同时改变取角区间。特别地，§1.5 的导体例题采用负实轴割线与 $-\pi<\theta<\pi$。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-06-01">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-06-01">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-06-02">

<a id="mmp-01-06-02"></a>

## MMP-01-06-02　绕行、换值及无穷远点

令 $z(t)=r e^{i(\theta_0+t)}$（$r>0$），从一个初始平方根 $w_0=\sqrt r e^{i\theta_0/2}$ 出发，随参数连续取根。对应的值为 $w(t)=w_0 e^{it/2}$。因此当 $t$ 从 $0$ 增至 $2\pi$ 时，$z$ 回到出发点，$w$ 变为 $-w_0$。当 $t$ 增至 $4\pi$ 时，$w$ 才第一次回到 $w_0$。

<img src="../../../lecture-assets/mathematical-physics/ch01-square-root-path.png" alt="左图为 z 从负实轴起逆时针绕原点两圈。右图为平方根从 i 先到 −i 再回到 i" width="1100" height="493" loading="lazy" decoding="async">

*图 1.4　取 $r=1$、$\theta_0=\pi$。左图两次沿同一圆周逆时针绕行。右图第 1 圈对应左半圆 $i\to-i$，第 2 圈对应右半圆 $-i\to i$。*

对一般避开原点的闭路，可以沿路连续记录辐角。做法是在每个非零点附近选一个局部辐角，每次进入相邻小邻域时用 $2\pi$ 的整数倍校准，使交接处连续。走完后起终点相同，因此记录的辐角共改变 $2\pi m$，整数 $m$ 是闭路绕原点的绕数。平方根的终值因而等于初值乘以 $e^{i\pi m}=(-1)^m$。绕数为零的闭路保持原取值，奇数绕数的闭路交换两值。这也证明了穿孔平面上无法定义连续的单值平方根。

对这里讨论的根式和对数，若沿仅绕某点一圈的小闭路继续取值后发生换值，就称该点为**支点**。原点是平方根的支点。若尝试把一个解析平方根延伸到含原点的邻域，则 $g(0)=0$，对 $g^2=z$ 在原点求导却要求 $2g(0)g'(0)=1$，这进一步说明无法在原点得到解析平方根。

研究 $\infty$ 时，用 [MMP-01-01-04](../section-01/#mmp-01-01-04) 的坐标 $\zeta=1/z$。关系 $w^2=z$ 变为 $(1/w)^2=\zeta$。当 $\zeta$ 绕零点一周，$1/w$ 变号，$w$ 也变号，故 $\infty$ 也是平方根的支点。在原书的术语中，绕两圈才首次复原，这两个点称为一阶支点。对 $z^{1/n}$（$n\ge2$），每绕一周乘以 $e^{2\pi i/n}$，首次复原需绕 $n$ 圈。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-06-02">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-06-02">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-06-03">

<a id="mmp-01-06-03"></a>

## MMP-01-06-03　平方根的双叶黎曼面

为了记录同一个 $z$ 上的两个平方根，可以把一对 $(z,w)$ 当作空间中的一个点，并要求 $w^2=z$。去掉支点时，每个 $z\ne0$ 有两个对应点。取两份沿正实轴割开的平面，第一叶用 $0<\theta<2\pi$，第二叶用 $2\pi<\theta<4\pi$。在割线处，从第一叶辐角趋于 $2\pi$ 的下岸接到第二叶辐角趋于 $2\pi$ 的上岸。第二叶辐角趋于 $4\pi$ 的下岸接回第一叶辐角趋于 $0$ 的上岸。接缝两侧的 $\sqrt r e^{i\theta/2}$ 取值相同，因而沿面行走时 $w$ 连续。

<img src="../../../lecture-assets/mathematical-physics/ch01-two-sheet-cut.png" alt="两份复平面沿正实轴割开后交叉连接。下岸 L₀ 接上岸 U₁，下岸 L₁ 接上岸 U₀" width="1130" height="531" loading="lazy" decoding="async">

*图 1.5　每一叶的红虚线是正实轴割线。第一叶、第二叶依次编号为 $j=0,1$，上、下岸分别记为 $U_j,L_j$。青色标记对应 $L_0\leftrightarrow U_1$，紫色标记对应 $L_1\leftrightarrow U_0$。*

在完成接缝后的曲面上，$w$ 是单值的。以 $w$ 为坐标时，投影到原平面由 $z=w^2$ 给出。$w=0$ 附近正好描述两叶如何在 $z=0$ 处相接。再用坐标 $1/w$ 也能描述无穷远处的相接。绕有限支点一圈，投影轨迹已闭合，曲面上的轨迹到达另一叶。绕两圈才会在曲面上闭合。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-06-03">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-06-03">标记已掌握</button></div>

</section>

<section class="lecture-node" data-knowledge-content="mmp-01-06-04">

<a id="mmp-01-06-04"></a>

## MMP-01-06-04　对数和一般复幂的分支

沿避开原点的闭路继续一个局部对数值 $L=\ln r+i\theta$，返回起点时半径不变，辐角改变 $2\pi m$，故对数值增加 $2\pi i m$。每逆时针绕原点一圈都会增加 $2\pi i$，任意正整数圈后仍无法复原。换用 $\zeta=1/z$ 后，局部的对数值满足 $\log z=-\log\zeta$ 的多值对应，故无穷远同样存在对数的换值现象。

**教材核对。** 改编本第 23 页讨论根式时把“各支在支点处同值”写进了支点的说明。对数在 $z=0$ 没有有限值，仍会在绕原点一圈后换值。因此，对这些例子可直接检验绕行时如何换值。

在割平面上选定一个解析对数 $L$，即可定义 $z^s=e^{sL(z)}$，链式法则给出

$$
\frac{d}{dz}e^{sL(z)}=\frac{s}{z}e^{sL(z)}.
$$

沿绕数为 $m$ 的闭路继续，复幂的终值是初值的 $e^{2\pi i s m}$ 倍。若 $s=p/q$ 是既约实有理数，$q>0$，首次复原需绕 $q$ 圈。若 $s$ 是实无理数，$s m$ 对非零整数 $m$ 从不为整数。若 $\operatorname{Im}s\ne0$，因乘因子的模为 $e^{-2\pi m\operatorname{Im}s}$，非零绕行也无法复原。对数的乘积公式亦应保留辐角信息。例如用 $0\le\theta<2\pi$ 的点态选值，$-i$ 的辐角是 $3\pi/2$，两个所选对数相加得到 $3\pi i$，而对积 $(-i)^2=-1$ 所选的对数为 $\pi i$。两者相差 $2\pi i$。

**拓展示例。** 对 $w^2=(z-a)(z-b)$，其中 $a\ne b$，在 $a$ 附近可以先为 $z-b$ 选一个局部解析平方根。此因子在绕 $a$ 的小圈上复原，$z-a$ 的平方根却换号，所以 $a$ 是支点。同理 $b$ 也是支点。用 $\zeta=1/z$ 观察无穷远，有

$$
w=\pm \zeta^{-1}\sqrt{(1-a\zeta)(1-b\zeta)}.
$$

根式内的函数在 $\zeta=0$ 等于 $1$，在其附近可解析地选根。沿绕 $\zeta=0$ 的小闭路，两种取值分别复原。在有限平面上，可把连接 $a,b$ 的线段用作割线。令 $t=(z-a)/(z-b)$，当 $t$ 为非正实数时，$z=(a-tb)/(1-t)$ 落在该线段上。在线段外，$t$ 避开非正实轴，故可取它在负实轴割平面上的解析平方根。由 $(z-b)^2t=(z-a)(z-b)$，得到分支 $w=(z-b)\sqrt t$。第 3 章将继续研究如何将局部解析函数沿路径延拓。

<div class="node-reading-actions"><button type="button" data-action="add-to-lecture" data-id="mmp-01-06-04">加入我的讲义</button><button type="button" data-action="master-node" data-id="mmp-01-06-04">标记已掌握</button></div>

</section>

[完成第一章练习](../practice/)

<a id="chapter-01-sources"></a>
## 本章资料

- 梁昆淼原著，刘法、缪国庆、邵陆兵改编，《数学物理方法》，高等教育出版社，2024 年 9 月第 1 版，ISBN 978-7-04-063087-9。第 1 章印刷第 3–24 页，对应 PDF 第 15–36 页。§1.1–§1.6 起始印刷页分别为 4、8、10、13、18、22。
- 曲线积分的有向面积计算、点态实全微分判据、共轭调和函数的整体存在条件及闭路辐角的计算，按正文所列假设补充推导。图 1.1–1.5 根据文中的映射、曲线和分支约定绘制。
