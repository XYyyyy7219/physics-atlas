---
title: 复变函数练习
description: 六道题检验复数运算、复可导、调和共轭、通量与分支。
prev: false
next: false
---

[返回本章](../)

## 复数乘方

求 $(-1+i)^4$，并指出它在实轴上的位置。

<details class="lecture-reader-outline">
<summary>查看解答</summary>

模为 $4$，辐角等于 $3\pi$ 模 $2\pi$，故结果是 $-4$。

[复习相关知识节点](../section-01/#mmp-01-01-02)

</details>

## 复极限

讨论 $\lim_{z\to0}\operatorname{Re}(z^2)/|z|^2$。

<details class="lecture-reader-outline">
<summary>查看解答</summary>

可分别取实轴和虚轴路径，得到 $1$ 和 $-1$。

[复习相关知识节点](../section-02/#mmp-01-02-03)

</details>

## 复可导点

求 $f(z)=z\bar z^2$ 的复可导点。

<details class="lecture-reader-outline">
<summary>查看解答</summary>

实全微分为 $\bar z^2 h+2z\bar z\bar h$，要成为复线性映射，$\bar h$ 的系数须为零。因此只在原点复可导，且 $f'(0)=0$。

[复习相关知识节点](../section-03/#mmp-01-03-03)

</details>

## 调和共轭

给定 $u=e^x\cos y$，求它在复平面上的共轭调和函数，并给出一个局部伸缩比。

<details class="lecture-reader-outline">
<summary>查看解答</summary>

可取 $v=e^x\sin y+C$，由 $f'(z)=e^z$ 得到伸缩比 $e^x$。

[复习相关知识节点](../section-04/#mmp-01-04-03)

</details>

## 静电场通量

若 $W=az$（$a>0$）是静电复势，计算从 $(0,0)$ 到 $(0,h)$（$h>0$）的左法向电场通量。

<details class="lecture-reader-outline">
<summary>查看解答</summary>

$\Psi=ay$，端点差为 $ah$。电场 $(-a,0)$ 指向曲线的左侧，与符号一致。

[复习相关知识节点](../section-05/#mmp-01-05-02)

</details>

## 沿闭路取值

从 $z=-1$ 处的平方根 $i$ 和对数值 $i\pi$ 出发，沿单位圆顺时针绕一圈。

<details class="lecture-reader-outline">
<summary>查看解答</summary>

辐角减少 $2\pi$，平方根变为 $-i$，对数值变为 $-i\pi$。

[复习相关知识节点](../section-06/#mmp-01-06-02)

</details>
