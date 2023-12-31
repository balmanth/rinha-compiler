import * as Variable from './variable';
import * as Expression from './expression';
import * as Condition from './condition';

import { NodeType, NodeTypes, ValueTypes } from '../../core/types';
import { Scope } from '../scope';

const consumeInnerNode = (scope: Scope, node: NodeType) => {
  const innerScope = new Scope(scope);
  return consumeNodes(innerScope, node);
};

export function* consumeNodes(scope: Scope, node: NodeType): ValueTypes {
  let value;

  while (node) {
    switch (node.value) {
      case NodeTypes.EXPRESSION:
        value = yield Expression.consumeNode(scope, node.right!);
        break;

      case NodeTypes.VARIABLE:
        value = yield Variable.consumeNode(scope, node.right!);
        break;

      case NodeTypes.IF_ELSE:
        value = yield Condition.consumeNode(scope, node.right!);
        break;

      case NodeTypes.BLOCK:
        value = yield consumeInnerNode(scope, node.right!);
        break;

      default:
        throw `Unexpected block node type (${node.value}).`;
    }

    node = node.next!;
  }

  return value;
}
