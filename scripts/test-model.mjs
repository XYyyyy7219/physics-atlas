import test from 'node:test';
import assert from 'node:assert/strict';
import { freshState, parseState, validateGraph, prerequisitePlan, completePrerequisites, newItem } from '../src/lib/atlas-model.ts';
import { courses } from '../src/data/courses.ts';
import { chapters } from '../src/data/chapters.ts';
import { validateOutline, validateChapterAssignment } from '../src/lib/course-outline.ts';

test('课程目录拒绝重复路径、缺失课程、缺失前置与循环', () => {
  assert.doesNotThrow(() => validateOutline());
  assert.throws(() => validateOutline(courses, [...chapters, { ...chapters[0], id: 'duplicate' }]), /路径重复/);
  assert.throws(() => validateOutline(courses, [{ ...chapters[0], courseId: 'missing' }]), /课程不存在/);
  assert.throws(() => validateOutline(courses, [{ ...chapters[0], requires: ['missing'] }]), /前置章节不存在/);
  assert.throws(() => validateOutline(courses, [{ ...chapters[0], requires: [chapters[0].id] }]), /循环/);
});

test('知识点章节必须存在且属于同一课程；旧条目可暂不分章', () => {
  assert.doesNotThrow(() => validateChapterAssignment('mechanics', 'mechanics-motion'));
  assert.doesNotThrow(() => validateChapterAssignment('mechanics'));
  assert.throws(() => validateChapterAssignment('optics', 'mechanics-motion'), /不匹配/);
  assert.throws(() => validateChapterAssignment('mechanics', 'missing'), /不匹配/);
});

const node=(id,requires=[],variants=[])=>({id,title:id,domain:'mechanics',kind:'concept',summary:'',requires,variants,local:true});
const a=node('local-a'), b=node('local-b',[a.id]), c=node('local-c',[b.id]);
const lecture=(items)=>({id:'lecture-test',title:'验证讲义',mode:'student',items:items.map(newItem)});
test('补齐前置区分直接与间接，并按依赖顺序排列',()=>{
  const l=lecture([c]);
  assert.deepEqual(prerequisitePlan(l,[a,b,c]).map(p=>[p.node.id,p.direct]),[[a.id,false],[b.id,true]]);
  const complete=completePrerequisites(l,[a,b,c]);
  assert.deepEqual(complete.items.map(i=>[i.nodeId,i.placement]),[[a.id,'reference'],[b.id,'body'],[c.id,'body']]);
  assert.equal(prerequisitePlan(complete,[a,b,c]).length,0);
});
test('推导路径只引入当前选择所需的前置',()=>{
  const d=node('local-d',[],[{id:'first',title:'路径一',requires:[a.id]},{id:'second',title:'路径二',requires:[b.id]}]);
  const l=lecture([d]);assert.deepEqual(prerequisitePlan(l,[a,b,d]).map(p=>p.node.id),[a.id]);
  l.items[0].variantId='second';assert.deepEqual(prerequisitePlan(l,[a,b,d]).map(p=>p.node.id),[a.id,b.id]);
});
test('拒绝自环、跨节点循环、缺失前置和重复标识',()=>{
  assert.throws(()=>validateGraph([node('local-x',['local-x'])]),/循环/);
  assert.throws(()=>validateGraph([node('local-x',['local-y']),node('local-y',['local-x'])]),/循环/);
  assert.throws(()=>validateGraph([node('local-x',['missing'])]),/尚未录入/);
  assert.throws(()=>validateGraph([a,a]),/重复/);
});
test('备份保留进度、当前位置、讲义模式与排序，拒绝畸形记录',()=>{
  const state=freshState();state.nodes=[a,b];state.lectures=[lecture([b,a])];state.progress[a.id]='mastered';state.currentNode=b.id;state.activeLecture='lecture-test';
  const restored=parseState(JSON.parse(JSON.stringify(state)));
  assert.equal(restored.progress[a.id],'mastered');assert.equal(restored.currentNode,b.id);
  assert.deepEqual(restored.lectures[0].items.map(i=>i.nodeId),[b.id,a.id]);
  assert.throws(()=>parseState({...state,version:2}));
  assert.throws(()=>parseState({...state,progress:{x:'invalid'}}));
  assert.throws(()=>parseState({...state,nodes:[{...a,id:'external'}]}));
  assert.throws(()=>parseState({...state,lectures:[lecture([a,a])]}),/重复/);
});
test('恢复时不接受外部链接字段，不让导入数据改变页面来源',()=>{
  const state=freshState();state.nodes=[{...a,url:'https://untrusted.example/'}];
  assert.equal(parseState(state).nodes[0].url,undefined);
});

test('分类调整后可读取旧个人记录，保留讲义备注、位置和进度',()=>{
  const oldWave={...node('local-wave'),domain:'waves'};
  const oldModern={...node('local-modern',[oldWave.id]),domain:'modern'};
  const atomic={...node('local-atomic'),domain:'atomic-physics'};
  const state=freshState();state.nodes=[oldWave,oldModern,atomic];state.lectures=[lecture([oldModern])];
  state.lectures[0].items[0].note='保留的学习备注';state.progress[oldModern.id]='mastered';state.currentNode=oldModern.id;
  const restored=parseState(JSON.parse(JSON.stringify(state)));
  assert.deepEqual(restored.nodes.map(n=>n.domain),['waves','modern','atomic-physics']);
  assert.equal(restored.lectures[0].items[0].note,'保留的学习备注');
  assert.equal(restored.progress[oldModern.id],'mastered');assert.equal(restored.currentNode,oldModern.id);
  validateGraph(restored.nodes);
  assert.deepEqual(parseState(JSON.parse(JSON.stringify(restored))),restored);
  assert.throws(()=>parseState({...state,nodes:[{...atomic,domain:'unrecognized-domain'}]}),/格式不正确/);
});
