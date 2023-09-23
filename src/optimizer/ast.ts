import * as Core from '@xcheme/core';

import { Metadata } from '../core/metadata';
import { VarValueType } from '../evaluator/scope';
import { NodeTypes } from '../core/types';

export const combineNodes = (
  first: Core.Node<Metadata>,
  last: Core.Node<Metadata>,
  type: NodeTypes,
  value: VarValueType<Metadata>
): Core.Node<Metadata> => {
  const lineRange = new Core.Range(first.fragment.location.line.begin, last.fragment.location.line.end);
  const columnRange = new Core.Range(first.fragment.location.column.begin, last.fragment.location.column.end);

  const location = new Core.Location(first.fragment.location.name, lineRange, columnRange);
  const fragment = new Core.Fragment(first.fragment.source, first.fragment.begin, last.fragment.end, location);

  const node = new Core.Node(fragment, type, first.table);

  node.assign({
    value
  });

  return node;
};