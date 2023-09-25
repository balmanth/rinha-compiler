import * as Core from '@xcheme/core';

import { Metadata } from '../../../core/metadata';
import { SymbolTypes } from '../../../core/types';
import { Scope } from '../../scope';

const isBuiltIn = (symbol: Core.SymbolRecord<Metadata>) => {
  return symbol.value === SymbolTypes.BuiltIn;
};

const followReferences = (symbol: Core.SymbolRecord<Metadata>) => {
  do {
    const { mutable, follow } = symbol.data;

    if (mutable || !follow || isBuiltIn(follow)) {
      break;
    }

    symbol = follow;
  } while (true);

  return symbol.node;
};

const applyLiteralNode = (symbol: Core.SymbolRecord<Metadata>, node: Core.Node<Metadata>) => {
  const identifierNode = symbol.node!;
  const valueNode = identifierNode.right!;

  node.swap(valueNode.clone());
  symbol.data.references--;

  return symbol.data.literal;
};

export const consumeNode = (scope: Scope, node: Core.Node<Metadata>) => {
  const { resolveReferences } = scope.options;
  const symbol = node.table.find(node.fragment)!;
  const { mutable, literal } = symbol.data;

  if (mutable) {
    return node;
  }

  if (literal !== undefined && resolveReferences) {
    return applyLiteralNode(symbol, node);
  }

  return followReferences(symbol) ?? node;
};
